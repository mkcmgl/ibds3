<template>

    <i-dialog
        v-model="show"
        prevent
        :loading="loading">

        <template
            #title>
            删除该侧链标签
        </template>

        <template
            v-slot="{ close }"
            #default>
        
            <i-form
                @submit="destroy"
                ref="form"
                class="p-6">

                <p
                    class="mb-4">
                    确定删除该侧链标签吗？
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

import axios from '~/plugins/axios.js';
import { notify } from '@kyvg/vue3-notification';

export default {

    props: {
        modelValue: {
            required: true,
            type: Boolean
        },
        tag: {
            required: true,
            type: Object
        }
    },

    emits: [
        'update:modelValue',
        'destroyed',
    ],

    data() {
        return {
            loading: false,
        }
    }, 

    computed: {
        show: {
            get() {
                return this.modelValue;
            },
            set(value) {

                if (!value) {
                    this.$refs.form.refresh();
                }

                this.$emit('update:modelValue', value);
            } 
        }
    },

    methods: {
        destroy() {
            this.loading = true;

            axios.delete(`/logLabel/delete/label/${this.tag.label}`)
                .then(() => {
                    notify({
                        text: '侧链标签删除成功',
				        type: 'green',
                    });
                    this.show = false;
                    this.$emit('destroyed');
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>