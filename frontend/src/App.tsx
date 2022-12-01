import React from "react";
import "./App.css";

import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomeScreen from "./pages/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import MuseumTour from "./pages/MuseumTour";
import PhotoGallery from "./pages/PhotoGalery";
import DalleGallery from "./pages/DalleGallery";

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#023047",
            },
            secondary: {
                main: "#023047",
            },
            warning: {
                main: "#ffffff",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomeScreen />}></Route>
                        <Route path="/museumtour">
                            <Route index element={<MuseumTour />} />
                            <Route path={":userId"} element={<MuseumTour />} />
                        </Route>
                        <Route path="/gallery">
                            <Route index element={<PhotoGallery />} />
                            <Route
                                path={":userId"}
                                element={<PhotoGallery />}
                            />
                            <Route
                                path={":userId/photo/:photoId"}
                                element={<PhotoGallery />}
                            />
                        </Route>
                        <Route path="/dallegallery">
                            <Route index element={<DalleGallery />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
