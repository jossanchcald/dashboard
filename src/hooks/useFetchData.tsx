import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes.tsx';

export default function useFetchData(): OpenMeteoResponse | undefined {
    const URL = "https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago";
    const [data, setData] = useState<OpenMeteoResponse>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                const json: OpenMeteoResponse = await response.json();
                setData(json);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, []);

    return data;
}
