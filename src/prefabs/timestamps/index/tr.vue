<style lang="scss" scoped>
    td span {
        @apply truncate block break-all;
    }
</style>

<template>
    
    <td>
        <i-copyer
            tag="span"
            class="text-blue-600 hover:text-blue-400 cursor-pointer w-[250px]"
            :content="timestamp.timestampId">
            {{ timestamp.timestampId }}
        </i-copyer>
    </td>
    <td>
        <span
            class="w-[200px]">
            {{ timestamp.description }}
        </span>
    </td>
    <td>
        <span
            class="w-[200px]">
            {{ timestamp.transactionId }}
        </span>
    </td>
    <td>
        {{ timestamp.credibleTimestamp }}
    </td>
    <td>
        {{ timestamp.userId }}
    </td>
    <td>
        {{ timestamp.createTime }}
    </td>
    
</template>

<script setup>

import ICopyer from '~ui/components/copyer/component.vue';

const props = defineProps({
    timestamp: {
        type: Object,
        required: true
    }
});

</script>