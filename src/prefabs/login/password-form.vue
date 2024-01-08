<template>

    <i-form
        ref="form"
        @submit="storeAuthorizations">

        <login-input
            v-model="form.username"
            v-model:error="error.username"
            :rules="[
                'required',
                'string',
                'no-space',
                'no-emoji',
            ]"
            attr="账号"
            placeholder="请输入账号"
            name="username"
            autocomplete="username">
            <template #prefix>
                <username-icon/>
            </template>
        </login-input>
        
        <login-input
            v-model="form.password"
            v-model:error="error.password"
            :rules="[
                'required',
                'string',
            ]"
            attr="密码"
            placeholder="请输入密码"
            type="password"
            name="password"
            autocomplete="password">
            <template #prefix>
                <password-icon/>
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
            attr="验证码"
            placeholder="请输入验证码"
            name="captcha"/>

        <p
            class="flex justify-between my-6">
            <login-checkbox
                v-model="form.remember">
                7 天内免登录
            </login-checkbox>
            <router-link
                class="text-blue-400 text-[90%] no-underline hover:underline"
                :to="{
                    name: 'forget-password'
                }">
                忘记密码
            </router-link>
        </p>

        <login-button
            :loading="loading">
            登录
        </login-button>

    </i-form>
    
</template>

<script>

import LoginCheckbox from './checkbox.vue';
import UsernameIcon from './icons/username.vue';
import PasswordIcon from './icons/password.vue';

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
                username: '',
                password: '',
                captcha: '',
                remember: false,
            },
            error: {
                username: '',
                password: '',
                captcha: '',
            },
        };
    },
    
    components: {
        LoginCheckbox,
        UsernameIcon,
        PasswordIcon,
    },

    methods: {
        storeAuthorizations () {
            this.loading = true;
            axios.post(
                    '/login/password',
                    {
                        username: encrypt(this.form.username),
                        password: encrypt(this.form.password),
                        rememberMe: + this.form.remember,
                        code: this.form.captcha,
                        uuid: this.uuid,
                    }
                )
                .then(({ data }) => {
                    this.handleResponse(data);
                })
                .catch(err => {
                    this.$refs.captchaInput.refreshCaptcha();
                    this.$refs.captchaInput.refresh();
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }

}
</script>

