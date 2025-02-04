import {
  AttachMoney as AttachMoneyIcon,
  Build as BuildIcon,
  Dashboard as DashboardIcon,
  FitnessCenter,
  Menu as MenuIcon,
  Notifications,
  Person,
  Settings as SettingsIcon

} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CssBaseline,
  Drawer,
  Grid,
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import AnnouncementSection from '../Announcement/AnnouncementSection';
import EquipmentManager from '../Trainer/EquipmentManager';
import PaymentTracker from '../Trainer/PaymentTracker';
import ServiceManager from './ServiceManager';
import DashboardContent from './DashboardAssistant';
import Settings from './AssistantSettings';

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default function GymAssistantDashboard() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('Dashboard');
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    navigate('/');
    handleUserMenuClose();
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, component: DashboardContent },
    { text: 'Equipment', icon: <FitnessCenter />, component: EquipmentManager },
    { text: 'Services', icon: <BuildIcon />, component: ServiceManager },
    { text: 'Payments', icon: <AttachMoneyIcon />, component: PaymentTracker },
    { text: 'Settings', icon: <SettingsIcon />, component: Settings},
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => setSelectedSection(item.text)}
            sx={{
              backgroundColor: selectedSection === item.text ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 215, 0, 0.05)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#FFD700' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const renderContent = () => {
    const SelectedComponent = menuItems.find((item) => item.text === selectedSection)?.component;
    return SelectedComponent ? <SelectedComponent /> : <DashboardContent />;
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
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Gym Assistant Dashboard
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
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
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
            marginTop: '64px',
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

