<template>

    <catalogs-tree-item
        v-if="catalogs.length"
        v-for="catalog in catalogs"
        :key="catalog.dataCatalogId"
        :catalog="catalog"/>
    <div
        v-else>
        <p
            class="py-16 text-center text-slate-500">
            暂无数据
        </p>
    </div>

</template>

<script setup>

defineProps({
    catalogs: {
        type: Array,
        required: true,
    },
});

</script>