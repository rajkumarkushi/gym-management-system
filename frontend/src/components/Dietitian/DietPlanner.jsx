import React, { useState } from 'react';
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
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';

const DietPlanner = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [mealPlan, setMealPlan] = useState({
    Monday: { meals: [], calories: '', notes: '' },
    Tuesday: { meals: [], calories: '', notes: '' },
    Wednesday: { meals: [], calories: '', notes: '' },
    Thursday: { meals: [], calories: '', notes: '' },
    Friday: { meals: [], calories: '', notes: '' },
    Saturday: { meals: [], calories: '', notes: '' },
    Sunday: { meals: [], calories: '', notes: '' },
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [newMeal, setNewMeal] = useState({
    type: '',
    food: [],
    time: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  // Demo data - replace with API calls
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', goals: 'Weight Loss' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', goals: 'Muscle Gain' },
  ];

  const foodDatabase = [
    { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6 },
    { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fats: 1.8 },
    { name: 'Salmon', calories: 208, protein: 22, carbs: 0, fats: 13 },
    // Add more foods
  ];

  const mealTypes = ['Breakfast', 'Morning Snack', 'Lunch', 'Evening Snack', 'Dinner'];

  const handleAddMeal = (day) => {
    setSelectedDay(day);
    setOpenDialog(true);
  };

  const handleSaveMeal = () => {
    if (newMeal.type && newMeal.food.length > 0) {
      setMealPlan(prev => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          meals: [...prev[selectedDay].meals, newMeal]
        }
      }));
      setNewMeal({
        type: '',
        food: [],
        time: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
      });
      setOpenDialog(false);
    }
  };

  const handleDeleteMeal = (day, index) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        meals: prev[day].meals.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSaveDietPlan = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch('/api/dietitian/meal-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser.id,
          weeklyPlan: mealPlan,
          startDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Failed to save meal plan');

      // Show success message
      console.log('Meal plan saved successfully');
    } catch (error) {
      console.error('Error saving meal plan:', error);
    }
  };

  const calculateMealNutrition = (selectedFoods) => {
    return selectedFoods.reduce((acc, food) => ({
      calories: acc.calories + food.calories,
      protein: acc.protein + food.protein,
      carbs: acc.carbs + food.carbs,
      fats: acc.fats + food.fats,
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Diet Planner
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Autocomplete
          options={users}
          getOptionLabel={(option) => `${option.name} (${option.email}) - ${option.goals}`}
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
        {Object.entries(mealPlan).map(([day, plan]) => (
          <Grid item xs={12} md={6} lg={4} key={day}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {day}
                </Typography>

                <TextField
                  fullWidth
                  label="Total Calories Target"
                  value={plan.calories}
                  onChange={(e) => setMealPlan(prev => ({
                    ...prev,
                    [day]: { ...prev[day], calories: e.target.value }
                  }))}
                  sx={{ mb: 2 }}
                />

                <List>
                  {plan.meals.map((meal, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <IconButton 
                          edge="end" 
                          onClick={() => handleDeleteMeal(day, index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={meal.type}
                        secondary={
                          <React.Fragment>
                            <Typography variant="body2">
                              Time: {meal.time}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                              {meal.food.map((food, i) => (
                                <Chip
                                  key={i}
                                  label={food.name}
                                  size="small"
                                  sx={{ mr: 0.5, mb: 0.5 }}
                                />
                              ))}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              Calories: {meal.calories} | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                <Button
                  startIcon={<AddIcon />}
                  onClick={() => handleAddMeal(day)}
                  variant="outlined"
                  fullWidth
                >
                  Add Meal
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
          onClick={handleSaveDietPlan}
          disabled={!selectedUser}
        >
          Save Diet Plan
        </Button>
      </Box>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add Meal</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Meal Type</InputLabel>
            <Select
              value={newMeal.type}
              label="Meal Type"
              onChange={(e) => setNewMeal(prev => ({ ...prev, type: e.target.value }))}
            >
              {mealTypes.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Time"
            type="time"
            value={newMeal.time}
            onChange={(e) => setNewMeal(prev => ({ ...prev, time: e.target.value }))}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Autocomplete
            multiple
            options={foodDatabase}
            getOptionLabel={(option) => option.name}
            value={newMeal.food}
            onChange={(_, newValue) => {
              const nutrition = calculateMealNutrition(newValue);
              setNewMeal(prev => ({ 
                ...prev, 
                food: newValue,
                ...nutrition
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Foods"
                fullWidth
                margin="normal"
              />
            )}
          />

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={3}>
              <TextField
                label="Calories"
                value={newMeal.calories}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Protein (g)"
                value={newMeal.protein}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Carbs (g)"
                value={newMeal.carbs}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Fats (g)"
                value={newMeal.fats}
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveMeal} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DietPlanner;