// hooks/useFetchData.ts
import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface Coords {
    latitude: number;
    longitude: number;
}

interface DataState {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

export default function useFetchData(coords: Coords | null): DataState | undefined {

    const [dataState, setDataState] = useState<DataState>({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        // Guayaquil por defecto si aún no hay selección
        const { latitude, longitude } = coords ?? { latitude: -2.1962, longitude: -79.8862 };

        // Clave: al cambiar de ciudad, volvemos a "loading" de inmediato y
        // limpiamos el error/dato anterior, para que la pantalla de carga
        // se dispare también en cambios de ciudad, no solo en el primer render.
        setDataState({ data: null, loading: true, error: null });

        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,is_day&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weather_code,precipitation_probability_max&timezone=auto`;
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) throw new Error('Fetch error with OpenMeteo data');
                const dataJSON: OpenMeteoResponse = await response.json();
                setDataState(prev => ({
                    ...prev,
                    data: dataJSON,
                    loading: false,
                }));

            } catch (error) {
                console.log(error);
                setDataState(prev => ({
                    ...prev,
                    loading: false,
                    error: (error as Error).message
                }));
            }
        };

        fetchData();
    }, [coords?.latitude, coords?.longitude]);   

    return dataState;
}