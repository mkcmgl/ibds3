<style lang="scss">

    .catalog-header {
        .catalog-operators {
            display: none;
        }
        &:hover {
            .catalog-operators {
                display: block;
            }
        }
    }

</style>

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

            <p
                class="leading-[2rem] max-w-[calc(100%-8rem)] truncate"
                :class="{
                    'ml-10': catalog.childrenList.length === 0,
                }">
                {{ catalog.catalogName }} ({{ catalog.dataResourceCount }})
            </p>

            <div
                class="ml-4 catalog-operators">

                <button
                    @click="showDetailDialog = true"
                    type="button"
                    class="w-6 h-6 bg-transparent hover:bg-slate-100 mr-2 border-2 rounded text-slate-600 border-slate-600"
                    v-wave>
                    <i
                        class="mdi mdi-information-variant"></i>
                </button>

                <button
                    v-if="catalog.catalogType != 2"
                    @click="showStoreDialog = true"
                    type="button"
                    class="w-6 h-6 bg-transparent hover:bg-slate-100 mr-2 border-2 rounded text-green-600 border-green-600"
                    v-wave>
                    <i
                        class="mdi mdi-plus"></i>
                </button>

                <button
                    @click="showDestroyDialog = true"
                    type="button"
                    class="w-6 h-6 bg-transparent hover:bg-slate-100 mr-2 border-2 rounded text-red-600 border-red-600"
                    v-wave>
                    <i
                        class="mdi mdi-minus"></i>
                </button>

            </div>

        </div>

        <div
            class="ml-4"
            v-if="showChildren">

            <catalogs-tree-item
                v-for="child in catalog.childrenList"
                :key="child.dataCatalogId"
                :catalog="child"/>

        </div>
    </div>

    <catalog-detail-dialog
        :catalog="catalog"
        @refresh="refreshCatalogs"
        v-model="showDetailDialog"/>

    <store-sub-catalog-dialog
        :catalog="catalog"
        @refresh="refreshCatalogs"
        v-model="showStoreDialog"/>

    <destroy-catalog-dialog
        :catalog="catalog"
        @refresh="refreshCatalogs"
        v-model="showDestroyDialog"/>

</template>

<script setup>

import { inject, ref } from 'vue';

import CatalogDetailDialog from './catalog-detail-dialog.vue';
import StoreSubCatalogDialog from './store-sub-catalog-dialog.vue';
import DestroyCatalogDialog from './destroy-catalog-dialog.vue';

const props = defineProps({
    catalog: {
        type: Object,
        required: true,
    },
});

const refreshCatalogs = inject('refreshCatalogs');

const showChildren = ref(false);

const showDetailDialog = ref(false);
const showStoreDialog = ref(false);
const showDestroyDialog = ref(false);

</script>