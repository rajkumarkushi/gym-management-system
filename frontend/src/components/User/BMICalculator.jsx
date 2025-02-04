import React, { useState } from 'react';

import {
  FitnessCenter,
  Info as InfoIcon,
  TrendingUp,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { cardStyle } from '../../styles/CommonStyles';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [unit, setUnit] = useState('metric');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const calculateBMI = () => {
    if (!height || !weight || !age || !gender) {
      setError('Please fill in all fields');
      return;
    }

    let bmiValue;
    if (unit === 'metric') {
      const heightInMeters = height / 100;
      bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    } else {
      bmiValue = ((weight * 703) / (height * height)).toFixed(1);
    }

    setBmi(bmiValue);
    setError('');

    // Determine BMI category with more detailed categorization
    if (bmiValue < 16) {
      setCategory('Severe Underweight');
    } else if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue < 25) {
      setCategory('Normal weight');
    } else if (bmiValue < 30) {
      setCategory('Overweight');
    } else if (bmiValue < 35) {
      setCategory('Obese Class I');
    } else if (bmiValue < 40) {
      setCategory('Obese Class II');
    } else {
      setCategory('Obese Class III');
    }
  };

  const getBMIColor = () => {
    switch (category) {
      case 'Severe Underweight':
        return '#e74c3c';
      case 'Underweight':
        return '#3498db';
      case 'Normal weight':
        return '#2ecc71';
      case 'Overweight':
        return '#f1c40f';
      case 'Obese Class I':
        return '#e67e22';
      case 'Obese Class II':
      case 'Obese Class III':
        return '#c0392b';
      default:
        return 'primary';
    }
  };

  const getHealthTips = () => {
    switch (category) {
      case 'Severe Underweight':
      case 'Underweight':
        return [
          'Increase caloric intake with nutrient-rich foods',
          'Add strength training to build muscle mass',
          'Eat frequent meals throughout the day',
          'Include healthy fats in your diet',
        ];
      case 'Normal weight':
        return [
          'Maintain a balanced diet',
          'Regular exercise (150 minutes per week)',
          'Stay hydrated',
          'Get adequate sleep',
        ];
      case 'Overweight':
        return [
          'Create a moderate caloric deficit',
          'Increase physical activity',
          'Focus on whole foods',
          'Monitor portion sizes',
        ];
      case 'Obese Class I':
      case 'Obese Class II':
      case 'Obese Class III':
        return [
          'Consult with a healthcare provider',
          'Start with low-impact exercises',
          'Make gradual dietary changes',
          'Consider working with a nutritionist',
        ];
      default:
        return [];
    }
  };

  const clearFields = () => {
    setHeight('');
    setWeight('');
    setAge('');
    setGender('');
    setBmi(null);
    setCategory('');
    setError('');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Unit System Selection */}
        <Grid item xs={12}>
          <Paper 
            elevation={3} 
            sx={{ 
              ...cardStyle, 
              p: 3, 
              borderRadius: 3,
              backgroundColor: 'background.default'
            }}
          >
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600, 
                  color: 'text.primary',
                  mb: 2 
                }}
              >
                Select Unit System
              </Typography>
              <RadioGroup
                row
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                  setWeight('');
                  setHeight('');
                }}
                sx={{ 
                  justifyContent: 'center', 
                  gap: 3 
                }}
              >
                <FormControlLabel 
                  value="metric" 
                  control={<Radio />} 
                  label="Metric (kg/cm)" 
                  sx={{ 
                    '& .MuiTypography-root': { 
                      fontWeight: 500 
                    } 
                  }}
                />
                <FormControlLabel 
                  value="imperial" 
                  control={<Radio />} 
                  label="Imperial (lbs/in)" 
                  sx={{ 
                    '& .MuiTypography-root': { 
                      fontWeight: 500 
                    } 
                  }}
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>

        {/* Main Calculator Container */}
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {/* Personal Information */}
            <Grid item xs={12} md={4}>
              <Paper 
                elevation={3} 
                sx={{ 
                  ...cardStyle, 
                  p: 3, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  backgroundColor: 'background.default'
                }}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 3,
                    textAlign: 'center' 
                  }}
                >
                  Personal Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    variant="outlined"
                  />
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={gender}
                      label="Gender"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Paper>
            </Grid>

            {/* BMI Calculator Form */}
            <Grid item xs={12} md={8}>
              <Paper 
                elevation={3} 
                sx={{ 
                  ...cardStyle, 
                  p: 3, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  backgroundColor: 'background.default'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <FitnessCenter sx={{ fontSize: 30, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    BMI Calculator
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    fullWidth
                    label={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    variant="outlined"
                    error={!!error && !height}
                  />

                  <TextField
                    fullWidth
                    label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    variant="outlined"
                    error={!!error && !weight}
                  />

                  {error && (
                    <Typography color="error" sx={{ textAlign: 'center' }}>
                      {error}
                    </Typography>
                  )}

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={calculateBMI}
                      fullWidth
                      startIcon={<TrendingUp />}
                      sx={{ py: 1.5 }}
                    >
                      Calculate BMI
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={clearFields}
                      fullWidth
                      sx={{ py: 1.5 }}
                    >
                      Clear
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Results and Additional Information */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              ...cardStyle, 
              p: 3, 
              height: '100%', 
              borderRadius: 3,
              backgroundColor: 'background.default'
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Your Results
            </Typography>
            
            {bmi && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: getBMIColor(), mb: 2, fontWeight: 700 }}>
                  {bmi}
                </Typography>
                <Typography variant="h6" sx={{ color: getBMIColor(), mb: 3, fontWeight: 600 }}>
                  {category}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(bmi / 40) * 100}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getBMIColor(),
                    },
                    mb: 3,
                  }}
                />
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    Age: {age} | Gender: {gender}
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* BMI Categories */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              ...cardStyle, 
              p: 3, 
              height: '100%', 
              borderRadius: 3,
              backgroundColor: 'background.default'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              BMI Categories
            </Typography>
            <Box sx={{ display: 'grid', gap: 1 }}>
              <Typography variant="body2">Severe Underweight: &lt; 16</Typography>
              <Typography variant="body2">Underweight: 16 - 18.4</Typography>
              <Typography variant="body2">Normal weight: 18.5 - 24.9</Typography>
              <Typography variant="body2">Overweight: 25 - 29.9</Typography>
              <Typography variant="body2">Obese Class I: 30 - 34.9</Typography>
              <Typography variant="body2">Obese Class II: 35 - 39.9</Typography>
              <Typography variant="body2">Obese Class III: ≥ 40</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Health Tips */}
        {category && (
          <Grid item xs={12}>
            <Paper 
              elevation={3} 
              sx={{ 
                ...cardStyle, 
                p: 3, 
                borderRadius: 3,
                backgroundColor: 'background.default'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <InfoIcon sx={{ fontSize: 24, color: 'primary.main', mr: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recommended Health Tips
                </Typography>
              </Box>
              <Grid container spacing={3}>
                {getHealthTips().map((tip, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="body1" sx={{ textAlign: 'center', width: '100%' }}>
                        {tip}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        )}

        {/* Disclaimer */}
        <Grid item xs={12}>
          <Paper 
            elevation={3} 
            sx={{ 
              ...cardStyle, 
              p: 3, 
              borderRadius: 3,
              backgroundColor: 'rgba(255, 215, 0, 0.1)' 
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Disclaimer: BMI is a general indicator and may not be accurate for athletes, 
              elderly, or pregnant women. Please consult with a healthcare provider for 
              personalized advice.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BMICalculator;