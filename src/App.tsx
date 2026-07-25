import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';
import { useState } from 'react';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import VariableSelectUI from './components/VariableSelectUI';
import { type GeocodingResult } from './types/GeocodingTypes';
import { type VariableKey, getVariableLabel } from './types/DashboardTypes';

function App() {

  // Utilice una variable de estado para almacenar la opción seleccionada por el usuario
  // Guayaquil por defecto
  const [selectedCity, setSelectedCity] = useState<GeocodingResult | null>(null);

  // Variables que el usuario quiere comparar en el gráfico y la tabla
  const [variable1, setVariable1] = useState<VariableKey>('temperature_2m');
  const [variable2, setVariable2] = useState<VariableKey>('relative_humidity_2m');

  // Comunique la opción seleccionada al hook useFetchData
  const dataFetcherOutput = useFetchData(selectedCity ? { latitude: selectedCity.latitude, longitude: selectedCity.longitude } : null);

  // Arreglos de datos horarios según la variable elegida por el usuario
  const arrValues1 = dataFetcherOutput?.hourly[variable1];
  const arrValues2 = dataFetcherOutput?.hourly[variable2];

  const value1Name = dataFetcherOutput
    ? `${getVariableLabel(variable1)} (${dataFetcherOutput.hourly_units[variable1]})`
    : undefined;
  const value2Name = dataFetcherOutput
    ? `${getVariableLabel(variable2)} (${dataFetcherOutput.hourly_units[variable2]})`
    : undefined;

  return (
    <Grid container spacing={5} sx={{ justifyContent: "left", alignItems: "center" }}>

      {/* Encabezado */}
      <Grid size={12}>
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid size={12} container sx={{ justifyContent: "right", alignItems: "center" }}>
        <AlertUI description="No se preveen lluvias" />
      </Grid>

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

      {/* Resumen del Dia */}
      <Grid size={12}>Elemento: Resumen del Dia</Grid>

      {/* Selectores de variables a comparar */}
      <Grid size={12} container spacing={2} sx={ {  display: { xs: "none", md: "flex" }, justifyContent: "center", alignItems: "center" }   }>
        <Grid size={{ xs: 12, md: 3 }}>
          <VariableSelectUI label="Variable 1" value={variable1} excludeValue={variable2} onChange={setVariable1} />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <VariableSelectUI label="Variable 2" value={variable2} excludeValue={variable1} onChange={setVariable2} />
        </Grid>
      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <ChartUI
          chartTitle={`${getVariableLabel(variable1)} y ${getVariableLabel(variable2)} por Hora`}
          value1Name={value1Name}
          value2Name={value2Name}
          arrHourlyTimes={dataFetcherOutput?.hourly.time}
          arrValues1={arrValues1}
          arrValues2={arrValues2}
        />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <TableUI
          value1Name={value1Name}
          value2Name={value2Name}
          arrHourlyTimes={dataFetcherOutput?.hourly.time}
          arrValues1={arrValues1}
          arrValues2={arrValues2}
        />
      </Grid>

    </Grid>
  );
}

export default App
