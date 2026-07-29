// components/SelectorUI.tsx
import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import useCitySearch from '../hooks/useCitySearch';
import { type GeocodingResult } from '../types/GeocodingTypes';

interface SelectorUIProps {
    value: GeocodingResult | null;
    onOptionSelect: (city: GeocodingResult) => void;
}

function formatCityLabel(option: GeocodingResult) {
    return `${option.name}${option.admin1 ? `, ${option.admin1}` : ''}, ${option.country}`;
}

export default function SelectorUI({ value, onOptionSelect }: SelectorUIProps) {
    const [inputValue, setInputValue] = useState(value ? formatCityLabel(value) : '');
    const { results, loading } = useCitySearch(inputValue);

    // Cuando "value" cambia desde afuera (ej. carga inicial con Guayaquil,
    // o si en el futuro seteas la ciudad desde otro lado), reflejamos ese
    // texto en el input -- pero sin pisar lo que el usuario esté escribiendo
    // en medio de una búsqueda activa.
    useEffect(() => {
        setInputValue(value ? formatCityLabel(value) : '');
    }, [value]);

    return (
        <FormControl fullWidth>
            <Autocomplete
                options={results}
                loading={loading}
                value={value}
                inputValue={inputValue}
                getOptionLabel={formatCityLabel}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                onInputChange={(_, newValue) => setInputValue(newValue)}
                onChange={(_, selectedCity) => {
                    if (selectedCity) onOptionSelect(selectedCity);
                }}
                renderInput={(params) => (
                    <TextField {...params} variant="filled" label="Ubicacion" placeholder="Escribe una ubicacion..." />
                )}
                noOptionsText={inputValue.length < 2 ? "Escribe al menos 2 letras" : "Sin resultados"}
            />
        </FormControl>
    );
}