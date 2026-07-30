// src/components/WeatherHeaderUI.tsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useWeatherTheme from '../hooks/useWeatherTheme';
import { getConditionLabel } from '../utils/weatherCondition';
//import { getWeatherImage } from '../utils/weatherImages';
import { type Current, type Daily } from '../types/DashboardTypes';

import imgClimaPrueba from '../assets/weather/imgClimaPrueba.webp';

interface WeatherHeaderUIProps {
  current?: Current;
  daily?: Daily;
  utcOffsetSeconds?: number;
  locationName?: string;
}

export default function WeatherHeaderUI(props: WeatherHeaderUIProps) {
  const weatherTheme = useWeatherTheme(props.current, props.daily, props.utcOffsetSeconds);

  // App.tsx ya bloquea el render completo mientras dataState.loading es true,
  // así que en teoría esto nunca debería verse vacío. Lo dejamos como resguardo.
  if (!props.current || !props.daily) {
    return <Box sx={{ p: 4, borderRadius: 3, minHeight: 220 }} />;
  }

  //const weatherImage = getWeatherImage(weatherTheme.condition, weatherTheme.isDay);
  const timeLabel = weatherTheme.localDate.toLocaleTimeString('es-EC', { hour: 'numeric', minute: '2-digit' });

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        p: 4,
        minHeight: 220,
        color: '#fff',
      }}
    >

      {/* ---- IMAGEN DE CLIMA (estática) ---- */}
      <Box
        component="img"
        src={imgClimaPrueba}
        alt={getConditionLabel(weatherTheme.condition)}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6,
        }}
      />

      {/* ---- SOL / LUNA: círculo simple, sin ícono, sin glow ---- */}
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: weatherTheme.isDay ? '#FFD873' : '#B8BEC9',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography component="div" variant="subtitle1" sx={{ opacity: 0.9 }}>
          {props.locationName ?? 'Ubicación'}
        </Typography>

        <Typography component="div" variant="h1" sx={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1 }}>
          {Math.round(props.current.temperature_2m)}°
        </Typography>

        <Typography component="div" variant="h6" sx={{ mt: 1 }}>
          {getConditionLabel(weatherTheme.condition)}
        </Typography>

        <Typography component="div" variant="body2" sx={{ mt: 1, opacity: 0.85 }}>
          {timeLabel} · Máx {Math.round(props.daily.temperature_2m_max[0])}° / Mín {Math.round(props.daily.temperature_2m_min[0])}°
        </Typography>
      </Box>
    </Box>
  );
}