<template>

    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            审计侧链区块
        </h1>
    </header>

    <i-paginatable-page
        ref="page"
        api="/log/block/tsearch/block"
        :thead="[
            '区块高度', '数据哈希', '区块哈希', '前一区块哈希', '交易数', '所属通道', '状态', '创建时间',
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
            }
        }">

        <template
			#tr="block">
            <td>
                {{ block.blockNum }}
            </td>

            <i-copyer
                tag="td"
                class="text-blue-500 cursor-pointer"
                :content="block.dataHash">
                <span
                    class="w-32 truncate block">
                    {{ block.dataHash }}
                </span>
            </i-copyer>

            <i-copyer
                tag="td"
                class="text-blue-500 cursor-pointer"
                :content="block.blockHash">
                <span
                    class="w-32 truncate block">
                    {{ block.blockHash }}
                </span>
            </i-copyer>

            <i-copyer
                tag="td"
                class="text-blue-500 cursor-pointer"
                :content="block.preHash">
                <span
                    class="w-32 truncate block">
                    {{ block.preHash }}
                </span>
            </i-copyer>
            
            <td>
                {{ block.txCount }}
            </td>
            <td>
                {{ block.channelName }}
            </td>
            <td>
                {{ block.status }}
            </td>
            <td>
                {{ block.createTime }}
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
        title: '审计侧链区块',
    },
}
</script>