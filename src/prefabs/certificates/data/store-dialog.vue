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
                @submit="storeFile"
                ref="form"
                class="p-6">

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        业务类型
                    </p>
                    <i-select
                        class="w-[calc(100%-8rem)]"
                        v-model="form.bizType"
                        v-model:error="error.bizType"
                        placeholder="请选择业务类型"
                        attr="业务类型"
                        name="bizType"
                        :rules="[
                            'required',
                        ]">
                        <option
                            v-for="(label, value) in enums['bizType']"
                            :value="value">
                            {{ label }}
                        </option>
                    </i-select>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        业务 ID
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.bizId"
                        v-model:error="error.bizId"
                        placeholder="请输入业务 ID"
                        attr="业务 ID"
                        name="bizId"
                        :rules="[
                            'required',
                            'number-chars-line-only',
                            'string',
                            'max:64',
                        ]"/>
                </div>

                <div
                    class="flex mb-4">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        加密选项
                    </p>
                    <section
                        class="flex items-center">


                        <label
                            v-for="(label, value) in enums['encryptMode']"
							class="mx-2">
							<input
								type="radio"
								name="encryptMode"
								required
								:value="value"
								v-model="form.encryptMode">
							{{ label }}
						</label>

                    </section>
                </div>

                <channel-input
                    v-model="form.channelId"
                    v-model:error="error.channelId"
                    v-if="form.encryptMode == 2"/>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        数据存证
                    </p>
                    <i-textarea
                        class="w-[calc(100%-8rem)]"
                        v-model="form.data"
                        v-model:error="error.data"
                        placeholder="请输入数据存证"
                        attr="数据存证"
                        name="data"
                        :max="-1"
                        :rules="[
                            'required',
                            'no-emoji',
                            'json'
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        存证数据描述
                    </p>
                    <i-textarea
                        class="w-[calc(100%-8rem)]"
                        v-model="form.proofDataDesc"
                        v-model:error="error.proofDataDesc"
                        placeholder="请输入存证数据描述"
                        attr="存证数据描述"
                        name="proofDataDesc"
                        :max="100"
                        :rules="[
                            'required',
                            'no-emoji',
                            'max:100'
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
import ISelect from '~ui/components/select/component.vue';
import IButton from '~ui/components/button/component.vue';
import ITextarea from '~ui/components/textarea/component.vue';
import enums from '~/enums.json';
import ChannelInput from '~/prefabs/certificates/channel-input.vue';
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
    ],

    data() {
        return {
            form: {
                bizId: '',
                bizType: '',
                encryptMode: '0',
                data: '',
                channelId: '',
                proofDataDesc: '',
            },
            error: {
                bizId: '',
                bizType: '',
                encryptMode: '',
                data: '',
                channelId: '',
                proofDataDesc: '',
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
                    this.form.encryptMode = '0';
                    this.$refs.form.refresh();
                }

                this.$emit('update:modelValue', value);
            } 
        }
    },

    methods: {
        storeFile() {
            this.loading = true;

            axios.post('/proof/data/upload', this.form)
                .then(() => {
                    notify({
                        text: '数据存证成功',
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