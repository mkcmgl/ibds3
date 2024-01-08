<template>
    <el-config-provider :locale="locale">
        <div
            class="p-6 my-6 rounded shadow-sm bg-white">

            <div
                class="mb-4 flex items-center justify-between">
                <p
                    class="text-lg font-bold">
                    每日交易量
                </p>
                <div>
                    <el-date-picker
                        v-model="dateRange"
                        size="large"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :disabled-date="(date) => {
                            return date.getTime() > Date.now();
                        }"
                    />
                </div>
            </div>
            
            <div
                class="w-full h-[300px]"
                :id="`txs-info-${key}`"/>

        </div>
    </el-config-provider>
</template>

<script setup>

import axios from '~/plugins/axios.js';
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import * as echarts from 'echarts';
import uuid from '~ui/utils/uuid.js';

import locale from 'element-plus/dist/locale/zh-cn.mjs';
import { ElConfigProvider } from 'element-plus';

const key = uuid();

const dateRange = ref([
    new Date(Date.now() - 3600 * 1000 * 24 * 7),
    new Date(),
]);

const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const sendRequest = async () => {
    const { data } = await axios.get('/log/statistics/everyday/number', {
        params: {
            startTime: formatDate(dateRange.value[0]),
            endTime: formatDate(dateRange.value[1]),
        },
    });
    // data.data as Array<{date: String;count: Number; total: number;}>

    const txsInfo = data.data.map(({date, count}) => {
        return {
            date,
            count,
        };
    });

    renderChart(data.data);
}

const renderChart = (data) => {
    const chart = echarts.init(document.getElementById(`txs-info-${key}`));
    chart.setOption({
        title: {
            text: '每日交易量',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: data.map(({date}) => date),
        },
        yAxis: {
            type: 'value',
        },
        series: [{
            data: data.map(({count}) => count),
            type: 'line',
        }],
    });
};

onMounted(() => {
    sendRequest();
});

watch(dateRange, () => {
    sendRequest();
});

</script>
