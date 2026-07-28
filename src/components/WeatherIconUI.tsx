// src/components/WeatherIconUI.tsx
import Box from '@mui/material/Box';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { type DayCondition } from '../utils/weatherCondition';

interface WeatherIconUIProps {
  condition: DayCondition;
  size?: number;
}

// Ícono compuesto: sol + nube para días soleados, nube + gota para días lluviosos
export default function WeatherIconUI(props: WeatherIconUIProps) {
  const size = props.size ?? 40;
  const isRainy = props.condition === 'lluvioso';

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
      {!isRainy && (
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

      <CloudIcon
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          fontSize: size * 0.75,
          color: isRainy ? '#90A4AE' : '#FFFFFF',
          filter: isRainy ? 'none' : 'drop-shadow(0 0 1px rgba(0,0,0,0.25))',
        }}
      />

      {isRainy && (
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
