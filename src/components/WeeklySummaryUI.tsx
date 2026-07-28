// src/components/WeeklySummaryUI.tsx
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WeatherIconUI from './WeatherIconUI';
import { getDayCondition } from '../utils/weatherCondition';
import { type Daily } from '../types/DashboardTypes';

interface WeeklySummaryUIProps {
  daily?: Daily;
}

function isToday(isoDate: string) {
  const todayIso = new Date().toISOString().slice(0, 10);
  return isoDate === todayIso;
}

function formatDayLabel(isoDate: string) {
  // Se agrega T00:00:00 para que el navegador interprete la fecha en hora local
  // y no se desfase un día por UTC
  const date = new Date(`${isoDate}T00:00:00`);
  const label = date.toLocaleDateString('es-EC', { weekday: 'short' });
  // Algunos navegadores devuelven el día abreviado con un punto (ej. "mié.")
  return label.replace('.', '');
}

export function WeeklySummaryUI(props: WeeklySummaryUIProps) {
  if (!props.daily) return null;

  // El API de Open-Meteo devuelve 7 días por defecto en "daily"
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
            const precipProbMax = props.daily!.precipitation_probability_max[index];
            const condition = getDayCondition(precipProbMax);
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
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                >
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
