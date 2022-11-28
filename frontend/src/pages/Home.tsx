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
        minHeight: "10vh",
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
                        <Grid item xs={2}>
                            <Tooltip title="home" placement="bottom">
                                <IconButton
                                    color="warning"
                                    component={Link}
                                    to="/"
                                >
                                    <HomeIcon fontSize="medium" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h4">
                                Stedelijk museum
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Tooltip title="gallery" placement="bottom">
                                <IconButton
                                    color="warning"
                                    component={Link}
                                    to="/"
                                >
                                    <WallpaperIcon fontSize="medium" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </header>
                <Typography variant="h2" sx={{ height: "20px" }}></Typography>
                <Typography variant="h2">Welcome!</Typography>
                <Typography variant="body1" sx={TextStyle}>
                    Add some information about the webapp here.
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
                    Start session
                </Button>
            </Stack>
        </div>
    );
};

export default HomeScreen;
