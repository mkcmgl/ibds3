<style lang="scss" scoped>
    td span, td a {
        @apply truncate block break-all;
    }
</style>

<template>
    
    <td>
        <router-link
            class="text-blue-600 hover:text-blue-400 cursor-pointer max-w-[200px]"
            :to="{
                name: 'randoms/show',
                params: {
                    id: random.randomId
                }
            }">
            {{ random.randomId }}    
        </router-link>
    </td>
    <td>
        <span
            class="max-w-[100px]">
            {{ random.description }}
        </span>
    </td>
    <td>
        <span
            class="max-w-[200px]">
            {{ random.transactionId }}
        </span>
    </td>
    <td>
        {{ random.randomRange }}
    </td>
    <td>
        {{ random.randomInput }}
    </td>
    <td>
        {{ random.userId }}
    </td>
    <td>
        {{ random.number }}
    </td>
    <td>
        {{ random.type == 0 ? '无' : '有' }}输入
    </td>
    <td>
        {{ random.createTime }}
    </td>
    
</template>

<script setup>

const props = defineProps({
    random: {
        type: Object,
        required: true
    }
});

</script>