import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  IconButton,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Search,
  FilterList,
  Restaurant,
  TrendingUp,
  Event,
  Book,
  Warning,
  Add as AddIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function DashboardContent() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [clients, setClients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dietitian/dashboard-data');
      const data = await response.json();
      setClients(data.clients);
      setAppointments(data.appointments);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // Client Overview Section
  const ClientOverview = () => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Client Overview</Typography>
          <Box>
            <TextField
              size="small"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton>
              <FilterList />
            </IconButton>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Client</TableCell>
                <TableCell>Goal</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 1 }}>{client.name[0]}</Avatar>
                      <Box>
                        <Typography variant="subtitle2">{client.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          BMI: {client.bmi}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{client.goal}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress
                        variant="determinate"
                        value={client.progress}
                        size={24}
                        sx={{ mr: 1 }}
                      />
                      {client.progress}%
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={client.status}
                      color={client.status === 'On Track' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  // Health Analytics Section
  const HealthAnalytics = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Health Analytics
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={clientProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                <Line type="monotone" dataKey="bmi" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>
              Nutrition Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={nutritionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                >
                  {nutritionData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  // Appointment Scheduler Section
  const AppointmentScheduler = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upcoming Appointments
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="custom-calendar"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <List>
              {appointments.map((appointment) => (
                <ListItem key={appointment.id}>
                  <ListItemAvatar>
                    <Avatar>{appointment.clientName[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={appointment.clientName}
                    secondary={`${appointment.date} - ${appointment.time}`}
                  />
                  <Chip
                    label={appointment.status}
                    color={appointment.status === 'Confirmed' ? 'success' : 'warning'}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  // Resources Section
  const Resources = () => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Resources & Tips
        </Typography>
        <Grid container spacing={2}>
          {resourceCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.title}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {category.title}
                  </Typography>
                  <List dense>
                    {category.items.map((item, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Clients
              </Typography>
              <Typography variant="h4">{clients.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add more summary cards */}

        {/* Main Content */}
        <Grid item xs={12}>
          <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)}>
            <Tab label="Client Overview" />
            <Tab label="Health Analytics" />
            <Tab label="Appointments" />
            <Tab label="Resources" />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {selectedTab === 0 && <ClientOverview />}
            {selectedTab === 1 && <HealthAnalytics />}
            {selectedTab === 2 && <AppointmentScheduler />}
            {selectedTab === 3 && <Resources />}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

// Mock data
const clientProgressData = [
  { date: '2024-01', weight: 75, bmi: 24 },
  { date: '2024-02', weight: 73, bmi: 23.5 },
  // Add more data points
];

const nutritionData = [
  { name: 'Proteins', value: 30 },
  { name: 'Carbs', value: 45 },
  { name: 'Fats', value: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const resourceCategories = [
  {
    title: 'Meal Planning',
    items: [
      'Balanced Diet Guidelines',
      'Portion Control Tips',
      'Meal Prep Basics',
    ],
  },
  {
    title: 'Nutrition Education',
    items: [
      'Understanding Macros',
      'Reading Food Labels',
      'Healthy Substitutions',
    ],
  },
  {
    title: 'Lifestyle Tips',
    items: [
      'Stress Management',
      'Sleep Optimization',
      'Mindful Eating',
    ],
  },
];