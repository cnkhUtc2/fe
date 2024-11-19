import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import PrimarySearchAppBar from "./navBar";

const Header = () => {
    return (
        <AppBar position="block">
            <PrimarySearchAppBar />
        </AppBar>
    );
};

export default Header;
