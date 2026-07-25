import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface TableUIProps {
    value1Name?: string;
    value2Name?: string;
    arrHourlyTimes?: Array<string>;
    arrValues1?: Array<number>;
    arrValues2?: Array<number>;
}

function combineArrays(
    arrLabels: string[],
    arrValues1: number[],
    arrValues2: number[]
) {
    return arrLabels.map((label, index) => {

        const date = new Date(label);

        return {
            id: index,
            label: date.toLocaleString("es-EC", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
            }),
            value1: arrValues1[index],
            value2: arrValues2[index]
        };
    });
}

const arrValues1 = [0, 0, 0, 0, 0, 0, 0];
const arrValues2 = [0, 0, 0, 0, 0, 0, 0];
const arrLabels = [
    '2026-01-01T00:00',
    '2026-01-01T01:00',
    '2026-01-01T02:00',
    '2026-01-01T03:00',
    '2026-01-01T04:00',
    '2026-01-01T05:00',
    '2026-01-01T06:00',
];

export default function TableUI(props: TableUIProps) {

    const columns: GridColDef[] = [
        {
            field: "label",
            headerName: "Fecha",
            width: 150,
        },
        {
            field: "value1",
            headerName: props.value1Name ?? "--",
            width: 130,
        },
        {
            field: "value2",
            headerName: props.value2Name ?? "--",
            width: 130,
        },
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
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}
