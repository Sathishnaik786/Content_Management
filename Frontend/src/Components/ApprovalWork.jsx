import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Grid,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

// Styled component for file inputs
const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const ContentManager = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [scheduling, setScheduling] = useState("no");

    const [content, setContent] = useState({
        title: "",
        description: "",
        image: null,
        videoFile: null,
        startTime: "",
        endTime: "",
        hashtags: "",
    });

    const handleTabChange = (tab) => {
        setActiveTab(activeTab === tab ? null : tab); // Toggle form visibility
        setScheduling("no"); // Reset scheduling option on tab change
        setContent({ title: "", description: "", image: null, videoFile: null, startTime: "", endTime: "", hashtags: "" });
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setContent((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3, backgroundColor: "#f9f9f9" }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
                    Content Manager
                </Typography>

                {/* Tab Selection */}
                <Box sx={{ mb: 3, display: "flex", justifyContent: "center", gap: 2 }}>
                    {["articles", "videos", "webinar", "tutorial"].map((tab) => (
                        <Button
                            key={tab}
                            variant={activeTab === tab ? "contained" : "outlined"}
                            onClick={() => handleTabChange(tab)}
                            sx={{
                                textTransform: "capitalize",
                                fontSize: "16px",
                                fontWeight: "bold",
                                borderRadius: 2,
                                px: 3,
                                transition: "0.3s",
                                ...(activeTab === tab
                                    ? { backgroundColor: "#1976d2", color: "#fff" }
                                    : { borderColor: "#1976d2", color: "#1976d2" }),
                                "&:hover": {
                                    backgroundColor: activeTab === tab ? "#1565c0" : "#1976d2",
                                    color: "#fff",
                                },
                            }}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </Button>
                    ))}
                </Box>

                {activeTab && (
                    <Grid container spacing={4}>
                        {/* Left Side: Form */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
                                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
                                    {activeTab === "articles"
                                        ? "Create New Article"
                                        : activeTab === "videos"
                                            ? "Upload New Video"
                                            : activeTab === "webinar"
                                                ? "Schedule New Webinar"
                                                : "Schedule Live Tutorial"}
                                </Typography>

                                <TextField fullWidth label="Title" name="title" value={content.title} onChange={handleInputChange} margin="normal" variant="outlined" sx={{ mb: 2 }} />
                                <TextField fullWidth label="Description" name="description" value={content.description} onChange={handleInputChange} margin="normal" variant="outlined" multiline rows={4} sx={{ mb: 2 }} />
                                <TextField fullWidth label="Enter Hashtags (comma-separated)" name="hashtags" value={content.hashtags} onChange={handleInputChange} margin="normal" variant="outlined" sx={{ mb: 2 }} />

                                {/* Scheduling */}
                                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                                    Schedule Content?
                                </Typography>
                                <ToggleButtonGroup color="primary" value={scheduling} exclusive onChange={(e, newValue) => setScheduling(newValue || "no")} sx={{ mb: 2 }}>
                                    <ToggleButton value="yes">Yes</ToggleButton>
                                    <ToggleButton value="no">No</ToggleButton>
                                </ToggleButtonGroup>

                                {scheduling === "yes" && (
                                    <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Start Time" name="startTime" type="datetime-local" value={content.startTime} onChange={handleInputChange} InputLabelProps={{ shrink: true }} variant="outlined" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="End Time" name="endTime" type="datetime-local" value={content.endTime} onChange={handleInputChange} InputLabelProps={{ shrink: true }} variant="outlined" />
                                        </Grid>
                                    </Grid>
                                )}

                                {/* File Upload */}
                                {activeTab === "articles" && (
                                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mt: 2, mb: 2, borderRadius: 2, backgroundColor: "#4caf50", "&:hover": { backgroundColor: "#388e3c" } }}>
                                        Upload Cover Image
                                        <VisuallyHiddenInput type="file" name="image" accept="image/*" onChange={handleInputChange} />
                                    </Button>
                                )}
                                {(activeTab === "videos" || activeTab === "tutorial") && (
                                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mt: 2, mb: 2, borderRadius: 2, backgroundColor: "#f57c00", "&:hover": { backgroundColor: "#e65100" } }}>
                                        Upload Video File
                                        <VisuallyHiddenInput type="file" name="videoFile" accept="video/*" onChange={handleInputChange} />
                                    </Button>
                                )}
                            </Paper>
                        </Grid>

                        {/* Right Side: Preview */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2, backgroundColor: "#e3f2fd" }}>
                                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>Live Preview</Typography>
                                <Typography variant="h6">{content.title || "Title will appear here"}</Typography>
                                <Typography variant="body1">{content.description || "Description will appear here"}</Typography>
                                <Typography variant="body2" sx={{ color: "#1565c0", mt: 1 }}>{content.hashtags || "Hashtags will appear here"}</Typography>
                                {content.image && <img src={URL.createObjectURL(content.image)} alt="Uploaded" width="100%" style={{ borderRadius: "10px", marginTop: "10px" }} />}
                                {content.videoFile && <video controls width="100%" src={URL.createObjectURL(content.videoFile)} style={{ borderRadius: "10px", marginTop: "10px" }} />}
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </Paper>
        </Container>
    );
};

export default ContentManager;
