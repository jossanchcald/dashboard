import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';

interface AlertConfig {
    description: string;
    severity?: AlertColor;
}

export default function AlertUI(config: AlertConfig) {
    return (
        <Alert severity={config.severity ?? 'success'} variant="outlined"> {config.description}</Alert>
    )
}