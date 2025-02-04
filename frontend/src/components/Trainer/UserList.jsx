import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Box
} from '@mui/material';
import axios from 'axios';

export default function UserList() {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/auth/users');
        setUsers(response.data); // Assuming the response data is an array of users
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = tabValue === 0 ? users : users.filter(user => user.trainer === 'You');

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          User List
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Users" />
          <Tab label="My Users" />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <List>
              {filteredUsers.map((user) => (
                <ListItem key={user.id}>
                  <ListItemAvatar>
                    <Avatar src={`https://i.pravatar.cc/150?u=${user.id}`} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={`Email: ${user.email} | Trainer: ${user.trainer}`} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}