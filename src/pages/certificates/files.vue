<template>

    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            文件存证管理
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
        api="/proof/proofFile/list"
        :filters="{
            bizType: {
                label: '业务类型',
                input: {
                    placeholder: '请选择业务类型',
                },
                options: bizTypes
            },
            encryptMode: {
                label: '加密类型',
                input: {
                    placeholder: '请选择加密类型',
                },
                options: encryptModes
            },
            bizId: '业务 ID',
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
            },
            fileName: '文件存证名称'
        }"
        :handleResponseDataManually="(raw) => {
            return {
                rows: raw.data
            }
        }"
        :thead="[
            '交易哈希值', '文件存证名称', '业务类型', '业务 ID', '加密类型', '交易时间', '所属企业', '存证证书'
        ]"
        disabled-paginator>
        <template #caption>
            <p
                class="text-sm flex items-center justify-between mb-4">
                <span>
                    最近 30 条记录
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
			#tr="file">
            <file-tr
                :file="file"/>
        </template>
    </i-paginatable-page>

    <store-dialog
        v-model="showStoreDialog"/>

    <csv-export-dialog
        api="/proof/proofFile/export"
        file-name="文件存证"
        :filters="{
            bizType: {
                label: '业务类型',
                input: {
                    placeholder: '请选择业务类型',
                },
                options: bizTypes
            },
            encryptMode: {
                label: '加密类型',
                input: {
                    placeholder: '请选择加密类型',
                },
                options: encryptModes
            },
            bizId: '业务 ID',
            startTxTime: '交易开始日期',
            endTxTime: '交易结束日期',
            fileName: '文件存证名称'
        }"
        v-model="showCSVExportDialog"/>

</template>

<script setup>
import IPaginatablePage from '~ui/components/paginatable-page/component.vue';
import CsvIcon from '~/components/icons/csv.vue';
import StoreDialog from '~/prefabs/certificates/files/store-dialog.vue';
import IButton from '~ui/components/button/component.vue';
import PlusIcon from '~/components/icons/plus.vue';
import FileTr from '~/prefabs/certificates/files/tr.vue';
</script>

<script>
import enums from '~/enums.json';
import csv from '~/mixins/csv.js';
export default {

    metaInfo() {
		return {
			title: '文件存证管理'
		}
	},

    mixins: [
        csv
    ],

    data() {
        return {
            showStoreDialog: false,
        }
    },

    computed: {
        bizTypes() {
            return Object.entries(enums['bizType']).map(([value, label]) => ({
                value,
                label,
            }));
        },
        encryptModes () {
            return Object.entries(enums['encryptMode']).map(([value, label]) => ({
                value,
                label,
            }));
        }
    }
}
</script>  