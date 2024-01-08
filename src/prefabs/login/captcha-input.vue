<style lang="scss">
    .login-input.login-captcha-input {
        input {
            @apply pr-36;
        }
    }
</style>

<template>
    <fieldset
        class="relative mb-6 login-input login-captcha-input"
        v-bind="wrapperAttrs">

        <label
            class="relative w-full block text-slate-800"
            :for="`input-${id}`">

            <input
                class="pl-12"
                :class="[
                    hasError
                        ? 'invalid'
                        : 'valid',
                ]"
                :id="`input-${id}`"
                :type="computedType"
                v-model="value"
                v-bind="exceptWrapperAttrs"
                @blur="validate"/>

            <span
                class="absolute z-10 bottom-0 left-0 w-full h-[2px] bg-slate-500"
                role="border"/>

            <span
				class="absolute w-10 h-10 left-1 top-1/2 -translate-y-1/2 flex items-center justify-center"
				role="prefix">
                <check-icon/>
            </span>
            
        </label>

        <button
            class="absolute cursor-pointer z-20 block w-32 h-12 bg-slate-600 right-0 bottom-2 rounded-sm overflow-hidden"
            type="button"
            :disabled="loading"
            @click="refreshCaptcha"
            title="看不清，换一张">
            <span
                v-if="loading"
                class="text-slate-200 text-sm">
                <i class="mdi mdi-spin mdi-loading pr-1"></i>
                加载中
            </span>
            <img
                v-else
                class="w-full h-full"
                alt="图形验证码"
                :src="captcha">
        </button>

        <p
			class="text-xs text-red-500 absolute leading-6 top-full left-0"
			v-if="hasError"
			v-html="error"/>

    </fieldset>
</template>

<script>
import CaptchaInputScript from '~ui/components/captcha-input/script.js';
import CheckIcon from './icons/check.vue';

export default {

    mixins: [
        CaptchaInputScript,
    ],

    components: {
        CheckIcon,
    },
}
</script>