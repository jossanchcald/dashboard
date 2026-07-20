import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface IndicatorUIProps {
    title?: string;
    description?: string;
}

export default function IndicatorUI(props: IndicatorUIProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    {props.description ?? "--"}
                </Typography>

                <Typography color="text.secondary">
                    {props.title}
                </Typography>
            </CardContent>
        </Card>
    )
}