<style lang="scss">
    .login-input {
        input {
            @apply bg-transparent w-full text-base py-2 border-b-[1.2px] border-blue-700 outline-none placeholder-slate-800/25;

            & ~ span[role="prefix"] svg {
                @apply fill-blue-400 transition;
            }

            &:focus ~ span[role="prefix"] svg {
                @apply fill-blue-600;
            }

            & ~ span[role="border"] {
                @apply bg-blue-500 scale-x-0 transition-transform;
            }

            &:focus ~ span[role="border"] {
                @apply scale-x-100;
            }

            &.invalid ~ span[role="border"] {
                @apply bg-red-500 scale-x-100;
            }

            &.invalid ~ span[role="prefix"] svg {
                @apply fill-red-500;
            }
        }

        // input:-webkit-autofill,
        // input:-webkit-autofill:hover, 
        // input:-webkit-autofill:focus, 
        // input:-webkit-autofill:active{
        //     -webkit-text-fill-color: theme('colors.slate.600') !important;
        //     -webkit-box-shadow: 90px 90px 10px 20px theme('colors.blue.800')  inset !important;
        // }
    }
    
</style>


<template>

    <fieldset
        class="relative mb-6 login-input"
        v-bind="wrapperAttrs">

        <label
            class="relative w-full block text-slate-800"
            :for="`input-${id}`">

            <input
                class="pl-12"
                :class="[
                    computedType === 'password'
                        ? 'pr-12'
                        : 'pr-2',
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
				role="prefix"
				v-if="hasPrefix">
                <slot
                    name="prefix"/>
            </span>

            <span
				v-if="
					type === 'password' &&
					!!modelValue
				"
				class="absolute w-10 h-10 right-1 top-1/2 -translate-y-1/2 flex items-center justify-center"
				role="suffix">
				<button
					type="button"
					aria-label="显示密码"
					@click="showPassword = !showPassword">
					<i
						class="mdi"
						:class="{
							'mdi-eye': showPassword,
							'mdi-eye-off': !showPassword
						}"></i>
				</button>
			</span>

        </label>

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
import script from '~ui/components/input/script.js';

export default {
    
    mixins: [
        script
    ],
}
</script>