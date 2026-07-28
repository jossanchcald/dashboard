// src/components/WeatherIconUI.tsx
import Box from '@mui/material/Box';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import { type WeatherCondition } from '../utils/weatherCondition';

interface WeatherIconUIProps {
  condition: WeatherCondition;
  size?: number;
}

// Ícono compuesto según el weather_code (WMO) mapeado a WeatherCondition
export default function WeatherIconUI(props: WeatherIconUIProps) {
  const size = props.size ?? 40;
  const condition = props.condition;

  if (condition === 'storm') {
    return (
      <ThunderstormIcon sx={{ fontSize: size * 0.85, color: '#5C6BC0' }} />
    );
  }

  if (condition === 'snow') {
    return (
      <AcUnitIcon sx={{ fontSize: size * 0.85, color: '#90CAF9' }} />
    );
  }

  if (condition === 'fog') {
    return (
      <BlurOnIcon sx={{ fontSize: size * 0.85, color: '#B0BEC5' }} />
    );
  }

  const isRain = condition === 'rain' || condition === 'drizzle';
  const isCloudy = condition === 'cloudy';
  const isPartlyCloudy = condition === 'partlyCloudy';
  const isClear = condition === 'clear';

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {(isClear || isPartlyCloudy) && (
        <WbSunnyIcon
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            fontSize: size * 0.55,
            color: '#FDB813',
          }}
        />
      )}

      {isCloudy ? (
        <CloudQueueIcon
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            fontSize: size * 0.75,
            color: '#90A4AE',
          }}
        />
      ) : (
        <CloudIcon
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            fontSize: size * 0.75,
            color: isRain ? '#90A4AE' : '#FFFFFF',
            filter: isRain ? 'none' : 'drop-shadow(0 0 1px rgba(0,0,0,0.25))',
          }}
        />
      )}

      {isRain && (
        <WaterDropIcon
          sx={{
            position: 'absolute',
            bottom: -2,
            right: size * 0.05,
            fontSize: size * 0.3,
            color: '#1976D2',
          }}
        />
      )}
    </Box>
  );
}
