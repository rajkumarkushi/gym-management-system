import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { Add, Edit, Delete, Warning } from '@mui/icons-material';

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    equipment: [],
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch('/http://localhost:8081/api/auth/getvendor');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setVendors(data);
    } catch (err) {
      setError('Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/auth/addvendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setVendors((prev) => [...prev, data]);
      handleDialogClose();
    } catch (err) {
      setError('Failed to add vendor');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Vendor Management
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleDialogOpen}>
        Add Vendor
      </Button>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Equipment Name</TableCell>
              <TableCell>Vendor Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Purchase Date</TableCell>
              <TableCell>Warranty Expiry</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>{vendor.equipment.name}</TableCell>
                <TableCell>{vendor.name}</TableCell>
                <TableCell>{vendor.equipment.quantity}</TableCell>
                <TableCell>{vendor.equipment.purchaseDate}</TableCell>
                <TableCell>{vendor.equipment.warrantyExpiry}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="secondary">
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Vendor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Vendor Name"
            name="name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Contact"
            name="contact"
            fullWidth
            variant="outlined"
            value={formData.contact}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Equipment Name"
            name="equipmentName"
            fullWidth
            variant="outlined"
            value={formData.equipment.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Quantity"
            name="quantity"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.equipment.quantity}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Purchase Date"
            name="purchaseDate"
            type="date"
            fullWidth
            variant="outlined"
            value={formData.equipment.purchaseDate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Warranty Expiry"
            name="warrantyExpiry"
            type="date"
            fullWidth
            variant="outlined"
            value={formData.equipment.warrantyExpiry}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VendorManagement;