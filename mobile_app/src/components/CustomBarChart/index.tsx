import React from "react";
import { Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { chartConfig } from "./chartConfig";
import styles from "./styles";

interface IProps {
  chartData: any;
}

const width = Dimensions.get("screen").height * 3;

export const CustomBarChart = ({ chartData }: IProps): React.ReactElement => {
  const data: ChartData = {
    labels: Object.keys(chartData)?.map((item) => item.split("_").join(" ")),
    datasets: [
      {
        data: Object.values(chartData),
      },
    ],
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      <BarChart
        data={data}
        width={width}
        height={220}
        chartConfig={chartConfig}
        withInnerLines={false}
        showValuesOnTopOfBars
        withHorizontalLabels={false}
        yAxisLabel=""
        yAxisSuffix=""
        style={styles.chart}
      />
    </ScrollView>
  );
};
