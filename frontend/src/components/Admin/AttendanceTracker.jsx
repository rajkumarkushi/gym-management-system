import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Avatar,
  IconButton,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search,
  CalendarToday,
  CheckCircle,
  Cancel,
  Timer,
  TrendingUp,
  FilterList,
  Download,
  Person,
  Group,
  AccessTime,
  DateRange,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

// Styled Components
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

const AttendanceChip = styled(Chip)(({ status }) => ({
  backgroundColor: 
    status === 'present' ? 'rgba(46, 204, 113, 0.2)' : 
    status === 'absent' ? 'rgba(231, 76, 60, 0.2)' : 
    'rgba(241, 196, 15, 0.2)',
  color: 
    status === 'present' ? '#2ecc71' : 
    status === 'absent' ? '#e74c3c' : 
    '#f1c40f',
}));

// Demo Data
const attendanceStats = {
  totalMembers: 150,
  presentToday: 85,
  absentToday: 65,
  averageAttendance: 78,
};

const weeklyAttendance = [
  { day: 'Mon', present: 82, absent: 68 },
  { day: 'Tue', present: 88, absent: 62 },
  { day: 'Wed', present: 85, absent: 65 },
  { day: 'Thu', present: 90, absent: 60 },
  { day: 'Fri', present: 85, absent: 65 },
  { day: 'Sat', present: 75, absent: 75 },
  { day: 'Sun', present: 70, absent: 80 },
];

const memberAttendance = [
  {
    id: 1,
    name: 'John Doe',
    avatar: '/path/to/avatar1.jpg',
    checkIn: '09:00 AM',
    checkOut: '11:00 AM',
    status: 'present',
    attendance: 85,
  },
  // Add more members...
];

export default function AttendanceTracker() {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderAttendanceOverview = () => (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {[
        {
          title: 'Total Members',
          value: attendanceStats.totalMembers,
          icon: <Group />,
          color: '#FFD700',
        },
        {
          title: 'Present Today',
          value: attendanceStats.presentToday,
          icon: <CheckCircle />,
          color: '#2ecc71',
        },
        {
          title: 'Absent Today',
          value: attendanceStats.absentToday,
          icon: <Cancel />,
          color: '#e74c3c',
        },
        {
          title: 'Average Attendance',
          value: `${attendanceStats.averageAttendance}%`,
          icon: <TrendingUp />,
          color: '#3498db',
        },
      ].map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StyledCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ my: 1, color: stat.color }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    bgcolor: `${stat.color}20`,
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </Avatar>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );

  const renderWeeklyChart = () => (
    <StyledCard sx={{ mb: 4 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Weekly Attendance Overview</Typography>
          <Box display="flex" gap={1}>
            <Button
              startIcon={<FilterList />}
              size="small"
              sx={{ borderColor: '#FFD700', color: '#FFD700' }}
              variant="outlined"
            >
              Filter
            </Button>
            <Button
              startIcon={<Download />}
              size="small"
              sx={{ bgcolor: '#FFD700', '&:hover': { bgcolor: '#E6C200' } }}
              variant="contained"
            >
              Export
            </Button>
          </Box>
        </Box>
        <Box height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyAttendance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <RechartsTooltip />
              <Bar dataKey="present" name="Present" fill="#2ecc71" />
              <Bar dataKey="absent" name="Absent" fill="#e74c3c" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </StyledCard>
  );

  const renderAttendanceTable = () => (
    <Paper sx={{ borderRadius: '12px', overflow: 'hidden' }}>
      <Box p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Member Attendance</Typography>
          <TextField
            size="small"
            placeholder="Search member..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ width: 250 }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member</TableCell>
                <TableCell>Check In</TableCell>
                <TableCell>Check Out</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Monthly Attendance</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memberAttendance.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={member.avatar}>
                        {member.name.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">{member.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                      {member.checkIn}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                      {member.checkOut}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <AttendanceChip
                      label={member.status}
                      status={member.status}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box flex={1}>
                        <LinearProgress
                          variant="determinate"
                          value={member.attendance}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: 'rgba(255, 215, 0, 0.2)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#FFD700',
                            },
                          }}
                        />
                      </Box>
                      <Typography variant="body2">{member.attendance}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton size="small">
                        <Person />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Attendance History">
                      <IconButton size="small">
                        <DateRange />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Attendance Tracker</Typography>
        <Box display="flex" gap={2}>
          <Button
            startIcon={<CalendarToday />}
            variant="outlined"
            sx={{ borderColor: '#FFD700', color: '#FFD700' }}
          >
            Select Date
          </Button>
          <Button
            startIcon={<Download />}
            variant="contained"
            sx={{ bgcolor: '#FFD700', '&:hover': { bgcolor: '#E6C200' } }}
          >
            Export Report
          </Button>
        </Box>
      </Box>

      {renderAttendanceOverview()}
      {renderWeeklyChart()}

      <Paper sx={{ mb: 4, borderRadius: '12px' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .Mui-selected': {
              color: '#FFD700 !important',
            },
          }}
        >
          <Tab label="All Members" />
          <Tab label="Present Today" />
          <Tab label="Absent Today" />
          <Tab label="Late Check-ins" />
        </Tabs>
      </Paper>

      {renderAttendanceTable()}
    </Container>
  );
}