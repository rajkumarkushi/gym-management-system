import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  IconButton,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Event as EventIcon,
  People as PeopleIcon,
  TrendingUp,
  AttachMoney,
  EmojiEvents,
  Warning,
  CalendarToday,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Mock data for performance chart
const performanceData = [
  { name: 'Mon', sessions: 4 },
  { name: 'Tue', sessions: 6 },
  { name: 'Wed', sessions: 5 },
  { name: 'Thu', sessions: 8 },
  { name: 'Fri', sessions: 7 },
  { name: 'Sat', sessions: 9 },
  { name: 'Sun', sessions: 3 },
];

export default function DashboardContent() {
  const [date, setDate] = useState(new Date());
  const trainerName = "antriksh"; // Replace with actual trainer name from context/API

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%', bgcolor: 'background.paper' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" variant="subtitle2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ color }}>
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      {/* Welcome Section */}
      <Grid item xs={12}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Welcome Back, {trainerName}!
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Here's your dashboard overview
          </Typography>
        </Box>
      </Grid>

      {/* Stats Summary */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Active Clients"
          value="25"
          icon={<PeopleIcon />}
          color="#FFD700"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Today's Sessions"
          value="8"
          icon={<EventIcon />}
          color="#4CAF50"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Monthly Goal"
          value="75%"
          icon={<TrendingUp />}
          color="#2196F3"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Revenue"
          value="$2,450"
          icon={<AttachMoney />}
          color="#FF9800"
        />
      </Grid>

      {/* Performance Insights */}
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Weekly Performance
          </Typography>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#FFD700"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Grid>

      {/* Quick Actions */}
      <Grid item xs={12} md={4}>
        <Card sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                fullWidth
                sx={{ mb: 2 }}
              >
                Add New Client
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<CalendarToday />}
                fullWidth
                sx={{ mb: 2 }}
              >
                Schedule Session
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={<PeopleIcon />}
                fullWidth
              >
                View Client List
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* Calendar */}
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Training Calendar
          </Typography>
          <Calendar
            onChange={setDate}
            value={date}
            className="custom-calendar"
          />
        </Card>
      </Grid>

      {/* Top Clients */}
      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Top Performing Clients
          </Typography>
          <List>
            {['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Tom Brown'].map((client, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{client[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={client}
                    secondary={`Last session: ${new Date().toLocaleDateString()}`}
                  />
                  <Chip
                    label={`${90 - index * 5}% Progress`}
                    color="primary"
                    size="small"
                  />
                </ListItem>
                {index < 4 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Card>
      </Grid>

      {/* Leaderboard */}
      <Grid item xs={12}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Trainer Leaderboard
          </Typography>
          <Grid container spacing={3}>
            {['Most Sessions', 'Best Feedback', 'Client Progress'].map((category, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ bgcolor: 'background.default' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <EmojiEvents sx={{ color: '#FFD700', mr: 1 }} />
                      <Typography variant="h6">{category}</Typography>
                    </Box>
                    <List dense>
                      {[1, 2, 3].map((pos) => (
                        <ListItem key={pos}>
                          <ListItemText
                            primary={`${pos}. Trainer ${pos}`}
                            secondary={`${100 - pos * 10} points`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}