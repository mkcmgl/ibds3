<template>

    <fieldset
        class="relative mb-6 i-input"
        v-bind="wrapperAttrs">

        <label
            class="relative w-full block"
            :for="`input-${id}`">

            <input
                class="rounded outline-none w-full text-base bg-transparent select-none py-2"
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
				<span
                    role="button"
					aria-label="显示密码"
					@click="showPassword = !showPassword">
					<i
						class="mdi"
						:class="{
							'mdi-eye': showPassword,
							'mdi-eye-off': !showPassword
						}"></i>
				</span>
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
import script from './script.js';

export default {

    name: 'i-input',

    mixins: [
        script
    ],
    
}
</script>