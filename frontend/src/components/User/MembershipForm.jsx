import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from '@mui/material';
import axios from 'axios';

const MembershipForm = ({ open, onClose, userData }) => {
  const [membershipType, setMembershipType] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [dietFrequency, setDietFrequency] = useState('');
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      membershipType,
      height,
      weight,
      fitnessGoal,
      targetWeight,
      goalDescription,
      dietaryPreferences,
      dietFrequency,
    };

    try {
      await axios.post(
        `https://gym-management-system-e7874.firebaseio.com/users/${userData.id}.json`,
        formData
      );
      setFormSubmitted(true);
      localStorage.setItem('hasCompletedMembershipForm', 'true');
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error('Error submitting form: ', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Complete Your Membership Profile</DialogTitle>
      <DialogContent>
        <Paper sx={{ p: 3, bgcolor: '#2e2e2e', borderRadius: 2 }}>
          {formSubmitted ? (
            <Box textAlign="center">
              <Typography variant="h5" sx={{ color: '#FFD700' }}>
                Thank You!
              </Typography>
              <Typography sx={{ color: '#fff' }}>
                Your information has been submitted successfully.
              </Typography>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" sx={{ color: '#FFD700', mb: 2 }}>
                Submit Your Information
              </Typography>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel sx={{ color: '#FFD700' }}>Membership Type</InputLabel>
                <Select
                  value={membershipType}
                  onChange={(e) => setMembershipType(e.target.value)}
                  required
                  sx={{ bgcolor: '#1e1e1e', color: '#fff' }}
                >
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                  <MenuItem value="vip">VIP</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Height (cm)"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Weight (kg)"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Fitness Goal"
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Target Weight (kg)"
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Goal Description"
                multiline
                rows={4}
                value={goalDescription}
                onChange={(e) => setGoalDescription(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Dietary Preferences"
                value={dietaryPreferences}
                onChange={(e) => setDietaryPreferences(e.target.value)}
                required
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel sx={{ color: '#FFD700' }}>Diet Frequency</InputLabel>
                <Select
                  value={dietFrequency}
                  onChange={(e) => setDietFrequency(e.target.value)}
                  required
                  sx={{ bgcolor: '#1e1e1e', color: '#fff' }}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>

              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          )}
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipForm;