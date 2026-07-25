// src/components/DailySummaryUI.tsx
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { type Daily } from '../types/DashboardTypes';

interface DailySummaryUIProps {
  daily?: Daily;
}

function formatHour(isoString: string) {
  return new Date(isoString).toLocaleTimeString('es-EC', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function DailySummaryUI(props: DailySummaryUIProps) {
  if (!props.daily) return null;

  // El índice 0 del arreglo "daily" siempre es el día de hoy
  const max = props.daily.temperature_2m_max[0];
  const min = props.daily.temperature_2m_min[0];
  const sunrise = props.daily.sunrise[0];
  const sunset = props.daily.sunset[0];
  const rainProb = props.daily.precipitation_probability_max[0];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Resumen del día
        </Typography>

        <Stack  direction="row" spacing={4} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }} >
            <ArrowUpwardIcon fontSize="small" sx={{ color: '#D32F2F' }} />
            <Typography component="span" variant="body1">Máx {Math.round(max)}°</Typography>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <ArrowDownwardIcon fontSize="small" sx={{ color: '#1976D2' }} />
            <Typography component="span" variant="body1">Mín {Math.round(min)}°</Typography>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <WaterDropIcon fontSize="small" sx={{ color: '#1976D2' }} />
            <Typography component="span" variant="body1">{rainProb}% de lluvia</Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={4} sx={{ flexWrap: 'wrap' }} useFlexGap>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <WbSunnyIcon fontSize="small" sx={{ color: '#F5A623' }} />
            <Box>
              <Typography component="span" variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                Amanecer
              </Typography>
              <Typography component="span" variant="body1" sx={{ display: 'block' }}>
                {formatHour(sunrise)}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <NightsStayIcon fontSize="small" sx={{ color: '#5C6BC0' }} />
            <Box>
              <Typography component="span" variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                Atardecer
              </Typography>
              <Typography component="span" variant="body1" sx={{ display: 'block' }}>
                {formatHour(sunset)}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}