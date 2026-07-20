import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

interface SelectorUIProps {
    onOptionSelect: (option: string) => void;
}

export default function SelectorUI({onOptionSelect}: SelectorUIProps) {

    const [cityInput, setCityInput] = useState('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setCityInput(event.target.value)
        onOptionSelect(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="city-select-label">Ciudad</InputLabel>

            <Select
                labelId="city-select-label"
                label="Ciudad"
                value={cityInput}
                onChange={handleChange}
            >
                <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
                <MenuItem value="Guayaquil">Guayaquil</MenuItem>
                <MenuItem value="Quito">Quito</MenuItem>
                <MenuItem value="Manta">Manta</MenuItem>
                <MenuItem value="Cuenca">Cuenca</MenuItem>
            </Select>

            <p>
                Información del clima en{" "}
                <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
                    {cityInput}
                </span>
            </p>

        </FormControl>
    );
}