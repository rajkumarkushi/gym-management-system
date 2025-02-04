import React, { useState } from 'react';

import { cardStyle } from '../../styles/CommonStyles';
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Add as AddIcon,
} from '@mui/icons-material';
// import { cardStyle } from './UserDashboard';

const ReportsContent = ({ userData }) => {
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [notes, setNotes] = useState('');
  const [reports, setReports] = useState([]);

  const workoutTypes = [
    'Strength Training',
    'Cardio',
    'HIIT',
    'Yoga',
    'Pilates',
    'Swimming',
    'Cycling',
    'Running',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      workoutType,
      duration,
      caloriesBurned,
      notes,
    };
    setReports([newReport, ...reports]);
    resetForm();
  };

  const resetForm = () => {
    setWorkoutType('');
    setDuration('');
    setCaloriesBurned('');
    setNotes('');
  };

  const handleDelete = (id) => {
    setReports(reports.filter(report => report.id !== id));
  };

  const handleDownload = (report) => {
    // Create report content
    const reportContent = `
Workout Report
Date: ${report.date}
Type: ${report.workoutType}
Duration: ${report.duration} minutes
Calories Burned: ${report.caloriesBurned}
Notes: ${report.notes}
    `.trim();

    // Create and download file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workout-report-${report.date}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Grid container spacing={3}>
      {/* Report Generation Form */}
      <Grid item xs={12} md={6}>
        <Paper sx={cardStyle}>
          <Typography variant="h6" gutterBottom>
            Create New Workout Report
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Workout Type</InputLabel>
              <Select
                value={workoutType}
                onChange={(e) => setWorkoutType(e.target.value)}
                required
                label="Workout Type"
              >
                {workoutTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Duration (minutes)"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Calories Burned"
              type="number"
              value={caloriesBurned}
              onChange={(e) => setCaloriesBurned(e.target.value)}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              fullWidth
            >
              Generate Report
            </Button>
          </form>
        </Paper>
      </Grid>

      {/* Monthly Summary */}
      <Grid item xs={12} md={6}>
        <Paper sx={cardStyle}>
          <Typography variant="h6" gutterBottom>
            Monthly Summary
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">
              Total Workouts: {reports.length}
            </Typography>
            <Typography variant="body1">
              Total Minutes: {reports.reduce((acc, curr) => acc + Number(curr.duration), 0)}
            </Typography>
            <Typography variant="body1">
              Total Calories: {reports.reduce((acc, curr) => acc + Number(curr.caloriesBurned), 0)}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Reports Table */}
      <Grid item xs={12}>
        <Paper sx={cardStyle}>
          <Typography variant="h6" gutterBottom>
            Workout History
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Workout Type</TableCell>
                  <TableCell align="right">Duration (min)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.workoutType}</TableCell>
                    <TableCell align="right">{report.duration}</TableCell>
                    <TableCell align="right">{report.caloriesBurned}</TableCell>
                    <TableCell>{report.notes}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleDownload(report)}
                        size="small"
                      >
                        <DownloadIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(report.id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {reports.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No reports available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReportsContent;