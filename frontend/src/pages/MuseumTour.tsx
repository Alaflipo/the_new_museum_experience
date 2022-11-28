import {
    AppBar,
    Box,
    Button,
    IconButton,
    Stack,
    SxProps,
    Toolbar,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Webcam from "react-webcam";
import { UserData } from "../DataTypes";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import CircleIcon from "@mui/icons-material/Circle";
import Header from "../components/Heading";

const videoConstraints = {
    facingMode: "envrionment",
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

    return (
        <Stack>
            <Header currentUser={userId ? userId : "0"} />
            <Webcam
                style={{ width: "100%", height: "auto", margin: "0" }}
                videoConstraints={videoConstraints}
                ref={webcamRef}
                mirrored={false}
                screenshotFormat={"image/jpeg"}
            />
            <AppBar
                position="fixed"
                color="primary"
                sx={{ top: "auto", bottom: 0, height: 100 }}
            >
                <Toolbar>
                    <IconButton
                        color="warning"
                        onClick={capture}
                        sx={{
                            margin: "20px auto",
                        }}
                    >
                        <CircleIcon
                            fontSize="large"
                            sx={{ transform: "scale(2)" }}
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Stack>
    );
};

export default MuseumTour;
