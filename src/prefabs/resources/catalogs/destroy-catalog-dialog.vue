<template>

    <i-dialog
        v-model="show"
        prevent
        :loading="loading">

        <template
            #title>
            删除此目录
        </template>

        <template
            v-slot="{ close }"
            #default>
        
            <i-form
                @submit="handleSubmit"
                ref="form"
                class="p-6">

                <p
                    class="font-bold mb-6">
                    将会删除此目录及其所有子目录，确定删除吗？
                </p>

                <footer
                    class="flex items-center justify-between">

                    <button
                        class="border-slate-200 border-2 block h-[calc(theme('space.10')+2px)] rounded overflow-hidden transition tracking-widest scale-100 active:scale-[99%] hover:scale-[101%] w-32"
                        type="button"
                        v-wave
                        @click="close">
                        取消
                    </button>

                    <i-button
                        class="w-32"
                        :loading="loading">
                        确定
                    </i-button>
                </footer>

            </i-form>
        </template>

    </i-dialog>

</template>

<script setup>
import IDialog from '~ui/components/dialog/component.vue';
import IForm from '~ui/components/form/component.vue';
import IButton from '~ui/components/button/component.vue';
</script>

<script>

import { notify } from '@kyvg/vue3-notification';
import axios from '~/plugins/axios.js';

export default {

    props: {
        modelValue: {
            required: true,
            type: Boolean
        },
        catalog: {
            required: true,
            type: Object
        }
    },

    emits: [
        'update:modelValue',
        'refresh'
    ],

    computed: {
        show: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            } 
        }
    },

    data () {
        return {

            loading: false,

        }
    },

    methods: {
        handleSubmit() {
            this.loading = true;
            axios.delete(
                    '/catalog/delete/' + this.catalog.dataCatalogId,
                )
                .then(() => {
                    notify({
                        text: '目录删除成功',
                        type: 'green',
                    });
                    this.$emit('refresh');
                    this.show = false;
                })
                .finally(() => {
                    this.loading = false;
                });                    
        }
    }
}
</script>