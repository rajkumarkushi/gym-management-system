
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  Event as EventIcon,
  FitnessCenter,
  Menu as MenuIcon,
  Notifications,
  Person,
  Phone,
  RestaurantMenu as RestaurantMenuIcon,
  Search,
  Settings as SettingsIcon,
  Timeline as TimelineIcon
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popover,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import existing components
import BMICalculator from './BMICalculator';
import Classes from './Classes';
import DashboardContent from './DashboardContent';
import ReportsContent from './ReportsContent';
import Workouts from './Workouts';

// import PartialProfile from './PartialProfile';

// Import new components
import PartialProfile from '../PartialProfile';
import MembershipForm from './MembershipForm';
import Settings from './Settings';

const drawerWidth = 240;

// Create a dark theme
const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: mode === 'yellow' ? '#FFD700' : '#2196f3',
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

export default function UserDashboard() {

  

  const navigate = useNavigate();
  const [colorMode, setColorMode] = useState('yellow');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(() => {
    return !localStorage.getItem('hasCompletedMembershipForm');
  });
  const [membershipDialogOpen, setMembershipDialogOpen] = useState(isNewUser);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);

  const [userData] = useState({
    name: '',
    membershipEnd: '2024-12-31',
    role: 'member',
    membershipType: 'Premium',
  });

  const daysLeft = Math.ceil(
    (new Date(userData.membershipEnd).getTime() - new Date().getTime()) /
      (1000 * 3600 * 24)
  );

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Workouts', icon: <FitnessCenter /> },
    { text: 'Classes', icon: <EventIcon /> },
    { text: 'Meal Plans', icon: <RestaurantMenuIcon /> },
    { text: 'Reports', icon: <DescriptionIcon /> },
    { text: 'BMI Calculator', icon: <FitnessCenter /> },
    { text: 'Progress', icon: <TimelineIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const handleUserMenuClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

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

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
  };

  const handleProfileClick = () => {
    setProfileDialogOpen(true);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() =>
              item.text === 'Logout' ? handleLogout() : setSelectedSection(item.text)
            }
            sx={{
              backgroundColor:
                selectedSection === item.text
                  ? 'rgba(255, 215, 0, 0.1)'
                  : 'transparent',
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
    switch (selectedSection) {
      case 'Dashboard':
        return <DashboardContent userData={userData} />;
      case 'Reports':
        return <ReportsContent userData={userData} />;
      case 'BMI Calculator':
        return <BMICalculator />;
        case 'Workouts':
  return <Workouts />;
      case 'Classes':
        return <Classes />;
      case 'Settings':
        return (
          <Settings
            colorMode={colorMode}
            setColorMode={setColorMode}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <Paper
            sx={{
              p: 2,
              maxWidth: { xs: '100%', sm: '80%', md: '60%' },
              margin: 'auto',
            }}
          >
            <Typography variant="h6">{selectedSection}</Typography>
            <Typography>Content coming soon...</Typography>
          </Paper>
        );
    }
  };

  return (
    <ThemeProvider theme={createAppTheme(colorMode)}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
      >
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
              {userData.name} Gym Dashboard
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Paper
                component="form"
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: { xs: '100%', sm: '80%', md: '60%' },
                  mr: 2,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search features"
                  inputProps={{ 'aria-label': 'search features' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                  <Search />
                </IconButton>
              </Paper>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ mr: 2 }}
              >
                {daysLeft} days left, RENEW NOW!
              </Button>
              <IconButton color="inherit" onClick={handleNotificationClick}>
                <Notifications />
              </IconButton>
              <IconButton color="inherit" onClick={() => setContactDialogOpen(true)}>
                <Phone />
              </IconButton>
              <IconButton color="inherit" onClick={handleProfileClick}>
                <Person />
              </IconButton>
            </Box>
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
            mt: 8,
          }}
        >
          {renderContent()}
        </Box>

        {/* Menus and Dialogs */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleUserMenuClose}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          
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

        <Dialog
          open={contactDialogOpen}
          onClose={() => setContactDialogOpen(false)}
        >
          <DialogTitle>Contact Information</DialogTitle>
          <DialogContent>
            <Typography>Gym Owner: Quest Digiflex</Typography>
            <Typography>Staff: 789416186</Typography>
          </DialogContent>
        </Dialog>

        <MembershipForm
          open={membershipDialogOpen}
          onClose={() => setMembershipDialogOpen(false)}
          userData={userData}
        />

        <Dialog
          open={profileDialogOpen}
          onClose={handleProfileDialogClose}  
          fullWidth
          maxWidth="sm"
        >
          <PartialProfile userData={userData} onLogout={handleLogout} />
        </Dialog>

      </Box>
    </ThemeProvider>
  );
}
