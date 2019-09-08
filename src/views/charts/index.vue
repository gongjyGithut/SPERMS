<template>
    <div class="app-container">
        <div class="chart" style="height:500px;width:100%;margin:0 auto"></div>
        <!-- 图表统计 -->
    </div>
</template>
<script>
import chart from 'echarts'
export default {
    mounted() {
        var myChart = chart.init(document.getElementsByClassName('chart')[0]);
        // 绘制图表
        myChart.setOption({
            title: {
                text: '设备工作时长'
            },
            
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: ['2018-1-1', '2018-1-2', '2018-1-3', '2018-1-4', '2018-1-5', '2018-1-6']
            },
            yAxis: {},
            series: [{
                name: '工作时长',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    },
}
</script>
