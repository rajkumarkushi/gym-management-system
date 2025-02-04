import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const CRM2 = () => {
  return (
    <Box sx={{ bgcolor: "#111", color: "#FFF", py: 10 }}>
      <Container>
        <Typography variant="h2" align="center" sx={{ mb: 4 }}>
          CRM Analytics and Reporting
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Data-Driven Insights
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Our CRM system provides powerful analytics and reporting tools that help you understand customer behavior and sales trends. Make informed decisions based on real-time data to improve your business strategies.
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Key Features:
        </Typography>
        <ul>
          <li>
            <Typography variant="body1">• Customizable Dashboards: Visualize your data in a way that makes sense for your business.</Typography>
          </li>
          <li>
            <Typography variant="body1">• Performance Metrics: Track key performance indicators to measure success.</Typography>
          </li>
          <li>
            <Typography variant="body1">• Automated Reports: Generate reports automatically to save time and effort.</Typography>
          </li>
        </ul>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" sx={{ bgcolor: "#FFD700", color: "#000" }}>
            Discover More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CRM2;