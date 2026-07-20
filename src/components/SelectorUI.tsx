import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface SelectorUIProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SelectorUI({value, onChange}: SelectorUIProps) {

    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="city-select-label">Ciudad</InputLabel>

            <Select
                labelId="city-select-label"
                label="Ciudad"
                value={value}
                onChange={handleChange}
            >
                <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
                <MenuItem value="guayaquil">Guayaquil</MenuItem>
                <MenuItem value="quito">Quito</MenuItem>
                <MenuItem value="manta">Manta</MenuItem>
                <MenuItem value="cuenca">Cuenca</MenuItem>
            </Select>

            <p>
                Información del clima en{" "}
                <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
                    {value}
                </span>
            </p>

        </FormControl>
    );
}