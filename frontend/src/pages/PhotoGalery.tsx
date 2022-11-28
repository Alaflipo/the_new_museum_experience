import {
    AppBar,
    Box,
    Button,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    Stack,
    SxProps,
    Toolbar,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import Header from "../components/Heading";
import PhotoPage from "../components/PhotoPage";
import { PhotoData, UserData } from "../DataTypes";
import BrushIcon from "@mui/icons-material/Brush";

const PhotoGallery = () => {
    const { userId } = useParams(); // to get params out
    const [images, setImages] = useState<Array<PhotoData> | null>(null);
    const [currentImage, setCurrentImage] = useState<PhotoData | null>(null);

    useEffect(() => {
        fetchPhotos();
    }, [userId]);

    const fetchPhotos = async () => {
        const request = await fetch(`api/gallery/${userId}`);
        let data: Array<PhotoData> = await request.json();
        setImages(data);
    };

    const makePainting = async () => {
        await fetch(`api/dalle/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: "",
        }).then(() => fetchPhotos());
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
            <ImageList
                cols={3}
                rowHeight={164}
                sx={{ margin: 1, maxHeight: "80vh", overflow: "auto" }}
            >
                {images ? (
                    images.map((image) => {
                        return (
                            <ImageListItem
                                onClick={() => setCurrentImage(image)}
                            >
                                <img
                                    style={{ width: "100%", height: "auto" }}
                                    src={
                                        image.dalle ? image.dalle : image.photo
                                    }
                                    alt="screenshot"
                                />
                            </ImageListItem>
                        );
                    })
                ) : (
                    <p>No photos</p>
                )}
            </ImageList>
            <AppBar
                position="fixed"
                color="primary"
                sx={{ top: "auto", bottom: 0, height: "10vh" }}
            >
                <Toolbar>
                    <IconButton
                        color="warning"
                        sx={{
                            margin: "20px auto",
                            border: "2px solid white",
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
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default PhotoGallery;
