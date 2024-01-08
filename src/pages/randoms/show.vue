<template>
    <header
        class="flex items-center my-6">
        <router-link
            class="h-10 w-10 text-center leading-10 bg-transparent hover:bg-slate-500/25 inline-block rounded"
            :to="{
                name: 'randoms',
            }">
            <i
                class="mdi mdi-arrow-left"></i>
        </router-link>
        <h1 class="text-xl font-semibold ml-4">
            可信随机数详情
        </h1>
    </header>

    <div
        v-if="Object.keys(random).length > 0"
        class="p-6 my-6 bg-white rounded">
        <h3
            class="border-b-2 border-b-slate-200 pb-4 mb-4 font-bold">
            随机数信息
        </h3>
        <ul
            class="detail-list">
            <li>
                <span>
                    随机数ID
                </span>
                <span>
                    {{ random.random_macro.randomId }}
                </span>
            </li>
            <li>
                <span>
                    随机数描述
                </span>
                <span>
                    {{ random.random_macro.description }}
                </span>
            </li>
            <li>
                <span>
                    交易哈希
                </span>
                <span>
                    {{ random.random_macro.transactionId }}
                </span>
            </li>
            <li>
                <span>
                    输入类型
                </span>
                <span>
                    {{ random.random_macro.type == 1 ? '有' : '无' }}输入
                </span>
            </li>
            <li>
                <span>
                    随机数范围
                </span>
                <span>
                    {{ random.random_macro.randomRange }}
                </span>
            </li>
            <li>
                <span>
                    随机数输入
                </span>
                <span>
                    {{ random.random_macro.randomInput }}
                </span>
            </li>
            <li>
                <span>
                    操作员
                </span>
                <span>
                    {{ random.random_macro.userId }}
                </span>
            </li>
            <li>
                <span>
                    随机个数
                </span>
                <span>
                    {{ random.random_macro.number }}
                </span>
            </li>
            <li>
                <span>
                    创建时间
                </span>
                <span>
                    {{ random.random_macro.createTime }}
                </span>
            </li>
        </ul>
    </div>

    <i-paginatable-page
        ref="page"
        :api="`/random/getRandomNumList?randomId=${props.id}`"
        :thead="[
            '可信随机序号', '可信随机数', '逻辑校验'
        ]">
        
        <template #caption>
            <h3
                class="border-b-2 border-b-slate-200 pb-4 mb-4 font-bold">
                随机数列表
            </h3>
        </template>

        <template
			#tr="single">
            <random-show-tr
                :entire="random"
                :random="single"/>
        </template>

    </i-paginatable-page>


    <div
        class="p-6 my-6 bg-white rounded">
        <h3
            class="border-b-2 border-b-slate-200 pb-4 mb-4 font-bold">
            随机数生成逻辑
        </h3>
        <p
            class="px-24 py-4 text-slate-700 leading-7">
            可信随机数的生成逻辑如下，您可以计算验证：范围记为R，输入记为I，生成的随机数记为N，随机数个数记为M。<br>
            对于有输入的随机数：如果随机数个数等于一，顺序拼接当前交易哈希、交易时间戳、输入I得到字符串A <br>
            如果随机数个数大于一，顺序拼接当前交易哈希、交易时间戳、输入I、序号(从零开始)得到字符串A <br>
            对于无输入的随机数：如果随机数个数等于一，顺序拼接当前交易哈希、交易时间戳得到字符串A <br>
            如果随机数个数大于一，顺序拼接当前交易哈希、交易时间戳、序号（从零开始）得到字符串A <br>
            使用MD5算法对A进行哈希得到H，取H的后5位记为B，B可以作为一个十六进制数，将B转为十进制数记为C <br>
            N = C*R/1048576，N向下取整 <br>
            随机数个数大于一的情况下，如果当前生成的随机数之前已经生成，则将序号加一，继续按照上述步骤生成 <br>
        </p>
    </div>


</template>

<script setup>

import { onBeforeMount, ref } from 'vue';
import axios from '~/plugins/axios.js';

import IPaginatablePage from '~ui/components/paginatable-page/component.vue';
import RandomShowTr from '~/prefabs/randoms/show/tr.vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const random = ref({});

onBeforeMount(async () => {
    const { data } = await axios.get(`/random/get/${props.id}`);
    random.value = data.data;
});

</script>

<script>
export default {
    metaInfo: {
        title: '可信随机数详情',
    },
}
</script>