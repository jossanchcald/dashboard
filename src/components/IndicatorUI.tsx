import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

interface IndicatorUIProps {
    title?: string;
    description?: string;
    loading?: boolean;
}

export default function IndicatorUI(props: IndicatorUIProps) {
    return (
        <Card>
            <CardContent>
                {props.loading ? (
                    <Skeleton variant="text" width={80} height={40} />
                ) : (
                    <Typography variant="h5">
                        {props.description ?? "--"}
                    </Typography>
                )}

                {props.loading ? (
                    <Skeleton variant="text" width={140} />
                ) : (
                    <Typography color="text.secondary">
                        {props.title}
                    </Typography>
                )}
            </CardContent>
        </Card>
    )
}