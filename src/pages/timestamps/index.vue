<template>

    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            可信时间戳信息
        </h1>
        <span
            class="flex -mx-2">
            <i-button
                class="px-2 flex items-center justify-center mx-2"
                @click="showStoreDialog = true">
                <plus-icon
                    class="mr-2"/>
                生成时间戳
            </i-button>
        </span>
    </header>

    <i-paginatable-page
        ref="page"
        api="/timestamp/list"
        :thead="[
            '时间戳 ID', '描述', '交易 ID', '时间戳', '用户 ID', '创建时间',
        ]"
        :filters="{
            timestampId: '时间戳 ID',
            startTxTime: {
                label: '交易开始日期',
                input: {
                    placeholder: '请选择交易开始日期',
                    type: 'date'
                }
            },
            endTxTime: {
                label: '交易结束日期',
                input: {
                    placeholder: '请选择交易结束日期',
                    type: 'date'
                }
            }
        }">

        <template
			#tr="timestamp">
            <timestamp-index-tr
                :timestamp="timestamp"/>
        </template>

    </i-paginatable-page>

    <store-dialog
        v-model="showStoreDialog"
        @store="refresh"/>

</template>

<script setup>
import { ref } from 'vue';
import IPaginatablePage from '~ui/components/paginatable-page/component.vue';
import IButton from '~ui/components/button/component.vue';
import TimestampIndexTr from '~/prefabs/timestamps/index/tr.vue';
import StoreDialog from '~/prefabs/timestamps/index/store-dialog.vue';
import PlusIcon from '~/components/icons/plus.vue';

const showStoreDialog = ref(false);

</script>

<script>
export default {

    metaInfo: {
        title: '可信时间戳信息',
    },

    methods: {
        refresh() {
            this.$refs.page.refresh();
        },
    }
}
</script>