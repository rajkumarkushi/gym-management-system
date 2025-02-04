import React, { useState } from 'react';

import { cardStyle } from '../../styles/CommonStyles';
import {
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import {
  Event as EventIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
// import { cardStyle } from './UserDashboard';

const Classes = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedClasses, setBookedClasses] = useState([]);

  const availableClasses = [
    'Yoga',
    'Pilates',
    'Zumba',
    'HIIT',
    'Spinning',
    'Boxing',
    'CrossFit',
  ];

  const availableTimes = [
    '06:00 AM',
    '08:00 AM',
    '10:00 AM',
    '12:00 PM',
    '02:00 PM',
    '04:00 PM',
    '06:00 PM',
    '08:00 PM',
  ];

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedClass('');
    setSelectedTime('');
  };

  const handleBookClass = () => {
    if (selectedClass && selectedTime) {
      const newBooking = {
        id: Date.now(),
        className: selectedClass,
        time: selectedTime,
        date: new Date().toLocaleDateString(),
      };
      setBookedClasses([...bookedClasses, newBooking]);
      handleClose();
    }
  };

  const handleCancelClass = (id) => {
    setBookedClasses(bookedClasses.filter((booking) => booking.id !== id));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={cardStyle}>
          <Typography variant="h5" gutterBottom>
            Class Schedule
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
            sx={{ mb: 3 }}
          >
            Book a Class
          </Button>

          <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Class Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookedClasses.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.className}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.time}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleCancelClass(booking.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {bookedClasses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No classes booked yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {/* Available Classes Grid */}
      <Grid item xs={12}>
        <Paper sx={cardStyle}>
          <Typography variant="h6" gutterBottom>
            Available Classes
          </Typography>
          <Grid container spacing={2}>
            {availableClasses.map((className) => (
              <Grid item xs={12} sm={6} md={4} key={className}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'background.paper',
                  }}
                >
                  <EventIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="h6">{className}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Multiple times available
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={() => {
                      setSelectedClass(className);
                      handleClickOpen();
                    }}
                  >
                    Book Now
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>

      {/* Booking Dialog */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Book a Class</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Class</InputLabel>
            <Select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              label="Class"
            >
              {availableClasses.map((className) => (
                <MenuItem key={className} value={className}>
                  {className}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Time</InputLabel>
            <Select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              label="Time"
            >
              {availableTimes.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleBookClass} variant="contained">
            Book
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Classes;