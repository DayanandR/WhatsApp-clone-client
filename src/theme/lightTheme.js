// theme/lightTheme.js
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
    primary: {
      main: '#00bfa5',
      light:'#00a884' 
    },
    secondary: {
      main: '#e1f3fb',
    },
    text: {
      primary: '#111b21',
      secondary: '#667781',
    },
  },
  typography: {
    fontFamily: `'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },
});

export default lightTheme;
