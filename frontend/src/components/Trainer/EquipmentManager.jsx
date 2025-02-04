import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  MenuItem,
  Dialog,
  DialogContent,
  CardMedia,
  Box,
  CircularProgress,
  Chip,
  IconButton,
  DialogTitle,
  Alert,
  Snackbar,
  Paper,
  Divider,
} from '@mui/material';
import {
  FitnessCenter,
  AddCircle,
  PendingActions,
  CheckCircle,
  Category,
  Close,
  Edit,
  Delete,
  Inventory,
} from '@mui/icons-material';

const API_URL = 'http://localhost:8081/api/auth/fetchequipments';

const CATEGORIES = [
  {
    id: 'dumbbells',
    name: 'Dumbbells',
    icon: <FitnessCenter sx={{ fontSize: 40 }} />,
    color: '#FFD700',
    bgColor: '#333',
    description: 'Free weights for strength training',
    subcategories: ['Light (1-10kg)', 'Medium (11-25kg)', 'Heavy (26kg+)']
  },
  {
    id: 'barbells',
    name: 'Barbells',
    icon: <FitnessCenter sx={{ fontSize: 40 }} />,
    color: '#FFD700',
    bgColor: '#333',
    description: 'Olympic and standard barbells',
    subcategories: ['Standard', 'Olympic', 'EZ Curl']
  },
  {
    id: 'machines',
    name: 'Machines',
    icon: <FitnessCenter sx={{ fontSize: 40 }} />,
    color: '#FFD700',
    bgColor: '#333',
    description: 'Weight and cardio machines',
    subcategories: ['Cardio', 'Strength', 'Cable']
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: <Category sx={{ fontSize: 40 }} />,
    color: '#FFD700',
    bgColor: '#333',
    description: 'Training accessories and equipment',
    subcategories: ['Mats', 'Bands', 'Others']
  },
];

export default function EquipmentManager() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
  const [newEquipment, setNewEquipment] = useState({
    name: 'dumble',
    category: CATEGORIES[0].name,
    weight: '',
    quantity: '',
    description: '',
    // image: null,
    status: 'available',
  });

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      setEquipments(response.data);
    } catch (error) {
      showNotification('Error fetching equipment data', 'error');
    } finally {
      setLoading(false);
    }
  };
  const API_BASE_URL = 'http://localhost:8081/api/auth';

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/equipments/${id}`);
      showNotification('Equipment deleted successfully', 'success');
      fetchEquipments();
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error deleting equipment', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEquipmentSubmit = async () => {
    try {
      setLoading(true);
      const equipmentData = {
        name: newEquipment.name,
        category: newEquipment.category,
        weight: newEquipment.weight,
        quantity: newEquipment.quantity,
        description: newEquipment.description,
        status: newEquipment.status
      };
  
      const url = newEquipment.id 
        ? `${API_BASE_URL}/equipments/${newEquipment.id}`
        : `${API_BASE_URL}/addequipment`;
      
      const method = newEquipment.id ? 'put' : 'post';
  
      await axios[method](url, equipmentData);
      showNotification(
        newEquipment.id ? 'Equipment updated successfully' : 'Equipment added successfully',
        'success'
      );
      setOpenDialog(false);
      resetForm();
      fetchEquipments();
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error saving equipment', 'error');
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (equipment) => {
    setNewEquipment(equipment);
    setOpenDialog(true);
  };

  const showNotification = (message, type) => {
    setNotification({
      open: true,
      message,
      type,
    });
  };

  const resetForm = () => {
    setNewEquipment({
      name: '',
      category: CATEGORIES[0].name,
      weight: '',
      quantity: '',
      description: '',
      status: 'available',
    });
  };
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewEquipment({ ...newEquipment, image: file });
    }
  };

  const CategoryCard = ({ category }) => (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 3,
        },
        position: 'relative',
        overflow: 'visible',
        backgroundColor: category.bgColor,
        color: category.color,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          left: 20,
          backgroundColor: category.color,
          borderRadius: '50%',
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          boxShadow: 2,
        }}
      >
        {category.icon}
      </Box>
      <CardContent sx={{ pt: 5 }}>
        <Typography variant="h6" gutterBottom sx={{ color: category.color, mt: 2 }}>
          {category.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {category.description}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {category.subcategories.map((sub) => (
            <Chip
              key={sub}
              label={sub}
              size="small"
              sx={{ 
                backgroundColor: category.bgColor,
                color: category.color,
                '&:hover': { backgroundColor: category.color, color: 'white' }
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  const EquipmentCard = ({ equipment }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 3,
        },
        backgroundColor: '#1E1E1E',
        color: '#FFD700',
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {equipment.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <Chip
            label={`${equipment.weight}kg`}
            size="small"
            icon={<FitnessCenter />}
            sx={{ backgroundColor: '#E3F2FD', color: '#1976D2' }}
          />
          <Chip
            label={`Qty: ${equipment.quantity}`}
            size="small"
            icon={<Inventory />}
            sx={{ backgroundColor: '#E8F5E9', color: '#2E7D32' }}
          />
          <Chip
            label={equipment.status}
            size="small"
            icon={equipment.status === 'available' ? <CheckCircle /> : <PendingActions />}
            sx={{ 
              backgroundColor: equipment.status === 'available' ? '#E8F5E9' : '#FFF3E0',
              color: equipment.status === 'available' ? '#2E7D32' : '#ED6C02'
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <IconButton
            size="small"
            sx={{ color: '#1976D2' }}
            onClick={() => handleEdit(equipment)}
          >
            <Edit />
          </IconButton>
          <IconButton
            size="small"
            sx={{ color: '#D32F2F' }}
            onClick={() => handleDelete(equipment.id)}
          >
            <Delete />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
  return (
    <Box sx={{ p: 3, backgroundColor: '#121212', minHeight: '100vh' }}>
      {/* Header */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          background: 'linear-gradient(45deg, #FFD700 30%, #FFC107 90%)',
          color: 'white'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Gym Equipment Manager
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
              Manage your gym equipment inventory efficiently
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddCircle />}
            onClick={() => setOpenDialog(true)}
            sx={{ 
              bgcolor: 'white',
              color: '#FFD700',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              }
            }}
          >
            Add Equipment
          </Button>
        </Box>
      </Paper>

      {/* Categories Section */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#FFD700' }}>
        Equipment Categories
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {CATEGORIES.map((category) => (
          <Grid item xs={12} sm={6} md={3} key={category.id}>
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>

      {/* Equipment List Section */}
      {CATEGORIES.map((category) => (
        <Box key={category.id} sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box
              sx={{
                backgroundColor: category.bgColor,
                p: 1,
                borderRadius: '50%',
                mr: 2
              }}
            >
              {category.icon}
            </Box>
            <Typography variant="h5" sx={{ color: category.color, fontWeight: 'bold' }}>
              {category.name}
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              equipments
                .filter(eq => eq.category === category.name)
                .map((equipment) => (
                  <Grid item xs={12} sm={6} md={4} key={equipment.id}>
                    <EquipmentCard equipment={equipment} />
                  </Grid>
                ))
            )}
          </Grid>
        </Box>
      ))}

      {/* Add Equipment Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Add New Equipment</Typography>
            <IconButton onClick={() => setOpenDialog(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Equipment Name"
              value={newEquipment.name}
              onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              select
              label="Category"
              value={newEquipment.category}
              onChange={(e) => setNewEquipment({...newEquipment, category: e.target.value})}
              margin="normal"
            >
              {CATEGORIES.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              type="number"
              label="Weight (kg)"
              value={newEquipment.weight}
              onChange={(e) => setNewEquipment({...newEquipment, weight: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              value={newEquipment.quantity}
              onChange={(e) => setNewEquipment({...newEquipment, quantity: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={newEquipment.description}
              onChange={(e) => setNewEquipment({...newEquipment, description: e.target.value})}
              margin="normal"
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleEquipmentSubmit}
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Add Equipment'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert 
          onClose={() => setNotification({ ...notification, open: false })} 
          severity={notification.type}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}