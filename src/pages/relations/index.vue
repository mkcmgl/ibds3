<template>

    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            关系管理
        </h1>
        <span
            class="flex -mx-2">
            <i-button
                class="w-28 flex items-center justify-center mx-2"
                @click="showStoreDialog = true">
                <plus-icon
                    class="mr-2"/>
                新增
            </i-button>
            <!-- <i-button
                class="w-28 flex items-center justify-center mx-2"
                @click="showDestroyDialog = true">
                <delete-icon
                    class="mr-2"/>
                删除
            </i-button> -->
        </span>
    </header>

    <i-paginatable-page
        api="/trace/history/getTraceList"
        :thead="[
            '溯源 ID', '根交易哈希', '当前交易哈希', '业务类型', '业务 ID', '创建时间', '操作'
        ]"
        :filters="{
            traceId: '溯源 ID',
            bizType: {
                label: '业务类型',
                input: {
                    placeholder: '请选择业务类型',
                },
                options: bizTypes
            },
            bizId: '业务 ID'
        }">

        <template #caption>
            <p
                class="text-sm flex items-center justify-between mb-4">
                <span>
                    
                </span>
                <button
                    class="flex text-blue-600"
                    type="button"
                    @click="showCSVExportDialog = true">
                    <csv-icon
                        class="mr-2 fill-current"/>
                    导出 CSV
                </button>
            </p>
        </template>

        <template
			#tr="relation">
            <relation-index-tr
                :relation="relation"/>
        </template>
    </i-paginatable-page>

    <store-dialog
        v-model="showStoreDialog"/>

    <csv-export-dialog
        api="/trace/history/export"
        file-name="关系管理"
        :filters="{
            traceId: '溯源 ID',
            bizType: {
                label: '业务类型',
                input: {
                    placeholder: '请选择业务类型',
                },
                options: bizTypes
            },
            bizId: '业务 ID'
        }"
        v-model="showCSVExportDialog"/>
</template>

<script setup>
import IPaginatablePage from '~ui/components/paginatable-page/component.vue';
import PlusIcon from '~/components/icons/plus.vue';
import DeleteIcon from '~/components/icons/delete.vue';
import IButton from '~ui/components/button/component.vue';

import RelationIndexTr from '~/prefabs/relations/index/tr.vue';
import StoreDialog from '~/prefabs/relations/index/store-dialog.vue';
</script>

<script>
import csv from '~/mixins/csv.js';
import enums from '~/enums.json';
export default {

    metaInfo() {
		return {
			title: '关系管理',
		}
	},

    mixins: [
        csv,
    ],

    data() {
        return {
            showStoreDialog: false,
            showDestroyDialog: false,
        }
    },

    computed: {
        bizTypes() {
            return Object.entries(enums['bizType']).map(([value, label]) => ({
                value,
                label,
            }));
        }
    }
}
</script>