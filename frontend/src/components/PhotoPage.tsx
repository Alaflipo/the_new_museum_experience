import {
    Box,
    Button,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    Stack,
    SxProps,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import { MuseumPhotoData, PhotoData, UserData } from "../DataTypes";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./Heading";

const HeaderStyling: SxProps = {
    maxWidth: "auto",
    margin: "20px auto",
    overflowWrap: "break-word",
};

const BodyStyling: SxProps = {
    maxWidth: "80%",
    margin: "20px auto",
    overflowWrap: "break-word",
};

interface PhotoPageProps {
    photo: PhotoData;
    user: UserData | null;
    setCurrentPhoto: any;
    refreshPaintings: any;
}

const PhotoPage = (props: PhotoPageProps) => {
    const [painting, setPainting] = useState<MuseumPhotoData | null>(null);
    let navigate = useNavigate();

    useEffect(() => {
        fetchPainting();
    }, []);

    const fetchPainting = async () => {
        if (props.photo.museumphoto && props.photo.museumphoto != null) {
            const request = await fetch(
                `api/museum_image/${props.photo.museumphoto}`
            );
            let data: MuseumPhotoData = await request.json();
            setPainting(data);
        }
    };

    let deletePhoto = async () => {
        fetch(`api/photo/delete/${props.photo.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            props.setCurrentPhoto(null);
            props.refreshPaintings();
        });
    };

    return (
        <Box>
            <Header currentUser={props.photo.user.toString()} />
            <Grid container spacing={0} alignItems="center" sx={HeaderStyling}>
                <Grid item xs={2}>
                    <Tooltip title="back" placement="top">
                        <IconButton onClick={() => props.setCurrentPhoto(null)}>
                            <ArrowBackIosIcon fontSize="medium" />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h5">
                        {props.photo.dalle
                            ? `${props.user?.name}'s painting`
                            : painting?.name}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Tooltip title="delete" placement="top">
                        <IconButton
                            onClick={() => {
                                deletePhoto();
                            }}
                        >
                            <DeleteIcon fontSize="medium" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <img
                style={{ width: "100%", height: "auto" }}
                src={props.photo.dalle ? props.photo.dalle : props.photo.photo}
                alt="screenshot"
            />
            <Box sx={BodyStyling}>
                <Typography>
                    <b>Painter:</b>
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    {props.photo.dalle ? props.user?.name : painting?.painter}
                </Typography>
                <Typography>
                    <b>Description: </b>
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                    {props.photo.dalle
                        ? "This is a painting you made by showing your interest in art!"
                        : painting?.description}
                </Typography>

                <Typography>
                    <b> {props.photo.dalle ? "Prompt:" : "Tags:"}</b>
                </Typography>
                <Typography>
                    {props.photo.prompt ? props.photo.prompt : painting?.tags}
                </Typography>
            </Box>
        </Box>
    );
};

export default PhotoPage;
