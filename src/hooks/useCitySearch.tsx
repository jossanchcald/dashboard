// hooks/useCitySearch.ts
import { useEffect, useState } from 'react';
import { type GeocodingResponse, type GeocodingResult } from '../types/GeocodingTypes';

export default function useCitySearch(query: string) {
    const [results, setResults] = useState<GeocodingResult[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            return;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(async () => {
            setLoading(true);
            try {
                const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=es&format=json`;
                const response = await fetch(url, { signal: controller.signal });

                if (!response.ok) throw new Error('Error en geocoding');

                const data: GeocodingResponse = await response.json();
                setResults(data.results ?? []);
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.log(error);
                }
            } finally {
                setLoading(false);
            }
        }, 400); // debounce de 400ms

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [query]);

    return { results, loading };
}