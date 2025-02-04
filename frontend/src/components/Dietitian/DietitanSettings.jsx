import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  FormControlLabel,
  Select,
  MenuItem,
  IconButton,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
} from '@mui/material';
import {
  Save as SaveIcon,
  Edit as EditIcon,
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  Notifications,
  Language,
  Palette,
  Link as LinkIcon,
  Assessment,
  ViewModule,
} from '@mui/icons-material';

export default function SettingsDietitian() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    appointments: true,
    clientUpdates: true,
    systemUpdates: false,
  });
  const [integrations, setIntegrations] = useState({
    fitbit: false,
    myFitnessPal: false,
    googleFit: false,
  });
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [dietTemplates, setDietTemplates] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Profile Data State
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    qualification: '',
    experience: '',
    bio: '',
    availability: {
      monday: { start: '09:00', end: '17:00', available: true },
      tuesday: { start: '09:00', end: '17:00', available: true },
      wednesday: { start: '09:00', end: '17:00', available: true },
      thursday: { start: '09:00', end: '17:00', available: true },
      friday: { start: '09:00', end: '17:00', available: true },
    },
  });
  const handleDeleteTemplate = async (templateId) => {
    try {
      const response = await fetch(`/api/dietitian/diet-templates/${templateId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete template');

      // Update the templates list by removing the deleted template
      setDietTemplates(prevTemplates => 
        prevTemplates.filter(template => template.id !== templateId)
      );
    } catch (error) {
      console.error('Error deleting template:', error);
      // You might want to show an error message to the user
    }
  };

  const handleIntegrationToggle = async (integrationKey) => {
    try {
      const newStatus = !integrations[integrationKey];
      
      const response = await fetch('/api/dietitian/integrations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          integration: integrationKey,
          status: newStatus,
        }),
      });

      if (!response.ok) throw new Error('Failed to update integration');

      setIntegrations(prev => ({
        ...prev,
        [integrationKey]: newStatus,
      }));
    } catch (error) {
      console.error('Error toggling integration:', error);
      // You might want to show an error message to the user
    }
  };

  const handleSaveTemplate = async () => {
    try {
      const templateData = {
        name: 'New Template', // You might want to add a state for this
        description: '',
        meals: [],
        // Add other template data as needed
      };

      const response = await fetch('/api/dietitian/diet-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData),
      });

      if (!response.ok) throw new Error('Failed to save template');

      const newTemplate = await response.json();
      
      // Add the new template to the list
      setDietTemplates(prevTemplates => [...prevTemplates, newTemplate]);
      
      // Close the dialog
      setOpenTemplateDialog(false);
    } catch (error) {
      console.error('Error saving template:', error);
      // You might want to show an error message to the user
    }
  };

  useEffect(() => {
    // Fetch dietitian settings
    fetchSettings();
    // Fetch diet templates
    fetchDietTemplates();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/dietitian/settings');
      const data = await response.json();
      setProfileData(data.profile);
      setNotificationSettings(data.notifications);
      setIntegrations(data.integrations);
      setDarkMode(data.darkMode);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const fetchDietTemplates = async () => {
    try {
      const response = await fetch('/api/dietitian/diet-templates');
      const data = await response.json();
      setDietTemplates(data);
    } catch (error) {
      console.error('Error fetching diet templates:', error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch('/api/dietitian/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) throw new Error('Failed to update profile');
      
      // Show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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

  const handleExportClientData = async (format) => {
    try {
      const response = await fetch(`/api/dietitian/export-clients?format=${format}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `client-data.${format}`;
      a.click();
    } catch (error) {
      console.error('Error exporting client data:', error);
    }
  };

  // Tab Panels
  const ProfileSection = () => (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              src={profileImage}
              sx={{ width: 150, height: 150, margin: 'auto' }}
            />
            <input
              accept="image/*"
              type="file"
              id="profile-image-upload"
              hidden
              onChange={handleImageUpload}
            />
            <label htmlFor="profile-image-upload">
              <Button
                component="span"
                startIcon={<UploadIcon />}
                sx={{ mt: 2 }}
              >
                Upload Photo
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
              </Grid>
              {/* Add more profile fields */}
            </Grid>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleProfileUpdate}
              sx={{ mt: 3 }}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const ClientManagementSection = () => (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Client Management</Typography>
          <Box>
            <Button
              startIcon={<DownloadIcon />}
              onClick={() => handleExportClientData('pdf')}
              sx={{ mr: 1 }}
            >
              Export to PDF
            </Button>
            <Button
              startIcon={<DownloadIcon />}
              onClick={() => handleExportClientData('excel')}
            >
              Export to Excel
            </Button>
          </Box>
        </Box>
        {/* Client list and management tools */}
      </CardContent>
    </Card>
  );

  const DietTemplatesSection = () => (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Diet Plan Templates</Typography>
          <Button
            startIcon={<EditIcon />}
            onClick={() => setOpenTemplateDialog(true)}
          >
            Create Template
          </Button>
        </Box>
        <List>
          {dietTemplates.map((template) => (
            <ListItem key={template.id}>
              <ListItemText
                primary={template.name}
                secondary={`Created: ${new Date(template.createdAt).toLocaleDateString()}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleDeleteTemplate(template.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const NotificationSection = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Notification Preferences
        </Typography>
        <List>
          {Object.entries(notificationSettings).map(([key, value]) => (
            <ListItem key={key}>
              <ListItemText
                primary={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={value}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    [key]: e.target.checked,
                  })}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  const IntegrationSection = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          App Integrations
        </Typography>
        <List>
          {Object.entries(integrations).map(([key, value]) => (
            <ListItem key={key}>
              <ListItemText
                primary={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              />
              <ListItemSecondaryAction>
                <Button
                  variant={value ? "outlined" : "contained"}
                  onClick={() => handleIntegrationToggle(key)}
                >
                  {value ? 'Connected' : 'Connect'}
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Profile" />
        <Tab label="Client Management" />
        <Tab label="Diet Templates" />
        <Tab label="Notifications" />
        <Tab label="Integrations" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {selectedTab === 0 && <ProfileSection />}
        {selectedTab === 1 && <ClientManagementSection />}
        {selectedTab === 2 && <DietTemplatesSection />}
        {selectedTab === 3 && <NotificationSection />}
        {selectedTab === 4 && <IntegrationSection />}
      </Box>

      {/* Template Dialog */}
      <Dialog
        open={openTemplateDialog}
        onClose={() => setOpenTemplateDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create Diet Template</DialogTitle>
        <DialogContent>
          {/* Template creation form */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTemplateDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveTemplate}>
            Save Template
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

