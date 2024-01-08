<template>

    <fieldset
        class="relative mb-6 i-input"
        v-bind="wrapperAttrs">

        <label
            class="relative w-full block"
            :for="`input-${id}`">

            <input
                class="rounded outline-none w-full text-base bg-transparent select-none py-2"
                :class="[
                    hasPrefix
                        ? 'pl-10'
                        : 'pl-2',
                    hasError
                        ? 'invalid'
                        : 'valid',
                    loading
                        ? 'cursor-wait'
                        : 'cursor-pointer',
                ]"
                :id="`input-${id}`"
                type="text"
                :value="displayValue"
                v-bind="exceptWrapperAttrs"
                ref="input"
                @focus="showCandidatesDialog"/>

            <span
				class="absolute w-10 h-10 left-1 top-1/2 -translate-y-1/2 flex items-center justify-center"
				role="prefix"
				v-if="hasPrefix">

                <i
                    v-if="loading"
                    class="mdi mdi-loading mdi-spin text-slate-600"></i>

                <slot
                    name="prefix"/>
            </span>

        </label>

        <p
			class="text-xs text-red-500 absolute leading-6 top-full left-0"
			v-if="hasError"
			v-html="error"/>

		<p
			class="text-xs text-slate-500 absolute leading-6 top-full left-0"
			v-if="hasTip && !hasError"
			v-html="tip"/>

    </fieldset>

    <i-dialog
        @close="closeDialog"
        v-model="showDialog">
        <template
            #title>
            选择目录
        </template>

        <div
            class="p-4">
            
            <catalog-input-tree-item
                v-for="catalog in catalogs"
                :key="catalog.dataCatalogId"
                :catalog="catalog"
                v-model="selectedCatalog"/>

        </div>

    </i-dialog>

</template>

<script setup>

import IDialog from '~ui/components/dialog/component.vue';
import CatalogInputTreeItem from './catalog-input-tree-item.vue';

</script>


<script>
import script from '~ui/components/input/script.js';
import axios from '~/plugins/axios.js';

export default {

    mixins: [
        script,
    ],

    data() {
        return {
            showDialog: false,
            loading: false,
            catalogs: [],
            selectedCatalog: {}
        }
    },

    computed: {
        hasPrefix() {
            return !!this.$slots.prefix || this.loading;
        },
        displayValue() {
            return Object.keys(this.selectedCatalog).length > 0
                ? this.selectedCatalog.catalogName
                : '';
        }
    },

    watch: {
        selectedCatalog (value) {
            if (Object.keys(value).length) {
                this.$emit('update:modelValue', value.dataCatalogId);
            }
            else {
                this.$emit('update:modelValue', '');
            }
        }
    },

    methods: {
        showCandidatesDialog() {

            this.$refs.input.blur();

            if (this.catalogs.length) {
                this.showDialog = true;
                return;
            }

            if (!this.loading) {
                this.loading = true;
                axios
                    .get('/catalog/getCatalog')
                    .then(response => {
                        this.catalogs = response.data.data;
                        this.loading = false;
                        this.showDialog = true;
                    });
            }
        },
        closeDialog() {
            this.validate(
                {
                    target: {
                        value: this.modelValue
                    }
                }
            );
        }
    }
}

</script>