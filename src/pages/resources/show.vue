<template>

    <header
        class="flex items-center justify-between my-6">
        <div
            class="flex items-center">
            <router-link
                class="h-10 w-10 text-center leading-10 bg-transparent hover:bg-slate-500/25 inline-block rounded"
                :to="fromPath">
                <i
                    class="mdi mdi-arrow-left"></i>
            </router-link>
            <h1 class="text-xl font-semibold ml-4">
                资源 ID: {{ id }}
            </h1>
        </div>

        <nav>
            <router-link
                class="h-[calc(theme('space.10')+2px)] rounded overflow-hidden transition tracking-widest scale-100 active:scale-[99%] hover:scale-[101%] bg-blue-500 text-white hover:bg-blue-700 px-2 flex items-center"
                :to="{
                    name: 'resources/edit',
                    params: {
                        id
                    }
                }"
                v-wave>
                <i
                    class="mdi mdi-pencil-outline mr-2"></i>
                编辑
            </router-link>
        </nav>

    </header>

    <template
        v-if="Object.keys(source).length > 0">
        
        <div
            class="my-6 p-6 bg-white rounded">

            <h3
                class="font-bold mb-4 text-lg">
                基础信息
            </h3>

            <hr
                class="my-4">

            <ul
                class="detail-list">
                <li>
                    <span>
                        数据资源 ID
                    </span>
                    <span>
                        {{ id }}
                    </span>
                </li>
                <li>
                    <span>
                        数据目录名称
                    </span>
                    <span>
                        {{ source.resourceParam.catalogName }}
                    </span>
                </li>
                <li>
                    <span>
                        共享方式
                    </span>
                    <span>
                        {{ source.resourceParam.shareType }}
                    </span>
                </li>
                <li>
                    <span>
                        数据源名称
                    </span>
                    <span>
                        {{ source.resourceParam.dataSourceName }}
                    </span>
                </li>
                <li>
                    <span>
                        数据库表名称
                    </span>
                    <span>
                        {{ source.resourceParam.tableName }}
                    </span>
                </li>
                <li>
                    <span>
                        运营产权标识
                    </span>
                    <span>
                        {{ source.resourceParam.isOpRight }}
                    </span>
                </li>
                <li>
                    <span>
                        是否隐私
                    </span>
                    <span>
                        {{ source.resourceParam.isPrivacy }}
                    </span>
                </li>
            </ul>

        </div>

        <div
            class="my-6 p-6 bg-white rounded">

            <h3
                class="font-bold mb-4 text-lg">
                数据源信息 
            </h3>

            <hr
                class="my-4">

            <ul
                class="detail-list">
                <li>
                    <span>
                        数据源名称
                    </span>
                    <span>
                        {{ source.dataResourceParam.dataSourceName }}
                    </span>
                </li>
                <li>
                    <span>
                        数据源类型
                    </span>
                    <span>
                        {{ source.dataResourceParam.dataSourceType }}
                    </span>
                </li>
                <li>
                    <span>
                        数据源IP
                    </span>
                    <span>
                        {{ source.dataResourceParam.dataSourceIp }}
                    </span>
                </li>
                <li>
                    <span>
                        数据源端口
                    </span>
                    <span>
                        {{ source.dataResourceParam.dataSourcePort }}
                    </span>
                </li>
                <li>
                    <span>
                        数据库实例
                    </span>
                    <span>
                        {{ source.dataResourceParam.instanceName }}
                    </span>
                </li>
                <li>
                    <span>
                        数据库用户名
                    </span>
                    <span>
                        {{ source.dataResourceParam.dataSourceUsername }}
                    </span>
                </li>
            </ul>

        </div>

        <div
            class="my-6 p-6 bg-white rounded">

            <h3
                class="font-bold mb-4 text-lg">
                数据项信息
            </h3>

            <table
                class="i-table">
                <thead>
                    <tr>
                        <th>
                            字段名称
                        </th>
                        <th>
                            字段描述
                        </th>
                        <th>
                            字段类型
                        </th>
                        <th>
                            字段长度
                        </th>
                        <th>
                            是否为空
                        </th>
                        <th>
                            是否隐私
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="{
                            columnName,
                            columnDescription,
                            columnType,
                            columnLength,
                            isNull,
                            isPrivacy
                        } in source.infParams">
                        <td>
                            {{ columnName }}
                        </td>
                        <td>
                            {{ columnDescription }}
                        </td>
                        <td>
                            {{ columnType }}
                        </td>
                        <td>
                            {{ columnLength }}
                        </td>
                        <td>
                            {{ isNull }}
                        </td>
                        <td>
                            {{ isPrivacy }}
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div
            class="my-6 p-6 bg-white rounded">

            <h3
                class="font-bold mb-4 text-lg">
                服务接口信息
            </h3>

            <table
                class="i-table">
                <thead>
                    <tr>
                        <th>
                            接口名称
                        </th>
                        <th>
                            代理地址
                        </th>
                        <th>
                            创建时间
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="{
                            interfaceName,
                            proxyAddress,
                            createTime,
                        } in source.proxyParams">
                        <td>
                            {{ interfaceName }}
                        </td>
                        <td>
                            {{ proxyAddress }}
                        </td>
                        <td>
                            {{ createTime }}
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

        <div
            class="my-6 p-6 bg-white rounded">

            <h3
                class="font-bold mb-4 text-lg">
                资源分组信息
            </h3>

            <table
                class="i-table">
                <thead>
                    <tr>
                        <th>
                            资源分组ID
                        </th>
                        <th>
                            资源分组描述
                        </th>
                        <th>
                            创建时间
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="{
                            unitId,
                            unitDesc,
                            createTime
                        } in source.dunitParams">
                        <td>
                            {{ unitId }}
                        </td>
                        <td>
                            {{ unitDesc }}
                        </td>
                        <td>
                            {{ createTime }}
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>

    </template>

</template>

<script setup>

import axios from '~/plugins/axios.js';
import { ref, onBeforeMount, computed } from 'vue';
import { useRoute } from 'vue-router';

const source = ref({});

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const route = useRoute();

const fromPath = computed(() => {
    return route.query.from || {
        name: 'resources'
    };
});

onBeforeMount(async () => {
    const { data } = await axios.get(`/dataResource/getInf/${props.id}`);
    source.value = data.data;
});

</script>

<script>
export default {
    metaInfo: {
        title: '资源详情'
    },
}
</script>