<template>

    <i-dialog
        v-model="show"
        prevent
        :loading="loading">

        <template
            #title>
            数据关系追加
        </template>

        <template
            v-slot="{ close }"
            #default>
        
            <i-form
                @submit="addRelation"
                ref="form"
                class="p-6">


                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        溯源 ID
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.traceId"
                        v-model:error="error.traceId"
                        placeholder="请输入溯源 ID"
                        attr="溯源 ID"
                        name="traceId"
                        :rules="[
                            'required',
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        交易哈希
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.currentTxHash"
                        v-model:error="error.currentTxHash"
                        placeholder="请输入交易哈希"
                        attr="交易哈希"
                        name="currentTxHash"
                        :rules="[
                            'required',
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
</script>

<script>

import { notify } from '@kyvg/vue3-notification';
import axios from '~/plugins/axios.js';

export default {

    props: {
        relation: {
            required: true,
        },
        modelValue: {
            required: true,
            type: Boolean
        },
    },

    emits: [
        'update:modelValue',
    ],

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

    data () {
        return {

            loading: false,

            form: {
                traceId: this.relation.traceId,
                currentTxHash: '',
            },
            error: {
                traceId: '',
                currentTxHash: ''
            }
        }
    },

    methods: {
        addRelation() {
            this.loading = true;
            axios.post('/trace/history/appendCode', this.form)
                .then(() => {
                    notify({
                        text: '数据关系追加成功',
                        type: 'green',
                    });
                    this.show = false;
                })
                .finally(() => {
                    this.loading = false;
                });                    
        }
    }
}
</script>