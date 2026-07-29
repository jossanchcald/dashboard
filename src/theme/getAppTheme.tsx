// src/theme/getAppTheme.ts
import { createTheme } from '@mui/material/styles';

export default function getAppTheme(isDay: boolean) {

    const glass = {
        backgroundColor: isDay
          ? 'rgba(255,255,255,1)'
          : 'rgba(20,24,32,1)',
        backdropFilter: 'blur(10px)',
        transition: 'background-color 0.2s ease',
      };
      
    return createTheme({
        palette: {
        mode: isDay ? 'light' : 'dark',
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
              root: {
                ...glass,
                backgroundImage: 'none',
              },
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
                  : 'rgba(20,24,32,1)',
          
                '&:hover': {
                  backgroundColor: isDay
                    ? 'rgba(255,255,255,0.75)'
                    : 'rgba(20,24,32,0.65)',
                },
          
                '&.Mui-focused': {
                  backgroundColor: isDay
                    ? 'rgba(255,255,255,0.75)'
                    : 'rgba(20,24,32,0.65)',
                },
              },
            },
          },
        },
    });
}