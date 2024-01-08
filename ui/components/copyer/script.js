import { notify } from "@kyvg/vue3-notification";

export default {

	props: {
		content: {
			required: true,
			type: String,
		},
		tag: {
			required: false,
			type: String,
			default: 'i-button',
		},
		icon: {
			required: false,
			type: Boolean,
			default: false,
		},
	},

	computed: {
		type() {
			return this.tag === 'i-button' ? 'button' : null;
		}
	},

	methods: {
		writeToClipboard() {

			let input = document.createElement('textarea');
			input.value = this.content;
			document.body.appendChild(input);
			input.select();
			let result = document.execCommand('copy');
			document.body.removeChild(input);

			notify({
				type: 'green',
				text: '已复制到剪切板',
				data: {
					icon: 'check'
				}
			}); 
		    
		},
	},
}