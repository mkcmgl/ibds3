<template>

    <i-form
        @submit="validateAccount">

        <i-input
            v-model="form.password"
            v-model:error="error.password"
            name="password"
            type="password"
            :rules="[
                'required',
                'password',
            ]"
            placeholder="请输入新密码"
            attr="新密码"/>

        <i-input
            v-model="form.passwordConfirm"
            v-model:error="error.passwordConfirm"
            name="passwordConfirm"
            type="password"
            :rules="[
                'required',
                `password-confirm:${form.password}`,
            ]"
            placeholder="请确认新密码"
            attr="确认新密码"/>

        <i-input
            ref="phoneInput"
            v-model="form.phone"
            v-model:error="error.phone"
            name="phone"
            :rules="[
                'required',
                'phone',
            ]"
            placeholder="请输入账号注册时绑定的手机号"
            attr="手机号"/>

        <i-captcha-input
            ref="captchaInput"
            v-model="form.captcha"
            v-model:error="error.captcha"
            v-model:uuid="uuid"
            name="captcha"
            :rules="[
                'required',
            ]"
            placeholder="请输入验证码"
            attr="验证码"/>

        <i-sms-input
            ref="smsInput"
            v-model="form.sms"
            v-model:error="error.sms"
            :phone-input="$refs.phoneInput"
            :captcha-input="$refs.captchaInput"
            name="sms"
            :rules="[
                'required',
            ]"
            placeholder="请输入短信验证码"
            attr="短信验证码"/>

        <i-button
            class="w-full"
            :loading="loading">
            下一步
        </i-button>

    </i-form>

</template>

<script>
import step from './step.js';
import axios from '~/plugins/axios.js';
import encrypt from '~ui/utils/encrypt.js';

import IForm from '~ui/components/form/component.vue';
import IInput from '~ui/components/input/component.vue';
import IButton from '~ui/components/button/component.vue';
import ICaptchaInput from '~ui/components/captcha-input/component.vue';
import ISmsInput from '~ui/components/sms-input/component.vue';

export default {

    mixins: [
        step,
    ],

    components: {
        IForm,
        IInput,
        IButton,
        ICaptchaInput,
        ISmsInput,
    },

    props: {
        phone: {
            type: String,
            required: true,
        },
    },

    emits: [
        'update:phone',
    ],
    
    data() {
        return {

            uuid: '',

            form: {
                password: '',
                passwordConfirm: '',
                phone: '',
                captcha: '',
                sms: '',
            },
            error: {
                password: '',
                passwordConfirm: '',
                phone: '',
                captcha: '',
                sms: '',
            },
            
            loading: false,
        }
    },

    methods: {
        validateAccount () {
            this.loading = true;
            axios.post(
                    '/password/returnBack',
                    {
                        phoneNumber: encrypt(this.form.phone),
                        password: encrypt(this.form.password),
                        receiveCode: encrypt(this.form.sms),
                        code: this.form.captcha,
                        uuid: this.uuid,
                    }
                )
                .then(() => {
                    this.$emit('update:phone', this.form.phone);
                    this.$emit('update:step', 1);
                })
                .catch(() => {
                    this.$refs.captchaInput.refreshCaptcha();
                    this.$refs.captchaInput.refresh();
                    this.$refs.smsInput.refresh();
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>