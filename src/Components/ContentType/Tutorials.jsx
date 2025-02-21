import React from "react";
import { Card, CardMedia, CardContent, Typography, Grid, Container } from "@mui/material";

const tutorials = [
    {
        title: "Getting Started with React",
        description: "Learn the basics of React, including components, state, and props.",
        thumbnail: "https://th.bing.com/th/id/OIP.jdCUb69papqX-tIIur9gfQHaDa?rs=1&pid=ImgDetMain",
        tutorialUrl: "https://youtu.be/Ke90Tje7VS0"
    },
    {
        title: "Mastering JavaScript ES6+ Features",
        description: "Explore modern JavaScript features like arrow functions, destructuring, and promises.",
        thumbnail: "https://i.morioh.com/2020/03/21/4c2be688efe4.jpg",
        tutorialUrl: "https://youtu.be/VlPiVmYuoqw"
    },
    {
        title: "Building a Full-Stack MERN App",
        description: "A complete guide to building and deploying a MERN stack application.",
        thumbnail: "https://miro.medium.com/v2/resize:fit:1200/1*Ik9bSDA6n96jyoTI4jpc_Q.png",
        tutorialUrl: "https://youtu.be/7CqJlxBYj-M"
    },
    {
        title: "Understanding Redux for State Management",
        description: "Learn how to manage state in large applications using Redux.",
        thumbnail: "https://th.bing.com/th/id/OIP.7-muN-5voQ3MesyN1vu7GQHaDH?rs=1&pid=ImgDetMain",
        tutorialUrl: "https://youtu.be/93p3LxR9xfM"
    },
    {
        title: "CSS Grid & Flexbox: Responsive Web Design",
        description: "Master CSS Grid and Flexbox to create modern, responsive layouts.",
        thumbnail: "https://i.ytimg.com/vi/p0bGHP-PXD4/maxresdefault.jpg",
        tutorialUrl: "https://youtu.be/ieTHC78giGQ"
    },
    {
        title: "Node.js and Express.js Crash Course",
        description: "A beginner-friendly guide to building REST APIs with Node.js and Express.",
        thumbnail: "https://qualitapps.com/wp-content/uploads/2023/02/102.png",
        tutorialUrl: "https://youtu.be/Oe421EPjeBE"
    }
];

const TutorialCard = ({ tutorial }) => {
    return (
        <Card sx={{ maxWidth: 345, transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
            <a href={tutorial.tutorialUrl} target="_blank" rel="noopener noreferrer">
                <CardMedia component="img" height="200" image={tutorial.thumbnail} alt={tutorial.title} />
            </a>
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {tutorial.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {tutorial.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

const TutorialList = () => {
    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Latest Tutorials
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {tutorials.map((tutorial, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <TutorialCard tutorial={tutorial} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TutorialList;
