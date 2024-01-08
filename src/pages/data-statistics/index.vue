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
        api="/dataStatistics/dataList"
        :thead="[
            '序号', '企业名称', '存证业务总数', '总交易量', '存证业务类型','统计时间','操作'
        ]"
        :filters="{
            enterpriseName: '企业名称',
            businessTypeId: {
                label: '存证业务类型',
                input: {
                    placeholder: '请选择存证业务类型',
                },
                options: businessType
            },
            proofTotal: '存证业务总数',
        }">

        <template
			#tr="dataStatistics">
            <data-statistics-index-tr
                :dataStatistics="dataStatistics"/>
        </template>

    </i-paginatable-page>
</template>

<script setup>

import { ref , onBeforeMount } from 'vue';
import axios from '~/plugins/axios.js';
import IPaginatablePage from '~ui/components/paginatable-page/component.vue';
import IButton from '~ui/components/button/component.vue';
import PlusIcon from '~/components/icons/plus.vue';

import DataStatisticsIndexTr from '~/prefabs/data-statistics/tr.vue';

let businessType = ref([])
onBeforeMount(async () => {
    const { data } = await axios.get('/dataStatistics/getEnterpriseList',);
    businessType.value = data.data.map(item=>{
        return {value:item.businessTypeId,label:item.businessTypeName}
    })
});
</script>

<script>
export default {
    metaInfo: {
        title: '数据统计'
    },
    methods: {
        refresh() {
            this.$refs.page.refresh();
        },
    }
}
</script>