import React, { useState ,useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Button,
    Card,
    CardContent,
    CardMedia,
    AppBar,
    Toolbar,
} from "@mui/material";
import { Email, Phone, AccessTime } from "@mui/icons-material";
import image from './qdstoreimage.jpg'
import Navbar from './Navbar'


const Qdstore = () => {

     const [scrolled, setScrolled] = useState(false);
      useEffect(() => {
        const handleScroll = () => {
          const offset = window.scrollY;
          if (offset > 50) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
      
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      
    return (
        <Box>
            {/* Header Section */}
            <Navbar />


            <Box sx={{ backgroundColor: "#333", py: 16 }}>
                <Container>
                    <Typography variant="h3" gutterBottom align="center" color="white">
                        Welcome to Quest Digiflex
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
                        Your ultimate destination for fitness innovation and quality equipment.
                    </Typography>
                </Container>
            </Box>

            {/* About Section */}
            <Box sx={{ py: 6 }}>
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" gutterBottom>
                                About Quest Digiflex
                            </Typography>
                            <Typography color="textSecondary">
                                Quest Digiflex is dedicated to providing top-notch fitness solutions. From
                                innovative equipment to professional guidance, we ensure you have everything
                                you need for a successful fitness journey.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={image}
                                    alt="Quest Digiflex"
                                />
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Highlights Section */}
            <Box sx={{ py: 6, backgroundColor: "#f5f5f5" }}>
                <Container>
                    <Typography variant="h4" gutterBottom align="center">
                        Why Choose Us?
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Innovative Equipment
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Discover state-of-the-art fitness products designed for efficiency and durability.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Personalized Solutions
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Get tailored recommendations that align with your fitness journey.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Community Support
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Join a community of fitness enthusiasts committed to excellence.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Call to Action Section */}
            <Box sx={{ py: 6, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Visit Our Store Today
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Experience the difference at Quest Digiflex. Take the first step toward a healthier lifestyle.
                </Typography>
                <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                    Shop Now
                </Button>
            </Box>
        </Box>
    );
};

export default Qdstore;
