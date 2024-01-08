<template>

    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            可信随机数信息
        </h1>
        <span
            class="flex -mx-2">
            <i-button
                class="flex items-center justify-center mx-2 px-2"
                @click="showStoreDialog = true">
                <plus-icon
                    class="mr-2"/>
                生成随机数
            </i-button>
        </span>
    </header>

    <i-paginatable-page
        ref="page"
        api="/random/list"
        :thead="[
            '随机数 ID', '描述', '交易 ID', '随机数范围', '随机数输入', '用户 ID', '随机数个数', '类型', '生成时间',
        ]"
        :filters="{
            randomId: '随机数 ID',
        }">

        <template
			#tr="random">
            <randoms-index-tr
                :random="random"/>
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
import RandomsIndexTr from '~/prefabs/randoms/index/tr.vue';
import StoreDialog from '~/prefabs/randoms/index/store-dialog.vue';
import PlusIcon from '~/components/icons/plus.vue';

const showStoreDialog = ref(false);

</script>

<script>
export default {

    metaInfo: {
        title: '可信随机数信息',
    },

    methods: {
        refresh() {
            this.$refs.page.refresh();
        },
    }
}
</script>