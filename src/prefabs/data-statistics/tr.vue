<template>
    <td>
        {{ dataStatistics.enterpriseId }}
    </td>
    <td>
        {{ dataStatistics.enterpriseName }}
    </td>
    <td>
        {{ dataStatistics.proofTotal }}
    </td>
    <td>
        {{ dataStatistics.transactionTotal }}
    </td>
    <td>
        {{ dataStatistics.businessTypeName }}
    </td>
    <td>
        {{ dataStatistics.statisticalTime }}
    </td>
    <td>
        <router-link
            class="text-blue-600 hover:text-blue-500"
            :to="{
                name: 'dataStatistics/detail',
                params: {
                    id: dataStatistics.enterpriseId
                }
            }">
            <span>详情</span>
        </router-link>
    </td>
</template>

<script setup>

const props = defineProps({
    dataStatistics: {
        type: Object,
        required: true
    }
});

</script>