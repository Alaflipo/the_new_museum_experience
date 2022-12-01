import { ImageList, ImageListItem, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PhotoData, UserData } from "../DataTypes";

const DalleGallery = () => {
    const [userArt, setUserArt] = useState<Array<PhotoData> | null>(null);
    const [users, setUsers] = useState<Array<UserData> | null>(null);

    useEffect(() => {
        getDalleImages();
        getUsers();
    }, []);

    const getDalleImages = async () => {
        const request = await fetch(`api/dalle/all`);
        let data: Array<PhotoData> = await request.json();
        setUserArt(data);
    };

    const getUsers = async () => {
        const request = await fetch(`api/user/all`);
        let data: Array<UserData> = await request.json();
        setUsers(data);
    };

    const getUser = (id: number) => {
        let user = users?.find((user) => user.id == id);
        return user ? user.name : "Unknown";
    };

    let size = 10;

    return (
        <ImageList
            sx={{
                gridAutoFlow: "column",
                gridTemplateColumns:
                    "repeat(auto-fill,minmax(95vh,1fr)) !important",
                gridAutoColumns: "minmax(95vh, 1fr)",
                margin: 0,
            }}
        >
            {userArt ? (
                userArt.map((art) => {
                    return (
                        <ImageListItem sx={{ margin: 1 }}>
                            <img
                                style={{
                                    width: "auto",
                                    border: "10px solid #3e3d45",
                                }}
                                src={art.dalle}
                                alt="Not available"
                            />
                            <Typography variant="h5">
                                Created by: {getUser(art.user)}
                            </Typography>
                        </ImageListItem>
                    );
                })
            ) : (
                <p>No art</p>
            )}
        </ImageList>
    );
};

export default DalleGallery;
