<template>

    <i-dialog
        v-model="show"
        prevent
        :loading="loading">

        <template
            #title>
            创建侧链标签
        </template>

        <template
            v-slot="{ close }"
            #default>
        
            <i-form
                @submit="store"
                ref="form"
                class="p-6">

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        侧链ID
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.label"
                        v-model:error="error.label"
                        placeholder="请输入侧链ID"
                        attr="侧链ID"
                        name="label"
                        :rules="[
                            'required',
                            'string',
                            'no-emoji',
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        侧链名称
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.labelName"
                        v-model:error="error.labelName"
                        placeholder="请输入侧链名称"
                        attr="侧链名称"
                        name="labelName"
                        :rules="[
                            'required',
                            'string',
                            'no-emoji',
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        用户描述
                    </p>
                    <i-textarea
                        class="w-[calc(100%-8rem)]"
                        v-model="form.note"
                        v-model:error="error.note"
                        placeholder="请输入用户描述"
                        attr="用户描述"
                        name="note"
                        :max="-1"
                        :rules="[
                            'required',
                            'no-emoji',
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
import IInput from '~ui/components/input/component.vue';
import IButton from '~ui/components/button/component.vue';
import ITextarea from '~ui/components/textarea/component.vue';
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
    },

    emits: [
        'update:modelValue',
        'store',
    ],

    data() {
        return {
            form: {
                label: '',
                labelName: '',
                note: ''
            },
            error: {
                label: '',
                labelName: '',
                note: ''
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
        store() {
            this.loading = true;

            axios.post('/logLabel/saveLabel', this.form)
                .then(() => {
                    notify({
                        text: '侧链标签生成成功',
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