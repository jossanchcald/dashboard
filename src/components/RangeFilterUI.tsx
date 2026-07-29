// components/RangeFilterUI.tsx
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { RANGE_FILTER_OPTIONS, type RangeFilter } from '../types/DashboardTypes';
import Paper from '@mui/material/Paper';

interface RangeFilterUIProps {
  value: RangeFilter;
  onChange: (value: RangeFilter) => void;
}

export default function RangeFilterUI({ value, onChange }: RangeFilterUIProps) {
  return (
    <Paper sx={{ p: 1 }}>
      <FormControl>
        <FormLabel id="range-filter-label"></FormLabel>
        <RadioGroup
          row
          aria-labelledby="range-filter-label"
          value={value}
          onChange={(event) => onChange(event.target.value as RangeFilter)}
        >
          {RANGE_FILTER_OPTIONS.map((option) => (
            <FormControlLabel
              key={option.key}
              value={option.key}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
}
