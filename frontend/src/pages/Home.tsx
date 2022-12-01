import {
    Button,
    Grid,
    IconButton,
    Stack,
    SxProps,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../DataTypes";
import HomeIcon from "@mui/icons-material/Home";
import WallpaperIcon from "@mui/icons-material/Wallpaper";

const TextStyle: SxProps = {
    marginRight: "30px",
    marginLeft: "30px",
    margin: "10px auto",
    maxWidth: "300px",
};

const HomeScreen = () => {
    const [name, setName] = useState("");
    let navigate = useNavigate();

    const createUser = async () => {
        const newUser = {
            name: name,
        };

        let request = await fetch(`api/user/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        let data: UserData = await request.json();
        console.log(data);
        navigate(`/museumtour/${data.id}`);
    };

    const HeaderStyling: SxProps = {
        minHeight: "15vh",
        display: "flex",
        backgroundColor: "primary.main",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div>
            <Stack>
                <header>
                    <Grid
                        container
                        spacing={0}
                        alignItems="center"
                        sx={HeaderStyling}
                    >
                        <Grid item xs={12}>
                            <Typography variant="h4">MUS-E</Typography>
                        </Grid>
                    </Grid>
                </header>
                <Typography variant="h2" sx={{ height: "20px" }}></Typography>
                <Typography variant="h2">Welcome!</Typography>
                <Typography variant="body1" sx={TextStyle}>
                    You are about to enter our museum! During the museum tour
                    you can use this App to create your own art based on your
                    artistic interests. Fill in your name below and start your
                    journey!
                </Typography>
                <TextField
                    label="Name"
                    placeholder={"Fill in your name..."}
                    variant="outlined"
                    sx={{ width: "300px", margin: "10px auto" }}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <Button
                    variant="contained"
                    sx={{ width: "300px", margin: "10px auto" }}
                    onClick={createUser}
                >
                    Start journey
                </Button>
            </Stack>
        </div>
    );
};

export default HomeScreen;
