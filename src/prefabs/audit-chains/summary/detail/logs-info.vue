<template>
    <div
        class="my-6 px-6 pt-6 rounded shadow-sm bg-white flex">
        <div
            class="flex-1">
            <h4
                class="mb-4 text-lg font-bold">
                日志级别占比 
            </h4>
            <div
                class="w-full h-[300px]"
                :id="`pie-chart-container-${key}`"/>
        </div>
        <div
            class="flex-1">
            <h4
                class="mb-4 text-lg font-bold">
                日志数量
            </h4>
            <div
                class="w-full h-[300px]"
                :id="`bar-chart-container-${key}`"/>
        </div>
    </div>
</template>

<script setup>

import axios from '~/plugins/axios.js';

import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import uuid from '~ui/utils/uuid.js';

const key = uuid();

const logs = ref([]);

const route = useRoute();

onMounted(async () => {

    let api = '/log/statistics/sofar/number';

    if (route.query.label) {
        api += `?labelId=${route.query.label}`;
    }

    const { data } = await axios.get(api);
    logs.value = data.data;

    let series = logs.value.map((log) => {
        return {
            name: log.level,
            value: log.txCount,
        };
    });

    let legend = series.map((log) => log.name);

    renderPieChart(legend, series);
    renderBarChart(legend, series);
});


const renderPieChart = (legend, series) => {

    const pieChart = echarts.init(document.getElementById(`pie-chart-container-${key}`));

    pieChart.setOption({
        title: {
            text: '日志级别占比',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#666',
                fontWeight: 'normal',
                fontSize: 16,
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)',
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: legend,
        },
        series: [
            {
                name: '日志级别占比',
                type: 'pie',
                radius: '50%',
                data: series,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, .5)',
                    },
                },
            },
        ],
    });
};


const renderBarChart = (legend, series) => {

    const barChart = echarts.init(document.getElementById(`bar-chart-container-${key}`));

    barChart.setOption({
        title: {
            text: '日志上传量',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#666',
                fontWeight: 'normal',
                fontSize: 16,
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}',
        },
        xAxis: {
            type: 'category',
            data: legend,
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: series.map((log) => log.value),
                type: 'bar'
            }
        ]
    });
}


</script>