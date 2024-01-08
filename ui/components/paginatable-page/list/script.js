export default {

	props: {

		attrsCount: {
			required: false,
			type: Number,
			default: 1,
		},

		list: {
			required: true,
			type: Array,
		},

		loading: {
			required: false,
			default: true,
		}
	},
}