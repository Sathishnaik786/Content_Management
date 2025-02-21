import React from "react";
import { Card, CardMedia, CardContent, Typography, Grid, Container } from "@mui/material";

const webinars = [
    {
        title: "Live Webinar: Mastering React in 2025",
        description: "Join us for a deep dive into React's latest features and best practices.",
        thumbnail: "https://th.bing.com/th/id/OIP.jdCUb69papqX-tIIur9gfQHaDa?rs=1&pid=ImgDetMain",
        webinarUrl: "https://example.com/live-react-webinar"
    },
    {
        title: "Live Discussion: The Future of JavaScript",
        description: "Industry experts discuss upcoming trends and innovations in JavaScript.",
        thumbnail: "https://i.morioh.com/2020/03/21/4c2be688efe4.jpg",
        webinarUrl: "https://example.com/live-js-future"
    },
    {
        title: "MERN Stack Live Workshop",
        description: "Build a full-stack application with MERN in a hands-on session.",
        thumbnail: "https://miro.medium.com/v2/resize:fit:1200/1*Ik9bSDA6n96jyoTI4jpc_Q.png",
        webinarUrl: "https://example.com/live-mern-workshop"
    },
    {
        title: "Redux in Action: State Management Strategies",
        description: "Learn how to effectively manage state in complex applications.",
        thumbnail: "https://th.bing.com/th/id/OIP.7-muN-5voQ3MesyN1vu7GQHaDH?rs=1&pid=ImgDetMain",
        webinarUrl: "https://example.com/live-redux-webinar"
    },
    {
        title: "Live CSS Workshop: Responsive Design",
        description: "Hands-on session covering CSS Grid, Flexbox, and modern design techniques.",
        thumbnail: "https://i.ytimg.com/vi/p0bGHP-PXD4/maxresdefault.jpg",
        webinarUrl: "https://example.com/live-css-workshop"
    },
    {
        title: "Node.js & Express: Building Scalable APIs",
        description: "Live API development session with Q&A and real-time coding.",
        thumbnail: "https://qualitapps.com/wp-content/uploads/2023/02/102.png",
        webinarUrl: "https://example.com/live-node-express"
    }
];

const WebinarCard = ({ webinar }) => {
    return (
        <Card sx={{ maxWidth: 345, transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
            <a href={webinar.webinarUrl} target="_blank" rel="noopener noreferrer">
                <CardMedia component="img" height="200" image={webinar.thumbnail} alt={webinar.title} />
            </a>
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

const WebinarList = () => {
    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Upcoming Live Webinars
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {webinars.map((webinar, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <WebinarCard webinar={webinar} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default WebinarList;
