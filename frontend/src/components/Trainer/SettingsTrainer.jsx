import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Switch,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  FormControlLabel,
  FormGroup,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Person,
  Schedule,
  NotificationsActive,
  Security,
  Palette,
  Feedback,
  AttachMoney,
  Edit,
  CloudUpload,
  AccessTime,
  Group,
  Help,
  LibraryBooks,
  Add as AddIcon,
} from '@mui/icons-material';
import axios from 'axios';

export default function SettingsTrainer() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [availability, setAvailability] = useState({});
  const [notifications, setNotifications] = useState({
    newClients: true,
    sessionReminders: true,
    systemUpdates: true,
  });
  const [darkMode, setDarkMode] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: '',
    activeDays: '',
  });
  const [trainerEmail, setTrainerEmail] = useState(''); // Store the logged-in trainer's email

  useEffect(() => {
    // Fetch trainer profile on component mount
    const fetchTrainerProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/auth/trainer/${trainerEmail}`);
        setProfile(response.data);
        setAvailability(response.data.availability);
        setNotifications(response.data.notifications);
        setDarkMode(response.data.darkMode);
      } catch (error) {
        console.error('Error fetching trainer profile:', error);
      }
    };

    if (trainerEmail) {
      fetchTrainerProfile();
    }
  }, [trainerEmail]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await axios.put(`http://localhost:8081/api/auth/trainer/${trainerEmail}`, {
        ...profile,
        profileImage,
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleBasicInfoUpdate = async () => {
    try {
      await axios.put(`http://localhost:8081/api/auth/trainer/basic-info`, {
        email: trainerEmail,
        height: profile.height,
        weight: profile.weight,
        goal: profile.goal,
        activeDays: profile.activeDays,
      });
      alert('Basic information updated successfully!');
    } catch (error) {
      console.error('Error updating basic information:', error);
    }
  };

  const handleNotificationsUpdate = async () => {
    try {
      await axios.put(`http://localhost:8081/api/auth/trainer/${trainerEmail}/notifications`, {
        notifications,
      });
      alert('Notification preferences updated successfully!');
    } catch (error) {
      console.error('Error updating notifications:', error);
    }
  };

  const handleDarkModeUpdate = async () => {
    try {
      await axios.put(`http://localhost:8081/api/auth/trainer/${trainerEmail}/dark-mode`, {
        darkMode,
      });
      alert('Dark mode preference updated successfully!');
    } catch (error) {
      console.error('Error updating dark mode preference:', error);
    }
  };

  const handleFeedbackSubmit = async (feedback) => {
    try {
      await axios.post(`http://localhost:8081/api/auth/trainer/${trainerEmail}/feedback`, {
        feedback,
      });
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <Box role="tabpanel" hidden={value !== index} sx={{ py: 3 }}>
      {value === index && children}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
        Settings
      </Typography>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        <Tab label="Profile" />
        <Tab label="Basic Info" />
        <Tab label="Notifications" />
        <Tab label="Appearance" />
        <Tab label="Feedback" />
      </Tabs>

      {/* Profile Settings */}
      <TabPanel value={selectedTab} index={0}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Avatar
                  src={profileImage}
                  sx={{ width: 150, height: 150, margin: 'auto', mb: 2 }}
                />
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUpload />}
                >
                  Upload Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Button>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" onClick={handleProfileUpdate}>
                      Update Profile
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Basic Info Settings */}
      <TabPanel value={selectedTab} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <TextField
              fullWidth
              label="Height"
              value={profile.height}
              onChange={(e) => setProfile({ ...profile, height: e.target.value })}
            />
            <TextField
              fullWidth
              label="Weight"
              value={profile.weight}
              onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
            />
            <TextField
              fullWidth
              label="Goal"
              value={profile.goal}
              onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
            />
            <TextField
              fullWidth
              label="Active Days"
              value={profile.activeDays}
              onChange={(e) => setProfile({ ...profile, activeDays: e.target.value })}
            />
            <Button variant="contained" onClick={handleBasicInfoUpdate}>
              Update Basic Info
            </Button>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Notifications Settings */}
      <TabPanel value={selectedTab} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notification Preferences
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.newClients}
                    onChange={(e) =>
                      setNotifications({ ...notifications, newClients: e.target.checked })
                    }
                  />
                }
                label="New client sign-ups"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.sessionReminders}
                    onChange={(e) =>
                      setNotifications({ ...notifications, sessionReminders: e.target.checked })
                    }
                  />
                }
                label="Session reminders"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.systemUpdates}
                    onChange={(e) =>
                      setNotifications({ ...notifications, systemUpdates: e.target.checked })
                    }
                  />
                }
                label="System updates"
              />
            </FormGroup>
            <Button variant="contained" onClick={handleNotificationsUpdate}>
              Update Notifications
            </Button>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Appearance Settings */}
      <TabPanel value={selectedTab} index={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Appearance Settings
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => {
                    setDarkMode(e.target.checked);
                    handleDarkModeUpdate();
                  }}
                />
              }
              label="Dark Mode"
            />
          </CardContent>
        </Card>
      </TabPanel>

      {/* Feedback & Support */}
      <TabPanel value={selectedTab} index={4}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Submit Feedback
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Your Feedback"
                  placeholder="Tell us what you think..."
                  onChange={(e) => handleFeedbackSubmit(e.target.value)}
                />
                <Button
                  variant="contained"
                  startIcon={<Feedback />}
                  sx={{ mt: 2 }}
                  onClick={() => handleFeedbackSubmit('Your feedback here...')} // Replace with actual feedback input
                >
                  Submit Feedback
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
}