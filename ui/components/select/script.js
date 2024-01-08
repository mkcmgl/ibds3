import input from '~ui/mixins/input.js';

export default {

    mixins: [
        input,
    ],
    
    props: {
		hideClearer: {
			required: false,
			type: Boolean,
			default: false,
		},
		disabled: {
			required: false,
			type: Boolean,
			default: false,
		},
		placeholder: {
			required: false,
			type: String,
			default: '',
		},
		forceInvalidStyle: {
			required: false,
			type: Boolean,
			default: false,
		}
	},

	computed: {
		hasPlaceholder() {
            return this.placeholder !== '';
        },
		hasError() {
			return this.error !== '' || this.forceInvalidStyle;
		}
	}
}