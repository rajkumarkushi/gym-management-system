import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence ,useAnimation} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import backgroundImage from './header.jpg';
import Navbar from './Navbar';
import strengthtraining from './strengthtraining.jpg';
import cardio from './cardio.jpg';
import yoga from './yoga.png';
import crossfit from './crossfit.jpg';
import calisthenics from './calisthenics.jpg';
import nutrition from './nutrition.jpg';
import image1 from './Rajkumar.jpg';
import image2 from './women.jpg';
import image3 from './Rahul.avif';
import image4 from './beardman.jpg';



import trainer from './trainer.jpg';
// import trainer from '../personal_training.jpg'
import footervideo from './footervideo.mp4';
// import { ArrowForward,  } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  TextField,
  Toolbar,
  Paper,
  Typography,
  Chip, Avatar,Divider
} from "@mui/material";
import {
  AccessTime,
  ArrowForward,
  PlayArrow as PlayArrowIcon,
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  Phone,
  Twitter,
  FitnessCenterRounded, 
  SportsGymnastics, 
  Timer, 
  ArrowBack, 
  PlayArrow 
} from "@mui/icons-material";
import Qdstore from "./Qdstore";

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [planType, setPlanType] = useState('monthly');
  const handleToggle = (event, newValue) => {
    if (newValue) {
      setPlanType(newValue); // Update the plan type when toggled
      console.log(`Switch to ${newValue} pricing`);
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const controls = useAnimation();
const [ref, inView] = useInView({
  threshold: 0.2,
  triggerOnce: true
});

useEffect(() => {
  if (inView) {
    controls.start('visible');
  }
}, [controls, inView]);

const imageVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8
    }
  }
};


const trainersData = [
  {
    name: "John Smith",
    specialty: "Weight Training",
    experience: "8+ years",
    image: strengthtraining, // Replace with actual image path
    certification: "NASM Certified",
    rating: 4.9
  },
  {
    name: "Sarah Johnson",
    specialty: "Yoga & Flexibility",
    experience: "6+ years",
    image: yoga,
    certification: "RYT 500",
    rating: 4.8
  },
  {
    name: "Mike Wilson",
    specialty: "CrossFit",
    experience: "10+ years",
    image: crossfit,
    certification: "CrossFit L3",
    rating: 4.9
  },{
    name: "Emma Davis",
    specialty: "HIIT Training",
    experience: "5+ years",
    image: cardio,
    certification: "ACE Certified",
    rating: 4.7
  },
  {
    name: "David Chen",
    specialty: "Calisthenics",
    experience: "7+ years",
    image: calisthenics,
    certification: "ISSA Certified",
    rating: 4.8
  },
  {
    name: "Lisa Rodriguez",
    specialty: "Nutrition & Strength",
    experience: "9+ years",
    image: nutrition,
    certification: "NASM & PN Certified",
    rating: 4.9
  }
];


  return (
    <Box sx={{ bgcolor: "#f5f5f5", color: "#333", minHeight: "100vh", fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <Navbar />
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.5 }}
>
  <Box
    sx={{
      width: '99%',
      height: "100vh",
      position: "relative",
      margin: "1px auto",
      borderRadius: "25px",
      overflow: "hidden",
      boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
    }}
  >
    {/* Background with balanced overlay */}
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `linear-gradient(to top, 
          rgba(0,0,0,0.5) 0%, 
          rgba(0,0,0,0.2) 40%, 
          rgba(0,0,0,0.2) 60%, 
          rgba(0,0,0,0.3) 100%), 
          url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: 'scale(1.02)',
        transition: 'transform 0.5s ease-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    />

    {/* Content Container */}
    <Container 
      sx={{ 
        height: '100%', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center', // Changed to center
        justifyContent: 'center',
        paddingTop: '140px', // Added top padding to move content down
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 1, 
          delay: 0.6,
          type: "spring",
          stiffness: 100 
        }}
        style={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Main Heading with refined styling */}
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: "2.5rem", md: "3.8rem" }, 
            fontWeight: 800,
            lineHeight: 1.2,
            color: '#fff',
            textAlign: "center",
            mb: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            letterSpacing: '1px',
            opacity: 0.95, // Slightly reduced opacity for better balance
          }}
        >
          YOUR FITNESS JOURNEY
          <Box component="span" sx={{ 
            display: 'block',
            color: '#FFD700',
            fontSize: { xs: "2rem", md: "3.2rem" },
            mt: 1,
            opacity: 0.9,
          }}>
            BEGINS HERE
          </Box>
        </Typography>

        {/* Refined Subheading */}
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 6, // Increased margin bottom
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            margin: "0 auto",
            maxWidth: "600px",
            fontWeight: 400,
            letterSpacing: '0.5px',
            fontSize: { xs: "1rem", md: "1.1rem" },
            opacity: 0.9,
          }}
        >
          Transform your life with expert guidance and premium facilities
        </Typography>

        {/* Action Buttons */}
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 3,
            justifyContent: 'center',
            marginTop: "40px", // Increased top margin
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: "#FFD700",
                color: "#000",
                padding: "12px 35px",
                fontSize: "1.1rem",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                border: '2px solid transparent',
                opacity: 0.95,
                "&:hover": {
                  bgcolor: "transparent",
                  borderColor: "#FFD700",
                  color: "#FFD700",
                  opacity: 1,
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Your Journey
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayArrowIcon />}
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.6)",
                padding: "12px 35px",
                fontSize: "1.1rem",
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: 600,
                opacity: 0.9,
                "&:hover": {
                  borderColor: "#fff",
                  bgcolor: "rgba(255,255,255,0.1)",
                  opacity: 1,
                },
              }}
            >
              Watch Video
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Container>
  </Box>
</motion.div>

   {/* Personal Training Section */}
<AnimatePresence mode="wait">
  {!isSlideOpen ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Box sx={{ 
        py: 8, 
        bgcolor: "#fff",
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'linear-gradient(180deg, rgba(255,215,0,0.05) 0%, rgba(255,255,255,1) 100%)',
          zIndex: 0
        }
      }}>
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography 
                  variant="h2" 
                  sx={{ 
                    mb: 3, 
                    background: 'linear-gradient(45deg, #FFD700, #FF5733)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 900,
                    letterSpacing: '1px',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: 0,
                      width: '60px',
                      height: '4px',
                      background: 'linear-gradient(45deg, #FFD700, #FF5733)',
                      borderRadius: '2px'
                    }
                  }}
                >
                  PERSONAL TRAINING
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                  {['Expert Trainers', 'Custom Plans', 'Flexible Hours'].map((feature, index) => (
                    <motion.div
                      key={feature}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Chip
                        icon={index === 0 ? <FitnessCenterRounded /> : index === 1 ? <SportsGymnastics /> : <Timer />}
                        label={feature}
                        sx={{
                          bgcolor: 'rgba(255, 215, 0, 0.1)',
                          color: '#333',
                          padding: '20px 10px',
                          '& .MuiChip-icon': { 
                            color: '#FF5733',
                            transition: 'transform 0.3s ease'
                          },
                          '&:hover .MuiChip-icon': {
                            transform: 'rotate(15deg)'
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>

                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 4, 
                    fontSize: '1.1rem', 
                    lineHeight: 1.8,
                    color: '#555',
                    textShadow: '1px 1px 1px rgba(0,0,0,0.05)'
                  }}
                >
                  Transform your fitness journey with our expert-led personal training programs. 
                  Experience customized workouts, nutrition guidance, and continuous support.
                </Typography>

                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={() => setIsSlideOpen(true)}
                    sx={{
                      bgcolor: '#FF5733',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      borderRadius: '30px',
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(45deg, rgba(255,215,0,0.2), rgba(255,87,51,0.2))',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.6s ease'
                      },
                      '&:hover': {
                        bgcolor: '#FF4719',
                        transform: 'translateY(-2px)',
                        '&::before': {
                          transform: 'translateX(0)'
                        }
                      },
                      transition: 'all 0.3s ease'
                    }}
                    endIcon={
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <PlayArrow />
                      </motion.div>
                    }
                  >
                    Know More
                  </Button>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Avatar 
                        sx={{ 
                          bgcolor: '#FFD700',
                          width: 40,
                          height: 40,
                          boxShadow: '0 4px 10px rgba(255,215,0,0.3)'
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>4.9</Typography>
                      </Avatar>
                    </motion.div>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: '#666',
                        fontWeight: 500
                      }}
                    >
                      Rated by 1000+ members
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>

{/* Right Image */}
<Grid item xs={12} md={6}>
  <motion.div
    initial={{ opacity: 0, scale: 0.7, y: 30 }}
    whileInView={{ 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.6,
        bounce: 0.3
      }
    }}
    viewport={{ once: true, margin: "-100px" }}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      padding: '20px'
    }}
  >
    <Box
      component="img"
      src={trainer}
      alt="Personal Training"
      sx={{
        width: { xs: "100%", sm: "90%", md: "85%" },
        height: { xs: "auto", sm: "400px", md: "450px" },
        objectFit: "contain",
        // filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.12))',
        transition: 'all 0.4s ease-in-out',
        transform: 'translateZ(0)', // For smoother animations
        willChange: 'transform', // Performance optimization
        '&:hover': {
          filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.15))',
          transform: 'translateY(-8px) scale(1.01)',
        }
      }}
    />
  </motion.div>
</Grid>
          </Grid>
        </Container>
      </Box>
    </motion.div>
  ) : (

  <motion.div
    key="sliding-content"
    initial={{ x: '100%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: '100%', opacity: 0 }}
    transition={{ 
      type: "spring",
      stiffness: 100,
      damping: 20,
      mass: 0.5
    }}
  >
    <Box sx={{ py: 8, bgcolor: "#fff", minHeight: "90vh" }}>
      <Container>
      <Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 6,
    gap: 2, // Ensures proper spacing between elements
    px: 2, // Adds some padding to the sides
  }}
>
  <Typography
    variant="h2"
    sx={{
      background: 'linear-gradient(45deg, #FFD700, #FFA500)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: 'bold',
      textAlign: 'center', // Ensures text is centered for visual balance
      letterSpacing: '1px', // Slightly adjusts spacing between letters for elegance
    }}
  >
    Find Your Trainer
  </Typography>

  <IconButton
    onClick={() => setIsSlideOpen(false)}
    sx={{
      bgcolor: 'rgba(255, 215, 0, 0.1)',
      '&:hover': { bgcolor: 'rgba(255, 215, 0, 0.2)' },
      transition: 'background-color 0.3s ease', // Smooth transition effect
      borderRadius: '50%', // Ensures the button is circular
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    }}
  >
    <ArrowBack sx={{ color: '#FFD700', fontSize: '1.5rem' }} />
  </IconButton>
</Box>


        <Grid container spacing={3}>
          {trainersData.map((trainer, index) => (
            <Grid item xs={12} sm={6} md={4} key={trainer.name}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 215, 0, 0.1)',
                    background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                      border: '1px solid #FFD700'
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <Box
                      component="img"
                      src={trainer.image}
                      alt={trainer.name}
                      sx={{
                        width: '100%',
                        height: 250,
                        borderRadius: '12px',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.02)'
                        }
                      }}
                    />
                    <Chip
                      label={`${trainer.rating} ★`}
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        bgcolor: 'rgba(255, 215, 0, 0.9)',
                        color: '#000',
                        fontWeight: 'bold',
                        backdropFilter: 'blur(5px)'
                      }}
                    />
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {trainer.name}
                  </Typography>

                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: '#FF5733',
                      fontWeight: '500',
                      mb: 1
                    }}
                  >
                    {trainer.specialty}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip 
                      label={trainer.experience} 
                      size="small"
                      sx={{ bgcolor: 'rgba(255, 215, 0, 0.1)' }}
                    />
                    <Chip 
                      label={trainer.certification}
                      size="small"
                      sx={{ bgcolor: 'rgba(255, 87, 51, 0.1)' }}
                    />
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  </motion.div>
  )}
</AnimatePresence>
  


{/* Optimize Gym Operations Section*/}
<Box 
  sx={{ 
    py: 12,
    background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
    position: 'relative', 
    overflow: 'hidden'
  }}
>
  {/* Animated Background Elements */}
  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          delay: i * 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${i % 2 === 0 ? '#FF573310' : '#FFD70010'} 0%, transparent 60%)`,
          left: `${(i * 30) + 10}%`,
          top: `${(i * 20) + 10}%`,
        }}
      />
    ))}
  </Box>

  <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{ textAlign: 'center', marginBottom: '60px' }}
    >
      <Typography 
        component="span"
        sx={{ 
          color: '#FF5733',
          fontWeight: 600,
          fontSize: '1.1rem',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          display: 'block',
          mb: 2
        }}
      >
        Smart Management
      </Typography>
      <Typography 
        variant="h2" 
        sx={{ 
          fontWeight: 800,
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          mb: 3,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #454545 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Optimize Your Gym Operations
      </Typography>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'text.secondary',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: 1.8
        }}
      >
        Streamline your fitness facility with our cutting-edge management solutions
      </Typography>
    </motion.div>

    {/* Features Grid */}
    <Grid container spacing={4}>
      {[
        {
          title: "Track Revenue",
          description: "Real-time financial analytics and automated billing systems to maximize your revenue stream.",
          icon: "📈",
          color: "#FF5733",
          features: ["Payment Analytics", "Automated Billing", "Financial Reports"]
        },
        {
          title: "Manage Members",
          description: "Comprehensive member management with detailed profiles and engagement tracking.",
          icon: "👥",
          color: "#4CAF50",
          features: ["Member Profiles", "Attendance Tracking", "Engagement Analytics"]
        },
        {
          title: "Class Scheduling",
          description: "Smart scheduling system with automated notifications and capacity management.",
          icon: "📅",
          color: "#2196F3",
          features: ["Smart Calendar", "Auto Reminders", "Capacity Control"]
        },
        {
          title: "Trainer Management",
          description: "Efficient trainer allocation and performance tracking system.",
          icon: "💪",
          color: "#9C27B0",
          features: ["Performance Metrics", "Schedule Management", "Client Assignment"]
        }
      ].map((feature, index) => (
        <Grid item xs={12} md={6} lg={3} key={feature.title}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.2
            }}
          >
            <motion.div
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: '24px',
                  background: '#fff',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.08)',
                  '&:hover': {
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    '& .feature-icon': {
                      transform: 'scale(1.1) rotate(10deg)',
                    },
                    '& .feature-list': {
                      transform: 'translateY(0)',
                      opacity: 1
                    }
                  }
                }}
              >
                {/* Feature Icon */}
                <Box 
                  className="feature-icon"
                  sx={{ 
                    width: 70,
                    height: 70,
                    borderRadius: '20px',
                    background: `${feature.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    mb: 3,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {feature.icon}
                </Box>

                {/* Feature Title */}
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    color: feature.color
                  }}
                >
                  {feature.title}
                </Typography>

                {/* Feature Description */}
                <Typography 
                  variant="body1"
                  sx={{ 
                    color: 'text.secondary',
                    mb: 3,
                    lineHeight: 1.7
                  }}
                >
                  {feature.description}
                </Typography>

                {/* Feature List */}
                <Box 
                  className="feature-list"
                  sx={{ 
                    transform: 'translateY(20px)',
                    opacity: 0,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {feature.features.map((item, i) => (
                    <Box 
                      key={i}
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: feature.color
                          }}
                        />
                      </motion.div>
                      <Typography variant="body2" color="text.secondary">
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>


{/* Working Categories Section */}
<Box 
  sx={{ 
    py: 12,
    background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
    position: 'relative',
    overflow: 'hidden'
  }}
>
  {/* Enhanced Animated Background */}
  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          delay: i * 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${i % 2 === 0 ? '#FF573308' : '#FFD70008'} 0%, transparent 60%)`,
          left: `${(i * 25) + 5}%`,
          top: `${(i * 15) + 5}%`,
        }}
      />
    ))}
  </Box>

  <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
    {/* Enhanced Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{ textAlign: 'center', marginBottom: '60px' }}
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          component="span"
          sx={{ 
            color: '#FF5733',
            fontWeight: 600,
            fontSize: '1.1rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'block',
            mb: 2,
            textShadow: '0 2px 4px rgba(255,87,51,0.2)'
          }}
        >
          Explore Our Programs
        </Typography>
      </motion.div>
      <Typography 
        variant="h2" 
        sx={{ 
          fontWeight: 800,
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          mb: 3,
          background: 'linear-gradient(135deg, #1a1a1a 0%, #454545 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Working Categories
      </Typography>
    </motion.div>

    {/* Enhanced Categories Grid */}
    <Grid container spacing={3}>
      {[
        {
          title: "Strength Training",
          description: "Build muscle and enhance overall strength",
          image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
          color: "#FF5733",
          stats: { members: "2.5K+", sessions: "120+" }
        },
        {
          title: "Cardio Fitness",
          description: "Boost your cardiovascular health",
          image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c",
          color: "#4CAF50",
          stats: { members: "3K+", sessions: "150+" }
        },{
          title: "Yoga & Flexibility",
          description: "Enhance flexibility, reduce stress, and improve mind-body connection through expert guidance.",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
          color: "#2196F3",
          stats: { members: "1.8K+", sessions: "90+/month" }
        },
        {
          title: "CrossFit",
          description: "Challenge yourself with high-intensity functional movements for total fitness transformation.",
          image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb",
          color: "#9C27B0",
          stats: { members: "1.2K+", sessions: "100+/month" }
        },
        {
          title: "Boxing",
          description: "Master the art of boxing while getting an intense full-body workout and building confidence.",
          image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed",
          color: "#FF9800",
          stats: { members: "800+", sessions: "80+/month" }
        },
        {
          title: "Nutrition",
          description: "Get personalized meal plans and expert guidance for optimal results and healthy living.",
          image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
          color: "#00BCD4",
          stats: { members: "2K+", sessions: "60+/month" }
        }
      ].map((category, index) => (
        <Grid item xs={12} sm={6} md={4} key={category.title}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.1
            }}
          >
            <motion.div
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: 320, // Reduced height
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 20px 40px ${category.color}20`,
                    '& .category-content': {
                      transform: 'translateY(0)',
                    },
                    '& .category-image': {
                      transform: 'scale(1.1)',
                    },
                    '& .category-overlay': {
                      background: `linear-gradient(to top, ${category.color}ee, ${category.color}99)`,
                    },
                    '& .category-stats': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    }
                  }
                }}
              >
                {/* Category Image with Enhanced Animation */}
                <Box
                  className="category-image"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />

                {/* Enhanced Overlay */}
                <Box
                  className="category-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(to top, ${category.color}cc, transparent)`,
                    transition: 'all 0.3s ease'
                  }}
                />

                {/* Enhanced Content */}
                <Box
                  className="category-content"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    color: '#fff',
                    transform: 'translateY(60px)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <Typography variant="h5" sx={{ 
                    mb: 1, 
                    fontWeight: 700,
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}>
                    {category.title}
                  </Typography>

                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2, 
                      opacity: 0.9,
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    {category.description}
                  </Typography>

                  {/* Enhanced Stats Display */}
                  <Box 
                    className="category-stats"
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      opacity: 0,
                      transform: 'translateY(20px)',
                      transition: 'all 0.3s ease 0.1s'
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Box>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 700,
                          fontSize: '1.1rem'
                        }}>
                          {category.stats.members}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            opacity: 0.7,
                            fontSize: '0.8rem'
                          }}
                        >
                          Members
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 700,
                          fontSize: '1.1rem'
                        }}>
                          {category.stats.sessions}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            opacity: 0.7,
                            fontSize: '0.8rem'
                          }}
                        >
                          Monthly Sessions
                        </Typography>
                      </Box>
                    </Box>

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton 
                        size="small"
                        sx={{ 
                          color: '#fff',
                          bgcolor: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(4px)',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.3)'
                          }
                        }}
                      >
                        <ArrowForward sx={{ fontSize: 18 }} />
                      </IconButton>
                    </motion.div>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>

{/* Modern Membership Plans Section */}
{/* Subscription Options and Membership Plans Section */}
{/* Membership Plans Section */}
<Box 
  sx={{ 
    py: 12,
    background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%)',
    position: 'relative',
    overflow: 'hidden'
  }}
>
  {/* Animated Background Elements */}
  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          delay: i * 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${i % 2 === 0 ? '#FF573310' : '#FFD70010'} 0%, transparent 60%)`,
          left: `${(i * 30) + 10}%`,
          top: `${(i * 20) + 10}%`,
        }}
      />
    ))}
  </Box>

  <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{ textAlign: 'center', marginBottom: '60px' }}
    >
      <Typography 
        component="span"
        sx={{ 
          color: '#0077B6',
          fontWeight: 600,
          fontSize: '1.1rem',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          display: 'block',
          mb: 2
        }}
      >
        Flexible Pricing
      </Typography>
      <Typography 
        variant="h2" 
        sx={{ 
          fontWeight: 800,
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          mb: 3,
          background: 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Choose Your Membership Plan
      </Typography>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'text.secondary',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: 1.8
        }}
      >
        Select a plan that fits your fitness goals and lifestyle.
      </Typography>
    </motion.div>

    {/* Plans Grid */}
    <Grid container spacing={4}>
      {[ 
        {
          title: "Basic Plan",
          price: "$20/month",
          features: ["Access to gym equipment", "Sauna bath", "Basic swimming pool access","Group Zumba classes twice a week","Locker facilities"],
          color: "#FF5733",
        },
        {
          title: "Premium Plan",
          price: "$50/month",
          features: ["Everything in Basic Plan", "Diet consultations", "Access to gym equipment", "Sauna bath", "Full swimming pool access"],
          color: "#4CAF50",
        },
        {
          title: "Silver Plan",
          price: "$80/month",
          features: ["Unlimited gym equipment access", "Sauna bath", "Personalized swimming lessons","Dedicated personal trainer"],
          color: "#2196F3",
        },
        {
          title: "Gold Plan",
          price: "$150/month",
          features: ["Everything in Silver Plan","24/7 gym access", "Sauna bath", "Private spa sessions","Special workshops and fitness events"],
          color: "#9C27B0",
        }
      ].map((plan, index) => (
        <Grid item xs={12} md={6} lg={3} key={plan.title}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <motion.div
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: '24px',
                  background: '#fff',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.08)',
                  '&:hover': {
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }
                }}
              >
                {/* Plan Title */}
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    color: plan.color
                  }}
                >
                  {plan.title}
                </Typography>

                {/* Plan Price */}
                <Typography 
                  variant="h4"
                  sx={{ 
                    fontWeight: 800,
                    mb: 3,
                    color: plan.color
                  }}
                >
                  {plan.price}
                </Typography>

                {/* Plan Features */}
                {plan.features.map((feature, i) => (
                  <Box 
                    key={i}
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: plan.color
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </motion.div>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>


 {/* Success Stories Section */}
<Box 
  sx={{ 
    py: 12,
    background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%)',
    position: 'relative',
    overflow: 'hidden'
  }}
>
  {/* Animated Background Elements */}
  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          delay: i * 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${i % 2 === 0 ? '#FF573310' : '#FFD70010'} 0%, transparent 60%)`,
          left: `${(i * 30) + 10}%`,
          top: `${(i * 20) + 10}%`,
        }}
      />
    ))}
  </Box>

  <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{ textAlign: 'center', marginBottom: '60px' }}
    >
      <Typography 
        component="span"
        sx={{ 
          color: '#0077B6',
          fontWeight: 600,
          fontSize: '1.1rem',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          display: 'block',
          mb: 2
        }}
      >
        Real Experiences
      </Typography>
      <Typography 
        variant="h2" 
        sx={{ 
          fontWeight: 800,
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          mb: 3,
          background: 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Success Stories
      </Typography>
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'text.secondary',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: 1.8
        }}
      >
        Hear from our members who achieved their goals and transformed their lives.
      </Typography>
    </motion.div>

    {/* Stories Grid */}
    <Grid container spacing={4}>
      {[
        {
          name: "Raj kumar",
          story: "Joining this program was the best decision I made for my health and fitness. The trainers are excellent, and the facilities are top-notch!",
          image: image1,
          color: "#FF5733",
        },
        {
          name: "Anshu Thakur",
          story: "The personalized plans and constant support helped me achieve my fitness goals faster than I expected. Highly recommend!",
          image: image2,
          color: "#4CAF50",
        },
        {
          name: "Rahul mithra",
          story: "The community here is amazing. I not only became fit but also made great friends along the way. Truly life-changing!",
          image: image3,
          color: "#2196F3",
        },
        {
          name: "Stephen Victor",
          story: "I love the flexibility and variety of options available. The gym environment is motivating and fun!",
          image: image4,
          color: "#9C27B0",
        }
      ].map((story, index) => (
        <Grid item xs={12} md={6} lg={3} key={story.name}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <motion.div
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: '24px',
                  background: '#fff',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.08)',
                  '&:hover': {
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }
                }}
              >
                {/* Story Image */}
                <Box
                  component="img"
                  src={story.image}
                  alt={story.name}
                  sx={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    marginBottom: 3,
                  }}
                />

                {/* Story Name */}
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    color: story.color
                  }}
                >
                  {story.name}
                </Typography>

                {/* Story Text */}
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  {story.story}
                </Typography>
              </Paper>
            </motion.div>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>

     {/* Newsletter Section */}
<Box 
  sx={{ 
    py: 10, 
    background: 'linear-gradient(135deg, #111 0%, #333 100%)', 
    position: 'relative',
    overflow: 'hidden',
  }}
>
  {/* Animated Background Elements */}
  <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
    {[...Array(2)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 10,
          delay: i * 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${i % 2 === 0 ? '#FFD70010' : '#FF573310'} 0%, transparent 70%)`,
          left: `${(i * 50) + 15}%`,
          top: `${(i * 30) + 20}%`,
        }}
      />
    ))}
  </Box>

  <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
    <Grid container spacing={4} alignItems="center">
      {/* Text Content */}
      <Grid item xs={12} md={6}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3, 
              color: '#FFD700',
              fontWeight: 700,
              lineHeight: 1.5
            }}
          >
            Stay Updated With Our Latest News & Insights
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              mb: 4,
              maxWidth: '500px'
            }}
          >
            Sign up for our newsletter to receive regular updates, insights, and exclusive offers directly in your inbox.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                bgcolor: '#222',
                "& .MuiOutlinedInput-root": {
                  color: '#fff',
                  "& fieldset": {
                    borderColor: '#444',
                  },
                  "&:hover fieldset": {
                    borderColor: '#FFD700',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: '#FFD700',
                color: '#000',
                fontWeight: 600,
                "&:hover": {
                  bgcolor: '#FFCC33',
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </motion.div>
      </Grid>

      {/* Visual Content */}
      <Grid item xs={12} md={6}>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Box
            // component="img"
            // src="/placeholder.svg?height=300&width=600"
            // alt="Newsletter Illustration"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
            }}
          />
        </motion.div>
      </Grid>
    </Grid>
  </Container>
</Box>

{/* Footer Section */}
<Box sx={{ py: 6, bgcolor: '#000' }}>
  <Container>
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" sx={{ mb: 2, color: '#FFD700' }}>
          QUEST DIGIFLEX
        </Typography>
        <Typography sx={{ mb: 2, color: '#FFF' }}>
          Skyee, Indore
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton size="small" sx={{ color: '#FFD700' }}>
            <Facebook />
          </IconButton>
          <IconButton size="small" sx={{ color: '#FFD700' }}>
            <Twitter />
          </IconButton>
          <IconButton size="small" sx={{ color: '#FFD700' }}>
            <Instagram />
          </IconButton>
          <IconButton size="small" sx={{ color: '#FFD700' }}>
            <LinkedIn />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" sx={{ mb: 2, color: '#FFD700' }}>
          Quick Links
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button sx={{ color: '#fff', justifyContent: 'flex-start', textTransform: 'none' }}>
            Home
          </Button>
          <Button sx={{ color: '#fff', justifyContent: 'flex-start', textTransform: 'none' }}>
            About
          </Button>
          <Button sx={{ color: '#fff', justifyContent: 'flex-start', textTransform: 'none' }}>
            Classes
          </Button>
          <Button sx={{ color: '#fff', justifyContent: 'flex-start', textTransform: 'none' }}>
            Contact
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h6" sx={{ mb: 2, color: '#FFD700' }}>
          Operating Hours
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ mr: 1, color: '#FFD700' }} />
          <Typography sx={{ color: '#FFF' }}>Mon-Fri: 6:00 - 22:00</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ mr: 1, color: '#FFD700' }} />
          <Typography sx={{ color: '#FFF' }}>Sat-Sun: 8:00 - 20:00</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Phone sx={{ mr: 1, color: '#FFD700' }} />
          <Typography sx={{ color: '#FFF' }}>+1 (555) 000-0000</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Email sx={{ mr: 1, color: '#FFD700' }} />
          <Typography sx={{ color: '#FFF' }}>info@questdigiflex.com</Typography>
        </Box>
      </Grid>
    </Grid>
  </Container>
  {/* Copyright Section */}
  <Box
    sx={{
      mt: 4,
      pt: 3,
      borderTop: '1px solid #444',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.7)',
    }}
  >
    <Typography variant="body2" sx={{ mb: 1 }}>
      © {new Date().getFullYear()} QUEST DIGIFLEX. All Rights Reserved.
    </Typography>
    {/* <Typography variant="body2">
      Designed with <span style={{ color: '#FFD700' }}>❤️</span> by Your Creative Team.
    </Typography> */}
  </Box>
</Box>
</Box>
  );
};

export default LandingPage;