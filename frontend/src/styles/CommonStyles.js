export const cardStyle = {
    padding: '16px',
    textAlign: 'center',
    backgroundColor: '#1E1E1E',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 4px 20px rgba(255, 215, 0, 0.2)',
    },
  };
  
  export const darkTheme = {
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
  };