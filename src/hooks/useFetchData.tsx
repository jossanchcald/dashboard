import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData() : OpenMeteoResponse | undefined {

    const  URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962,-0.2298,-0.9494,-2.8953&longitude=-79.8862,-78.525,-80.7314,-78.9963&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago';

    const [data, setData] = useState<OpenMeteoResponse>();

    useEffect(() => {
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
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return data;

}