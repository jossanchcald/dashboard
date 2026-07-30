// src/components/WeeklySummaryUI.tsx
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import WeatherIconUI from './WeatherIconUI';
import { getWeatherCondition } from '../utils/weatherCondition';
import { type Daily } from '../types/DashboardTypes';

interface WeeklySummaryUIProps {
  daily?: Daily;
  loading?: boolean;
}

function isToday(isoDate: string) {
  const todayIso = new Date().toISOString().slice(0, 10);
  return isoDate === todayIso;
}

function formatDayLabel(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00`);
  const label = date.toLocaleDateString('es-EC', { weekday: 'short' });
  return label.replace('.', '');
}

export function WeeklySummaryUI(props: WeeklySummaryUIProps) {
  if (props.loading || !props.daily) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            Prónostico de la Semana
          </Typography>

          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
            {Array.from({ length: 7 }).map((_, index) => (
              <Box key={index} sx={{ flex: '0 0 auto', minWidth: 88, textAlign: 'center', py: 1.5, px: 1 }}>
                <Skeleton variant="text" width={40} sx={{ mx: 'auto' }} />
                <Skeleton variant="circular" width={32} height={32} sx={{ mx: 'auto', my: 1 }} />
                <Skeleton variant="text" width={50} sx={{ mx: 'auto' }} />
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    );
  }

  const days = props.daily.time.slice(0, 7);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Prónostico de la Semana
        </Typography>

        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
          {days.map((isoDate, index) => {
            const max = props.daily!.temperature_2m_max[index];
            const min = props.daily!.temperature_2m_min[index];
            const weatherCode = props.daily!.weather_code[index];
            const condition = getWeatherCondition(weatherCode);
            const today = isToday(isoDate);

            return (
              <Box
                key={isoDate}
                sx={{
                  flex: '0 0 auto',
                  minWidth: 88,
                  textAlign: 'center',
                  borderRadius: 2,
                  py: 1.5,
                  px: 1,
                  bgcolor: today ? 'action.selected' : 'transparent',
                }}
              >
                <Typography variant="subtitle2" component="div" sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
                  {formatDayLabel(isoDate)}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
                  <WeatherIconUI condition={condition} />
                </Box>

                <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center', alignItems: 'baseline' }}>
                  <Typography component="span" variant="body2" sx={{ fontWeight: 700 }}>
                    {Math.round(max)}°.
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                    {Math.round(min)}°.
                  </Typography>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}