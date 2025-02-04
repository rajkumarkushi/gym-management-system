import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  
  Home,
  Notifications,
  Delete as DeleteIcon,

} from '@mui/icons-material';

const Announcements = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    priority: 'normal',
    date: new Date().toLocaleDateString()
  });

  const [announcements, setAnnouncements] = useState([]);

  // Load announcements from localStorage on component mount
  useEffect(() => {
    const storedAnnouncements = JSON.parse(localStorage.getItem('announcements')) || [];
    setAnnouncements(storedAnnouncements);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePublish = () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in both title and content fields');
      return;
    }

    const newAnnouncement = {
      ...formData,
      id: Date.now(), // unique ID for each announcement
      date: new Date().toLocaleDateString()
    };

    const updatedAnnouncements = [newAnnouncement, ...announcements];
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem('announcements', JSON.stringify(updatedAnnouncements));

    // Clear form
    setFormData({
      title: '',
      content: '',
      category: '',
      priority: 'normal',
      date: new Date().toLocaleDateString()
    });
  };

  const handleDelete = (id) => {
    const updatedAnnouncements = announcements.filter(ann => ann.id !== id);
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem('announcements', JSON.stringify(updatedAnnouncements));
  };

  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex', bgcolor: '#111', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#222',
            color: '#fff',
            borderRight: '1px solid #333',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Notifications sx={{ color: '#FFD700' }} />
          <Typography variant="h6" sx={{ color: '#FFD700' }}>
            Announcements
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: '#333' }} />
        <List>
          <ListItem 
            button 
            onClick={() => navigate('/')}
            sx={{
              '&:hover': {
                bgcolor: 'rgba(255, 215, 0, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <Home sx={{ color: '#FFD700' }} />
            </ListItemIcon>
            <ListItemText primary="Back to Home" sx={{ color: '#fff' }} />
          </ListItem>
        </List>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: '#111',
          color: '#fff',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              mb: 4,
              color: '#FFD700',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Create New Announcement
          </Typography>

          <Grid container spacing={4}>
            {/* Form Section */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={3}
                sx={{
                  p: 4,
                  bgcolor: '#222',
                  borderRadius: 2,
                  border: '1px solid #333'
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Announcement Title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': { borderColor: '#444' },
                          '&:hover fieldset': { borderColor: '#FFD700' },
                        },
                        '& .MuiInputLabel-root': { color: '#888' },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ color: '#888' }}>Category</InputLabel>
                      <Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        sx={{
                          color: '#fff',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700' },
                        }}
                      >
                        <MenuItem value="general">General</MenuItem>
                        <MenuItem value="event">Event</MenuItem>
                        <MenuItem value="maintenance">Maintenance</MenuItem>
                        <MenuItem value="promotion">Promotion</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Announcement Content"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': { borderColor: '#444' },
                          '&:hover fieldset': { borderColor: '#FFD700' },
                        },
                        '& .MuiInputLabel-root': { color: '#888' },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handlePublish}
                      sx={{
                        bgcolor: '#FFD700',
                        color: '#000',
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        '&:hover': {
                          bgcolor: '#FFF',
                        },
                      }}
                    >
                      Publish Announcement
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Announcements List Section */}
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 3, 
                  color: '#FFD700',
                  textAlign: 'center'
                }}
              >
                Published Announcements
              </Typography>
              
              {announcements.length === 0 ? (
                <Typography 
                  sx={{ 
                    textAlign: 'center', 
                    color: '#888',
                    mt: 4 
                  }}
                >
                  No announcements yet
                </Typography>
              ) : (
                <Box sx={{ maxHeight: '600px', overflow: 'auto' }}>
                  {announcements.map((announcement) => (
                    <Card 
                      key={announcement.id} 
                      sx={{ 
                        mb: 2, 
                        bgcolor: '#222',
                        border: '1px solid #333',
                        '&:hover': {
                          borderColor: '#FFD700',
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <Typography variant="h6" sx={{ color: '#FFD700', mb: 1 }}>
                            {announcement.title}
                          </Typography>
                          <IconButton 
                            onClick={() => handleDelete(announcement.id)}
                            sx={{ 
                              color: '#666',
                              '&:hover': { color: '#ff4444' }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#888', mb: 1 }}>
                          {announcement.category && `Category: ${announcement.category}`}
                        </Typography>
                        <Typography sx={{ color: '#fff', mb: 2 }}>
                          {announcement.content}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#666' }}>
                          Posted on: {announcement.date}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Announcements;

