<template>
	<fieldset
		class="relative inspur-address-input-wrapper block"
		v-bind="$attrsClassStyleIdOnly"
		:key="`inspur-address-input-${id}`">
		
		<section
			class="flex -mx-1 w-full">
			<i-select
				:force-invalid-style="hasError && !result.province"
				prevent-register
				class="flex-1 mx-1"
				v-model="result.province"
				placeholder="请选择">
				<option
					v-for="{ label, value } in provinces"
					:value="value">
					{{ label }}
				</option>
			</i-select>
			<i-select
				:force-invalid-style="hasError && !result.city"
				prevent-register
				class="flex-1 mx-1"
				v-model="result.city"
				placeholder="请选择"
				:disabled="cities.length === 0">
				<option
					v-for="{ label, value } in cities"
					:value="value">
					{{ label }}
				</option>
			</i-select>
			<i-select
				:force-invalid-style="hasError && !result.area"
				prevent-register
				class="flex-1 mx-1"
				v-model="result.area"
				placeholder="请选择"
				:disabled="areas.length === 0"
				v-on="computedTrigger">
				<option
					v-for="{ label, value } in areas"
					:value="value">
					{{ label }}
				</option>
			</i-select>
		</section>

		<p
			class="text-xs text-red-500 absolute leading-6 top-[calc(100%-theme('space.6'))] left-0"
			v-if="hasError"
			v-html="error"/>
	</fieldset>
</template>

<style lang="scss">
.inspur-address-input-wrapper {

	input::-ms-reveal,
	input::-ms-clear {
		display: none;
	}

	input:not(.invalid) ~ span {
		@apply text-slate-400;
	}

	input:not(.invalid):focus {
		@apply border-blue-500;

		& ~ span {
			@apply text-blue-500;
		}
	}

	input.invalid {
		@apply border-red-300 text-red-500 placeholder-[theme('colors.red.300')];

		& ~ span {
			@apply text-red-500;
		}
	}
}

</style>

<script>

import lodash from 'lodash';
import input from '~ui/mixins/input.js';
import { regionDataPlus } from '~ui/data/locations.js';
import ISelect from '~ui/components/select/component.vue';

regionDataPlus.forEach((location, index) => {
	// 单独处理香港和澳门
	if ([810000, 820000].includes(parseInt(location.value))) {
		regionDataPlus[index] = lodash.cloneDeep({
			...location,
			children: [
				location,
			]
		});
	}
});

const locationInfoHandler = location => {

	location.value = location.label;

	if (
		Object.keys(location).includes('children') &&
		location.children.length > 0
	) {
		location.children.forEach(subLocation => {
			subLocation = locationInfoHandler(subLocation);
		});
	}

	return location;
}

regionDataPlus.forEach(location => {
	location = locationInfoHandler(location);
});

export default {

	inheritAttrs: false,

	name: 'i-address-input',

	mixins: [
		input,
	],

    components: {
        'i-select': ISelect,
    },

	data() {
		return {
			locations: regionDataPlus,

			result: {
				province: '',
				city: '',
				area: '',
			},
		};
	},

	emits: [
		'update:modelValue',
	],

	mounted() {
		let [province = '', city = '', area = ''] = this.modelValue ? this.modelValue.split('-') : [];

		this.result = {province, city, area};

		if (!area) {
			this.$emit('update:modelValue', '');
		}
	},

	watch: {
		'result.province'(value) {
			this.result.city = '';
			this.$emit('update:modelValue', '');
		},
		'result.city'(value) {
			this.result.area = '';
			this.$emit('update:modelValue', '');
		},
		'result.area'(value) {
			if (value) {
				this.$emit('update:modelValue', [this.result.province, this.result.city, this.result.area].join('-'));
			}
			else {
				this.$emit('update:modelValue', '');
			}
		}
	},

	computed: {
		provinces() {
			return this.locations.map(({label, value}) => {
				return {label, value}
			});
		},
		province() {
			return this.locations.find(province => {
				return province.value === this.result.province;
			});
		},
		cities() {
			if (this.province) {
				return this.province.children.map(({label, value}) => {
					return {label, value};
				});
			}
			else {
				return [];
			}	
		},
		city() {
			return this.province?.children.find(city => {
				return city.value === this.result.city;
			});
		},
		areas() {
			if (this.city) {
				return this.city.children;
			}
			else {
				return [];
			}
		},
	}

}
</script>