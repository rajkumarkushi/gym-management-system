import React from 'react';
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = ["Membership", "Why QD", "WorkOutWithUs", "QD Store"];

  const scrolled = window.scrollY > 50; // Adjust this logic as needed

  return (
    <>
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: scrolled
          ? 'linear-gradient(90deg, rgba(0,0,0,0.95), rgba(20,20,20,0.95))'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled
          ? '0 4px 30px rgba(0, 0, 0, 0.15)'
          : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.1)'
          : 'none',
        transition: 'all 0.4s ease',
        py: scrolled ? 0.5 : 1.5,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', p: 0 }}>
          {/* Logo */}
          <Typography variant="h6" component="div" onClick={()=>navigate("/")}>
            <Box component="span" sx={{
              display: "inline-flex",
              alignItems: "center",
              transform: scrolled ? 'scale(0.9)' : 'scale(1)',
              transition: 'transform 0.4s ease',
              
            }}>
              <Box component="span" sx={{
                fontSize: "38px",
                fontWeight: "900",
                background: scrolled
                  ? 'linear-gradient(45deg, #FF5733, #FFD700)'
                  : 'linear-gradient(45deg, #FFD700, #FF5733)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Q
              </Box>
              <Box component="span" sx={{
                fontSize: "26px",
                fontWeight: "700",
                color: '#fff',
                letterSpacing: '2px',
                marginLeft: "2px",
              }}>
                UEST DIGIFLEX
              </Box>
            </Box>
          </Typography>

          {/* Navigation Items */}
          <Box sx={{
            display: "flex",
            gap: scrolled ? 3 : 4,
            transition: 'all 0.4s ease'
          }}>
            {navItems.map((item) => {
              const linkPath = `/${item.toLowerCase().replace(/\s+/g, '')}`;
              const isActive = location.pathname === linkPath;
              return (
                <Button
                  key={item}
                  sx={{
                    color: isActive ? '#FF5733' : '#fff',
                    fontWeight: isActive ? 600 : 500,
                    borderBottom: isActive ? '2px solid #FF5733' : 'none',
                    padding: '8px 16px',
                    '&:hover': {
                      color: '#FFD700',
                    },
                  }}
                  onClick={() => navigate(linkPath)}
                >
                  {item}
                </Button>
              );
            })}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                color: scrolled ? '#FF5733' : '#FFD700',
                borderColor: scrolled ? '#FF5733' : '#FFD700',
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: scrolled ? '#FF5733' : '#FFD700',
                color: '#fff',
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
};

export default Navbar;
