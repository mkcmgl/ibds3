<template>
    <div
        class="my-6 p-6 rounded shadow-sm bg-white">
        <h3
            class="mb-4 font-bold text-lg">
            关键指标
        </h3>
        <div
            class="flex items-center w-full">
            <div
                class="flex-1 text-center">
                <h5
                    class="text-sm mb-4">
                    日志总量(条)
                </h5>
                <p
                    class="text-3xl">
                    {{ indicators.totalTxs }}
                </p>
            </div>
            <div
                class="flex-1 text-center">
                <h5
                    class="text-sm mb-4">
                    使用日志级别种数(种)
                </h5>
                <p
                    class="text-3xl">
                    {{ indicators.levelCount }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>

import axios from '~/plugins/axios.js';
import { onBeforeMount, ref } from 'vue';

const indicators = ref({
    totalTxs: 0,
    levelCount: 0,
});

onBeforeMount(async () => {
    const { data } = await axios.get('/log/statistics/getTotalTxsInfo');
    indicators.value = data.data
});


</script>