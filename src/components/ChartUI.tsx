import { LineChart } from "@mui/x-charts/LineChart";
import Typography from "@mui/material/Typography";

interface ChartUIProps {
  chartTitle?: string;
  value1Name?: string;
  value2Name?: string;
  arrHourlyTimes?: Array<string>;
  arrValues1?: Array<number>;
  arrValues2?: Array<number>;
}

const arrValues1 = [0, 0, 0, 0, 0, 0, 0];
const arrValues2 = [0, 0, 0, 0, 0, 0, 0];
const arrLabels = ["1 Jan"];

export default function ChartUI(props: ChartUIProps) {
  return (
    <>
      <Typography variant="h5" component="div">
        {props.chartTitle}
      </Typography>
      <LineChart
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
            tickInterval: (_, index) => index % 24 === 0,
            valueFormatter: (value: string) => {
              if (value.endsWith("T00:00")) {
                const fecha = new Date(value);
                return fecha.toLocaleDateString("es-EC", {
                  day: "numeric",
                  month: "short",
                });
              }

              return "";
            },
          },
        ]}
      />
    </>
  );
}
