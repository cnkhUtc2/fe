import React from "react";
import AppBar from "@mui/material/AppBar";
import PrimarySearchAppBar from "./navBar";

const Header = () => {
    return (
        <AppBar >
            <PrimarySearchAppBar />
        </AppBar>
    );
};

export default Header;
