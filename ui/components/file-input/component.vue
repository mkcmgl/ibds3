<template>

    <fieldset
        class="relative mb-6"
        v-bind="wrapperAttrs">

        <label
            class="relative w-full block"
            :for="`i-file-input-${id}`">

            <input
                class="border-slate-200 focus:border-blue-500 border-2 rounded outline-none w-full text-base bg-transparent select-none py-2 pr-2"
                :class="[
                    hasPrefix
                        ? 'pl-10'
                        : 'pl-2',
                    hasError
                        ? 'invalid'
                        : 'valid',
                ]"
                :id="`i-file-input-${id}`"
                type="file"
                ref="input"
                v-bind="exceptWrapperAttrs"
                @change="inputChanged"/>

            <span
				class="absolute w-10 h-10 left-1 top-1/2 -translate-y-1/2 flex items-center justify-center"
				role="prefix"
				v-if="hasPrefix">
                <slot
                    name="prefix"/>
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

    name: 'i-file-input',

    mixins: [
        script
    ],
    
    emits: [
        'blur',
    ],
    
    methods: {
        inputChanged () {

            let { input } = this.$refs;

            if (input.files === undefined) {
				input.value = '';
				return false;
			}

            let files = input.files;

            if (files.length === 0) {
				input.value = '';
				return false;
			}

            this.value = files[0];
            this.$emit('blur');

            this.$nextTick(() => {
                let error = this.validateManually(files[0]);
                if (!error) {
                    this.clearError();
                }
            });
        },
        clearValue() {
            this.$emit(
				'update:modelValue',
				null
			);
            this.$refs.input.value = '';
        },
    }
}
</script>