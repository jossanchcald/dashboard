// src/theme/getAppTheme.ts
import { createTheme } from '@mui/material/styles';

export default function getAppTheme(isDay: boolean) {

  const glassColor = isDay
    ? 'rgba(255,255,255,1)'
    : 'rgba(36,42,54,1)';

  const glass = {
    backgroundColor: glassColor,
    backdropFilter: 'blur(10px)',
    transition: 'background-color 0.2s ease',
  };

  return createTheme({
    palette: {
      mode: isDay ? 'light' : 'dark',
      background: {
        paper: glassColor,
        default: 'rgba(0,0,0,0)',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { background: 'transparent' },
          body: { background: 'transparent' },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backdropFilter: glass.backdropFilter,
            transition: glass.transition,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: glass,
        },
      },

      MuiFilledInput: {
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
    }
  });
}