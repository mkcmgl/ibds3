<template>
    
    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            虚拟通道
        </h1>
        <span
            class="flex -mx-2">
            <i-button
                class="flex items-center justify-center mx-2 px-2"
                @click="showStoreDialog = true">
                <plus-icon
                    class="mr-2"/>
                创建通道
            </i-button>
        </span>
    </header>

    <i-paginatable-page
        ref="page"
        api="/channel/list"
        :thead="[
            '通道 ID', '通道名称', '创建者', '通道描述', '创建时间',
        ]"
        :filters="{
            channelName: '通道名称',
        }">

        <template
			#tr="channel">
            <channel-index-tr
                :channel="channel"/>
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
import PlusIcon from '~/components/icons/plus.vue';

import ChannelIndexTr from '~/prefabs/channels/index/tr.vue';
import StoreDialog from '~/prefabs/channels/index/store-dialog.vue';

const showStoreDialog = ref(false);

</script>

<script>
export default {
    metaInfo: {
        title: '虚拟通道'
    },
    methods: {
        refresh() {
            this.$refs.page.refresh();
        },
    }
}
</script>