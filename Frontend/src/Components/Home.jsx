
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Box, Container, Link } from "@mui/material";
import { motion } from "framer-motion";
import { Code, Category, Event, CheckCircle } from "@mui/icons-material"; // Icons

const contentTypes = [
    { title: "Articles", description: "Write and publish articles.", icon: "📝", color: "#FCE4EC", path: "/articles" },
    { title: "Videos", description: "Upload and manage videos.", icon: "📹", color: "#E3F2FD", path: "/videos" },
    { title: "Webinars", description: "Host live webinars & sessions.", icon: "🎤", color: "#E8F5E9", path: "/webinars" },
    { title: "Tutorials", description: "Create interactive tutorials.", icon: "📚", color: "#F3E5F5", path: "/tutorials" },
    { title: "Content Editor", description: "Edit and format content.", icon: <Code fontSize="large" />, color: "#FFEBEE", path: "/content-editor" },
    { title: "Categorization", description: "Organize content effectively.", icon: <Category fontSize="large" />, color: "#E1F5FE", path: "/categorization" },
    { title: "Scheduling", description: "Plan and schedule posts.", icon: <Event fontSize="large" />, color: "#E8F5E9", path: "/scheduling" },
    { title: "Approval Workflow", description: "Review and approve content.", icon: <CheckCircle fontSize="large" />, color: "#F3E5F5", path: "/approval-workflow" }
];

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Box>
            {/* Welcome Message */}
            <Typography variant="h4" align="center" sx={{ mt: 3, fontWeight: "bold" }}>
                Welcome to Content Management System
            </Typography>

            {/* Animated Header Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ display: "flex", justifyContent: "center", marginBottom: "20px", marginTop: "10px" }}
            >
                <img
                    src="https://www.sparsadigital.in/wp-content/uploads/2022/12/Content-Management-System.jpg"
                    alt="Content Management System"
                    style={{
                        width: "100%",
                        maxHeight: "300px",
                        objectFit: "cover",
                        borderRadius: "10px",
                    }}
                />
            </motion.div>

            {/* Cards Section */}
            <Grid container spacing={3} padding={3}>
                {contentTypes.map((content, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <motion.div
                            whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    backgroundColor: content.color,
                                    textAlign: "center",
                                    padding: 2,
                                    borderRadius: "12px",
                                    transition: "0.3s",
                                }}
                                onClick={() => navigate(content.path)}
                            >
                                <Box sx={{ fontSize: 50 }}>{content.icon}</Box>
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {content.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {content.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* Footer Section */}
            <Box
                component="footer"
                sx={{
                    mt: 4,
                    py: 3,
                    px: 2,
                    backgroundColor: "#212121",
                    color: "#ffffff",
                    textAlign: "center",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" fontWeight="bold">
                                Quick Links
                            </Typography>
                            <Box>
                                <Link href="/articles" color="inherit" underline="hover">Articles</Link><br />
                                <Link href="/videos" color="inherit" underline="hover">Videos</Link><br />
                                <Link href="/webinars" color="inherit" underline="hover">Webinars</Link><br />
                                <Link href="/tutorials" color="inherit" underline="hover">Tutorials</Link>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" fontWeight="bold">
                                Contact Us
                            </Typography>
                            <Typography variant="body2">
                                Email: Busitron@cmsportal.com
                            </Typography>
                            <Typography variant="body2">
                                Phone: +1 234 567 890
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                © {new Date().getFullYear()} CMS Portal. All rights reserved.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;