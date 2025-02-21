import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Box,
    Typography
} from "@mui/material";
import {
    Menu as MenuIcon, ExpandLess, ExpandMore,
    Article, OndemandVideo, School, LiveTv, Edit, Category, Schedule, CheckCircle, Dashboard
} from "@mui/icons-material";
import Articles from "../Components/ContentType/Articles";
import Videos from "../Components/ContentType/Videos";
import Tutorials from "../Components/ContentType/Tutorials";
import Webinars from "../Components/ContentType/WebinarLive";
import ContentEditor from "../Components/ContentEditor";
import Categorization from "../Components/Categorization";
import Scheduling from "../Components/Scheduling";
import ApprovalWorkflow from "../Components/ApprovalWork";

// Custom styles for the drawer links
const linkStyle = {
    textDecoration: "none",
    color: "inherit",
};

const CustomNavbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [contentTypeOpen, setContentTypeOpen] = useState(false);

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);
    const toggleContentType = () => setContentTypeOpen(!contentTypeOpen);
    const handleMenuItemClick = () => {
        setDrawerOpen(false);
        setContentTypeOpen(false);
    };

    return (
        <Router>
            {/* Top Navigation Bar */}
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

            {/* Sidebar Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <Box sx={{ width: 250 }}>
                    <List>
                        {/* Content Type Section with Expandable Submenu */}
                        <ListItemButton onClick={toggleContentType}>
                            <ListItemIcon>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText primary="Content Type" />
                            {contentTypeOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={contentTypeOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link to="/articles" style={linkStyle} onClick={handleMenuItemClick}>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon><Article /></ListItemIcon>
                                        <ListItemText primary="Articles" />
                                    </ListItemButton>
                                </Link>
                                <Link to="/videos" style={linkStyle} onClick={handleMenuItemClick}>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon><OndemandVideo /></ListItemIcon>
                                        <ListItemText primary="Videos" />
                                    </ListItemButton>
                                </Link>
                                <Link to="/tutorials" style={linkStyle} onClick={handleMenuItemClick}>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon><School /></ListItemIcon>
                                        <ListItemText primary="Tutorials" />
                                    </ListItemButton>
                                </Link>
                                <Link to="/webinars" style={linkStyle} onClick={handleMenuItemClick}>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon><LiveTv /></ListItemIcon>
                                        <ListItemText primary="Webinars & Live Sessions" />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>

                        {/* Other Navigation Links */}
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

            {/* Page Routes */}
            <Routes>
                <Route path="/articles" element={<Articles />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/webinars" element={<Webinars />} />
                <Route path="/content-editor" element={<ContentEditor />} />
                <Route path="/categorization" element={<Categorization />} />
                <Route path="/scheduling" element={<Scheduling />} />
                <Route path="/approval-workflow" element={<ApprovalWorkflow />} />
            </Routes>
        </Router>
    );
};

export default CustomNavbar;
