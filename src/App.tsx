import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './hooks/useFetchData';
import { useState } from 'react';

function App() {

  const cities = useFetchData();

  // Guayaquil por defecto
  const [selectedCity, setSelectedCity] = useState("");

  const cityNames = ["guayaquil", "quito", "manta", "cuenca"];

  const index = cityNames.indexOf(selectedCity);
  const city = index !== -1 ? cities?.[index] : undefined;

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
        <SelectorUI value={selectedCity} onChange={setSelectedCity}/>
      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }} >

        <Grid size={{ xs: 12, md: 3 }}>
          {(<IndicatorUI title='Temperatura (2m)' description={city ? `${city.current.temperature_2m} ${city.current_units.temperature_2m}` : undefined } />)}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {(<IndicatorUI title='Temperatura Aparente' description={city ? `${city.current.apparent_temperature} ${city.current_units.apparent_temperature}`: undefined} />)}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {(<IndicatorUI title='Velocidad del viento (10m)' description={city ? `${city.current.wind_speed_10m} ${city.current_units.wind_speed_10m}`: undefined} />)}
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          {(<IndicatorUI title='Humedad Relativa (2m)' description={city ? `${city.current.relative_humidity_2m} ${city.current_units.relative_humidity_2m}`: undefined} />)}
        </Grid>

      </Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Gráfico</Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>Elemento: Tabla</Grid>

      {/* Información adicional */}
      <Grid size={12}>Elemento: Información adicional</Grid>

    </Grid>
  );
}

export default App
