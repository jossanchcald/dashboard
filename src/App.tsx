import './App.css'
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AlertUI from './components/AlertUI';
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
import { type VariableKey, type RangeFilter, sliceByRange, getVariableLabel, getWeatherAlert } from './types/DashboardTypes';
import WeatherHeaderUI from './components/WeatherHeaderUI';
import { DEFAULT_CITY } from './constants/defaultCity';

function App() {
  // Inicializamos con Guayaquil en vez de null, así el selector
  // ya muestra el nombre correcto desde el primer render.
  const [selectedCity, setSelectedCity] = useState<GeocodingResult>(DEFAULT_CITY);
  const [variable1, setVariable1] = useState<VariableKey>('temperature_2m');
  const [variable2, setVariable2] = useState<VariableKey>('relative_humidity_2m');
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>('24h');

  const dataState = useFetchData({ latitude: selectedCity.latitude, longitude: selectedCity.longitude });
  const dataFetcherOutput = dataState?.data;

  // ---- Clima/hora centralizado, alimenta el fondo global y el tema de MUI ----
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

  const weatherAlert = dataFetcherOutput
    ? getWeatherAlert(dataFetcherOutput.current.weather_code)
    : undefined;

  // ---- Fondo global: se pinta SIEMPRE, incluso durante loading/error,
  // así la pantalla de carga no es un blanco/negro plano sin relación al tema ----
  const globalBackground = (
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
  );

  if (dataState?.loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalBackground}
        <Box sx={{ p: 4 }}>Cargando...</Box>
      </ThemeProvider>
    );
  }

  if (dataState?.error) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalBackground}
        <Box sx={{ p: 4 }}>Error: {dataState.error}</Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalBackground}

      <Grid container spacing={5} sx={{ justifyContent: "left", alignItems: "center", p: 3 }}>

        <Grid size={12}>
          <WeatherHeaderUI
            current={dataFetcherOutput?.current}
            daily={dataFetcherOutput?.daily}
            utcOffsetSeconds={dataFetcherOutput?.utc_offset_seconds}
            locationName={selectedCity?.name}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} container sx={{ justifyContent: "right", alignItems: "center" }}>
          <SelectorUI value={selectedCity} onOptionSelect={setSelectedCity} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} container sx={{ justifyContent: "right", alignItems: "center" }}>
          <AlertUI
            description={weatherAlert ? `${weatherAlert.emoji} ${weatherAlert.message}` : 'Cargando estado del clima...'}
            severity={weatherAlert?.severity}
          />
        </Grid>

        <Grid container size={{ xs: 12, md: 12 }} sx={{ justifyContent: 'center', gap: 2 }}>
          {/* <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI title='Temperatura' description={dataFetcherOutput ? `${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}` : undefined} />
          </Grid> */}
          <Grid sx={{ display: 'none' }} size={{ md: 3 }}></Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI title='Temperatura Aparente' description={dataFetcherOutput ? `${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}` : undefined} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI title='Velocidad del viento' description={dataFetcherOutput ? `${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}` : undefined} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI title='Humedad Relativa' description={dataFetcherOutput ? `${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}` : undefined} />
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
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
          <TableUI
            value1Name={value1Name}
            value2Name={value2Name}
            arrHourlyTimes={arrHourlyTimes}
            arrValues1={arrValues1}
            arrValues2={arrValues2}
          />
        </Grid>

      </Grid>
    </ThemeProvider>
  );
}

export default App