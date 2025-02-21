import React from "react";
import { Card, CardMedia, CardContent, Typography, Grid, Container } from "@mui/material";

const articles = [
    {
        title: "Exploring the Future of AI",
        description: "A deep dive into how artificial intelligence is shaping our world.",
        image: "https://media.npr.org/assets/img/2023/05/24/gettyimages-1358149692-bf96c07fc26040785771044ba8470ff9d73a928c-s1100-c50.jpg"
    },
    {
        title: "The Art of Minimalism in Design",
        description: "Understanding the principles of minimalistic design and its impact.",
        image: "https://www.nda.ac.uk/wp-content/uploads/2018/07/Minimalist-Design-Blog-1-JohnPawson-Pinterest.jpg",
    },
    {
        title: "Breaking Down Web3 and Blockchain",
        description: "An introduction to Web3 technologies and their potential.",
        image: "https://th.bing.com/th/id/OIP.jkYCL2QxjVEWTBSgw23qXQHaEK?w=758&h=426&rs=1&pid=ImgDetMain",
    },
    {
        title: "The Rise of Remote Work",
        description: "How remote work is changing industries and productivity.",
        image: "https://ignitedbusiness.com/wp-content/uploads/2023/12/Untitled-34-1024x585.png",
    },
    {
        title: "Cybersecurity Trends in 2025",
        description: "Latest advancements and threats in cybersecurity.",
        image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/Top_10_Cybersecurity_Trends_to_Watch_Out_For_in_2020.jpg",
    },
    {
        title: "Advancements in Space Exploration",
        description: "New discoveries and missions in the cosmos.",
        image: "https://blog.brennaninc.com/hubfs/hydraulics%20in%20space%20exploration.png",
    },
    {
        title: "The Future of Electric Vehicles",
        description: "How EVs are revolutionizing transportation.",
        image: "https://th.bing.com/th?q=Future+Electric+Vehicles+Animated+Images&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.4&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
        title: "Sustainable Energy Innovations",
        description: "Exploring new ways to harness renewable energy.",
        image: "https://as1.ftcdn.net/v2/jpg/05/67/58/58/1000_F_567585816_nsef7D6l3G8CZSMJe0kb0M4WXlDTcJV0.jpg",
    },
    {
        title: "The Psychology of Social Media",
        description: "How social media affects our mental health.",
        image: "https://jemully.com/wp-content/uploads/2022/04/The-Psychology-of-Social-Media-Part-1-The-Phenomenon.png",
    },
    {
        title: "Understanding Quantum Computing",
        description: "A beginner's guide to the world of quantum mechanics and computing.",
        image: "https://th.bing.com/th/id/OIP.PzcVjs5iZbv0XmqyI-G50gHaFs?rs=1&pid=ImgDetMain",
    }
];

const ArticleCard = ({ article }) => {
    return (
        <Card sx={{ maxWidth: 345, transition: "0.3s", '&:hover': { transform: "scale(1.05)" } }}>
            <CardMedia component="img" height="200" image={article.image} alt={article.title} />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {article.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

const ArticleList = () => {
    return (
        <Container sx={{ py: 5 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Latest Articles
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {articles.map((article, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <ArticleCard article={article} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ArticleList;
