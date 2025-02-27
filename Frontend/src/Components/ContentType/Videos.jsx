import React, { useState } from "react";
import { Card, CardContent, Typography, Grid, Container, IconButton, Box, Button, Stack, Paper, List, ListItem, Divider, Drawer, useMediaQuery } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useTheme } from "@mui/material/styles";
import ShareIcon from "@mui/icons-material/Share";
import InfoIcon from "@mui/icons-material/Info";
import CommentIcon from "@mui/icons-material/Comment";
import MenuIcon from "@mui/icons-material/Menu";

const categories = ["All", "Technology", "Science", "Design", "Business", "Psychology"];

const videos = [
    {
        title: "Exploring the Future of AI",
        description: "A deep dive into how artificial intelligence is shaping our world.",
        thumbnail: "https://qualityhubindia.com/wp-content/uploads/2023/05/Future-of-AI-990x500.png",
        videoUrl: "https://youtu.be/Dr1I99pvdA8",
        category: "Technology"
    },
    {
        title: "The Art of Minimalism in Design",
        description: "Understanding the principles of minimalistic design and its impact.",
        thumbnail: "https://thumbs.dreamstime.com/z/minimalism-design-art-movement-emphasizes-simplicity-functionality-use-minimal-elements-to-convey-message-272055538.jpg",
        videoUrl: "https://youtu.be/4UQ35-o7w_4",
        category: "Design"
    },
    {
        title: "Breaking Down Web3 and Blockchain",
        description: "An introduction to Web3 technologies and their potential.",
        thumbnail: "https://img.youtube.com/vi/ZQFzMfHIxng/0.jpg",
        videoUrl: "https://www.youtube.com/watch?v=ZQFzMfHIxng",
        category: "Technology"
    },
    {
        title: "The Rise of Remote Work",
        description: "How remote work is changing industries and productivity.",
        thumbnail: "https://th.bing.com/th/id/OIP.kmIzotIVNAVvPA6ae-QUuQHaEI?rs=1&pid=ImgDetMain",
        videoUrl: "https://youtu.be/suGutWSX3tY",
        category: "Business"
    },
    {
        title: "Cybersecurity Trends in 2025",
        description: "Latest advancements and threats in cybersecurity.",
        thumbnail: "https://media.geeksforgeeks.org/wp-content/uploads/20240103122054/Cybersecurity-Trends-to-Watch-(1).jpg",
        videoUrl: "https://youtu.be/a-5Uf3TKTEE",
        category: "Technology"
    },
    {
        title: "Advancements in Space Exploration",
        description: "New discoveries and missions in the cosmos.",
        thumbnail: "https://topicpie.com/wp-content/uploads/2023/12/The-Growing-Importance-of-Space-Exploration-and-Innovation.webp",
        videoUrl: "https://youtu.be/I4k8pvqNjBM",
        category: "Science"
    },
    {
        title: "The Future of Electric Vehicles",
        description: "How EVs are revolutionizing transportation.",
        thumbnail: "https://img.freepik.com/free-photo/electric-vehicle-charger-plug-with-digital-display_35913-3359.jpg?t=st=1740139573~exp=1740143173~hmac=62cbea843a17e581341ccacebcabba4d5287ef33c76b9e93fb9269a4c7494dc5&w=1800",
        videoUrl: "https://youtu.be/HgkWQCXEjHg",
        category: "Technology"
    },
    {
        title: "Sustainable Energy Innovations",
        description: "Exploring new ways to harness renewable energy.",
        thumbnail: "https://energysavingtrust.org.uk/wp-content/uploads/2020/08/GettyImages-826669540-green-innovation.jpg",
        videoUrl: "https://www.youtube.com/watch?v=ZQFzMfHIxng",
        category: "Science"
    },
    {
        title: "The Psychology of Social Media",
        description: "How social media affects our mental health.",
        thumbnail: "https://cdn.iplocation.net/assets/images/blog/featured/social-media-psychology.png",
        videoUrl: "https://youtu.be/-QDjx_spkwI",
        category: "Psychology"
    },
    {
        title: "Understanding Quantum Computing",
        description: "A beginner's guide to the world of quantum mechanics and computing.",
        thumbnail: "https://th.bing.com/th/id/OIP.VweJuj7drkYkoR3bnj_v2QHaD3?rs=1&pid=ImgDetMain",
        videoUrl: "https://youtu.be/WhrsONrQhrU",
        category: "Technology"
    }
];

// Function to extract YouTube video ID
const getEmbedUrl = (url) => {
    try {
        let videoId = "";
        if (url.includes("youtube.com")) {
            const urlParams = new URL(url).searchParams;
            videoId = urlParams.get("v");
        } else if (url.includes("youtu.be")) {
            videoId = url.split("youtu.be/")[1]?.split("?")[0];
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
    } catch (error) {
        console.error("Invalid video URL:", url);
        return null;
    }
};

const VideoCard = ({ video, isPlaying, onPlay, small }) => {
    const embedUrl = getEmbedUrl(video.videoUrl);

    return (
        <Card sx={{
            maxWidth: { xs: "100%", sm: 400, md: 500 },
            transition: "0.3s",
            backgroundColor: "#000",
            color: "#fff",
            "&:hover": { transform: "scale(1.03)" },
            display: "flex",
            flexDirection: small ? "row" : "column"
        }}>
            <Box
                sx={{
                    position: "relative",
                    cursor: "pointer",
                    backgroundColor: "#000",
                    width: small ? 120 : "100%",
                    height: small ? 80 : 200
                }}
                onClick={embedUrl ? onPlay : () => window.open(video.videoUrl, "_blank")}
            >
                {isPlaying && embedUrl ? (
                    <iframe
                        width="100%"
                        height={small ? 80 : 200}
                        src={embedUrl}
                        title={video.title}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                ) : (
                    <>
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        {!small && (
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                    color: "#fff"
                                }}
                            >
                                <PlayCircleIcon sx={{ fontSize: 60 }} />
                            </IconButton>
                        )}
                    </>
                )}
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" color="white">
                    {video.title}
                </Typography>
                {!small && (
                    <Typography variant="body2" color="gray">
                        {video.description}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

const VideoList = () => {
    const [playingVideo, setPlayingVideo] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [openDrawer, setOpenDrawer] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const filteredVideos = selectedCategory === "All" ? videos : videos.filter(video => video.category === selectedCategory);

    const handlePlayVideo = (videoUrl) => {
        setPlayingVideo(playingVideo === videoUrl ? null : videoUrl);
    };

    return (
        <Container maxWidth={false} sx={{ width: "100%", py: 5, backgroundColor: "black", color: "white", minHeight: "100vh" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" gutterBottom textAlign="center" color="white">
                    Latest Videos
                </Typography>
                {isMobile && (
                    <IconButton color="primary" onClick={() => setOpenDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                )}
            </Stack>

            <Divider sx={{ backgroundColor: "#ddd", height: 4, my: 2 }} />

            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3, flexWrap: "wrap" }}>
                {categories.map(category => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => setSelectedCategory(category)}
                        sx={{ fontSize: { xs: "12px", sm: "14px" }, px: 2, py: 1 }}
                    >
                        {category}
                    </Button>
                ))}
            </Stack>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        {filteredVideos.map((video, index) => (
                            <Grid item key={index} xs={12} sm={6}>
                                <VideoCard
                                    video={video}
                                    isPlaying={playingVideo === video.videoUrl}
                                    onPlay={() => handlePlayVideo(video.videoUrl)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {!isMobile && (
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, backgroundColor: "#121212", color: "white" }}>
                            <Typography variant="h6" gutterBottom>
                                Trending Tags
                            </Typography>
                            <Stack direction="row" gap={1} sx={{ overflowX: "auto", pb: 1 }}>
                                {categories.slice(1).map(tag => (
                                    <Button key={tag} variant="outlined" color="secondary" onClick={() => setSelectedCategory(tag)}>
                                        #{tag}
                                    </Button>
                                ))}
                            </Stack>

                            <Divider sx={{ backgroundColor: "#444", my: 2 }} />

                            <Typography variant="h6" gutterBottom>
                                Featured Videos
                            </Typography>
                            <List
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1, // Adds spacing between items
                                    width: "100%",
                                    backgroundColor: "#121212",
                                    padding: 1,
                                    borderRadius: 2
                                }}
                            >
                                {videos.slice(0, 9).map((video, index) => (
                                    <ListItem
                                        key={index}
                                        disablePadding
                                        sx={{
                                            display: "flex",
                                            width: "100%",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}
                                    >
                                        <VideoCard
                                            video={video}
                                            small
                                            isPlaying={playingVideo === video.videoUrl}
                                            onPlay={() => setPlayingVideo(video.videoUrl)}
                                        />

                                        {/* Three Dots (Icons) for Sharing, Description, and Comments */}
                                        <Stack direction="row" spacing={1}>
                                            <IconButton color="primary" onClick={() => alert(`Sharing ${video.title}`)}>
                                                <ShareIcon />
                                            </IconButton>
                                            <IconButton color="secondary" onClick={() => alert(`Description: ${video.description}`)}>
                                                <InfoIcon />
                                            </IconButton>
                                            <IconButton color="success" onClick={() => alert(`Comments for ${video.title}`)}>
                                                <CommentIcon />
                                            </IconButton>
                                        </Stack>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                )}
            </Grid>

            <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Paper sx={{ width: 250, height: "100%", backgroundColor: "#121212", p: 2 }}>
                    <Typography variant="h6">Trending Tags</Typography>
                    <Stack direction="row" gap={1} sx={{ overflowX: "auto", pb: 1 }}>
                        {categories.slice(1).map(tag => (
                            <Button key={tag} variant="outlined" color="secondary" onClick={() => setSelectedCategory(tag)}>
                                #{tag}
                            </Button>
                        ))}
                    </Stack>

                    <Divider sx={{ backgroundColor: "#444", my: 2 }} />

                    <Typography variant="h6" gutterBottom>
                        Featured Videos
                    </Typography>
                    <List
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1, // Adds spacing between items
                            width: "100%",
                            backgroundColor: "#121212",
                            padding: 1,
                            borderRadius: 2
                        }}
                    >
                        {videos.slice(0, 9).map((video, index) => (
                            <ListItem
                                key={index}
                                disablePadding
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <VideoCard
                                    video={video}
                                    small
                                    isPlaying={playingVideo === video.videoUrl}
                                    onPlay={() => setPlayingVideo(video.videoUrl)}
                                />

                                {/* Three Dots (Icons) for Sharing, Description, and Comments */}
                                <Stack direction="row" spacing={1}>
                                    <IconButton color="primary" onClick={() => alert(`Sharing ${video.title}`)}>
                                        <ShareIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => alert(`Description: ${video.description}`)}>
                                        <InfoIcon />
                                    </IconButton>
                                    <IconButton color="success" onClick={() => alert(`Comments for ${video.title}`)}>
                                        <CommentIcon />
                                    </IconButton>
                                </Stack>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Drawer>
        </Container>
    );
};

export default VideoList;