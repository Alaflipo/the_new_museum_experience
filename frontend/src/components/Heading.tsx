import React from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../DataTypes";
import HomeIcon from "@mui/icons-material/Home";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const HeaderStyling: SxProps = {
    minHeight: "10vh",
    display: "flex",
    backgroundColor: "primary.main",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
};

interface HeaderProps {
    currentUser: string;
}

const Header = (props: HeaderProps) => {
    return (
        <header>
            <Grid container spacing={0} alignItems="center" sx={HeaderStyling}>
                <Grid item xs={2}>
                    <Tooltip title="home" placement="bottom">
                        <IconButton
                            color="warning"
                            component={Link}
                            to={`/museumtour/${props.currentUser}`}
                        >
                            <CameraAltIcon fontSize="medium" />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h4">Stedelijk museum</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Tooltip title="gallery" placement="bottom">
                        <IconButton
                            color="warning"
                            component={Link}
                            to={`/gallery/${props.currentUser}`}
                        >
                            <WallpaperIcon fontSize="medium" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </header>
    );
};

export default Header;
