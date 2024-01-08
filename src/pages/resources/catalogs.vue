<template>

    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            资源目录
        </h1>
        <span
            class="flex -mx-2">
            <i-button
                class="w-32 flex items-center justify-center mx-2"
                @click="showStoreDialog = true">
                <plus-icon
                    class="mr-2"/>
                新增根目录
            </i-button>
        </span>
    </header>

    <store-root-catalog-dialog
        @refresh="getCatalogs"
        v-model="showStoreDialog"/>

    <div
        class="my-6 px-6 py-4 rounded bg-white">
        <catalogs-tree
            :catalogs="catalogs"/>
    </div>

</template>

<script setup>

import PlusIcon from '~/components/icons/plus.vue';
import IButton from '~ui/components/button/component.vue';

import StoreRootCatalogDialog from '~/prefabs/resources/catalogs/store-root-catalog-dialog.vue';
import CatalogsTree from '~/prefabs/resources/catalogs/catalogs-tree.vue';

import axios from '~/plugins/axios.js';
import { onBeforeMount, provide, ref } from 'vue';

const showStoreDialog = ref(false);

const catalogs = ref([]);
const loading = ref(false);
const getCatalogs = () => {
    loading.value = true;
    axios
        .get('/catalog/getCatalog')
        .then(response => {
            catalogs.value = response.data.data;
        })
        .finally(() => {
            loading.value = false;
        });
};

provide('refreshCatalogs', getCatalogs);

onBeforeMount(() => {
    getCatalogs();
});

</script>

<script>
export default {
    metaInfo() {
        return {
            title: '资源目录'
        };
    }
}
</script>