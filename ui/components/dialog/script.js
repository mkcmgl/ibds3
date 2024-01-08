export default {
    
    props: {
		modelValue: {
			required: true,
			type: Boolean,
		},
		prevent: {
			required: false,
			default: false,
			type: Boolean,
		},
		hideCloser: {
			required: false,
			type: Boolean,
			default: false,
		},
		width: {
			required: false,
			type: String,
			default: '625px',
		},
		height: {
			required: false,
			type: String,
			default: 'auto',
		},
		customContent: {
			required: false,
			type: Boolean,
			default: false,
		},
		loading: {
			required: false,
			type: Boolean,
			default: false,
		},
	},

	emits: [
		'update:modelValue',
		'close',
	],

	data() {
		return {
			shaking: false,
		}
	},

	methods: {
		closeDialog() {
			this.$emit('update:modelValue', false);
			this.$emit('close');
		},
		shakeDialog() {
			this.shaking = true;
			setTimeout(() => {
				this.shaking = false;
			}, 400);
		}
	}
}