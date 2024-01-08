<style lang="scss">
    .login-input.login-sms-input {
        input {
            @apply pr-36;
        }
    }
</style>

<template>

    <fieldset
        class="relative mb-6 login-input login-sms-input"
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
                <sms-icon/>
            </span>
            
        </label>

        <button
            class="absolute cursor-pointer z-20 block w-32 h-12 right-0 bottom-2 rounded-sm overflow-hidden transition text-sm tracking-widest"
            :class="[
                {
                    'bg-blue-600 text-slate-100 hover:bg-blue-700 scale-100 active:scale-[99%] hover:scale-[101%]': !loading && countdown === 0,
                    'bg-blue-800 text-slate-500 cursor-not-allowed': loading || countdown > 0                    
                }
            ]"
            type="button"
            :disabled="loading || countdown !== 0"
            v-wave="!loading && countdown === 0"
            @click="sendSms">
            {{ buttonContent }}
        </button>

        <p
			class="text-xs text-red-500 absolute leading-6 top-full left-0"
			v-if="hasError"
			v-html="error"/>

    </fieldset>

</template>

<script>
import SmsInputScript from '~ui/components/sms-input/script.js';
import SmsIcon from './icons/sms.vue';

export default {

    mixins: [
        SmsInputScript,
    ],

    components: {
        SmsIcon,
    },
    
}
</script>