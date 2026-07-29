// components/VariableSelectUI.tsx
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { VARIABLE_OPTIONS, type VariableKey } from '../types/DashboardTypes';

interface VariableSelectUIProps {
  label: string;
  value: VariableKey;
  excludeValue?: VariableKey;
  onChange: (value: VariableKey) => void;
}

export default function VariableSelectUI({ label, value, excludeValue, onChange }: VariableSelectUIProps) {
  const labelId = `variable-select-label-${label}`;
  const selectId = `variable-select-${label}`;

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as VariableKey);
  };

  return (
    <Box sx={{ minWidth: 160 }}>
      <FormControl fullWidth size="small">
        <InputLabel variant='filled' id={labelId}>{label}</InputLabel>
        <Select 
          variant='filled'
          labelId={labelId}
          id={selectId}
          value={value}
          label={label}
          onChange={handleChange}
        >
          {VARIABLE_OPTIONS.filter((option) => option.key !== excludeValue).map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
