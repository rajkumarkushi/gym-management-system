import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Container,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  IconButton,
  Badge,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Person,
  Palette,
  Security,
  Policy,
  Notifications,
  Payment,
  Backup,
  Language,
  VpnKey,
  AdminPanelSettings,
  CheckCircle,
  Warning,
} from '@mui/icons-material';

// Styled Components
const SettingsContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const ProgressSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(45deg, #2A2A3C 30%, #1E1E2F 90%)',
  borderRadius: '12px',
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: 70,
  padding: theme.spacing(2),
  '&.Mui-selected': {
    color: '#FFD700',
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor: status === 'complete' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(255, 215, 0, 0.2)',
  color: status === 'complete' ? '#2ecc71' : '#FFD700',
  borderRadius: '8px',
}));

// Demo data for settings status
const settingsStatus = {
  profile: { status: 'complete', message: 'Profile is complete' },
  theme: { status: 'pending', message: 'Theme customization pending' },
  security: { status: 'attention', message: '2FA not enabled' },
  // Add status for other sections...
};

export default function Settings() {
  const [currentTab, setCurrentTab] = useState(0);
  const [settingsCompletion, setSettingsCompletion] = useState(80);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderSettingsOverview = () => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={8}>
        <ProgressSection>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" sx={{ color: '#FFD700' }}>
              Settings Completion
            </Typography>
            <StatusChip
              label={`${settingsCompletion}% Complete`}
              status={settingsCompletion === 100 ? 'complete' : 'pending'}
            />
          </Box>
          <LinearProgress
            variant="determinate"
            value={settingsCompletion}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(255, 215, 0, 0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#FFD700',
              },
            }}
          />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <CheckCircle sx={{ color: '#2ecc71' }} />
                <Typography variant="body2" color="textSecondary">
                  Profile Complete
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <Warning sx={{ color: '#FFD700' }} />
                <Typography variant="body2" color="textSecondary">
                  Security Setup Pending
                </Typography>
              </Box>
            </Grid>
            {/* Add more status indicators */}
          </Grid>
        </ProgressSection>
      </Grid>
      <Grid item xs={12} md={4}>
        <StyledCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Alert severity="warning" sx={{ borderRadius: '8px' }}>
                2FA Setup Recommended
              </Alert>
              <Alert severity="info" sx={{ borderRadius: '8px' }}>
                New Payment Gateway Available
              </Alert>
            </Box>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );

  const renderSettingsSections = () => (
    <Grid container spacing={3}>
      {[
        { title: 'Profile', icon: <Person />, status: 'complete' },
        { title: 'Theme', icon: <Palette />, status: 'pending' },
        { title: 'Security', icon: <Security />, status: 'attention' },
        { title: 'Policies', icon: <Policy />, status: 'complete' },
        { title: 'Notifications', icon: <Notifications />, status: 'pending' },
        { title: 'Payment', icon: <Payment />, status: 'complete' },
        // Add more sections...
      ].map((section, index) => (
        <Grid item xs={12} md={4} key={index}>
          <StyledCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="start">
                <Box display="flex" gap={2} alignItems="center">
                  <IconButton
                    sx={{
                      backgroundColor: 'rgba(255, 215, 0, 0.1)',
                      '&:hover': { backgroundColor: 'rgba(255, 215, 0, 0.2)' },
                    }}
                  >
                    {section.icon}
                  </IconButton>
                  <Box>
                    <Typography variant="h6">{section.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {settingsStatus[section.title.toLowerCase()]?.message || 'Settings available'}
                    </Typography>
                  </Box>
                </Box>
                <StatusChip
                  label={section.status}
                  status={section.status}
                  size="small"
                />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <SettingsContainer maxWidth="xl">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Settings & Preferences</Typography>
        <Box display="flex" gap={2}>
          <Chip
            icon={<CheckCircle />}
            label="Last saved: 2 mins ago"
            variant="outlined"
            sx={{ borderColor: '#FFD700', color: '#FFD700' }}
          />
        </Box>
      </Box>

      {renderSettingsOverview()}
      
      <Paper sx={{ mb: 4, borderRadius: '12px', overflow: 'hidden' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          {[
            { label: 'Profile', icon: <Person /> },
            { label: 'Theme', icon: <Palette /> },
            { label: 'Security', icon: <Security /> },
            { label: 'Policies', icon: <Policy /> },
            { label: 'Notifications', icon: <Notifications /> },
            { label: 'Payment', icon: <Payment /> },
            { label: 'Backup', icon: <Backup /> },
            { label: 'Regional', icon: <Language /> },
            { label: 'API Keys', icon: <VpnKey /> },
          ].map((tab, index) => (
            <StyledTab
              key={index}
              icon={tab.icon}
              label={tab.label}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Paper>

      {renderSettingsSections()}
    </SettingsContainer>
  );
}