import {
  DirectionsRun,
  FitnessCenter,
  LocalDining,
  Timer,
} from '@mui/icons-material';
import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { cardStyle } from '../../styles/CommonStyles';

const DashboardContent = ({ userData }) => {
  const workoutStats = {
    completed: 12,
    target: 16,
    calories: 3500,
    minutes: 360,
  };

  const weeklyProgress = [
    { day: 'Monday', completed: true, calories: 500, minutes: 60, steps: 8000 },
    { day: 'Tuesday', completed: true, calories: 450, minutes: 45, steps: 7500 },
    { day: 'Wednesday', completed: true, calories: 600, minutes: 75, steps: 9000 },
    { day: 'Thursday', completed: false, calories: 0, minutes: 0, steps: 5000 },
    { day: 'Friday', completed: false, calories: 0, minutes: 0, steps: 0 },
    { day: 'Saturday', completed: false, calories: 0, minutes: 0, steps: 0 },
    { day: 'Sunday', completed: false, calories: 0, minutes: 0, steps: 0 },
  ];

  const StatCard = ({ icon, title, value, subtitle, progress }) => (
    <Paper sx={{ ...cardStyle, textAlign: 'center', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h6" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" color="primary" gutterBottom>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
      {progress && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255, 215, 0, 0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#FFD700',
              },
            }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {progress}% of weekly goal
          </Typography>
        </Box>
      )}
    </Paper>
  );

  return (
    <Grid container spacing={3}>
      {/* Welcome Message */}
      <Grid item xs={12}>
        <Paper sx={{ ...cardStyle, textAlign: 'left', p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Welcome back
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Your {userData.membershipType} membership is active until {userData.membershipEnd}
          </Typography>
        </Paper>
      </Grid>

      {/* Stats Cards */}
      {[
        {
          icon: <FitnessCenter sx={{ fontSize: 40, color: 'primary.main' }} />,
          title: 'Workouts',
          value: `${workoutStats.completed}/${workoutStats.target}`,
          subtitle: 'Weekly workouts',
          progress: (workoutStats.completed / workoutStats.target) * 100,
        },
        {
          icon: <LocalDining sx={{ fontSize: 40, color: 'primary.main' }} />,
          title: 'Calories',
          value: workoutStats.calories,
          subtitle: 'Calories burned',
          progress: 75,
        },
        {
          icon: <Timer sx={{ fontSize: 40, color: 'primary.main' }} />,
          title: 'Time',
          value: `${workoutStats.minutes}min`,
          subtitle: 'Total workout time',
          progress: 80,
        },
        {
          icon: <DirectionsRun sx={{ fontSize: 40, color: 'primary.main' }} />,
          title: 'Activity',
          value: 'Active',
          subtitle: 'Current status',
          progress: 85,
        },
      ].map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}

      {/* Weekly Progress Table */}
      <Grid item xs={12}>
        <Paper sx={{ ...cardStyle, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Weekly Progress
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell align="center">Workout Completed</TableCell>
                  <TableCell align="center">Calories Burned</TableCell>
                  <TableCell align="center">Minutes</TableCell>
                  <TableCell align="center">Steps</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {weeklyProgress.map((day) => (
                  <TableRow key={day.day}>
                    <TableCell component="th" scope="row">
                      {day.day}
                    </TableCell>
                    <TableCell align="center">
                      {day.completed ? '✅' : '❌'}
                    </TableCell>
                    <TableCell align="center">{day.calories}</TableCell>
                    <TableCell align="center">{day.minutes}</TableCell>
                    <TableCell align="center">{day.steps}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {/* Upcoming Schedule */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ ...cardStyle, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Today's Schedule
          </Typography>
          <Box sx={{ p: 2, backgroundColor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="subtitle1" color="primary">
              10:00 AM - Yoga Class
            </Typography>
            <Typography variant="body2" color="text.secondary">
              With Instructor Sarah
            </Typography>
          </Box>
          <Box sx={{ p: 2, mt: 2, backgroundColor: 'background.paper', borderRadius: 1 }}>
            <Typography variant="subtitle1" color="primary">
              2:00 PM - Personal Training
            </Typography>
            <Typography variant="body2" color="text.secondary">
              With Trainer Mike
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Nutrition Goals */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ ...cardStyle, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Nutrition Goals
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Calories</Typography>
            <LinearProgress
              variant="determinate"
              value={70}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 215, 0, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#FFD700',
                },
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              1,400 / 2,000 calories consumed
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1">Protein</Typography>
            <LinearProgress
              variant="determinate"
              value={85}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 215, 0, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#FFD700',
                },
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              85g / 100g protein consumed
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardContent;
