<template>

    <i-dialog
        v-model="show"
        prevent
        :loading="loading">

        <template
            #title>
            生成随机数
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
                        随机数范围
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.range"
                        v-model:error="error.range"
                        placeholder="请输入随机数范围"
                        attr="随机数范围"
                        name="range"
                        :rules="[
                            'required',
                            'number',
                            'min:1',
                            'max:100000000',
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        随机数个数
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.randomNum"
                        v-model:error="error.randomNum"
                        placeholder="请输入随机数个数"
                        attr="随机数个数"
                        name="randomNum"
                        :rules="[
                            'required',
                            'number',
                            'min:1',
                            'max:' + form.range,
                        ]"
                        :messages="{
                            max: '随机数个数不能大于随机数范围',
                        }"/>
                </div>

                <div
                    class="flex mb-4">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        类型
                    </p>
                    <section
                        class="flex items-center">


                        <label
                            v-for="{label, value} in [
                                {
                                    label: '无输入',
                                    value: 0,
                                },
                                {
                                    label: '有输入',
                                    value: 1,
                                }
                            ]"
							class="mx-2">
							<input
								type="radio"
								name="type"
								required
								:value="value"
								v-model="form.type">
							{{ label }}
						</label>

                    </section>
                </div>

                <div
                    v-if="form.type == 1"
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        输入信息
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.input"
                        v-model:error="error.input"
                        placeholder="请输入输入信息"
                        attr="输入信息"
                        name="input"
                        :rules="[
                            'required',
                            'string',
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        随机数描述
                    </p>
                    <i-textarea
                        class="w-[calc(100%-8rem)]"
                        v-model="form.description"
                        v-model:error="error.description"
                        placeholder="请输入随机数描述"
                        attr="随机数描述"
                        name="description"
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
                type: 1,
                input: '',
                randomNum: 0,
                range: 100,
                description: '',
            },
            error: {
                type: '',
                input: '',
                randomNum: '',
                range: '',
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
        store() {
            this.loading = true;

            axios.post('/random/create', this.form)
                .then(() => {
                    notify({
                        text: '随机数生成成功',
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