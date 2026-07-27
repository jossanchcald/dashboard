// src/components/WeatherHeroHeaderUI.tsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import GrainIcon from '@mui/icons-material/Grain';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import useLocalTime from '../hooks/useLocalTime';
import { getWeatherCondition, getConditionLabel } from '../utils/weatherCondition';
import { getSkyGradient, getConditionOverlay } from '../utils/skyGradient';
import CelestialBodyUI from './CelestialBodyUI';
import WeatherEffectsUI from './WeatherEffectsUI';
import { type Current, type Daily } from '../types/DashboardTypes';

interface WeatherHeroHeaderUIProps {
  current?: Current;
  daily?: Daily;
  utcOffsetSeconds?: number;
  locationName?: string;
}

function parseHour(isoString: string) {
  const d = new Date(isoString);
  return d.getHours() + d.getMinutes() / 60;
}

function ConditionIcon(props: { condition: string; isDay: boolean; sx?: object }) {
  if (!props.isDay) return <NightsStayIcon sx={props.sx} />;
  switch (props.condition) {
    case 'clear': return <WbSunnyIcon sx={props.sx} />;
    case 'partlyCloudy': return <CloudQueueIcon sx={props.sx} />;
    case 'cloudy': return <CloudIcon sx={props.sx} />;
    case 'fog': return <CloudQueueIcon sx={props.sx} />;
    case 'drizzle': case 'rain': return <GrainIcon sx={props.sx} />;
    case 'snow': return <AcUnitIcon sx={props.sx} />;
    case 'storm': return <ThunderstormIcon sx={props.sx} />;
    default: return <WbSunnyIcon sx={props.sx} />;
  }
}

export default function WeatherHeaderUI(props: WeatherHeroHeaderUIProps) {
  const { hourDecimal, localDate } = useLocalTime(props.utcOffsetSeconds);

  if (!props.current || !props.daily) {
    return (
      <Box sx={{ p: 4, borderRadius: 3, background: '#4FA8F0' }}>
        <Typography component="div" variant="h5" sx={{ color: '#fff' }}>
          Cargando clima...
        </Typography>
      </Box>
    );
  }

  const condition = getWeatherCondition(props.current.weather_code);
  const isDay = props.current.is_day === 1;
  const sunriseHour = parseHour(props.daily.sunrise[0]);
  const sunsetHour = parseHour(props.daily.sunset[0]);

  const background = getSkyGradient(hourDecimal, sunriseHour, sunsetHour);
  const overlay = getConditionOverlay(condition);
  const timeLabel = localDate.toLocaleTimeString('es-EC', { hour: 'numeric', minute: '2-digit' });

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        p: 4,
        minHeight: 220,
        background,
        transition: 'background 1s ease',
        color: '#fff',
      }}
    >
      {/* Overlay de condición climática (oscurece/aclara el fondo según nublado, lluvia, etc.) */}
      <Box sx={{ position: 'absolute', inset: 0, background: overlay, transition: 'background 1s ease' }} />

      {/* Capas animadas: lluvia, nieve, nubes, niebla, relámpagos */}
      <WeatherEffectsUI condition={condition} isDay={isDay} />

      {/* Sol/luna fijo en la esquina */}
      <CelestialBodyUI isDay={isDay} />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography component="div" variant="subtitle1" sx={{ opacity: 0.9 }}>
          {props.locationName ?? 'Ubicación'}
        </Typography>

        <Typography component="div" variant="h1" sx={{ fontSize: '4rem', fontWeight: 700, lineHeight: 1 }}>
          {Math.round(props.current.temperature_2m)}°
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <ConditionIcon condition={condition} isDay={isDay} sx={{ fontSize: 28 }} />
          <Typography component="span" variant="h6">
            {getConditionLabel(condition)}
          </Typography>
        </Box>

        <Typography component="div" variant="body2" sx={{ mt: 1, opacity: 0.85 }}>
          {timeLabel} · Máx {Math.round(props.daily.temperature_2m_max[0])}° / Mín {Math.round(props.daily.temperature_2m_min[0])}°
        </Typography>
      </Box>
    </Box>
  );
}