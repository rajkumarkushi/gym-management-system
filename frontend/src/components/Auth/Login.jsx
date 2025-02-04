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

const Login = () => {
  const [role, setRole] = useState("member");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [openOTP, setOpenOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8081/api/auth/login", {
        email,
        password,
      });
      
      if (response.status === 200) {
        const userData = response.data.user;
        setUserData(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', userData.role);
        
        // Role-based navigation
        switch (userData.role) {
          case 'member':
            navigate('/dashboard');
            break;
          case 'trainer':
            navigate('/trainer');
            break;
          case 'dietitian':
            navigate('/dietitian');
            break;
          case 'gym-assistant':
            navigate('/assistant');
            break;
          default:
            navigate('/');
        }
        
        alert("Logged in successfully!");
      } else {
        alert(`Login failed: ${response.data.message}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of the component code, remove role selection ...



  const handleForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleSendOTP = async () => {
    console.log("Sending OTP to:", forgotPasswordEmail);
    setOpenForgotPassword(false);
    setOpenOTP(true);
  };

  const handleVerifyOTP = async () => {
    console.log("Verifying OTP:", otp);
    setOpenOTP(false);
    alert("Password reset link sent to your email/phone. Please check your inbox.");
  };

  const handleCancel = () => {
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
          onClick={handleCancel}
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
               Login
            </Typography>
            <Typography
              variant="body2"
              style={{ color: "#FFD700", textAlign: "center" }} // Yellow text
            >
              Sign in to your account
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
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <StyledButton type="submit" fullWidth variant="contained" disabled={loading}>
              {loading ? "Signing In..." : `Sign In ${role.charAt(0).toUpperCase() + role.slice(1)}`}
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
            <Button onClick={handleForgotPassword} style={{ color: "#FFD700" }}> 
              Forgot password?
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              style={{ color: "#FFD700" }} // Yellow text
            >
              Sign up manually
            </Button>
          </div>
        </CardContent>
      </StyledCard>
      <Dialog
        open={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
      >
        <DialogTitle style={{ color: "#FFD700" }}> 
          Forgot Password
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "#FFD700" }}> 
            Please enter your email address or phone number. We'll send you a verification code.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email or Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            InputProps={{
              style: { color: "black" },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForgotPassword(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendOTP} color="primary">
            Send Verification Code
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openOTP} onClose={() => setOpenOTP(false)}>
        <DialogTitle style={{ color: "#FFD700" }}>
          Enter Verification Code
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "#FFD700" }}> 
            Please enter the verification code sent to your email or phone.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Verification Code"
            type="text"
            fullWidth
            variant="outlined"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            InputProps={{
              style: { color: "black" },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOTP(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleVerifyOTP} color="primary">
            Verify
          </Button>
        </DialogActions>
      </Dialog>
      {userData && ( // Conditionally render user data
        <div>
          <h2 style={{ color: "#FFD700" }}>Welcome, {userData.name}!</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );

};
export default Login;