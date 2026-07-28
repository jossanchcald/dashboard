import './App.css'
import { Grid } from '@mui/material';
{/* import AlertUI from './components/AlertUI';*/}
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';
import { useState } from 'react';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import VariableSelectUI from './components/VariableSelectUI';
import RangeFilterUI from './components/RangeFilterUI';
import { type GeocodingResult } from './types/GeocodingTypes';
import { type VariableKey, type RangeFilter, sliceByRange, getVariableLabel, getWeatherAlert } from './types/DashboardTypes';
import { WeeklySummaryUI } from './components/WeeklySummaryUI';
import WeatherHeaderUI from './components/WeatherHeaderUI';

function App() {

  // Utilice una variable de estado para almacenar la opción seleccionada por el usuario
  // Guayaquil por defecto
  const [selectedCity, setSelectedCity] = useState<GeocodingResult | null>(null);

  // Variables que el usuario quiere comparar en el gráfico y la tabla
  const [variable1, setVariable1] = useState<VariableKey>('temperature_2m');
  const [variable2, setVariable2] = useState<VariableKey>('relative_humidity_2m');

  // Rango horario a mostrar en el gráfico y la tabla (comparten el mismo filtro)
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>('24h');

  // Comunique la opción seleccionada al hook useFetchData
  const dataState = useFetchData(selectedCity ? { latitude: selectedCity.latitude, longitude: selectedCity.longitude } : null);
  const dataFetcherOutput = dataState?.data;

  // Rango horario a mostrar en el gráfico y la tabla (comparten el mismo filtro),
  // ya recortado con el helper sliceByRange
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

  if (dataState?.loading) {
    return <div>Cargando...</div>;
  }

  if (dataState?.error) {
    return <div>Error: {dataState?.error}</div>;
  }

  return (
    <Grid container spacing={5} sx={{ justifyContent: "left", alignItems: "center" }}>

      {/* Encabezado */}
      <Grid size={12}>
        <WeatherHeaderUI
          current={dataFetcherOutput?.current}
          daily={dataFetcherOutput?.daily}
          utcOffsetSeconds={dataFetcherOutput?.utc_offset_seconds}
          locationName={selectedCity?.name}
        />
      </Grid>

      {/* Alertas 
      <Grid size={12} container sx={{ justifyContent: "right", alignItems: "center" }}>
        <AlertUI
          description={weatherAlert ? `${weatherAlert.emoji} ${weatherAlert.message}` : 'Cargando estado del clima...'}
          severity={weatherAlert?.severity}
        />
      </Grid> */}

      {/* Selector Parte Superior
      <Grid size={12} container sx={{ justifyContent: "center", alignItems: "center" }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <SelectorUI onOptionSelect={setSelectedCity} />
        </Grid>
      </Grid> */}

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }} container sx={{ justifyContent: "right", alignItems: "center" }}>
        <SelectorUI onOptionSelect={setSelectedCity} />
      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }} >

        <Grid size={{ xs: 12, md: 3 }}>
          {(<IndicatorUI title='Temperatura' description={dataFetcherOutput ? `${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}` : undefined} />)}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {(<IndicatorUI title='Temperatura Aparente' description={dataFetcherOutput ? `${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}` : undefined} />)}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {(<IndicatorUI title='Velocidad del viento' description={dataFetcherOutput ? `${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}` : undefined} />)}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {(<IndicatorUI title='Humedad Relativa' description={dataFetcherOutput ? `${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}` : undefined} />)}
        </Grid>

      </Grid>

      <Grid container size={12}>
        <Grid
          size={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <WeeklySummaryUI daily={dataFetcherOutput?.daily} />
        </Grid>
      </Grid>

      {/* Selectores de variables a comparar y filtro de rango horario */}
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

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <ChartUI
          chartTitle={`${getVariableLabel(variable1)} y ${getVariableLabel(variable2)} por Hora`}
          value1Name={value1Name}
          value2Name={value2Name}
          arrHourlyTimes={arrHourlyTimes}
          arrValues1={arrValues1}
          arrValues2={arrValues2}
          rangeFilter={rangeFilter}
        />
      </Grid>

      {/* Tabla */}
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
  );
}

export default App
