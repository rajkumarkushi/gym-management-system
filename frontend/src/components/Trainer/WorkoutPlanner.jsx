import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Autocomplete,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import axios from 'axios';

const WorkoutPlanner = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [workoutPlan, setWorkoutPlan] = useState({
    Monday: { exercises: [], type: '', duration: '' },
    Tuesday: { exercises: [], type: '', duration: '' },
    Wednesday: { exercises: [], type: '', duration: '' },
    Thursday: { exercises: [], type: '', duration: '' },
    Friday: { exercises: [], type: '', duration: '' },
    Saturday: { exercises: [], type: '', duration: '' }
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: '',
    weight: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const exerciseList = [
    'Bench Press',
    'Squats',
    'Deadlifts',
    'Pull-ups',
    'Push-ups',
    'Shoulder Press',
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchWorkoutPlan();
    }
  }, [selectedUser]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/auth/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchWorkoutPlan = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8081/api/auth/workout-plan/${selectedUser.id}`);
      if (response.data.weeklyPlan) {
        setWorkoutPlan(response.data.weeklyPlan);
      }
    } catch (error) {
      console.error('Error fetching workout plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExercise = (day) => {
    setSelectedDay(day);
    setOpenDialog(true);
  };

  const handleSaveExercise = () => {
    if (newExercise.name && newExercise.sets) {
      setWorkoutPlan(prev => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          exercises: [...prev[selectedDay].exercises, newExercise]
        }
      }));
      setNewExercise({ name: '', sets: '', weight: '' });
      setOpenDialog(false);
    }
  };

  const handleDeleteExercise = (day, index) => {
    setWorkoutPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        exercises: prev[day].exercises.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSaveWorkoutPlan = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      const workoutData = {
        userId: selectedUser.id,
        weeklyPlan: workoutPlan
      };

      await axios.post('http://localhost:8081/api/auth/workout-plan', workoutData);
      alert('Workout plan saved successfully!');
    } catch (error) {
      console.error('Error saving workout plan:', error);
      alert('Failed to save workout plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Workout Planner
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Autocomplete
          options={users}
          getOptionLabel={(option) => `${option.name} (${option.email})`}
          value={selectedUser}
          onChange={(_, newValue) => setSelectedUser(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select User"
              variant="outlined"
              fullWidth
            />
          )}
          sx={{ mb: 2 }}
        />
      </Box>

      <Grid container spacing={3}>
        {Object.entries(workoutPlan).map(([day, plan]) => (
          <Grid item xs={12} md={6} lg={4} key={day}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {day}
                </Typography>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Workout Type</InputLabel>
                  <Select
                    value={plan.type}
                    label="Workout Type"
                    onChange={(e) => setWorkoutPlan(prev => ({
                      ...prev,
                      [day]: { ...prev[day], type: e.target.value }
                    }))}
                  >
                    <MenuItem value="Chest">Chest</MenuItem>
                    <MenuItem value="Back">Back</MenuItem>
                    <MenuItem value="Legs">Legs</MenuItem>
                    <MenuItem value="Shoulders">Shoulders</MenuItem>
                    <MenuItem value="Arms">Arms</MenuItem>
                    <MenuItem value="Core">Core</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Duration (mins)"
                  value={plan.duration}
                  onChange={(e) => setWorkoutPlan(prev => ({
                    ...prev,
                    [day]: { ...prev[day], duration: e.target.value }
                  }))}
                  sx={{ mb: 2 }}
                />

                <List>
                  {plan.exercises.map((exercise, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton 
                          edge="end" 
                          onClick={() => handleDeleteExercise(day, index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={exercise.name}
                        secondary={`${exercise.sets} ${exercise.weight ? `@ ${exercise.weight}` : ''}`}
                      />
                    </ListItem>
                  ))}
                </List>

                <Button
                  startIcon={<AddIcon />}
                  onClick={() => handleAddExercise(day)}
                  variant="outlined"
                  fullWidth
                >
                  Add Exercise
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveWorkoutPlan}
          disabled={!selectedUser || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Save Workout Plan'}
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Exercise</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={exerciseList}
            value={newExercise.name}
            onChange={(_, newValue) => setNewExercise(prev => ({ ...prev, name: newValue }))}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Exercise Name"
                fullWidth
                margin="normal"
              />
            )}
          />
          <TextField
            label="Sets x Reps"
            value={newExercise.sets}
            onChange={(e) => setNewExercise(prev => ({ ...prev, sets: e.target.value }))}
            fullWidth
            margin="normal"
            placeholder="e.g., 3x12"
          />
          <TextField
            label="Weight (optional)"
            value={newExercise.weight}
            onChange={(e) => setNewExercise(prev => ({ ...prev, weight: e.target.value }))}
            fullWidth
            margin="normal"
            placeholder="e.g., 50kg"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveExercise} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkoutPlanner;