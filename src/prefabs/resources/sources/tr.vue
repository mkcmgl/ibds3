<template>
    <td>
        {{ localDb.dataSourceId }}
    </td>
    <td>
        {{ localDb.dataSourceName }}
    </td>
    <td>
        {{ localDb.dataSourceType }}
    </td>
    <td>
        {{ localDb.dataSourceIp }}
    </td>
    <td>
        {{ localDb.createTime }}
    </td>
    <td>
        <button
            @click="show = true"
            class="text-blue-600 hover:text-blue-500"
            type="button">
            操作
        </button>
    </td>

    <update-dialog
        v-if="show"
        v-model="show"
        v-model:db="localDb"/>
</template>

<script setup>

import { ref, onBeforeMount } from 'vue';
import UpdateDialog from './update-dialog.vue';

const localDb = ref({});

const props = defineProps({
    db: {
        type: Object,
        required: true,
    },
});

onBeforeMount(() => {
    localDb.value = props.db;
});

const show = ref(false);

</script>