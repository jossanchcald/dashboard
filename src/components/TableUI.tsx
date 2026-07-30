import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useTheme } from "@mui/material/styles";

interface TableUIProps {
    value1Name?: string;
    value2Name?: string;
    arrHourlyTimes?: Array<string>;
    arrValues1?: Array<number>;
    arrValues2?: Array<number>;
    loading?: boolean;
}

function combineArrays(arrLabels: string[], arrValues1: number[], arrValues2: number[]) {
    return arrLabels.map((label, index) => {
        return {
            id: index,
            // Guardamos el Date real, para que DataGrid pueda ordenarlos
            date: new Date(label),
            value1: arrValues1[index],
            value2: arrValues2[index]
        };
    });
}

const arrValues1 = [0, 0, 0, 0, 0, 0, 0];
const arrValues2 = [0, 0, 0, 0, 0, 0, 0];
const arrLabels = [
    '2026-01-01T00:00', '2026-01-01T01:00', '2026-01-01T02:00',
    '2026-01-01T03:00', '2026-01-01T04:00', '2026-01-01T05:00', '2026-01-01T06:00',
];

export default function TableUI(props: TableUIProps) {

    const theme = useTheme();

    if (props.loading) {
        return (
            <Box sx={{ height: 350, width: '100%', backgroundColor: theme.palette.background.paper, borderRadius: 1, p: 2, boxSizing: 'border-box' }}>
                <Stack spacing={1}>
                    {Array.from({ length: 7 }).map((_, i) => (
                        <Skeleton key={i} variant="rectangular" height={36} />
                    ))}
                </Stack>
            </Box>
        );
    }

    const columns: GridColDef[] = [
        {
            field: "date",
            headerName: "Fecha",
            width: 150,
            type: "dateTime",
            // Usamos valueFormatter para mostrar
            valueFormatter: (value: Date) =>
                value.toLocaleString("es-EC", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
        },
        { field: "value1", headerName: props.value1Name ?? "--", width: 130 },
        { field: "value2", headerName: props.value2Name ?? "--", width: 130 },
    ];

    const rows = combineArrays(
        props.arrHourlyTimes ?? arrLabels,
        props.arrValues1 ?? arrValues1,
        props.arrValues2 ?? arrValues2
    );

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
                sorting: { sortModel: [{ field: 'date', sort: 'asc' }] },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            sx={{
                backgroundColor: theme.palette.background.paper,
                border: 0,
                "& .MuiDataGrid-columnHeaders": { backgroundColor: theme.palette.background.paper },
                "& .MuiDataGrid-footerContainer": { backgroundColor: theme.palette.background.paper },
                "& .MuiDataGrid-row": { backgroundColor: theme.palette.background.paper },
            }}
         />
      </Box>
   );
}