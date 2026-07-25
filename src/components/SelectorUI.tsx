// components/SelectorUI.tsx
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import useCitySearch from '../hooks/useCitySearch';
import { type GeocodingResult } from '../types/GeocodingTypes';

interface SelectorUIProps {
    onOptionSelect: (city: GeocodingResult) => void;
}

export default function SelectorUI({ onOptionSelect }: SelectorUIProps) {
    const [inputValue, setInputValue] = useState('');
    const { results, loading } = useCitySearch(inputValue);

    return (
        <FormControl fullWidth>
            <Autocomplete
                options={results}
                loading={loading}
                getOptionLabel={(option) =>
                    `${option.name}${option.admin1 ? `, ${option.admin1}` : ''}, ${option.country}`
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onInputChange={(_, newValue) => setInputValue(newValue)}
                onChange={(_, selectedCity) => {
                    if (selectedCity) onOptionSelect(selectedCity);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Ubicacion" placeholder="Escribe una ubicacion..." />
                )}
                noOptionsText={inputValue.length < 2 ? "Escribe al menos 2 letras" : "Sin resultados"}
            />

            <p>
                Información del clima en{" "} <br></br>
                <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
                    {inputValue}
                </span>
            </p>
        </FormControl>
    );
}