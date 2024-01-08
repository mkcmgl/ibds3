<template>
    
    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            资源管理
        </h1>
        <span
            class="flex -mx-2">
            <router-link
                class="h-[calc(theme('space.10')+2px)] rounded overflow-hidden transition tracking-widest scale-100 active:scale-[99%] hover:scale-[101%] bg-blue-500 text-white hover:bg-blue-700 px-2 flex items-center"
                :to="{
                    name: 'resources/create'
                }">
                <plus-icon
                    class="mr-2"/>
                新增数据资源
            </router-link>
        </span>
    </header>

    <i-paginatable-page
        api="/dataResource/list"
        :thead="[
            '数据资源 ID', '数据目录名称', '共享方式', '数据源名称', '数据库表名称', '数据资源审核状态', '详情'
        ]"
        :filters="{
            dataSourceName: '数据源名称',
        }">

        <template
			#tr="source">
            <td>
                {{ source.dataResourceId }}
            </td>
            <td>
                {{ source.catalogName }}
            </td>
            <td>
                {{ source.shareType }}
            </td>
            <td>
                {{ source.dataSourceName }}
            </td>
            <td>
                {{ source.tableName }}
            </td>
            <td>
                {{ enums['dataResourceStatus'][source.dataResourceState] }}
            </td>
            <td>
                <router-link
                    class="text-blue-500 hover:underline"
                    :to="{
                        name: 'resources/show',
                        params: {
                            id: source.dataResourceId
                        },
                        query: {
                            from: fullPath
                        }
                    }">
                    查看详情
                </router-link>
            </td>
        </template>
    </i-paginatable-page>

</template>

<script setup>

import PlusIcon from '~/components/icons/plus.vue';

import IPaginatablePage from '~ui/components/paginatable-page/component.vue';

import enums from '~/enums.json';

import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const fullPath = computed(() => route.fullPath);

</script>

<script>

export default {

    metaInfo() {
        return {
            title: '资源管理'
        };
    }
}

</script>