import { Close, FitnessCenter, Lock, Mail } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Styled components
const StyledCard = styled(Card)({
  maxWidth: 600,
  margin: "auto",
  marginTop: "40px",
  padding: "24px",
  backgroundColor: "#1E1E1E",
  borderRadius: "15px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
  position: "relative",
});

const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #FFD700 30%, #FDB347 90%)",
  border: 0,
  borderRadius: 8,
  color: "#121212", // Dark text for better contrast
  height: 48,
  padding: "0 30px",
  marginTop: "16px",
  fontWeight: "bold",
  "&:hover": {
    background: "linear-gradient(45deg, #FDB347 30%, #FFD700 90%)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  },
});

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "#FFD700", // Yellow text color
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#FFD700", // Yellow underline
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "#FFD700", // Yellow underline on hover
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FFD700", // Yellow underline when focused
  },
});

const GoogleButton = styled(Button)({
  background: "white",
  color: "#757575",
  height: 48,
  padding: "0 30px",
  marginTop: "16px",
  "&:hover": {
    background: "#f5f5f5",
  },
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    role: "member",
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8081/api/auth/signup", formData);
      if (response.status === 201) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(`Signup failed: ${response.data.message}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const confirmCancel = () => {
    setOpenDialog(false);
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-barbell-gym-concept-sport-healthy-lifestyle_167862-91.jpg-5GYtoQxYIoIZxP4JuOly0ZSWOM9jo0.webp) no-repeat center center fixed",
        backgroundSize: "cover",
      }}
    >
      <StyledCard>
        <IconButton
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "white",
          }}
          onClick={handleCloseDialog}
        >
          <Close />
        </IconButton>
        <CardContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(to right, #DC143C, #8B0000)",
                padding: "12px",
                borderRadius: "50%",
                marginBottom: "8px",
              }}
            >
              <FitnessCenter style={{ fontSize: 32, color: "white" }} />
            </div>
            <Typography
              variant="h4"
              style={{ color: "#FFD700", fontWeight: "bold" }} // Yellow text
            >
               Sign Up
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#FFD700", textAlign: "center" }} // Yellow text
            >
              Create your account
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              variant="outlined"
              style={{ marginBottom: "16px" }}
            >
              <InputLabel id="role-label" style={{ color: "#FFD700" }}>
                Select Role
              </InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Select Role"
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "#FFD700", // Yellow text
                }}
              >
                <MenuItem value="member">Member</MenuItem>
                <MenuItem value="trainer">Trainer</MenuItem>
                <MenuItem value="dietitian">Dietitian</MenuItem>
                <MenuItem value="gym-assistant">Gym Assistant</MenuItem>
              </Select>
            </FormControl>
            <StyledTextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <FitnessCenter style={{ color: "#FFD700", marginRight: "8px" }} /> // Yellow icon
                ),
              }}
              InputLabelProps={{
                style: { color: "#FFD700" }, // Yellow text
              }}
              style={{ marginBottom: "16px" }}
            />
            <StyledTextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <Mail style={{ color: "#FFD700", marginRight: "8px" }} /> // Yellow icon
                ),
              }}
              InputLabelProps={{
                style: { color: "#FFD700" }, // Yellow text
              }}
              style={{ marginBottom: "16px" }}
            />
            <StyledTextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <Lock style={{ color: "#FFD700", marginRight: "8px" }} /> // Yellow icon
                ),
              }}
              InputLabelProps={{
                style: { color: "#FFD700" }, // Yellow text
              }}
              style={{ marginBottom: "16px" }}
            />
            <StyledTextField
              fullWidth
              label="Phone"
              variant="outlined"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <FitnessCenter style={{ color: "#FFD700", marginRight: "8px" }} /> // Yellow icon
                ),
              }}
              InputLabelProps={{
                style: { color: "#FFD700" }, // Yellow text
              }}
              style={{ marginBottom: "16px" }}
            />
            <StyledTextField
              fullWidth
              label="Age"
              variant="outlined"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <FitnessCenter style={{ color: "#FFD700", marginRight: "8px" }} /> // Yellow icon
                ),
              }}
              InputLabelProps={{
                style: { color: "#FFD700" }, // Yellow text
              }}
              style={{ marginBottom: "16px" }}
            />
            <FormControl
              fullWidth
              variant="outlined"
              style={{ marginBottom: "16px" }}
            >
              <InputLabel id="gender-label" style={{ color: "#FFD700" }}>
                Gender
              </InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="Gender"
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "#FFD700", // Yellow text
                }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <StyledButton type="submit" fullWidth variant="contained" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </StyledButton>
          </form>
          <GoogleButton
            fullWidth
            variant="contained"
            startIcon={
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                style={{ width: "18px", height: "18px" }}
              />
            }
          >
            Continue with Google
          </GoogleButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <Button onClick={() => setOpenDialog(true)} style={{ color: "#FFD700" }}>
              Cancel
            </Button>
            <Button
              onClick={() => navigate("/login")}
              style={{ color: "#FFD700" }} // Yellow text
            >
              Already have an account? Log in
            </Button>
          </div>
        </CardContent>
      </StyledCard>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle style={{ color: "#FFD700" }}> 
          Cancel Sign Up?
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "#FFD700" }}> 
            Are you sure you want to cancel the sign-up process? All entered information will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No, continue sign-up
          </Button>
          <Button onClick={confirmCancel} color="primary" autoFocus>
            Yes, cancel sign-up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignUp;