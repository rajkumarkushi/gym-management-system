import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Backup as BackupIcon,
  Restore as RestoreIcon,
} from '@mui/icons-material';

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: {
      email: true,
      sms: false,
      maintenance: true,
      payments: true,
    },
    maintenanceIntervals: {
      cardio: 30,
      weights: 90,
      machines: 60,
    },
    accentColor: '#FFD700',
  });
  const [users, setUsers] = useState([]);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [backupInProgress, setBackupInProgress] = useState(false);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/gym/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete user');

      // Update users list
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      // Show success message
    } catch (error) {
      console.error('Error deleting user:', error);
      // Show error message
    }
  };

  const handleSaveUser = async () => {
    try {
      const userData = {
        name: selectedUser?.name || '',
        email: selectedUser?.email || '',
        role: selectedUser?.role || 'staff',
        permissions: selectedUser?.permissions || [],
      };

      const url = selectedUser?.id 
        ? `/api/gym/users/${selectedUser.id}`
        : '/api/gym/users';

      const method = selectedUser?.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Failed to save user');

      // Refresh users list
      fetchUsers();
      
      // Close dialog
      setOpenUserDialog(false);
      
      // Reset selected user
      setSelectedUser(null);
      
      // Show success message
    } catch (error) {
      console.error('Error saving user:', error);
      // Show error message
    }
  };

  useEffect(() => {
    fetchSettings();
    fetchUsers();
  }, []);
  
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/gym/settings');
        const data = await response.json();
        setSettings(data.settings);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
  
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/gym/users');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    const handleSaveSettings = async () => {
      try {
        const response = await fetch('/api/gym/settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(settings),
        });
  
        if (!response.ok) throw new Error('Failed to save settings');
        // Show success message
      } catch (error) {
        console.error('Error saving settings:', error);
        // Show error message
      }
    };
  
    const handleBackup = async () => {
      try {
        setBackupInProgress(true);
        const response = await fetch('/api/gym/backup', {
          method: 'POST',
        });
  
        if (!response.ok) throw new Error('Backup failed');
        // Show success message
      } catch (error) {
        console.error('Error creating backup:', error);
        // Show error message
      } finally {
        setBackupInProgress(false);
      }
    };
  
    const handleRestore = async (backupId) => {
      try {
        const response = await fetch(`/api/gym/restore/${backupId}`, {
          method: 'POST',
        });
  
        if (!response.ok) throw new Error('Restore failed');
        // Show success message
        fetchSettings();
      } catch (error) {
        console.error('Error restoring backup:', error);
        // Show error message
      }
    };
   const renderUserForm = () => (
    <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={selectedUser?.name || ''}
            onChange={(e) => setSelectedUser(prev => ({
              ...prev,
              name: e.target.value
            }))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={selectedUser?.email || ''}
            onChange={(e) => setSelectedUser(prev => ({
              ...prev,
              email: e.target.value
            }))}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedUser?.role || 'staff'}
              onChange={(e) => setSelectedUser(prev => ({
                ...prev,
                role: e.target.value
              }))}
            >
              <MenuItem value="admin">Administrator</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="staff">Staff</MenuItem>
              <MenuItem value="trainer">Trainer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </DialogContent>
  );
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
  
        <Grid container spacing={3}>
          {/* System Preferences */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Preferences
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Theme</InputLabel>
                  <Select
                    value={settings.theme}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      theme: e.target.value
                    }))}
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                  </Select>
                </FormControl>
  
                <TextField
                  fullWidth
                  label="Accent Color"
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    accentColor: e.target.value
                  }))}
                  sx={{ mb: 2 }}
                />
  
                <Typography variant="subtitle1" gutterBottom>
                  Notifications
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.email}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          email: e.target.checked
                        }
                      }))}
                    />
                  }
                  label="Email Notifications"
                />
                {/* Add more notification switches */}
              </CardContent>
            </Card>
          </Grid>
  
          {/* User Management */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">
                    User Management
                  </Typography>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setSelectedUser(null);
                      setOpenUserDialog(true);
                    }}
                  >
                    Add User
                  </Button>
                </Box>
  
                <List>
                  {users.map(user => (
                    <ListItem key={user.id}>
                      <ListItemText
                        primary={user.name}
                        secondary={user.role}
                      />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => {
                          setSelectedUser(user);
                          setOpenUserDialog(true);
                        }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteUser(user.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
  
          {/* Backup & Restore */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Backup & Restore
                </Typography>
                <Button
                  startIcon={<BackupIcon />}
                  onClick={handleBackup}
                  disabled={backupInProgress}
                >
                  Create Backup
                </Button>
                {/* Add restore functionality */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
  
        {/* User Dialog */}
        <Dialog
        open={openUserDialog}
        onClose={() => {
          setOpenUserDialog(false);
          setSelectedUser(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        {renderUserForm()}
        <DialogActions>
          <Button onClick={() => {
            setOpenUserDialog(false);
            setSelectedUser(null);
          }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveUser}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}