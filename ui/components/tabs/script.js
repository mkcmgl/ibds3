export default {
    
    props: {
		options: {
			required: true,
			type: Array,
			validator: value => {
				return !value.some(option => {
					return ['label', 'value'].forEach(key => {
						return !Object.keys(option).includes(key);
					});
				});
			}
		},
		modelValue: {
			required: true,
		},
	},

	emits: [
		'update:modelValue',
	],

	computed: {
		computedModelValue: {
			get() {
				return this.modelValue;
			},
			set(value) {
				this.$emit('update:modelValue', value);
			}
		},
		activeTabIndex () {
			return this.options.findIndex(({ value }) => value === this.modelValue);
		},
		computedStyles () {
			return {
				'--option-width': `calc(100%/${this.options.length || 1})`,
    			'--marker-offset': `calc(calc(var(--option-width)*${this.activeTabIndex}) + calc(var(--option-width)/2))`,
			}
		}
	},
    
}