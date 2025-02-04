import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Typography,
} from '@mui/material';
import React from 'react';

const PartialProfile = ({ userData, onLogout }) => {
  const [profileDialogOpen, setProfileDialogOpen] = React.useState(false);

  const handleProfileDialogOpen = () => {
    setProfileDialogOpen(true);
  };

  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        borderRadius: 1,
        backgroundColor: 'background.paper',
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">{userData.name}</Typography>
        <Typography variant="subtitle1">{userData.role}</Typography>
        <Typography variant="subtitle2">
          Membership Type: {userData.membershipType}
        </Typography>
        <Typography variant="subtitle2">
          Membership Expiry: {userData.membershipEnd}
        </Typography>
      </Box>
      <Divider sx={{ width: '100%', mb: 2 }} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleProfileDialogOpen}
        sx={{ mb: 2 }}
      >
        View Full Profile
      </Button>
      <Button variant="outlined" color="error" onClick={onLogout}>
        Logout
      </Button>

      {/* Profile Dialog */}
      <Dialog
        open={profileDialogOpen}
        onClose={handleProfileDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>My Profile</DialogTitle>
        <DialogContent>
          {/* Add profile details here */}
          <Typography>Name: {userData.name}</Typography>
          <Typography>Role: {userData.role}</Typography>
          <Typography>Membership Type: {userData.membershipType}</Typography>
          <Typography>Membership Expiry: {userData.membershipEnd}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PartialProfile;