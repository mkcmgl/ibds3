<template>

    <i-dialog
        v-model="show"
        prevent
        :loading="loading">

        <template
            #title>
            添加数据源
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
                        数据源名称
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.dataSourceName"
                        v-model:error="error.dataSourceName"
                        placeholder="请输入数据源名称"
                        attr="数据源名称"
                        name="dataSourceName"
                        :rules="[
                            'required',
                            'string',
                            'max:32',
                        ]"/>
                </div>

                <db-type-input
                    v-model="form.dataSourceType"
                    v-model:error="error.dataSourceType"/>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        数据库IP
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.dataSourceIp"
                        v-model:error="error.dataSourceIp"
                        placeholder="请输入数据库IP"
                        attr="数据库IP"
                        name="dataSourceIp"
                        :rules="[
                            'required',
                            'string',
                            address => {

                                const errorMsg = '不是合法的 IPV4 或 IPV6 地址';

                                // 判断是否是IPv4地址
                                const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
                                if (ipv4Pattern.test(address)) {
                                    const parts = address.split('.');
                                    for (let i = 0; i < 4; i++) {
                                        const part = parseInt(parts[i], 10);
                                        if (part < 0 || part > 255) {
                                            return errorMsg;
                                        }
                                    }
                                    return null;
                                }

                                // 判断是否是IPv6地址
                                const ipv6Pattern = /^([\da-fA-F]{1,4}:){7}[\da-fA-F]{1,4}$/;
                                if (ipv6Pattern.test(address)) {
                                    return null;
                                }

                                return errorMsg;
                            }
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        数据库端口
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.dataSourcePort"
                        v-model:error="error.dataSourcePort"
                        placeholder="请输入数据库端口"
                        attr="数据库端口"
                        name="dataSourcePort"
                        :rules="[
                            'required',
                            'number',
                            'max:65536',
                            'min:1024'
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        实例名
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.instanceName"
                        v-model:error="error.instanceName"
                        placeholder="请输入实例名"
                        attr="实例名"
                        name="instanceName"
                        :rules="[
                            'required',
                            'string',
                            'max:32',
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        数据库用户名
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.dataSourceUsername"
                        v-model:error="error.dataSourceUsername"
                        placeholder="请输入数据库用户名"
                        attr="数据库用户名"
                        name="dataSourceUsername"
                        :rules="[
                            'required',
                            'no-emoji',
                            'string',
                            'max:32'
                        ]"/>
                </div>


                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        数据库密码
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.dataSourcePassword"
                        v-model:error="error.dataSourcePassword"
                        placeholder="请输入数据库密码"
                        attr="数据库密码"
                        name="db-pwd"
                        type="password"
                        :rules="[
                            'required',
                            'string',
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        数据库描述
                    </p>
                    <i-textarea
                        class="w-[calc(100%-8rem)]"
                        v-model="form.dataSourceDescription"
                        v-model:error="error.dataSourceDescription"
                        placeholder="请输入数据库描述"
                        attr="数据库描述"
                        name="dataSourceDescription"
                        :max="100"
                        :rules="[
                            'string',
                            'max:100',
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

import DbTypeInput from './db-type-input.vue';
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
                dataSourceName: '',
                dataSourceType: '',
                dataSourceIp: '',
                dataSourcePort: '',
                instanceName: '',
                dataSourceUsername: '',
                dataSourcePassword: '',
                dataSourceDescription: '',
            },
            error: {
                dataSourceName: '',
                dataSourceType: '',
                dataSourceIp: '',
                dataSourcePort: '',
                instanceName: '',
                dataSourceUsername: '',
                dataSourcePassword: '',
                dataSourceDescription: '',
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

            axios.post('/datasource/add', this.form)
                .then(() => {
                    notify({
                        text: '数据源新增成功',
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