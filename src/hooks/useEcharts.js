import { onDeactivated, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

/**
 * @description 使用 Echarts (只是为了添加图表响应式)
 * @param myChart
 * @param options
 */
export const useEcharts = (myChart, options) => {
  if (options && typeof options === "object") {
    myChart.setOption(options);
  }

  const echartsResize = () => {
    myChart && myChart.resize();
  };

  window.addEventListener("resize", echartsResize);

  onDeactivated(() => {
    window.removeEventListener("resize", echartsResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", echartsResize);
  });
};
