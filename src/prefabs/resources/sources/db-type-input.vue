<template>
    <div
        class="flex">
        <p
            class="w-32 leading-[3rem] text-right mr-4">
            数据库类型
        </p>
        <i-select
            class="w-[calc(100%-8rem)]"
            v-model="dbType"
            v-model:error="error"
            placeholder="请选择数据库类型"
            attr="数据库类型"
            name="dbType"
            :rules="[
                'required',
            ]">
            <option
                v-for="type in dbTypes"
                :key="type"
                :value="type">
                {{ type }}
            </option>
        </i-select>
    </div>
</template>

<script setup>

import ISelect from '~ui/components/select/component.vue';

import { computed, onBeforeMount, ref } from 'vue';
import axios from '~/plugins/axios.js';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
});

const emits = defineEmits([
    'update:modelValue',
    'update:error',
]);

const dbType = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', value);
    },
});

const error = computed({
    get() {
        return props.error;
    },
    set(value) {
        emits('update:error', value);
    },
});

const dbTypes = ref([]);

onBeforeMount(async () => {
    const { data } = await axios.get('/datasource/dType');
    dbTypes.value = data.data;
});

</script>