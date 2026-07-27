// src/components/CelestialBodyUI.tsx
import Box from '@mui/material/Box';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';

interface CelestialBodyUIProps {
  isDay: boolean;
}

export default function CelestialBodyUI(props: CelestialBodyUIProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: props.isDay
          ? 'radial-gradient(circle, rgba(255,216,115,0.9) 0%, rgba(255,216,115,0) 70%)'
          : 'radial-gradient(circle, rgba(228,233,245,0.7) 0%, rgba(228,233,245,0) 70%)',
      }}
    >
      {props.isDay
        ? <WbSunnyIcon sx={{ fontSize: 40, color: '#FFD873' }} />
        : <NightsStayIcon sx={{ fontSize: 34, color: '#E4E9F5' }} />}
    </Box>
  );
}