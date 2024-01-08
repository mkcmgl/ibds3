import attributes from '~ui/mixins/attributes.js';
import input from '~ui/mixins/input.js';

export default {

    mixins: [
        attributes,
        input,
    ],

    props: {
		max: {
			required: false,
			default: 100,
			type: Number,
		},
	},
}