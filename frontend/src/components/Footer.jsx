import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#111", color: "#FFF", py: 4, borderTop: '2px solid #FFD700' }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quest Digiflex
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Your ultimate destination for fitness and wellness. Join us to achieve your fitness goals with our expert trainers and state-of-the-art facilities.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              &copy; {new Date().getFullYear()} Quest Digiflex. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="https://www.facebook.com" target="_blank" color="#FFF">
                <Facebook sx={{ fontSize: 30 }} />
              </Link>
              <Link href="https://www.instagram.com" target="_blank" color="#FFF">
                <Instagram sx={{ fontSize: 30 }} />
              </Link>
              <Link href="https://www.twitter.com" target="_blank" color="#FFF">
                <Twitter sx={{ fontSize: 30 }} />
              </Link>
              <Link href="https://www.linkedin.com" target="_blank" color="#FFF">
                <LinkedIn sx={{ fontSize: 30 }} />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Address: 123 Fitness Lane, Wellness City, State, 12345
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: <Link href="mailto:info@questdigiflex.com" color="#FFD700">info@questdigiflex.com</Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: <Link href="tel:+1234567890" color="#FFD700">+1 (234) 567-890</Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Operating Hours:
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Monday - Friday: 6 AM - 10 PM
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Saturday: 8 AM - 8 PM
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Sunday: Closed
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;