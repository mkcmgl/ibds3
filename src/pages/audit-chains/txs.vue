<template>

    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            审计侧链交易
        </h1>
    </header>

    <i-paginatable-page
        ref="page"
        api="/log/block/tsearch/txs"
        :thead="[
            '交易ID', '交易哈希', '区块高度', '标签', '通道哈希', '所属通道', '日志级别', '创建时间',
        ]"
        :filters="{
            startTime: {
                label: '开始时间',
                input: {
                    placeholder: '请选择开始时间',
                    type: 'date'
                }
            },
            endTime: {
                label: '结束时间',
                input: {
                    placeholder: '请选择结束时间',
                    type: 'date'
                }
            },
            level: '日志级别'
        }">

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
        </template>

    </i-paginatable-page>

</template>

<script setup>
import IPaginatablePage from '~ui/components/paginatable-page/component.vue';
import ICopyer from '~ui/components/copyer/component.vue';
</script>

<script>
export default {
    metaInfo: {
        title: '审计侧链交易',
    },
}
</script>