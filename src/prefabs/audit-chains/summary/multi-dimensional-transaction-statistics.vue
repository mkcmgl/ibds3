<template>
    <table
        class="i-table">
        <thead>
            <tr>
                <th>
                    维度名称
                </th>
                <th>
                    维度值
                </th>
                <th>
                    日交易量
                </th>
                <th>
                    操作
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                :key="dimensionName"
                v-for="{
                    dimensionName,
                    dimensionValue,
                    txCount
                } in dimensions">
                <td>
                    {{ dimensionName }}
                </td>
                <td>
                    {{ dimensionValue }}
                </td>
                <td>
                    {{ txCount }}
                </td>
                <td>
                    <router-link
                        class="text-blue-500 cursor-pointer"
                        :to="{
                            name: 'audit-chains/summary/detail',
                            query: {
                                type: 1,
                                from: $route.fullPath
                            }
                        }">
                        详情
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>

import axios from '~/plugins/axios.js';
import { onBeforeMount, ref } from 'vue';

const dimensions = ref([]);

onBeforeMount(async () => {
    const { data } = await axios.get('/log/statistics/getSummaryNumber');
    dimensions.value = data.data;
});

</script>