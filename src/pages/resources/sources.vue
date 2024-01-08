<template>
    
    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            数据源
        </h1>
        <span
            class="flex -mx-2">
            <i-button
                class="w-32 flex items-center justify-center mx-2"
                @click="showStoreDialog = true">
                <plus-icon
                    class="mr-2"/>
                新增数据源
            </i-button>
        </span>
    </header>

    <store-dialog
        v-model="showStoreDialog"
        @store="refresh"/>

    <i-paginatable-page
        ref="page"
        api="/datasource/list"
        :thead="[
            '数据源 ID', '数据源名称', '数据库类型', '数据库IP', '创建时间', '操作',
        ]"
        :filters="{
            dataSourceName: '数据源名称',
        }">

        <template
			#tr="db">
            <db-tr
                :db="db"/>
        </template>
    </i-paginatable-page>

</template>

<script setup>

import PlusIcon from '~/components/icons/plus.vue';
import IButton from '~ui/components/button/component.vue';

import StoreDialog from '~/prefabs/resources/sources/store-dialog.vue';
import DbTr from '~/prefabs/resources/sources/tr.vue';

import IPaginatablePage from '~ui/components/paginatable-page/component.vue';

import axios from '~/plugins/axios.js';
import { onBeforeMount, provide, ref } from 'vue';

const showStoreDialog = ref(false);

</script>

<script>

export default {
    metaInfo() {
        return {
            title: '数据源'
        };
    },
    methods: {
        refresh() {
            this.$refs.page.refresh();
        },
    }
}

</script>