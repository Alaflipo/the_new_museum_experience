import {
    AppBar,
    Box,
    Button,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    Paper,
    Stack,
    SxProps,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import Header from "../components/Heading";
import PhotoPage from "../components/PhotoPage";
import { PhotoData, UserData } from "../DataTypes";
import BrushIcon from "@mui/icons-material/Brush";
import paintbrush from "./paint.gif";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const PhotoGallery = () => {
    const { userId } = useParams(); // to get params out
    const [images, setImages] = useState<Array<PhotoData> | null>(null);
    const [currentImage, setCurrentImage] = useState<PhotoData | null>(null);
    const [load, setLoad] = useState<boolean>(false);

    useEffect(() => {
        fetchPhotos();
    }, [userId]);

    const fetchPhotos = async () => {
        const request = await fetch(`api/gallery/${userId}`);
        let data: Array<PhotoData> = await request.json();
        setImages(data);
    };

    const makePainting = async () => {
        setLoad(true);
        await fetch(`api/dalle/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: "",
        }).then(() => {
            fetchPhotos();
            setLoad(false);
        });
    };

    return currentImage ? (
        <PhotoPage
            photo={currentImage}
            setCurrentPhoto={setCurrentImage}
            refreshPaintings={fetchPhotos}
        />
    ) : (
        <Box>
            <Header currentUser={userId ? userId : "0"} />
            <Paper sx={{ maxHeight: "70vh", overflow: "auto" }}>
                <ImageList cols={3} rowHeight={164} sx={{ margin: 1 }}>
                    {images ? (
                        images.map((image) => {
                            return (
                                <ImageListItem
                                    onClick={() => setCurrentImage(image)}
                                >
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                        src={
                                            image.dalle
                                                ? image.dalle
                                                : image.photo
                                        }
                                        alt="screenshot"
                                    />
                                </ImageListItem>
                            );
                        })
                    ) : (
                        <p>No photos</p>
                    )}
                    {load && (
                        <ImageListItem>
                            <img src={paintbrush} alt="loading"></img>
                        </ImageListItem>
                    )}
                </ImageList>
            </Paper>
            <AppBar
                position="fixed"
                color="primary"
                sx={{ top: "auto", bottom: 0, height: "15vh" }}
            >
                <Toolbar>
                    <Grid container spacing={0} alignItems="center">
                        <Grid item xs={3}>
                            <Tooltip title="home" placement="bottom">
                                <IconButton
                                    color="warning"
                                    component={Link}
                                    to={`/museumtour/${userId}`}
                                >
                                    <CameraAltIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton
                                color="warning"
                                sx={{
                                    margin: "50px auto",
                                    background: "white",
                                }}
                                onClick={makePainting}
                            >
                                <BrushIcon
                                    fontSize="large"
                                    sx={{ color: "primary" }}
                                    color="primary"
                                />
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default PhotoGallery;
