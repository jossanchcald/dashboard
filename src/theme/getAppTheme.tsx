// src/theme/getAppTheme.ts
import { createTheme } from '@mui/material/styles';

export default function getAppTheme(isDay: boolean) {

    const glass = {
      backgroundColor: isDay
        ? 'rgba(255,255,255,1)'
        : 'rgba(36,42,54,1)',
      backdropFilter: 'blur(10px)',
      transition: 'background-color 0.2s ease',
    };

    const darkBackground = "rgba(32,38,48,1)";
      
    return createTheme({
        palette: {
          mode: isDay ? 'light' : 'dark',
          background: {
            default: isDay ? "#f5f5f5" : darkBackground,
            paper: isDay ? "#ffffff" : darkBackground,
          },
        },
        components: {
        // Esto afecta a TODAS tus Card (IndicatorUI, DailySummaryUI, el header si lo dejas
        // como Card) sin tener que tocarlas una por una.
          MuiCard: {
            styleOverrides: {
              root: glass,
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: glass
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: glass,
            },
          },
          MuiAlert: {
            styleOverrides: {
              root: glass,
            },
          },
          MuiAutocomplete: {
            styleOverrides: {
              root: glass,
            },
          },
          MuiFilledInput: {
            styleOverrides: {
              root: {
                backgroundColor: isDay
                  ? 'rgba(255,255,255,1)'
                  : 'rgba(36,42,54,1)',
          
                '&:hover': {
                  backgroundColor: isDay
                    ? 'rgba(255,255,255,0.75)'
                    : 'rgb(58, 66, 81)',
                },
          
                '&.Mui-focused': {
                  backgroundColor: isDay
                    ? 'rgba(255,255,255,0.75)'
                    : 'rgba(36,42,54,1)',
                },
              },
            },
          },
        },
    });
}