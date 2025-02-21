import React from "react";
import { Card, CardMedia, CardContent, Typography, Grid, Container } from "@mui/material";

const videos = [
    {
        title: "Exploring the Future of AI",
        description: "A deep dive into how artificial intelligence is shaping our world.",
        thumbnail: "https://qualityhubindia.com/wp-content/uploads/2023/05/Future-of-AI-990x500.png",
        videoUrl: "https://youtu.be/Dr1I99pvdA8"
    },
    {
        title: "The Art of Minimalism in Design",
        description: "Understanding the principles of minimalistic design and its impact.",
        thumbnail: "https://thumbs.dreamstime.com/z/minimalism-design-art-movement-emphasizes-simplicity-functionality-use-minimal-elements-to-convey-message-272055538.jpg",
        videoUrl: "https://youtu.be/4UQ35-o7w_4"
    },
    {
        title: "Breaking Down Web3 and Blockchain",
        description: "An introduction to Web3 technologies and their potential.",
        thumbnail: "https://img.youtube.com/vi/ZQFzMfHIxng/0.jpg",
        videoUrl: "https://www.youtube.com/watch?v=ZQFzMfHIxng"
    },
    {
        title: "The Rise of Remote Work",
        description: "How remote work is changing industries and productivity.",
        thumbnail: "https://th.bing.com/th/id/OIP.kmIzotIVNAVvPA6ae-QUuQHaEI?rs=1&pid=ImgDetMain",
        videoUrl: "https://youtu.be/suGutWSX3tY"
    },
    {
        title: "Cybersecurity Trends in 2025",
        description: "Latest advancements and threats in cybersecurity.",
        thumbnail: "https://media.geeksforgeeks.org/wp-content/uploads/20240103122054/Cybersecurity-Trends-to-Watch-(1).jpg",
        videoUrl: "https://youtu.be/a-5Uf3TKTEE"
    },
    {
        title: "Advancements in Space Exploration",
        description: "New discoveries and missions in the cosmos.",
        thumbnail: "https://topicpie.com/wp-content/uploads/2023/12/The-Growing-Importance-of-Space-Exploration-and-Innovation.webp",
        videoUrl: "https://youtu.be/I4k8pvqNjBM"
    },
    {
        title: "The Future of Electric Vehicles",
        description: "How EVs are revolutionizing transportation.",
        thumbnail: "https://img.freepik.com/free-photo/electric-vehicle-charger-plug-with-digital-display_35913-3359.jpg?t=st=1740139573~exp=1740143173~hmac=62cbea843a17e581341ccacebcabba4d5287ef33c76b9e93fb9269a4c7494dc5&w=1800",
        videoUrl: "https://youtu.be/HgkWQCXEjHg"
    },
    {
        title: "Sustainable Energy Innovations",
        description: "Exploring new ways to harness renewable energy.",
        thumbnail: "https://energysavingtrust.org.uk/wp-content/uploads/2020/08/GettyImages-826669540-green-innovation.jpg",
        videoUrl: "https://www.msn.com/en-au/news/other/5-breakthrough-renewable-energy-innovations-you-need-to-know/vi-AA1ywJhF?ocid=socialshare"
    },
    {
        title: "The Psychology of Social Media",
        description: "How social media affects our mental health.",
        thumbnail: "https://cdn.iplocation.net/assets/images/blog/featured/social-media-psychology.png",
        videoUrl: "https://youtu.be/-QDjx_spkwI"
    },
    {
        title: "Understanding Quantum Computing",
        description: "A beginner's guide to the world of quantum mechanics and computing.",
        thumbnail: "https://th.bing.com/th/id/OIP.VweJuj7drkYkoR3bnj_v2QHaD3?rs=1&pid=ImgDetMain",
        videoUrl: "https://youtu.be/WhrsONrQhrU"
    }
];

const VideoCard = ({ video }) => {
    return (
        <Card sx={{ maxWidth: 345, transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                <CardMedia component="img" height="200" image={video.thumbnail} alt={video.title} />
            </a>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {video.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

const VideoList = () => {
    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Latest Videos
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {videos.map((video, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <VideoCard video={video} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default VideoList;
