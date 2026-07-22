import Alert from '@mui/material/Alert';

interface AlertConfig {
    description: string;
}

export default function AlertUI(config:AlertConfig) {
    return (
        <Alert severity="success" variant="outlined"> {config.description}</Alert>
    )
}