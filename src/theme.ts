import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#CC0000',
      light: '#FF4D4D',
      dark: '#990000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#212121',
      light: '#484848',
      dark: '#000',
      contrastText: '#fff',
    },
    background: {
      default: '#f9f9f9',
      paper: '#fff',
    },
    text: {
      primary: '#111',
      secondary: '#555',
    },
  },
});


export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#CC0000',
      light: '#FF4D4D',
      dark: '#990000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#E0E0E0',
      light: '#fff',
      dark: '#BDBDBD',
      contrastText: '#000',
    },
    background: {
      default: '#262626',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#fff',
      secondary: '#BDBDBD',
    },
  },
});
