import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Box,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';

const Settings = ({ colorMode, setColorMode, onLogout }) => {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [language, setLanguage] = useState('english');
  const [timeZone, setTimeZone] = useState('UTC');
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    // Add password change logic here
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    // Implement password change API call here
    setPasswordDialog(false);
    // Reset password fields
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <Paper sx={{ p: 3, bgcolor: '#2e2e2e', borderRadius: 2 }}>
        <Typography variant="h6" sx={{ color: '#FFD700', mb: 3 }}>
          Settings
        </Typography>
        
        <Grid container spacing={3}>
          {/* Theme Settings */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: '#1e1e1e' }}>
              <Typography variant="h6" gutterBottom>Theme Settings</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ flex: 1 }}>Color Theme</Typography>
                <Switch
                  checked={colorMode === 'blue'}
                  onChange={() => setColorMode(colorMode === 'yellow' ? 'blue' : 'yellow')}
                />
                <Typography sx={{ ml: 1 }}>
                  {colorMode === 'yellow' ? 'Gold Theme' : 'Blue Theme'}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Notification Settings */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: '#1e1e1e' }}>
              <Typography variant="h6" gutterBottom>Notification Preferences</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ flex: 1 }}>Push Notifications</Typography>
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ flex: 1 }}>Email Updates</Typography>
                <Switch
                  checked={emailUpdates}
                  onChange={(e) => setEmailUpdates(e.target.checked)}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Regional Settings */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: '#1e1e1e' }}>
              <Typography variant="h6" gutterBottom>Regional Settings</Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Language</InputLabel>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  sx={{ bgcolor: 'background.paper' }}
                >
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="spanish">Spanish</MenuItem>
                  <MenuItem value="french">French</MenuItem>
                  <MenuItem value="german">German</MenuItem>
                  <MenuItem value="chinese">Chinese</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Time Zone</InputLabel>
                <Select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  sx={{ bgcolor: 'background.paper' }}
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="EST">EST (UTC-5)</MenuItem>
                  <MenuItem value="PST">PST (UTC-8)</MenuItem>
                  <MenuItem value="IST">IST (UTC+5:30)</MenuItem>
                  <MenuItem value="GMT">GMT (UTC+0)</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>

          {/* Account Settings */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: '#1e1e1e' }}>
              <Typography variant="h6" gutterBottom>Account Settings</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => setPasswordDialog(true)}
                >
                  Change Password
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Privacy Settings */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, bgcolor: '#1e1e1e' }}>
              <Typography variant="h6" gutterBottom>Privacy Settings</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ flex: 1 }}>Profile Visibility</Typography>
                <Switch defaultChecked />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ flex: 1 }}>Activity Sharing</Typography>
                <Switch defaultChecked />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialog} onClose={() => setPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handlePasswordChange} variant="contained" color="primary">
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Settings;