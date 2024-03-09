import { Box } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import React from "react";

export interface PieChartProps {
  id: number;
  value: number;
  label: string;
  color: string;
}
const OverviewPieChart = ({ data }: { data: PieChartProps[] }) => {
  return (
    <Box marginLeft={5}>
      <PieChart
        series={[
          {
            arcLabel: (item) => {
              const total = data.reduce((a, b) => a + b.value, 0);
              const persent = ((item.value / total) * 100).toFixed();
              return `${persent}%`;
            },
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={500}
        colorScheme={["red", "green", "blue", "black"]}
        slotProps={{
          legend: { hidden: true },
        }}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
};

export default OverviewPieChart;
