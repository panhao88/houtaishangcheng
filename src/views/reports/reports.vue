<template>
  <div>
    <el-card class="box-card">
      <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("Statistics");
const { mapState: StatisticsStste, mapActions: StatisticsActions } = userModule;
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  components: {},
  // 定义变量
  data() {
    return {};
  },
  //监听方法  click事件等
  methods: {
    ...StatisticsActions(["getreports"]),
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        // title: { text: "堆叠区域图" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: JSON.parse(localStorage.getItem("reports")).legend,
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: JSON.parse(localStorage.getItem("reports")).xAxis,
        yAxis: JSON.parse(localStorage.getItem("reports")).yAxis,
        series: JSON.parse(localStorage.getItem("reports")).series,
      });
    },
  },
  //调用
  mounted() {
    this.getreports();
    this.drawLine();
  },
  watch: {},
  //计算
  computed: {
    ...StatisticsStste(["reports"]),
  },
};
</script>

<style scoped lang='scss'>
</style>