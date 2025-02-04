import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarTodayIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function ServiceManager() {
  const [services, setServices] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchServiceData();
  }, []);

  const fetchServiceData = async () => {
    try {
      const response = await fetch('/api/gym/services');
      const data = await response.json();
      setServices(data.services);
      setEquipment(data.equipment);
      setServiceProviders(data.serviceProviders);
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  const handleAddService = () => {
    setSelectedService(null);
    setOpenDialog(true);
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setOpenDialog(true);
  };

  const handleSaveService = async () => {
    try {
      const serviceData = {
        equipmentId: selectedService?.equipmentId || '',
        serviceDate: selectedService?.serviceDate || new Date(),
        providerId: selectedService?.providerId || '',
        issuesResolved: selectedService?.issuesResolved || '',
        nextServiceDate: selectedService?.nextServiceDate || new Date(),
      };

      const url = selectedService?.id 
        ? `/api/gym/services/${selectedService.id}`
        : '/api/gym/services';

      const method = selectedService?.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) throw new Error('Failed to save service');

      fetchServiceData();
      setOpenDialog(false);
      setSelectedService(null);
      setSnackbarMessage('Service saved successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving service:', error);
      setSnackbarMessage('Failed to save service');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const response = await fetch(`/api/gym/services/${serviceId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete service');

      fetchServiceData();
      setSnackbarMessage('Service deleted successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting service:', error);
      setSnackbarMessage('Failed to delete service');
      setSnackbarOpen(true);
    }
  };

  const renderDialogContent = () => (
    <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Equipment</InputLabel>
            <Select
              value={selectedService?.equipmentId || ''}
              onChange={(e) => setSelectedService(prev => ({
                ...prev,
                equipmentId: e.target.value
              }))}
            >
              {equipment.map(eq => (
                <MenuItem key={eq.id} value={eq.id}>{eq.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Service Date"
              value={selectedService?.serviceDate || new Date()}
              onChange={(date) => setSelectedService(prev => ({
                ...prev,
                serviceDate: date
              }))}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Service Provider</InputLabel>
            <Select
              value={selectedService?.providerId || ''}
              onChange={(e) => setSelectedService(prev => ({
                ...prev,
                providerId: e.target.value
              }))}
            >
              {serviceProviders.map(provider => (
                <MenuItem key={provider.id} value={provider.id}>{provider.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Issues Resolved"
            value={selectedService?.issuesResolved || ''}
            onChange={(e) => setSelectedService(prev => ({
              ...prev,
              issuesResolved: e.target.value
            }))}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Next Service Date"
              value={selectedService?.nextServiceDate || new Date()}
              onChange={(date) => setSelectedService(prev => ({
                ...prev,
                nextServiceDate: date
              }))}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </DialogContent>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Service Management
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddService}
        sx={{ mb: 3 }}
      >
        Add Service Record
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Equipment</TableCell>
              <TableCell>Service Date</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Issues Resolved</TableCell>
              <TableCell>Next Service Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map(service => (
              <TableRow key={service.id}>
                <TableCell>{service.equipmentName}</TableCell>
                <TableCell>{new Date(service.serviceDate).toLocaleDateString()}</TableCell>
                <TableCell>{service.providerName}</TableCell>
                <TableCell>{service.issuesResolved}</TableCell>
                <TableCell>{new Date(service.nextServiceDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  {new Date(service.nextServiceDate) < new Date() ? (
                    <Chip label="Overdue" color="error" icon={<WarningIcon />} />
                  ) : (
                    <Chip label="Scheduled" color="primary" icon={<CalendarTodayIcon />} />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditService(service)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteService(service.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedService(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedService?.id ? 'Edit Service Record' : 'Add New Service Record'}
        </DialogTitle>
        {renderDialogContent()}
        <DialogActions>
          <Button onClick={() => {
            setOpenDialog(false);
            setSelectedService(null);
          }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveService}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}