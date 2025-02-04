import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Card,
  IconButton,
  TextField,
  Paper,
} from "@mui/material";
import {
  AccessTime,
  ArrowForward,
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  Phone,
  Twitter,
} from "@mui/icons-material";
import Navbar from './Navbar'


const Whyqd = () => {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <Box sx={{ bgcolor: "#111", color: "#FFF" }}>
      {/* Navbar */}
      <Navbar />


      <Container sx={{ py: 10, pt: 12 }}>
        <Typography variant="h2" align="center" sx={{ mb: 6 }}>
          Why Choose QD?
        </Typography>

        <Typography variant="h4" sx={{ mb: 4 }}>
          Discover the Benefits of Joining Our Fitness Community
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, bgcolor: "#444", borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: "#FFD700" }}>
                Expert Trainers
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Our certified trainers are dedicated to helping you achieve your fitness goals. With personalized training plans and ongoing support, you’ll have the guidance you need to succeed.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, bgcolor: "#444", borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: "#FFD700" }}>
                State-of-the-Art Facilities
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Enjoy access to top-notch gym equipment and facilities designed to enhance your workout experience. Our clean and modern environment ensures you can focus on your fitness journey.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, bgcolor: "#444", borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: "#FFD700" }}>
                Community Support
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Join a vibrant community of fitness enthusiasts who motivate and support each other. Participate in group classes, events, and challenges that foster camaraderie and accountability.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h4" align="center" sx={{ mb: 4, mt: 6 }}>
          Our Commitment to You
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          At PF, we are committed to providing a holistic approach to fitness. Our programs are designed to cater to all fitness levels, ensuring that everyone feels welcome and supported. Whether you are a beginner or an experienced athlete, we have something for you.
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          We believe in continuous improvement and regularly update our programs and facilities to meet the evolving needs of our members. Your feedback is invaluable to us, and we strive to create an environment where you can thrive.
        </Typography>

        <Typography variant="h4" align="center" sx={{ mb: 4, mt: 6 }}>
          Ready to Get Started?
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Button variant="contained" sx={{ bgcolor: "#FFD700", color: "#000" }} onClick={() => navigate("/signup")}>
            Join Us Today!
          </Button>
        </Box>
      </Container>

       {/* footer section */}
       <Box sx={{ py: 6, bgcolor: "#000" }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                QUEST DIGIFLEX
              </Typography>
              <Typography sx={{ mb: 2 }}>
                skyee ,indore
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton size="small" sx={{ color: "#FFD700" }}>
                  <Facebook />
                </IconButton>
                <IconButton size="small" sx={{ color: "#FFD700" }}>
                  <Twitter />
                </IconButton>
                <IconButton size="small" sx={{ color: "#FFD700" }}>
                  <Instagram />
                </IconButton>
                <IconButton size="small" sx={{ color: "#FFD700" }}>
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button sx={{ color: "#fff", justifyContent: "flex-start" }}>
                  Home
                </Button>
                <Button sx={{ color: "#fff", justifyContent: "flex-start" }}>
                  About
                </Button>
                <Button sx={{ color: "#fff", justifyContent: "flex-start" }}>
                  Classes
                </Button>
                <Button sx={{ color: "#fff", justifyContent: "flex-start" }}>
                  Contact
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Operating Hours
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AccessTime sx={{ mr: 1, color: "#FFD700" }} />
                <Typography>Mon-Fri: 6:00 - 22:00</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AccessTime sx={{ mr: 1, color: "#FFD700" }} />
                <Typography>Sat-Sun: 8:00 - 20:00</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Phone sx={{ mr: 1, color: "#FFD700" }} />
                <Typography>+1 (555) 000-000-0000</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Email sx={{ mr: 1, color: "#FFD700" }} />
                <Typography>info@questdigiflex.com</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Whyqd;