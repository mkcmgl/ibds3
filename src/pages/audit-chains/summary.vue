<template>
    <h3
        class="my-6 font-bold text-lg">
        多维度下交易统计
    </h3>
    <div
        class="my-6 p-6 bg-white rounded shadow-sm">
        <multi-dimensional-transaction-statistics/>
    </div>
    <h3
        class="my-6 font-bold text-lg">
        标签下交易统计
    </h3>
    <i-paginatable-page
        ref="page"
        api="/log/block/tsearch/txs"
        :thead="[
            '交易ID', '交易哈希', '区块高度', '标签', '通道哈希', '所属通道', '日志级别', '创建时间', '操作'
        ]">
        <template
			#tr="tx">
            <td>
                {{ tx.id }}
            </td>
            <i-copyer
                tag="td"
                class="text-blue-500 cursor-pointer"
                :content="tx.txHash">
                <span
                    class="w-32 truncate block">
                    {{ tx.txHash }}
                </span>
            </i-copyer>
            <td>
                {{ tx.blockId }}
            </td>
            <td>
                {{ tx.label }}
            </td>
            <i-copyer
                tag="td"
                class="text-blue-500 cursor-pointer"
                :content="tx.channelHash">
                <span
                    class="w-32 truncate block">
                    {{ tx.channelHash }}
                </span>
            </i-copyer>
            <td>
                {{ tx.channelName }}
            </td>
            <td>
                {{ tx.level }}
            </td>
            <td>
                {{ tx.createTime }}
            </td>
            <td>
                <router-link
                    class="text-blue-500 cursor-pointer"
                    :to="{
                        name: 'audit-chains/summary/detail',
                        query: {
                            label: tx.label,
                            type: 2,
                            from: $route.fullPath
                        }
                    }">
                    详情
                </router-link>
            </td>
        </template>

    </i-paginatable-page>
</template>

<script setup>

import MultiDimensionalTransactionStatistics from '~/prefabs/audit-chains/summary/multi-dimensional-transaction-statistics.vue';
import IPaginatablePage from '~ui/components/paginatable-page/component.vue';
import ICopyer from '~ui/components/copyer/component.vue';

</script>

<script>
export default {
    metaInfo() {
        return {
            title: '统计汇总'
        };
    }
}
</script>