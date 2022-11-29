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
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../DataTypes";
import HomeIcon from "@mui/icons-material/Home";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import InfoIcon from "@mui/icons-material/Info";
import { Info } from "@mui/icons-material";

const HeaderStyling: SxProps = {
    height: "15vh",
    display: "flex",
    backgroundColor: "primary.main",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
};

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
}

function HelpDialog(props: SimpleDialogProps) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Information</DialogTitle>
            <DialogContent>
                <Typography>
                    Troughout your museum tour you can make photo's of the
                    paintings you like using the camera tool. These will show up
                    in your Gallery. When you have collected enough paintings
                    you like, you can click on the big paintbrush button and our
                    AI algorithm will create an original painting based on your
                    artistic iterests. You will end up with an original painting
                    YOU made. Have fun :)
                </Typography>
            </DialogContent>
        </Dialog>
    );
}

interface HeaderProps {
    currentUser: string;
}

const Header = (props: HeaderProps) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <header>
            <Stack direction={"row"} sx={HeaderStyling}>
                <Typography variant="h4">Your Gallery</Typography>
                <IconButton color="warning" onClick={handleClickOpen}>
                    <Info fontSize="medium" />
                </IconButton>
            </Stack>
            <HelpDialog open={open} onClose={handleClose} />
        </header>
    );
};

export default Header;
