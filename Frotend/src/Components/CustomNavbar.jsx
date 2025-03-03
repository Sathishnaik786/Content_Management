import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Typography
} from "@mui/material";
import {
    Menu as MenuIcon, Edit, Category, Schedule, CheckCircle, Dashboard
} from "@mui/icons-material";
import Categorization from "../Components/Categorization";
import Scheduling from "../Components/Scheduling";
import ApprovalWorkflow from "../Components/ApprovalWork";
import DashBoard from "../Components/ContentEditorDashBoard/DashBoard";

const linkStyle = {
    textDecoration: "none",
    color: "inherit",
};

const CustomNavbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    const toggleDrawer = () => setDrawerOpen(!drawerOpen);
    const handleMenuItemClick = () => setDrawerOpen(false);

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ ml: 2 }}>
                        Content Management Portal
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <Box sx={{ width: 250 }}>
                    <List>
                        <Link to="/dashboard" style={linkStyle} onClick={handleMenuItemClick}>
                            <ListItemButton>
                                <ListItemIcon><Dashboard /></ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>
                        </Link>
                        <Link to="/content-editor" style={linkStyle} onClick={handleMenuItemClick}>
                            <ListItemButton>
                                <ListItemIcon><Edit /></ListItemIcon>
                                <ListItemText primary="Content Editor" />
                            </ListItemButton>
                        </Link>
                        <Link to="/categorization" style={linkStyle} onClick={handleMenuItemClick}>
                            <ListItemButton>
                                <ListItemIcon><Category /></ListItemIcon>
                                <ListItemText primary="Categorization & Tagging" />
                            </ListItemButton>
                        </Link>
                        <Link to="/scheduling" style={linkStyle} onClick={handleMenuItemClick}>
                            <ListItemButton>
                                <ListItemIcon><Schedule /></ListItemIcon>
                                <ListItemText primary="Scheduling" />
                            </ListItemButton>
                        </Link>
                        <Link to="/approval-workflow" style={linkStyle} onClick={handleMenuItemClick}>
                            <ListItemButton>
                                <ListItemIcon><CheckCircle /></ListItemIcon>
                                <ListItemText primary="Approval Workflow" />
                            </ListItemButton>
                        </Link>
                    </List>
                </Box>
            </Drawer>

            <Routes>
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/content-editor" element={<DashBoard />} />
                <Route path="/categorization" element={<Categorization />} />
                <Route path="/scheduling" element={<Scheduling />} />
                <Route path="/approval-workflow" element={<ApprovalWorkflow />} />
            </Routes>
        </Router>
    );
};

export default CustomNavbar;