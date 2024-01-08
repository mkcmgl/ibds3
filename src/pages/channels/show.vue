<style lang="scss">
    #channel-detail {
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
    <header
        class="my-6 flex items-center">
        <router-link
            class="h-10 w-10 text-center leading-10 bg-transparent hover:bg-slate-500/25 inline-block rounded"
            :to="{
                name: 'channels',
            }">
            <i
                class="mdi mdi-arrow-left"></i>
        </router-link>
        <h1 class="text-xl font-semibold ml-4">
            虚拟通道详情
        </h1>
    </header>

    <div
        v-if="Object.keys(channel).length > 0"
        class="p-6 my-6 bg-white rounded">
        <h3
            class="border-b-2 border-b-slate-200 pb-4 mb-4 font-bold">
            虚拟通道信息
        </h3>
        <ul
            class="detail-list">
            <li>
                <span>
                    虚拟通道 ID
                </span>
                <span>
                    {{ channel.channelId }}
                </span>
            </li>
            <li>
                <span>
                    虚拟通道名称
                </span>
                <span>
                    {{ channel.channelName }}
                </span>
            </li>
            <li>
                <span>
                    虚拟通道描述
                </span>
                <span>
                    {{ channel.description }}
                </span>
            </li>
            <li>
                <span>
                    创建时间
                </span>
                <span>
                    {{ channel.createTime }}
                </span>
            </li>
        </ul>
    </div>

    <div
        v-if="Object.keys(channel).length > 0"
        class="p-6 my-6 bg-white rounded">
        <h3
            class="border-b-2 border-b-slate-200 pb-4 mb-4 font-bold">
            虚拟通道成员
        </h3>
        <table
            class="i-table">
            <thead>
                <tr>
                    <th>
                        成员 ID
                    </th>
                    <th>
                        成员昵称
                    </th>
                    <th>
                        成员类型
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="member in channel.members"
                    :key="member.userId">
                    <td>
                        {{ member.userId }}
                    </td>
                    <td>
                        {{ member.nickName }}
                    </td>
                    <td>
                        {{ member.type }}
                    </td>
                </tr>
            </tbody>
        </table>
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

const channel = ref({});

onBeforeMount(async () => {
    const { data } = await axios.get(`/channel/get/${props.id}`);
    channel.value = data.data;
});


</script>

<script>
export default {
    metaInfo: {
        title: '虚拟通道详情'
    }
}
</script>