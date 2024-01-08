<template>
    
    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            数据统计
        </h1>
    </header>

    <i-paginatable-page
        ref="page"
        api="/proofChainData/getChainDataList"
        :thead="[
            '交易哈希', '业务类型', '业务ID', '签名用户', '加密类型','交易时间'
        ]"
         :handleResponseDataManually="(raw) => {
             return {
                 rows: raw.data.list,
                 total: raw.data.total
             }
         }"
        :reorder="true"
        :filters="{
            bizTypeId: {
                label: '业务类型',
                input: {
                    placeholder: '请选择业务类型',
                },
                options: bizTypes
            },
            bizId: '业务ID',
            useEncrypt: {
                label: '加密类型',
                input: {
                    placeholder: '请选择加密类型',
                },
                options: encryptModes
            },
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
			#tr="dataStorage">
            <data-statistics-index-tr
                :dataStorage="dataStorage"/>
        </template>

    </i-paginatable-page>
</template>

<script setup>

import { ref , onBeforeMount } from 'vue';
import axios from '~/plugins/axios.js';
import IPaginatablePage from '~ui/components/paginatable-page/component.vue';
import IButton from '~ui/components/button/component.vue';
import PlusIcon from '~/components/icons/plus.vue';

import DataStatisticsIndexTr from '~/prefabs/data-storage/tr.vue';

let businessType = ref([])
onBeforeMount(async () => {
    const { data } = await axios.get('/dataStatistics/getEnterpriseList',);
    businessType.value = data.data.map(item=>{
        return {value:item.businessTypeId,label:item.businessTypeName}
    })
});
</script>

<script>
import enums from '~/enums.json';
export default {
    metaInfo: {
        title: '数据统计'
    },
    methods: {
        refresh() {
            this.$refs.page.refresh();
        },
    },
     computed: {
        bizTypes() {
            return Object.entries(enums['bizType']).map(([value, label]) => ({
                value,
                label,
            }));
        },
        encryptModes() {
            return Object.entries(enums['encryptMode']).map(([value, label]) => ({
                value,
                label,
            }));
        }
    }
}
</script>