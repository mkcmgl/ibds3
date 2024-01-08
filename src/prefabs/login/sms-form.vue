<template>

    <i-form
        ref="form"
        @submit="storeAuthorizations">
        
        <login-input
            v-model="form.phone"
            v-model:error="error.phone"
            :rules="[
                'required',
                'phone',
            ]"
            attr="手机号码"
            placeholder="请输入手机号码"
            type="tel"
            name="tel"
            autocomplete="tel"
            ref="phoneInput">
            <template #prefix>
                <phone-icon/>
            </template>
        </login-input>

        <captcha-input
            v-model="form.captcha"
            v-model:error="error.captcha"
            v-model:uuid="uuid"
            ref="captchaInput"
            :rules="[
                'required',
            ]"
            attr="图形验证码"
            placeholder="请输入图形验证码"
            name="captcha"/>

        <sms-input
            v-model="form.sms"
            v-model:error="error.sms"
            :rules="[
                'required',
            ]"
            :captcha-input="$refs.captchaInput"
            :phone-input="$refs.phoneInput"
            attr="短信验证码"
            placeholder="请输入短信验证码"
            type="login"
            ref="smsInput"/>

        <login-button
            :loading="loading">
            登录
        </login-button>

    </i-form>
    
</template>

<script>


import PhoneIcon from './icons/phone.vue';
import SmsInput from './sms-input.vue';

import axios from '~/plugins/axios.js';
import encrypt from '~ui/utils/encrypt.js';
import form from './form.js';

export default {

    mixins: [
        form,
    ],

    data() {
        return {
            form: {
                phone: '',
                captcha: '',
                sms: '',
            },
            error: {
                phone: '',
                captcha: '',
                sms: '',
            },
        };
    },
    
    components: {
        PhoneIcon,
        SmsInput,
    },

    methods: {
        storeAuthorizations () {
            this.loading = true;
            
            axios.post(
                    '/login/phone',
                    {
                        phoneNumber: encrypt(this.form.phone),
                        receiveCode: encrypt(this.form.sms),
                        code: encrypt(this.form.captcha),
                        uuid: this.uuid,
                    }
                )
                .then(({ data }) => {
                    this.handleResponse(data);
                })
                .catch(err => {
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

