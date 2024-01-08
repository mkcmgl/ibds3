<template>

    <i-dialog
        v-model="show"
        prevent
        :loading="loading">

        <template
            #title>
            新增数据存证
        </template>

        <template
            v-slot="{ close }"
            #default>
        
            <i-form
                @submit="storeTimestamps"
                ref="form"
                class="p-6">

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        可信时间戳描述
                    </p>
                    <i-textarea
                        class="w-[calc(100%-8rem)]"
                        v-model="form.description"
                        v-model:error="error.description"
                        placeholder="请输入可信时间戳描述"
                        attr="描述"
                        name="description"
                        :max="-1"
                        :rules="[
                            'required',
                            'no-emoji',
                            'max:100',
                        ]"/>
                </div>

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
import ITextarea from '~ui/components/textarea/component.vue';
</script>

<script>

import axios from '~/plugins/axios.js';
import { notify } from '@kyvg/vue3-notification';

export default {

    inheritAttrs: false,

    props: {
        modelValue: {
            required: true,
            type: Boolean
        },
    },

    emits: [
        'update:modelValue',
        'store',
    ],

    data() {
        return {
            form: {
                description: '',
            },
            error: {
                description: '',
            },

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
        storeTimestamps() {
            this.loading = true;

            axios.post('/timestamp/create', this.form)
                .then(() => {
                    notify({
                        text: '可信时间戳生成成功',
				        type: 'green',
                    });
                    this.show = false;
                    this.$emit('store');
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>