import { LineChart } from "@mui/x-charts/LineChart";
import Typography from "@mui/material/Typography";
import { type RangeFilter } from "../types/DashboardTypes";
import { useTheme } from "@mui/material/styles";

interface ChartUIProps {
  chartTitle?: string;
  value1Name?: string;
  value2Name?: string;
  arrHourlyTimes?: Array<string>;
  arrValues1?: Array<number>;
  arrValues2?: Array<number>;
  rangeFilter: RangeFilter;
}

const arrValues1 = [0, 0, 0, 0, 0, 0, 0];
const arrValues2 = [0, 0, 0, 0, 0, 0, 0];
const arrLabels = ["1 Jan"];

export default function ChartUI(props: ChartUIProps) {

  const theme = useTheme();

  const xAxisConfig = (() => {
    switch (props.rangeFilter) {
  
      case "24h":
        return {
          tickInterval: (_: unknown, index: number) => index % 2 === 0,
          valueFormatter: (value: string) => {
            const fecha = new Date(value);
  
            return fecha.toLocaleDateString("es-EC", {
              day: "numeric",
              month: "short",
            }) + "\n" +
            fecha.toLocaleTimeString("es-EC", {
              hour: "2-digit",
            });
          },
        };

      case "48h":
        return {
          tickInterval: (_: unknown, index: number) => index % 4 === 0,
          valueFormatter: (value: string) => {
            const fecha = new Date(value);
  
            return fecha.toLocaleDateString("es-EC", {
              day: "numeric",
              month: "short",
            }) + "\n" +
            fecha.toLocaleTimeString("es-EC", {
              hour: "2-digit",
            });
          },
        };
  
      case "todo":
        return {
          tickInterval: (_: unknown, index: number) => index % 24 === 0,
          valueFormatter: (value: string) =>
            new Date(value).toLocaleDateString("es-EC", {
              day: "numeric",
              month: "short",
            }),
        };
    }
  })();

  return (
    <>
      <Typography variant="h5" component="div"   sx={{ backgroundColor: theme.palette.background.paper, borderTopLeftRadius: 4, borderTopRightRadius: 4, paddingTop: 2, paddingBottom: 1}}>
        {props.chartTitle}
      </Typography>
      <LineChart
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,

          "& .MuiChartsSurface-root": {
          backgroundColor: theme.palette.background.paper,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        },
        }}
        height={300}
        series={[
          {
            data: props.arrValues1 ?? arrValues1,
            label: props.value1Name ?? "--",
          },
          {
            data: props.arrValues2 ?? arrValues2,
            label: props.value2Name ?? "--",
          },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: props.arrHourlyTimes ?? arrLabels,
            tickInterval: xAxisConfig.tickInterval,
            valueFormatter: xAxisConfig.valueFormatter,
          },
        ]}
      />
    </>
  );
}
