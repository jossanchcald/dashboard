import './App.css'
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';
import useWeatherTheme from './hooks/useWeatherTheme';
import getAppTheme from './theme/getAppTheme';
import { useState, useMemo } from 'react';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import VariableSelectUI from './components/VariableSelectUI';
import RangeFilterUI from './components/RangeFilterUI';
import { type GeocodingResult } from './types/GeocodingTypes';
import { type VariableKey, type RangeFilter, sliceByRange, getVariableLabel } from './types/DashboardTypes';
import { WeeklySummaryUI } from './components/WeeklySummaryUI';
import WeatherHeaderUI from './components/WeatherHeaderUI';
import { DEFAULT_CITY } from './constants/defaultCity';

function App() {
  const [selectedCity, setSelectedCity] = useState<GeocodingResult>(DEFAULT_CITY);
  const [variable1, setVariable1] = useState<VariableKey>('temperature_2m');
  const [variable2, setVariable2] = useState<VariableKey>('relative_humidity_2m');
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>('24h');

  const dataState = useFetchData({ latitude: selectedCity.latitude, longitude: selectedCity.longitude });
  const dataFetcherOutput = dataState?.data;

  const weatherTheme = useWeatherTheme(
    dataFetcherOutput?.current,
    dataFetcherOutput?.daily,
    dataFetcherOutput?.utc_offset_seconds
  );
  const theme = useMemo(() => getAppTheme(weatherTheme.isDay), [weatherTheme.isDay]);

  const arrHourlyTimes = dataFetcherOutput ? sliceByRange(dataFetcherOutput.hourly.time, rangeFilter) : undefined;
  const arrValues1 = dataFetcherOutput ? sliceByRange(dataFetcherOutput.hourly[variable1], rangeFilter) : undefined;
  const arrValues2 = dataFetcherOutput ? sliceByRange(dataFetcherOutput.hourly[variable2], rangeFilter) : undefined;

  const value1Name = dataFetcherOutput
    ? `${getVariableLabel(variable1)} (${dataFetcherOutput.hourly_units[variable1]})`
    : undefined;
  const value2Name = dataFetcherOutput
    ? `${getVariableLabel(variable2)} (${dataFetcherOutput.hourly_units[variable2]})`
    : undefined;

  const isLoading = !!dataState?.loading;
  const hasError = !!dataState?.error;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Fondo global, siempre montado */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: weatherTheme.background,
          transition: 'background 1s ease',
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, background: weatherTheme.overlay, transition: 'background 1s ease' }} />
      </Box>

      {/* Árbol único: SelectorUI y todo lo demás quedan siempre montados,
          loading/error se muestran como bloques condicionales adentro,
          nunca reemplazando el árbol completo. */}
      <Grid container spacing={5} sx={{ justifyContent: "left", alignItems: "center", p: 3 }}>

        <Grid size={12}>
          <WeatherHeaderUI
            current={dataFetcherOutput?.current}
            daily={dataFetcherOutput?.daily}
            utcOffsetSeconds={dataFetcherOutput?.utc_offset_seconds}
            locationName={selectedCity?.name}
            loading={isLoading}
          />
        </Grid>

        <Grid container size={{ xs: 12, md: 12 }} sx={{ justifyContent: 'center', gap: 2 }}>
          <Grid size={{ xs: 12, md: 6 }} container sx={{ justifyContent: "center", alignItems: "center" }}>
            <SelectorUI value={selectedCity} onOptionSelect={setSelectedCity} />
          </Grid>
        </Grid>

        {isLoading && (
          <Grid size={{ xs: 12, md: 6 }} container sx={{ justifyContent: "left", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} />
            <Typography variant="body2">Cargando datos del clima...</Typography>
          </Grid>
        )}

        {hasError && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography color="error">Error: {dataState?.error}</Typography>
          </Grid>
        )}

        <Grid container size={{ xs: 12, md: 12 }} sx={{ justifyContent: 'center', gap: 2 }}>
          <Grid sx={{ display: 'none' }} size={{ md: 3 }}></Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI title='Temperatura Aparente' description={dataFetcherOutput ? `${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}` : undefined} loading={isLoading} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI title='Velocidad del viento' description={dataFetcherOutput ? `${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}` : undefined} loading={isLoading} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI title='Humedad Relativa' description={dataFetcherOutput ? `${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}` : undefined} loading={isLoading} />
          </Grid>
        </Grid>

        <Grid container size={12}>
          <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
            <WeeklySummaryUI daily={dataFetcherOutput?.daily} loading={isLoading} />
          </Grid>
        </Grid>

        <Grid size={12} container spacing={2} sx={{ display: { xs: "none", md: "flex" } }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <VariableSelectUI label="Variable 1" value={variable1} onChange={setVariable1} excludeValue={variable2} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <VariableSelectUI label="Variable 2" value={variable2} onChange={setVariable2} excludeValue={variable1} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <RangeFilterUI value={rangeFilter} onChange={setRangeFilter} />
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
          <ChartUI
            chartTitle={`${getVariableLabel(variable1)} y ${getVariableLabel(variable2)}`}
            value1Name={value1Name}
            value2Name={value2Name}
            arrHourlyTimes={arrHourlyTimes}
            arrValues1={arrValues1}
            arrValues2={arrValues2}
            rangeFilter={rangeFilter}
            loading={isLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
          <TableUI
            value1Name={value1Name}
            value2Name={value2Name}
            arrHourlyTimes={arrHourlyTimes}
            arrValues1={arrValues1}
            arrValues2={arrValues2}
            loading={isLoading}
          />
        </Grid>

      </Grid>
    </ThemeProvider>
  );
}

export default App