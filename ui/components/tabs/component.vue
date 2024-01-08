<style lang="scss">
	.inspur-tabs::after {
		@apply block w-[30px] -translate-x-1/2 left-[var(--marker-position-offset)] h-[3px] absolute bottom-0 z-10 bg-blue-500 transition-[left] origin-center;
		content: ' ';
	}
</style>

<template>
	<div
		:style="computedStyles"
		class="flex relative inspur-tabs">
		<button
			v-for="({value, label}) in options"
			type="button"
			class="py-3 border-b-[1px] border-slate-200 w-[var(--option-width)]"
			:class="{
				'text-blue-500 hover:text-blue-400': computedModelValue === value,
				'text-slate-400': computedModelValue !== value
			}"
			@click="computedModelValue = value"
			v-html="label"
			v-wave/>
	</div>
</template>

<script>
import script from './script.js';
export default {

	name: 'i-tabs',

	mixins: [
        script
    ],
}
</script>