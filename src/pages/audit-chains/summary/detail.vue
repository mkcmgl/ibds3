<template>
    <header
        class="flex items-center my-6">
        <router-link
            class="h-10 w-10 text-center leading-10 bg-transparent hover:bg-slate-500/25 inline-block rounded"
            :to="fromPath">
            <i
                class="mdi mdi-arrow-left"></i>
        </router-link>
        <h1 class="text-xl font-semibold ml-4">
            返回
        </h1>
    </header>

    <key-indicators/>

    <logs-info/>

    <txs-info/>

    <i-paginatable-page
        ref="page"
        :api="api"
        :thead="[
            '日期', '新增交易量', '累计交易量',
        ]">
        <template
			#tr="tx">
            <td>
                {{ tx.date }}
            </td>
            <td>
                {{ tx.count }}
            </td>
            <td>
                {{ tx.total }}
            </td>
        </template>
    </i-paginatable-page>

</template>

<script setup>

import { computed } from 'vue';
import { useRoute } from 'vue-router';

import KeyIndicators from '~/prefabs/audit-chains/summary/detail/key-indicators.vue';
import LogsInfo from '~/prefabs/audit-chains/summary/detail/logs-info.vue';
import TxsInfo from '~/prefabs/audit-chains/summary/detail/txs-info.vue';
import IPaginatablePage from '~ui/components/paginatable-page/component.vue';

const route = useRoute();

const fromPath = computed(() => {
    return route.query.fromPath || '/audit-chains/summary'
});

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
};

const today = computed(() => {
    return formatDate(new Date());
});

const lastWeek = computed(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return formatDate(date);
});

const api = computed(() => {
    let url = `/log/statistics/everyday/numberPage?startTime=${lastWeek.value}&endTime=${today.value}`;
    if (route.query.label) {
        url += `&labelId=${route.query.label}`;
    }
    return url;
});

</script>

<script>
export default {
    metaInfo() {
        return {
            title: '交易统计详情'
        }
    }
}
</script>