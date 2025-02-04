import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const CRM1 = () => {
  return (
    <Box sx={{ bgcolor: "#111", color: "#FFF", py: 10 }}>
      <Container>
        <Typography variant="h2" align="center" sx={{ mb: 4 }}>
          CRM System Overview
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Enhance Customer Engagement
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Our CRM system is designed to help businesses manage customer interactions effectively. With features like contact management, sales tracking, and customer support, you can enhance your customer relationships and drive sales growth.
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Key Features:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">• Contact Management: Keep track of all customer information in one place.</Typography>
          </li>
          <li>
            <Typography variant="body1">• Sales Tracking: Monitor sales performance and customer interactions.</Typography>
          </li>
          <li>
            <Typography variant="body1">• Customer Support: Provide timely support and resolve customer issues efficiently.</Typography>
          </li>
        </ul>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" sx={{ bgcolor: "#FFD700", color: "#000" }}>
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CRM1;