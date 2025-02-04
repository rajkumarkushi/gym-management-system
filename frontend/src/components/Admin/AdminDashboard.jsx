import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  FitnessCenter,
  Menu as MenuIcon,
  Notifications,
  Person,
  AttachMoney,
  Receipt,
  People,
  LocalShipping,
  InsertChart,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Import components (we'll create these next)
import DashboardOverview from './DashboardOverview';
import ClassesManager from './ClassesManager';
import AttendanceTracker from './AttendanceTracker';
import VendorManagement from './VendorManagement';
import InvoiceManager from './InvoiceManager';
import Finance from './FinanceOverview';
import InsightsAnalytics from './InsightsAnalytics';
import Settings from './Settings';

const drawerWidth = 240;

const darkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A9A9A9',
    },
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
          },
          '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.05)',
          },
        },
      },
    },
  },
});

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('Dashboard');
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, component: DashboardOverview },
    { text: 'Classes', icon: <FitnessCenter />, component: ClassesManager },
    { text: 'Attendance', icon: <People />, component: AttendanceTracker },
    { text: 'Vendors', icon: <LocalShipping />, component: VendorManagement },
    { text: 'Invoices', icon: <Receipt />, component: InvoiceManager },
    { text: 'Finance', icon: <AttachMoney />, component: Finance },
    { text: 'Insights', icon: <InsertChart />, component: InsightsAnalytics },
    { text: 'Settings', icon: <SettingsIcon />, component: Settings },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleUserMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);
  const handleNotificationClick = (event) => setNotificationAnchor(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchor(null);
  const handleLogout = () => {
    navigate('/');
    handleUserMenuClose();
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" sx={{ color: '#FFD700' }}>
          GYM ADMIN
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={selectedSection === item.text}
            onClick={() => setSelectedSection(item.text)}
          >
            <ListItemIcon sx={{ color: '#FFD700' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderContent = () => {
    const SelectedComponent = menuItems.find((item) => item.text === selectedSection)?.component;
    return SelectedComponent ? <SelectedComponent /> : <DashboardOverview />;
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: 'background.paper',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              {selectedSection}
            </Typography>
            <IconButton color="inherit" onClick={handleNotificationClick}>
              <Notifications />
            </IconButton>
            <IconButton color="inherit" onClick={handleUserMenuClick}>
              <Person />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                bgcolor: 'background.paper',
              },
            }}
          >
            {drawer}
          </Drawer>
          
          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                bgcolor: 'background.paper',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: { xs: '56px', sm: '64px' },
            bgcolor: 'background.default',
            minHeight: '100vh',
          }}
        >
          {renderContent()}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleUserMenuClose}
        >
          <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        <Popover
          open={Boolean(notificationAnchor)}
          anchorEl={notificationAnchor}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography sx={{ p: 2 }}>No new notifications</Typography>
        </Popover>
      </Box>
    </ThemeProvider>
  );
}