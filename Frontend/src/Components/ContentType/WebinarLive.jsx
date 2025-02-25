import React, { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Container,
    IconButton,
    Box
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const webinars = [
    {
        title: "Live Webinar: Mastering React in 2025",
        description: "Join us for a deep dive into React's latest features and best practices.",
        thumbnail: "https://th.bing.com/th/id/OIP.jdCUb69papqX-tIIur9gfQHaDa?rs=1&pid=ImgDetMain",
        tutorialUrl: "https://www.youtube.com/embed/Ke90Tje7VS0"
    },
    {
        title: "Live Discussion: The Future of JavaScript",
        description: "Industry experts discuss upcoming trends and innovations in JavaScript.",
        thumbnail: "https://i.morioh.com/2020/03/21/4c2be688efe4.jpg",
        tutorialUrl: "https://www.youtube.com/embed/VlPiVmYuoqw"
    },
    {
        title: "MERN Stack Live Workshop",
        description: "Build a full-stack application with MERN in a hands-on session.",
        thumbnail: "https://miro.medium.com/v2/resize:fit:1200/1*Ik9bSDA6n96jyoTI4jpc_Q.png",
        tutorialUrl: "https://www.youtube.com/embed/7CqJlxBYj-M"
    },
    {
        title: "Redux in Action: State Management Strategies",
        description: "Learn how to effectively manage state in complex applications.",
        thumbnail: "https://th.bing.com/th/id/OIP.7-muN-5voQ3MesyN1vu7GQHaDH?rs=1&pid=ImgDetMain",
        tutorialUrl: "https://www.youtube.com/embed/93p3LxR9xfM"
    },
    {
        title: "Live CSS Workshop: Responsive Design",
        description: "Hands-on session covering CSS Grid, Flexbox, and modern design techniques.",
        thumbnail: "https://i.ytimg.com/vi/p0bGHP-PXD4/maxresdefault.jpg",
        tutorialUrl: "https://www.youtube.com/embed/ieTHC78giGQ"
    },
    {
        title: "Node.js & Express: Building Scalable APIs",
        description: "Live API development session with Q&A and real-time coding.",
        thumbnail: "https://qualitapps.com/wp-content/uploads/2023/02/102.png",
        tutorialUrl: "https://www.youtube.com/embed/Oe421EPjeBE"
    }
];

const WebinarCard = ({ webinar, isPlaying, onPlay }) => {
    return (
        <Card sx={{ maxWidth: 400, transition: "0.3s", '&:hover': { transform: "scale(1.02)" } }}>
            <Box
                sx={{ position: "relative", cursor: "pointer", height: "200px" }}
                onClick={() => onPlay(webinar.tutorialUrl)}
            >
                {isPlaying ? (
                    <iframe
                        width="100%"
                        height="200px"
                        src={`${webinar.tutorialUrl}?autoplay=1`}
                        title={webinar.title}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                ) : (
                    <>
                        <img src={webinar.thumbnail} alt={webinar.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
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
                    </>
                )}
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {webinar.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {webinar.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

const WebinarLive = () => {
    const [playingVideo, setPlayingVideo] = useState(null);

    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Live Webinars
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {webinars.map((webinar, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <WebinarCard
                            webinar={webinar}
                            isPlaying={playingVideo === webinar.tutorialUrl}
                            onPlay={setPlayingVideo}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default WebinarLive;