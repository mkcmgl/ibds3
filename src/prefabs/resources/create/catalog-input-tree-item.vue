<template>
    <div
        class="my-2">

        <div
            class="flex items-center text-sm catalog-header">

            <button
                v-if="catalog.childrenList.length > 0"
                type="button"
                @click="showChildren = !showChildren"
                class="w-8 h-8 bg-transparent hover:bg-slate-100 rounded mr-2"
                v-wave>
                <i
                    class="mdi text-base leading-4"
                    :class="{
                        'mdi-chevron-down': showChildren,
                        'mdi-chevron-right': !showChildren,
                    }"></i>
            </button>

            <button
                :disabled="!selectable"
                @click="select"
                class="leading-[2rem] max-w-[calc(100%-8rem)] truncate  px-2 py-0.25 rounded border-2"
                :class="[
                    catalog.childrenList.length === 0
                        ? 'ml-10'
                        : 'ml-2',
                    modelValue.dataCatalogId === catalog.dataCatalogId
                        ? 'text-blue-600 bg-blue-50 border-blue-600'
                        : selectable
                            ? 'bg-slate-50 hover:bg-slate-100 border-transparent'
                            : 'bg-gray-100 border-transparent text-slate-300 cursor-not-allowed',
                ]"
                v-wave="selectable">
                {{ catalog.catalogName }}
            </button>

        </div>

        <div
            class="ml-4"
            v-if="showChildren">

            <catalog-input-tree-item
                v-for="child in catalog.childrenList"
                :key="child.dataCatalogId"
                :catalog="child"
                v-model="value"/>

        </div>

    </div>
</template>

<script setup>

import { ref, computed } from 'vue';

const showChildren = ref(false);

const props = defineProps({
    catalog: {
        type: Object,
        required: true,
    },
    modelValue: {
        required: true,
    }
});

const emits = defineEmits([
    'update:modelValue',
]);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', value);
    }
});

const selectable = computed(() => {
    return props.catalog.childrenList.length === 0
        && props.catalog.catalogType == 2;
});

const select = () => {
    emits(
        'update:modelValue',
        props.modelValue.dataCatalogId === props.catalog.dataCatalogId
            ? ''
            : props.catalog
    );
};



</script>