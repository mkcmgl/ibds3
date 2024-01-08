<template>

	<fieldset
		class="i-textarea relative mb-6"
		v-bind="wrapperAttrs"
		:key="`i-textarea-${id}`">
		<label
			class="relative w-full">
			<textarea
				class="min-h-[150px] p-2 w-full rounded outline-none bg-transparent py-2 block"
				:class="{
					'invalid': hasError,
				}"
				v-model="value"
				v-bind="exceptWrapperAttrs"
				@blur="validate"/>
		</label>
		<p
			class="text-sm absolute leading-6 top-full left-0 w-full flex justify-between">
			<small
				class="text-red-500">
				{{ error }}
			</small>
			<small
				v-if="max > 0"
				:class="{
					'text-red-500': ((String(value || '').length > max) || hasError)
				}">
				{{ String(value || '').length }} / {{ max }}
			</small>
		</p>
	</fieldset>

</template>

<script>

import script from './script.js';

export default {

    name: 'i-textarea',

    mixins: [
        script,
    ]
}
</script>