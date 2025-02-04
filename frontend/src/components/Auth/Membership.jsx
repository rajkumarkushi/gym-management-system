import { Box, Container, Typography, Grid, Button, Card, CardContent, CardActions } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { AccessTime, Phone } from '@mui/icons-material';
import React, { useState ,useEffect } from "react";


const MembershipsPage = () => {
  const navigate = useNavigate();

  // Handler for navigation if needed (e.g., for more details)
  const handleNavigate = (path) => {
    navigate(path);
  };

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
    <Box sx={{ backgroundColor: "#f5f5f5", py: 1 }}>
      {/* Navbar with transparent background */}
      <Navbar />

      {/* Heading Section with updated background */}
      <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)", py: 12, mb: 14}}>
        <Container>
          <Typography variant="h3" gutterBottom align="center" color="white">
            Gym Membership Plans
          </Typography>
          <Typography variant="h6" align="center" color="white" paragraph>
            Choose the membership that fits your goals and fitness journey. Our plans offer flexible options for all types of fitness enthusiasts!
          </Typography>
        </Container>
      </Box>

      {/* Membership Plans Grid */}
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {/* Basic Membership Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 400, boxShadow: 4, backgroundColor: "#fff", borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div" color="text.primary">
                  Basic Membership
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Enjoy unlimited access to gym equipment and group classes. A great choice for those who want to get started with fitness at their own pace.
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 2 }} color="text.primary">
                  $29.99/month
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleNavigate('/membership-details/basic')}
                >
                  Learn More
                </Button>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleNavigate('/signup')}
                >
                  Join Now
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Premium Membership Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 400, boxShadow: 4, backgroundColor: "#fff", borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div" color="text.primary">
                  Premium Membership
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Get access to premium fitness classes, personal training, and priority booking. Perfect for those looking to elevate their fitness game.
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 2 }} color="text.primary">
                  $59.99/month
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleNavigate('/membership-details/premium')}
                >
                  Learn More
                </Button>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleNavigate('/signup')}
                >
                  Join Now
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* VIP Membership Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 400, boxShadow: 4, backgroundColor: "#fff", borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div" color="text.primary">
                  VIP Membership
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Enjoy all-inclusive benefits with VIP access to exclusive areas, classes, and events. The ultimate experience for fitness aficionados.
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 2 }} color="text.primary">
                  $99.99/month
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleNavigate('/membership-details/vip')}
                >
                  Learn More
                </Button>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={() => handleNavigate('/signup')}
                >
                  Join Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* Testimonials Section */}
        <Box sx={{ mt: 6, backgroundColor: "#333", color: "white", py: 4, borderRadius: 2 }}>
          <Container>
            <Typography variant="h4" gutterBottom align="center">
              What Our Members Say
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              "Joining Quest Digiflex was the best decision I ever made. The trainers are fantastic, and the atmosphere is motivating. Highly recommend!"
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              "I've seen amazing results since I started training here. The Premium Membership offers everything I need to stay in shape."
            </Typography>
          </Container>
        </Box>

        {/* Contact Section */}
        <Box sx={{ mt: 6, backgroundColor: "#f2f2f2", color: "text.primary", py: 4 }}>
          <Container>
            <Typography variant="h4" gutterBottom align="center">
              Need Assistance?
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Have questions or need more information about our membership plans? We're here to help you on your fitness journey!
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Phone />}
                onClick={() => handleNavigate('/contact')}
              >
                Contact Us
              </Button>
            </Box>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default MembershipsPage;
