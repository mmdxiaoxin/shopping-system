<template>
  <el-card shadow="never">
    <template #header>
      <div class="flex justify-between">
        <span class="text-sm">订单统计</span>
        <div>
          <el-check-tag
            v-for="(item, index) in options"
            :key="index"
            :checked="current === item.value"
            style="margin-right: 8px"
            @click="handleChoose(item.value)"
          >
            {{ item.label }}
          </el-check-tag>
        </div>
      </div>
    </template>
    <div ref="lineChart" style="width: 100%; height: 300px"></div>
  </el-card>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { useEcharts } from "@/hooks/useEcharts";
import { getStatistics3 } from "@/api/modules/dashboard";

const lineChart = ref();
const current = ref("hour");
const options = [
  { label: "近24小时", value: "hour" },
  { label: "近1周", value: "week" },
  { label: "近1个月", value: "month" },
];
const handleChoose = (type) => {
  current.value = type;
  getChartData();
};

let myChart = null;
let option = {};
const drawnLineChart = () => {
  myChart = echarts.init(lineChart.value);
  option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
  useEcharts(myChart, option);
};
const getChartData = () => {
  myChart.showLoading();
  getStatistics3(current.value)
    .then(({ x: XData, y: YData }) => {
      option.xAxis.data = XData;
      option.series[0].data = YData;
      myChart.setOption(option);
    })
    .finally(() => {
      myChart.hideLoading();
    });
};

onMounted(() => {
  drawnLineChart();
  getChartData();
});
</script>
<style scoped></style>
