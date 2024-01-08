<template>
    <i-select
        v-model="computedValue"
        v-model:error="computedError">
        <option
            v-for="source in sources"
            :key="source.dataSourceId"
            :value="source.dataSourceId">
            {{ source.dataSourceName }}
        </option>
    </i-select>
</template>

<script setup>

import { computed, ref, onBeforeMount } from 'vue';
import ISelect from '~ui/components/select/component.vue';
import axios from '~/plugins/axios.js';

const props = defineProps({
    modelValue: {
        required: true,
        type: String,
    },
    error: {
        required: true,
        type: String,
    },
});

const emits = defineEmits([
    'update:modelValue',
    'update:error',
]);

const computedValue = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', value);
    }
});

const computedError = computed({
    get() {
        return props.error;
    },
    set(value) {
        emits('update:error', value);
    }
});

const sources = ref([]);

onBeforeMount(async () => {
    const { data } = await axios.get('/datasource/list?pageNum=1&pageSize=100');
    sources.value = data.rows;
});
</script>