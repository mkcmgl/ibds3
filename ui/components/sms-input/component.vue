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
            class="absolute cursor-pointer z-20 block w-32 h-[calc(theme('space.10')+2px)] right-0 top-0 rounded overflow-hidden transition text-sm tracking-widest"
            :class="[
                {
                    'bg-blue-500 text-white hover:bg-blue-700 scale-100 active:scale-[99%] hover:scale-[101%]': !loading && countdown === 0,
                    'bg-slate-200 text-slate-400 cursor-not-allowed': loading || countdown > 0                    
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
        
        <p
			class="text-xs text-slate-500 absolute leading-6 top-full left-0"
			v-if="hasTip && !hasError"
			v-html="tip"/>

    </fieldset>

</template>

<script>
import script from './script.js';

export default {

    name: 'i-sms-input',

    mixins: [
        script
    ],
}
</script>