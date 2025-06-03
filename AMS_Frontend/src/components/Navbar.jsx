import React, { useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/services/auth";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    const renderMenuItems = () => {
        const role = user?.role;
        const items = [];

        if (!role) {
            items.push(
                <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
            );
            items.push(
                <MenuItem onClick={() => navigate("/register")}>
                    Register
                </MenuItem>
            );
        }

        if (role === "admin") {
            items.push(
                <MenuItem onClick={() => navigate("/admin/dashboard")}>
                    Dashboard
                </MenuItem>
            );
            items.push(
                <MenuItem onClick={() => navigate("/admin/create-doctor")}>
                    Create Doctor
                </MenuItem>
            );
            items.push(
                <MenuItem onClick={() => navigate("/appointments/view")}>
                    All Appointments
                </MenuItem>
            );
        }

        if (role === "patient") {
            items.push(
                <MenuItem onClick={() => navigate("/appointments/view")}>
                    My Appointments
                </MenuItem>
            );
        }

        if (role === "doctor") {
            items.push(
                <MenuItem onClick={() => navigate("/appointments/view")}>
                    My Appointments
                </MenuItem>
            );
        }

        if (role) {
            
            items.push(<MenuItem onClick={handleLogout}>Logout</MenuItem>);
        }

        return items;
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                >
                    MediCare App
                </Typography>

                {/* Desktop Buttons */}
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                    {renderMenuItems().map((item, index) => (
                        <Box key={index}>{item}</Box>
                    ))}
                </Box>

                {/* Mobile Menu */}
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                    <IconButton color="inherit" onClick={handleMenuOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {renderMenuItems().map((item, index) => (
                            <Box key={index} onClick={handleMenuClose}>
                                {item}
                            </Box>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
