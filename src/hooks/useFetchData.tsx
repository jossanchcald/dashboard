// hooks/useFetchData.ts
import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface Coords {
    latitude: number;
    longitude: number;
}

export default function useFetchData(coords: Coords | null): OpenMeteoResponse | undefined {
    const [data, setData] = useState<OpenMeteoResponse>();

    useEffect(() => {
        // Guayaquil por defecto si aún no hay selección
        const { latitude, longitude } = coords ?? { latitude: -2.1962, longitude: -79.8862 };

        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`;
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) throw new Error('Fetch error with OpenMeteo data');
                const dataJSON: OpenMeteoResponse = await response.json();
                setData(dataJSON);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [coords?.latitude, coords?.longitude]);

    return data;
}