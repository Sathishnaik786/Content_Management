import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
    AppBar, Toolbar, IconButton, Box, Typography, InputBase,createTheme, ThemeProvider,CssBaseline
} from "@mui/material";
import {
    Menu as MenuIcon, Search, Article, OndemandVideo, School, LiveTv,
    Edit, Category, Schedule, CheckCircle, Dashboard, Book,Analytics,Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon
} from "@mui/icons-material";
import Articles from "./ContentType/Articles";
import Videos from "./ContentType/Videos";
import Tutorials from "./ContentType/Tutorials";
import Webinars from "./ContentType/WebinarLive";
import ContentEditor from "./ContentEditor";
import Categorization from "./Categorization";
import Scheduling from "./Scheduling";
import ApprovalWorkflow from "./ApprovalWork";
import ReferencePage from "./ReferencePage";
import AffiliateSponsoredManagement from "./AffiliateSponsoredManagement";

const CustomNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
      });
    
      // Toggle theme and save preference
      const handleThemeChange = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", newMode);
      };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

    return (
        <Router>
            <AppBar position="fixed" sx={{ backgroundColor: "#0f0f0f", zIndex: 1100 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    {/* Left Side: Menu Icon and Title */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton edge="start" color="inherit" onClick={() => setMenuOpen(!menuOpen)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" sx={{ ml: 2 }}>
                            Content Management Portal
                        </Typography>
                    </Box>

                    {/* Right Side: Search Bar and Reference Icon */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {/* Search Button and Input */}
                        <Box sx={{ display: "flex", alignItems: "center", position: "relative" }}>
                            <IconButton color="inherit" onClick={() => setSearchOpen(!searchOpen)}>
                                <Search />
                            </IconButton>
                            <InputBase
                                placeholder="Search..."
                                sx={{
                                    width: searchOpen ? "200px" : "0px",
                                    opacity: searchOpen ? 1 : 0,
                                    transition: "width 0.3s ease, opacity 0.3s ease",
                                    padding: searchOpen ? "5px 10px" : "0px",
                                    backgroundColor: "#1c1c1c",
                                    borderRadius: "20px",
                                    position: "absolute",
                                    right: "0px",
                                    color: "white",
                                    border: "1px solid white",
                                    "& input": { color: "white" },
                                    "&::placeholder": { color: "rgba(255, 255, 255, 0.7)" }
                                }}
                            />
                        </Box>

                        {/* Reference Icon */}
                        <IconButton color="inherit" component={Link} to="/reference" sx={{ ml: 2 }}>
                            <Book sx={{ fontSize: 28 }} />
                        </IconButton>
                        <ThemeProvider theme={theme}>
             <CssBaseline />
            <IconButton onClick={handleThemeChange} color="inherit"   sx={{ ml: "auto", color: "white" }}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            </ThemeProvider>
                    </Box>
                   
                </Toolbar>
            </AppBar>

            {/* Sidebar Menu */}
            <Box
                sx={{
                    position: "fixed",
                    top: "64px",
                    left: menuOpen ? "0" : "-250px",
                    width: "250px",
                    height: "calc(100vh - 64px)",
                    backgroundColor: "#0f0f0f",
                    color: "white",
                    boxShadow: "2px 0px 10px rgba(0,0,0,0.3)",
                    zIndex: 1000,
                    padding: "10px 0",
                    transition: "left 0.3s ease-in-out",
                }}
                
            >
                
                
                <Box sx={menuItemStyle}>
                    <Dashboard /> Content
                </Box>
                <Box sx={contentBoxStyle}>
                    <Link to="/articles" style={contentItemStyle}>
                        <Article sx={{ fontSize: 24 }} />
                        <Typography className="hidden-text">Articles</Typography>
                    </Link>
                    <Link to="/videos" style={contentItemStyle}>
                        <OndemandVideo sx={{ fontSize: 24 }} />
                        <Typography className="hidden-text">Videos</Typography>
                    </Link>
                    <Link to="/tutorials" style={contentItemStyle}>
                        <School sx={{ fontSize: 24 }} />
                        <Typography className="hidden-text">Tutorials</Typography>
                    </Link>
                    <Link to="/webinars" style={contentItemStyle}>
                        <LiveTv sx={{ fontSize: 24 }} />
                        <Typography className="hidden-text">Webinars</Typography>
                    </Link>
                </Box>
                <Box component={Link} to="/content-editor" sx={menuItemStyle}><Edit /> Content Editor</Box>
                <Box component={Link} to="/categorization" sx={menuItemStyle}><Category /> Categorization & Tagging</Box>
                <Box component={Link} to="/scheduling" sx={menuItemStyle}><Schedule /> Scheduling</Box>
                <Box component={Link} to="/approval-workflow" sx={menuItemStyle}><CheckCircle /> Approval Workflow</Box>
                <Box component={Link} to="/affiliate" sx={menuItemStyle}><Analytics /> Analytics</Box>
                
            </Box>

            {/* Page Content */}
            <Box
                sx={{
                    marginTop: "64px",
                    marginLeft: menuOpen ? "250px" : "0px",
                    width: menuOpen ? "calc(100% - 250px)" : "100%",
                    transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
                    padding: "20px",
                }}
            >
                <Routes>
                    <Route path="/articles" element={<Articles />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/tutorials" element={<Tutorials />} />
                    <Route path="/webinars" element={<Webinars />} />
                    <Route path="/content-editor" element={<ContentEditor />} />
                    <Route path="/categorization" element={<Categorization />} />
                    <Route path="/scheduling" element={<Scheduling />} />
                    <Route path="/approval-workflow" element={<ApprovalWorkflow />} />
                    <Route path="/reference" element={<ReferencePage />} />
                    <Route path="/affiliate" element={<AffiliateSponsoredManagement />} />
                </Routes>
            </Box>
        </Router>
    );
};

const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 20px",
    textDecoration: "none",
    color: "#f1f1f1",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": { backgroundColor: "#0f0f0f" }
};

const contentBoxStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
    padding: "15px",
    textAlign: "center",
    backgroundColor: "#0f0f0f",
    borderRadius: "10px",
    margin: "10px",
};

const contentItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize:"16px",
    textDecoration: "none",
    color: "white",
    padding: "10px",
    transition: "transform 0.2s",
    "&:hover": { transform: "scale(1.05)" },
    "& .hidden-text": { fontSize: "12px", opacity: 0, transition: "opacity 0.3s" },
    "&:hover .hidden-text": { opacity: 1 },
};

export default CustomNavbar;