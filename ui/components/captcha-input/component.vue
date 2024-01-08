<template>

    <fieldset
        class="relative mb-6 i-input"
        v-bind="wrapperAttrs">

        <label
            class="relative w-full block"
            :for="`input-${id}`">

            <input
                class="rounded outline-none text-base bg-transparent select-none py-2 w-[calc(100%-theme('space.36'))]"
                :class="[
                    computedType === 'password'
                        ? 'pr-12'
                        : 'pr-2',
                    hasPrefix
                        ? 'pl-10'
                        : 'pl-2',
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
				class="absolute w-10 h-10 left-1 top-1/2 -translate-y-1/2 flex items-center justify-center"
				role="prefix">
                <slot
                    name="prefix"/>
            </span>
            
        </label>

        <button
            class="absolute cursor-pointer z-20 block w-32 h-[calc(theme('space.10')+2px)] bg-slate-300 right-0 top-0 rounded overflow-hidden"
            type="button"
            :disabled="loading"
            @click="refreshCaptcha"
            title="看不清，换一张">
            <span
                v-if="loading"
                class="text-slate-800 text-sm">
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

        <p
			class="text-xs text-slate-500 absolute leading-6 top-full left-0"
			v-if="hasTip && !hasError"
			v-html="tip"/>

    </fieldset>

</template>

<script>
import script from './script.js';

export default {

    name: 'i-capthca-input',

    mixins: [
        script
    ],
}
</script>