<style lang="scss">
    .i-select {

        [role="select"] {

            &:not(.invalid) {
                & ~ span {
                    @apply fill-slate-400;
                }
            }

            &:not(.invalid):focus {
                @apply border-blue-500;

                & ~ span {
                    @apply fill-blue-500;
                }
            }

            option:not([disabled]) {
                @apply text-black;
            }

            -webkit-appearance: none;
            @apply p-2;

            &::-ms-expand {
                display: none;
            }

            &[disabled] {
                @apply cursor-not-allowed opacity-75;
            }
        }

    }
</style>

<template>

    <fieldset
        class="i-select relative mb-6"
        v-bind="wrapperAttrs">

		<label
			class="relative w-full block">
			<select
				class="border-slate-200 border-2 rounded outline-none w-full text-base bg-transparent select-none py-2 cursor-pointer"
				:class="{
					'invalid': hasError,
					'text-slate-400': value === ''
				}"
				:disabled="disabled"
				role="select"
				v-bind="exceptWrapperAttrs"
				v-model="value"
				@change="validate">

				<option
					v-if="hasPlaceholder"
					:value="''"
					disabled
					selected
					class="text-slate-300">
					{{ placeholder }}
				</option>

				<slot/>
			</select>

			<span
				class="absolute w-10 h-10 right-1 top-1/2 -translate-y-1/2 flex items-center justify-center icon-wrapper">
				<button
					class="w-5 h-5"
					aria-label="清空选择框"
					v-if="!!value && !hideClearer"
					type="button"
					@click="value = ''"
					:disabled="disabled">
					<close-icon/>
				</button>
				<button
					class="w-3 h-3"
					aria-label="选择"
					v-else-if="!!!value"
					:disabled="disabled"
					type="button">
					<drop-icon/>
				</button>
			</span>

		</label>

		<p
			class="text-xs text-red-500 absolute leading-6 top-full left-0"
			v-if="hasError"
			v-html="error"/>

    </fieldset>
</template>

<script setup>
import CloseIcon from './close-icon.vue';
import DropIcon from './drop-icon.vue';
</script>

<script>
import script from './script.js';
import attributes from '~ui/mixins/attributes.js';

export default {

    name: 'i-select',

    mixins: [
        attributes,
        script
    ],
}
</script>