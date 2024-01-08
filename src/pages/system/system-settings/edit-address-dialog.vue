<template>
    <i-dialog v-model="show" :loading="loading" prevent>

        <template #title>
            设置
        </template>

        <template v-slot="{ close }" #default>

            <i-form ref="form" class="p-6" @submit="updatePassword">

                <div class="flex items-center">
                    <p class="w-24 leading-[3rem] text-right mr-4">
                        数据上报
                    </p>
                   <el-switch v-model="form.value1" />
                </div>

                <div class="flex">
                    <p class="w-24 leading-[3rem] text-right mr-4">
                        数据上报地址
                    </p>
                    <i-input class="w-[calc(100%-7rem)]" v-model="form.address"
                        v-model:error="error.address" placeholder="请输入数据上报地址，如：http://abcd" attr="请输入数据上报地址" type="text"
                        :rules="[
                            'required',
                           ,
                        ]" />
                </div>


                <footer class="flex items-center justify-between">

                    <button
                        class="border-slate-200 border-2 block h-[calc(theme('space.10')+2px)] rounded overflow-hidden transition tracking-widest scale-100 active:scale-[99%] hover:scale-[101%] w-32"
                        type="button" v-wave @click="close">
                        取消
                    </button>

                    <i-button class="w-32" :loading="loading">
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
import ICaptchaInput from '~ui/components/captcha-input/component.vue';
import ISmsInput from '~ui/components/sms-input/component.vue';
import IButton from '~ui/components/button/component.vue';
</script>

<script>
import axios from '~/plugins/axios.js';
import encrypt from '~ui/utils/encrypt.js';
import { notify } from '@kyvg/vue3-notification';

export default {

    props: {
        modelValue: {
            required: true,
            type: Boolean,
        }
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

    data() {
        return {
            loading: false,

            uuid: '',
            form: {
                value1:true,
                address:'',
            },
            error: {
                value1: true,
                address: '',
            },
        }
    },

    methods: {
        updatePassword() {
            console.log(`output-更改初始密码`);
            //     this.loading = true;

            //     axios.put('/system/user/resetPwd', {
            //         password: encrypt(this.form.password),
            //         phoneNumber: encrypt(this.form.phone),
            //         receiveCode: encrypt(this.form.sms),
            //         code: this.form.captcha,
            //         uuid: this.uuid,
            //     })
            //         .then(() => {
            //             notify({
            //                 type: 'green',
            //                 text: '重置密码成功',
            //             });
            //             this.$refs.form.refresh();
            //             this.show = false;
            //         })
            //         .catch(() => {
            //             this.$refs.captchaInput.refresh();
            //             this.$refs.captchaInput.refreshCaptcha();
            //             this.$refs.smsInput.refresh();
            //         })
            //         .finally(() => {
            //             this.loading = false;
            //         });

        }
    },
}
</script>