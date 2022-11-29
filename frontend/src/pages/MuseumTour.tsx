import {
    AppBar,
    Box,
    Button,
    Grid,
    IconButton,
    Stack,
    SxProps,
    Toolbar,
    Tooltip,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import { UserData } from "../DataTypes";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import CircleIcon from "@mui/icons-material/Circle";
import Header from "../components/Heading";
import { Animated, Text, View } from "react-native";
import { ReactSketchCanvas } from "react-sketch-canvas";

const videoConstraints = {
    facingMode: "environment",
};

const NavigationBarStyle: SxProps = {
    backgroundColor: "secondary.main",
    height: "60vh",
    margin: 0,
};

const MuseumTour = () => {
    const { userId } = useParams(); // to get params out
    const [user, setUser] = useState<UserData | null>(null);
    const webcamRef = useRef(null);
    let fadeAnimation = new Animated.Value(1);

    useEffect(() => {
        fetchUser();
    }, [userId]);

    const fetchUser = async () => {
        const request = await fetch(`api/user/${userId}`);
        let data: UserData = await request.json();
        setUser(data);
    };

    const postPicture = async (imageSrc: string) => {
        const photo = {
            user: userId,
            photo: imageSrc,
            date: "",
        };

        await fetch(`api/photo/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(photo),
        });
    };

    const capture = useCallback(() => {
        const current: any = webcamRef.current;
        if (current) {
            const imageSrc = current.getScreenshot();
            postPicture(imageSrc);
        }
    }, [webcamRef]);

    const takeSnap = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnimation, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnimation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
            {
                iterations: 1,
            }
        ).start();
    };

    const styles = {
        border: "0.0625rem solid #9c9c9c",
        borderRadius: "0.25rem",
        backgroundColor: "#00FFFFFF",
    };

    return (
        <Stack>
            <View>
                <Animated.View style={{ opacity: fadeAnimation }}>
                    <Webcam
                        style={{ width: "100%", height: "auto", margin: "0" }}
                        videoConstraints={{ facingMode: "user" }}
                        ref={webcamRef}
                        mirrored={false}
                        screenshotFormat={"image/jpeg"}
                    />
                </Animated.View>
            </View>
            <AppBar
                position="fixed"
                color="primary"
                sx={{ top: "auto", bottom: 0, height: "15vh" }}
            >
                <Toolbar>
                    <Grid container spacing={0} alignItems="center">
                        <Grid item xs={3}>
                            <Tooltip title="gallery" placement="bottom">
                                <IconButton
                                    color="warning"
                                    component={Link}
                                    to={`/gallery/${userId}`}
                                >
                                    <WallpaperIcon fontSize="large" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton
                                color="warning"
                                onClick={() => {
                                    capture();
                                    takeSnap();
                                }}
                                sx={{
                                    margin: "50px auto",
                                    border: "2px solid white",
                                    background: "primary",
                                }}
                            >
                                <CircleIcon
                                    fontSize="large"
                                    sx={{ transform: "scale(1.5)" }}
                                />
                            </IconButton>
                        </Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Stack>
    );
};

export default MuseumTour;
