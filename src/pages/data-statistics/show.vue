<style lang="scss">
#dataStatistics-detail {
  li {
    @apply my-2 flex items-start;
    & > span:first-child {
      @apply font-semibold w-32 inline-block;
    }
    & > span:last-child {
      @apply ml-2 w-[calc(100%-theme(space.32))] break-all inline-block;
    }
  }
}
</style>

<template>
  <header class="my-6 flex items-center">
    <router-link
      class="h-10 w-10 text-center leading-10 bg-transparent hover:bg-slate-500/25 inline-block rounded"
      :to="{
        name: 'dataStatistics',
      }"
    >
      <i class="mdi mdi-arrow-left"></i>
    </router-link>
    <h1 class="text-xl font-semibold ml-4">数据统计详情</h1>
  </header>

  <div v-if="Object.keys(dataStatistics).length > 0" class="p-6 my-6 bg-white rounded">
    <h3 class="border-b-2 border-b-slate-200 pb-4 mb-4 font-bold">
      详情信息
    </h3>
    <ul class="detail-list">
      <li>
        <span> 企业名称 </span>
        <span>
          {{ dataStatistics.enterpriseName }}
        </span>
      </li>
      <li>
        <span> 注册时间 </span>
        <span>
          {{ dataStatistics.registerTime }}
        </span>
      </li>
      <li>
        <span> 首次上链时间 </span>
        <span>
          {{ dataStatistics.onChainTime }}
        </span>
      </li>
      <li>
        <span> 存证业务类型 </span>
        <span>
          {{ dataStatistics.businessTypeName }}
        </span>
      </li>
      <li>
        <span> 存证业务总数 </span>
        <span>
          {{ dataStatistics.proofTotal }}
        </span>
      </li>
      <li>
        <span> 总交易量 </span>
        <span>
          {{ dataStatistics.transactionTotal }}
        </span>
      </li>
      <li>
        <span> 统计时间 </span>
        <span>
          {{ dataStatistics.statisticalTime }}
        </span>
      </li>

    </ul>
    <p class="mt-5">数据统计说明: 统计的是企业注册后到统计时间前一日的累计数据量</p>
  </div>
</template>

<script setup>

import { ref, onBeforeMount } from 'vue';
import axios from '~/plugins/axios.js';
import { notify } from '@kyvg/vue3-notification';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const dataStatistics = ref({});

onBeforeMount(async () => {
    const { data } = await axios.get('/dataStatistics/getDetail',
        {
			params:  {
				...{
					enterpriseId: props.id
				   },
					},
		}
    );
    dataStatistics.value = data.data;
});
</script>

<script>
export default {
  metaInfo: {
    title: "数据统计详情",
  },
};
</script>
