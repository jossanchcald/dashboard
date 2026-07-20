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

function App() {

  // Utilice una variable de estado para almacenar la opción seleccionada por el usuario
  // Guayaquil por defecto
  const [selectedCity, setSelectedCity] = useState<string | null>(null);


  // Comunique la opción seleccionada al hook useFetchData
  const dataFetcherOutput = useFetchData(selectedCity);

  return (
    <Grid container spacing={5} sx={{ justifyContent: "left", alignItems: "center" }}>

      {/* Encabezado */}
      <Grid size={12}>
        <HeaderUI/>
      </Grid>

      {/* Alertas */}
      <Grid size={12} container sx={{ justifyContent: "right", alignItems: "center" }}>
        <AlertUI description="No se preveen lluvias"/>
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }} container sx={{ justifyContent: "right", alignItems: "center" }}>
        <SelectorUI onOptionSelect={setSelectedCity} />
      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }} >

        <Grid size={{ xs: 12, md: 3 }}>
          {(<IndicatorUI title='Temperatura' description={dataFetcherOutput ? `${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}` : undefined } />)}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {(<IndicatorUI title='Temperatura Aparente' description={dataFetcherOutput ? `${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}`: undefined} />)}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {(<IndicatorUI title='Velocidad del viento' description={dataFetcherOutput ? `${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`: undefined} />)}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {(<IndicatorUI title='Humedad Relativa' description={dataFetcherOutput ? `${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}`: undefined} />)}
        </Grid>

      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <ChartUI chartTitle={'Temperatura y Humedad Relativa por Hora'} value1Name={dataFetcherOutput ? `Temperatura ${dataFetcherOutput.hourly_units.temperature_2m}` : undefined} value2Name={dataFetcherOutput ? `Humedad Relativa ${dataFetcherOutput.hourly_units.relative_humidity_2m}` : undefined} arrHourlyTimes={dataFetcherOutput?.hourly.time} arrHourlyTemp2m={dataFetcherOutput?.hourly.temperature_2m} arrHourlyRelativeHum={dataFetcherOutput?.hourly.relative_humidity_2m}/>
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <TableUI value1Name={dataFetcherOutput ? `Temperatura (${dataFetcherOutput.hourly_units.temperature_2m})` : undefined} value2Name={dataFetcherOutput ? `Humedad (${dataFetcherOutput.hourly_units.relative_humidity_2m})` : undefined} arrHourlyTimes={dataFetcherOutput?.hourly.time} arrHourlyTemp2m={dataFetcherOutput?.hourly.temperature_2m} arrHourlyRelativeHum={dataFetcherOutput?.hourly.relative_humidity_2m} />
      </Grid>

      {/* Información adicional */}
      <Grid size={12}>Elemento: Información adicional</Grid>

    </Grid>
  );
}

export default App
