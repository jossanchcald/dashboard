import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

// Estrategia para convertir la opción seleccionada en un objeto
const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
    'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
    'Quito': { latitude: -0.2298, longitude: -78.5250 },
    'Manta': { latitude: -0.9494, longitude: -80.7314 },
    'Cuenca': { latitude: -2.8953, longitude: -78.9963 }
};

// Tipo del prop: string | null
export default function useFetchData(selectedOption: string | null) : OpenMeteoResponse | undefined {

    const [data, setData] = useState<OpenMeteoResponse>();

    useEffect(() => {

        // Parametrice la opción seleccionada en la URL del requerimiento asíncrono
        const cityConfig = selectedOption != null? CITY_COORDS[selectedOption] : CITY_COORDS["Guayaquil"];
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,relative_humidity_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`

        const fetchData = async () => {
            try {
                const response = await fetch(URL);

                if (!response.ok) {
                    throw new Error('Fetch error with OpenMeteo data');
                }

                const dataJSON: OpenMeteoResponse = await response.json();
                setData(dataJSON);

            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [selectedOption]); // El efecto secundario depende de la opción seleccionada

    return data;

}