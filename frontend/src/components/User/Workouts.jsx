import React from 'react';
import { 
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CheckCircle,
  AccessTime,
  FitnessCenter,
  Info as InfoIcon
} from '@mui/icons-material';

const Workouts = () => {
  // Demo data - will come from API later
  const workoutDays = [
    {
      day: 'Monday',
      exercises: [
        { name: 'Bench Press', sets: '3x12', weight: '50kg' },
        { name: 'Push-ups', sets: '4x15' },
        { name: 'Shoulder Press', sets: '3x10', weight: '30kg' }
      ],
      completed: true,
      duration: '45 mins',
      type: 'Chest & Shoulders'
    },
    {
      day: 'Tuesday',
      exercises: [
        { name: 'Squats', sets: '4x12', weight: '70kg' },
        { name: 'Leg Press', sets: '3x15', weight: '100kg' },
        { name: 'Lunges', sets: '3x12', weight: '20kg' }
      ],
      completed: false,
      duration: '40 mins',
      type: 'Legs'
    },
    {
      day: 'Wednesday',
      exercises: [
        { name: 'Pull-ups', sets: '3x10' },
        { name: 'Barbell Rows', sets: '4x12', weight: '40kg' },
        { name: 'Lat Pulldowns', sets: '3x12', weight: '45kg' }
      ],
      completed: false,
      duration: '50 mins',
      type: 'Back'
    },
    {
      day: 'Thursday',
      exercises: [
        { name: 'Bicep Curls', sets: '3x12', weight: '15kg' },
        { name: 'Tricep Extensions', sets: '4x12', weight: '20kg' },
        { name: 'Hammer Curls', sets: '3x12', weight: '12kg' }
      ],
      completed: false,
      duration: '35 mins',
      type: 'Arms'
    },
    {
      day: 'Friday',
      exercises: [
        { name: 'Deadlifts', sets: '4x8', weight: '80kg' },
        { name: 'Back Extensions', sets: '3x15' },
        { name: 'Planks', sets: '3x60s' }
      ],
      completed: false,
      duration: '45 mins',
      type: 'Back & Core'
    },
    {
      day: 'Saturday',
      exercises: [
        { name: 'Military Press', sets: '4x10', weight: '35kg' },
        { name: 'Lateral Raises', sets: '3x12', weight: '10kg' },
        { name: 'Front Raises', sets: '3x12', weight: '10kg' }
      ],
      completed: false,
      duration: '40 mins',
      type: 'Shoulders'
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Weekly Workout Plan
      </Typography>

      <Grid container spacing={3}>
        {workoutDays.map((day, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{
                height: '100%',
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}40`
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" component="div">
                      {day.day}
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      {day.type}
                    </Typography>
                  </Box>
                  {day.completed ? (
                    <Chip 
                      icon={<CheckCircle />} 
                      label="Completed" 
                      color="success" 
                      size="small" 
                    />
                  ) : (
                    <Chip 
                      icon={<AccessTime />} 
                      label="Pending" 
                      color="warning" 
                      size="small" 
                    />
                  )}
                </Box>

                <Box sx={{ mb: 2 }}>
                  {day.exercises.map((exercise, idx) => (
                    <Box 
                      key={idx} 
                      sx={{ 
                        mb: 1,
                        p: 1,
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                        '&:hover': {
                          bgcolor: 'action.hover'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FitnessCenter fontSize="small" color="primary" />
                        <Typography variant="body2">
                          {exercise.name} - {exercise.sets}
                          {exercise.weight && ` @ ${exercise.weight}`}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    <AccessTime fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                    {day.duration}
                  </Typography>
                  <Tooltip title="View Details">
                    <IconButton size="small">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                <LinearProgress 
                  variant="determinate" 
                  value={day.completed ? 100 : 0} 
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Workouts;