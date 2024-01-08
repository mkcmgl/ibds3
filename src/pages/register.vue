<template>
    <main
        class="
            relative w-full overflow-x-hidden bg-white
        ">
        
        <div
            class="bg-[url('/images/register-bg.png')] bg-cover bg-center w-[calc(100vw/3)] h-full absolute left-0 top-0">
            <header
                class="flex items-center p-10">
                <img
                    class="w-[200px]"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVQAAABGCAYAAACT+2yRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmIwZjhiZTkwLCAyMDIxLzEyLzE1LTIxOjI1OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuMiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODQ2OTFBMDUwRURCMTFFREE3NTI4MjA0NkFEOThBNUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODQ2OTFBMDYwRURCMTFFREE3NTI4MjA0NkFEOThBNUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4NDY5MUEwMzBFREIxMUVEQTc1MjgyMDQ2QUQ5OEE1RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4NDY5MUEwNDBFREIxMUVEQTc1MjgyMDQ2QUQ5OEE1RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnJ2iJsAAB9RSURBVHja7F0N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"
                    alt="区块链开发服务系统">
            </header>
        </div>

        <div
            class="w-2/3 ml-[calc(100vw/3)] min-h-screen">

            <i-form
                class="w-[500px] mx-auto py-24"
                @submit="register">

                <h1
                    class="text-3xl mb-6 tracking-widest">
                    欢迎注册
                </h1>

                <i-input
                    v-model="form.username"
                    v-model:error="error.username"
                    name="username"
                    placeholder="请输入账号，5-20字符"
                    attr="账号"
                    :rules="[
                        'required',
                        'string',
                        'min:5',
                        'max:20',
                    ]"/>

                <i-input
                    v-model="form.password"
                    v-model:error="error.password"
                    placeholder="请输入登录密码，6-20字符，需包含数字、字母，区分大小写"
                    attr="登录密码"
                    type="password"
                    name="new-password"
                    autocomplete="new-password"
                    :rules="[
                        'required',
                        'password',
                    ]"/>

                <i-input
                    v-model="form.passwordConfirm"
                    v-model:error="error.passwordConfirm"
                    placeholder="请确认登录密码"
                    attr="确认登录密码"
                    type="password"
                    name="new-password-confirm"
                    autocomplete="new-password"
                    :rules="[
                        'required',
                        `password-confirm:${form.password}`,
                    ]"/>

                <i-input
                    ref="phoneInput"
                    v-model="form.phone"
                    v-model:error="error.phone"
                    placeholder="请输入手机号码"
                    attr="手机号码"
                    type="tel"
                    name="tel"
                    autocomplete="tel"
                    :rules="[
                        'required',
                        'phone',
                    ]"/>

                <i-captcha-input
                    ref="captchaInput"
                    v-model="form.captcha"
                    v-model:error="error.captcha"
                    v-model:uuid="uuid"
                    placeholder="请输入图形验证码"
                    attr="图形验证码"
                    name="captcha"
                    :rules="[
                        'required',
                    ]"/>
                    
                <i-sms-input
                    ref="smsInput"
                    v-model="form.sms"
                    v-model:error="error.sms"
                    :phone-input="$refs.phoneInput"
                    :captcha-input="$refs.captchaInput"
                    type="register"
                    placeholder="请输入短信验证码"
                    attr="短信验证码"
                    name="sms"
                    :rules="[
                        'required',
                    ]"/>

                <p
                    class="my-6 text-sm text-center">
                    点击“注册”按钮，即代表您已阅读并同意《**服务协议》和《**隐私声明》
                </p>

                <i-button
                    class="w-full"
                    :loading="loading">
                    注册
                </i-button>

                <p
                    class="my-6 text-center text-[90%] text-blue-600">
                    <router-link
                        class="no-underline hover:underline"
                        :to="{
                            name: 'login'
                        }">
                        已有账号，立即登录
                    </router-link>
                </p>

            </i-form>

        </div>

    </main>
</template>

<script setup>
import IInput from '~ui/components/input/component.vue';
import IButton from '~ui/components/button/component.vue';
import IForm from '~ui/components/form/component.vue';
import ICaptchaInput from '~ui/components/captcha-input/component.vue';
import ISmsInput from '~ui/components/sms-input/component.vue';
</script>

<script>

import axios from '~/plugins/axios.js';
import encrypt from '~ui/utils/encrypt.js';
import { notify } from '@kyvg/vue3-notification';

export default {

    metaInfo() {
		return {
			title: '注册',
		}
	},

    data() {
        return {

            uuid: '',
            
            form: {
                username: '',
                password: '',
                passwordConfirm: '',
                phone: '',
                captcha: '',
                sms: '',
            },
            error: {
                username: '',
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
        register() {
            this.loading = true;
            
            let formData = {
                username: encrypt(this.form.username),
                password: encrypt(this.form.password),
                phoneNumber: encrypt(this.form.phone),
                receiveCode: encrypt(this.form.sms),
                code: this.form.captcha,
                uuid: this.uuid,
            };

            axios.post('/register', formData)
                .then(() => {
                    notify({
                        type: 'green',
                        text: '注册成功，请登录',
                    });
                    this.$router.push({
                        name: 'login',
                    });
                })
                .catch(() => {
                    this.$refs.captchaInput.refreshCaptcha();
                    this.$refs.captchaInput.refresh();
                    this.$refs.smsInput.refresh();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    }
}
</script>