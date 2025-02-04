import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
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


const WorkoutWithUs = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#111", color: "#FFF" }}>
      {/* Navbar */}
      <Navbar/>

      <Container sx={{ py: 10, pt: 12 }}>
        <Typography variant="h2" align="center" sx={{ mb: 6 }}>
          Work Out With Us
        </Typography>

        <Typography variant="h4" sx={{ mb: 4 }}>
          Join Our Dynamic Workout Programs
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, bgcolor: "#444", borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: "#FFD700" }}>
                Group Classes
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Experience the energy of our group classes! From Zumba to HIIT, our classes are designed to keep you motivated and engaged while working towards your fitness goals.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, bgcolor: "#444", borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: "#FFD700" }}>
                Personal Training
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Get one-on-one attention from our certified personal trainers. They will create a customized workout plan tailored to your individual needs and help you stay accountable.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, bgcolor: "#444", borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: "#FFD700" }}>
                Specialized Programs
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Whether you're training for a marathon or looking to improve your strength, our specialized programs are designed to help you achieve specific fitness goals with expert guidance.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h4" align="center" sx={{ mb: 4, mt: 6 }}>
          Why Choose Our Workouts?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          At Quest Digiflex, we believe in a holistic approach to fitness. Our workouts are designed to be fun, effective, and inclusive, catering to all fitness levels. Join us to experience:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1" sx={{ color: "#CCC" }}>
              • A supportive community that motivates you to push your limits.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ color: "#CCC" }}>
              • Access to state-of-the-art equipment and facilities.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ color: "#CCC" }}>
              • Flexible class schedules to fit your busy lifestyle.
            </Typography>
          </li>
        </ul>

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

export default WorkoutWithUs;