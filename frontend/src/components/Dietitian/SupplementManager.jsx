import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  Search as SearchIcon,
  Assessment as AssessmentIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function SupplementManager() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [supplements, setSupplements] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [clients, setClients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [usageStats, setUsageStats] = useState(null);

  const handleSupplementDetails = (supplement) => {
    setSelectedSupplement(supplement);
    setOpenDialog(true);
  };

  const handleEditRecommendations = async (client) => {
    try {
      // You might want to open a different dialog for editing recommendations
      const updatedRecommendations = {
        // Add your recommendation update logic here
        supplements: client.supplements,
        // Add other fields as needed
      };

      const response = await fetch(`/api/dietitian/client-supplements/${client.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecommendations),
      });

      if (!response.ok) throw new Error('Failed to update recommendations');

      // Refresh the data
      fetchSupplementData();
    } catch (error) {
      console.error('Error updating recommendations:', error);
      // You might want to show an error message to the user
    }
  };

  const handleSaveSupplement = async () => {
    try {
      const supplementData = {
        name: selectedSupplement?.name || '',
        category: selectedSupplement?.category || '',
        description: selectedSupplement?.description || '',
        dosage: selectedSupplement?.dosage || '',
        benefits: selectedSupplement?.benefits || [],
        contraindications: selectedSupplement?.contraindications || [],
        price: selectedSupplement?.price || 0,
        stock: selectedSupplement?.stock || 0,
        minStock: selectedSupplement?.minStock || 5,
      };

      const url = selectedSupplement?.id 
        ? `/api/dietitian/supplements/${selectedSupplement.id}`
        : '/api/dietitian/supplements';

      const method = selectedSupplement?.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplementData),
      });

      if (!response.ok) throw new Error('Failed to save supplement');

      // Refresh the data
      fetchSupplementData();
      
      // Close the dialog
      setOpenDialog(false);
      
      // Reset selected supplement
      setSelectedSupplement(null);
    } catch (error) {
      console.error('Error saving supplement:', error);
      // You might want to show an error message to the user
    }
  };

  useEffect(() => {
    fetchSupplementData();
  }, []);

  const fetchSupplementData = async () => {
    try {
      const response = await fetch('/api/dietitian/supplements');
      const data = await response.json();
      setSupplements(data.supplements);
      setInventory(data.inventory);
      setClients(data.clients);
      setUsageStats(data.usageStats);
    } catch (error) {
      console.error('Error fetching supplement data:', error);
    }
  };

  // Dashboard Overview Section
  const DashboardOverview = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Supplement Usage Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usageStats?.trends || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="usage" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Low Stock Alerts
            </Typography>
            <List>
              {inventory
                .filter(item => item.quantity <= item.minStock)
                .map(item => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={item.name}
                      secondary={`${item.quantity} units remaining`}
                    />
                    <ListItemSecondaryAction>
                      <Chip
                        label="Low Stock"
                        color="error"
                        size="small"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  // Supplement Catalog Section
  const SupplementCatalog = () => (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search supplements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="protein">Protein</MenuItem>
            <MenuItem value="vitamins">Vitamins</MenuItem>
            <MenuItem value="minerals">Minerals</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {supplements
          .filter(supplement => 
            supplement.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (filterCategory === 'all' || supplement.category === filterCategory)
          )
          .map(supplement => (
            <Grid item xs={12} md={4} key={supplement.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{supplement.name}</Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {supplement.category}
                  </Typography>
                  <Rating value={supplement.rating} readOnly />
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleSupplementDetails(supplement)}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );

  // Client Recommendations Section
  const ClientRecommendations = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell>Recommended Supplements</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map(client => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>
                {client.supplements.map(sup => (
                  <Chip
                    key={sup.id}
                    label={sup.name}
                    sx={{ mr: 1 }}
                  />
                ))}
              </TableCell>
              <TableCell>
                <Chip
                  label={client.compliance ? 'Compliant' : 'Non-compliant'}
                  color={client.compliance ? 'success' : 'error'}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditRecommendations(client)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
const renderDialogContent = () => (
    <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Supplement Name"
            value={selectedSupplement?.name || ''}
            onChange={(e) => setSelectedSupplement(prev => ({
              ...prev,
              name: e.target.value
            }))}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedSupplement?.category || ''}
              onChange={(e) => setSelectedSupplement(prev => ({
                ...prev,
                category: e.target.value
              }))}
            >
              <MenuItem value="protein">Protein</MenuItem>
              <MenuItem value="vitamins">Vitamins</MenuItem>
              <MenuItem value="minerals">Minerals</MenuItem>
              <MenuItem value="amino_acids">Amino Acids</MenuItem>
              <MenuItem value="herbs">Herbs</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Price"
            value={selectedSupplement?.price || ''}
            onChange={(e) => setSelectedSupplement(prev => ({
              ...prev,
              price: parseFloat(e.target.value)
            }))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={selectedSupplement?.description || ''}
            onChange={(e) => setSelectedSupplement(prev => ({
              ...prev,
              description: e.target.value
            }))}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Dosage Instructions"
            value={selectedSupplement?.dosage || ''}
            onChange={(e) => setSelectedSupplement(prev => ({
              ...prev,
              dosage: e.target.value
            }))}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="number"
            label="Minimum Stock Level"
            value={selectedSupplement?.minStock || ''}
            onChange={(e) => setSelectedSupplement(prev => ({
              ...prev,
              minStock: parseInt(e.target.value)
            }))}
          />
        </Grid>
      </Grid>
    </DialogContent>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Supplement Management
      </Typography>

      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Dashboard" />
        <Tab label="Catalog" />
        <Tab label="Client Recommendations" />
        <Tab label="Inventory" />
        <Tab label="Analytics" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {selectedTab === 0 && <DashboardOverview />}
        {selectedTab === 1 && <SupplementCatalog />}
        {selectedTab === 2 && <ClientRecommendations />}
        {/* Add other sections */}
      </Box>

      {/* Add Supplement Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedSupplement(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedSupplement?.id ? 'Edit Supplement' : 'Add New Supplement'}
        </DialogTitle>
        {renderDialogContent()}
        <DialogActions>
          <Button onClick={() => {
            setOpenDialog(false);
            setSelectedSupplement(null);
          }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveSupplement}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}