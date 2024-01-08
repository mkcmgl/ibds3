import { isEqual } from 'lodash';
import axios from '~/plugins/axios.js';

export default {

    props: {
        api: {
            required: true,
            type: String,
        },
        filters: {
            required: false,
            type: Object,
        },
        thead: {
			required: false,
			type: Array,
		},
		handleResponseDataManually: {
			required: false,
			type: Function,
			default: (raw) => {
				// { total: 123, rows: [] }
				return raw;
			}
		},
		disabledPaginator: {
			required: false,
			type: Boolean,
			default: false,
		}
    },

    data() {
		return {
			loading: false,
			data: {
				total: 0,
				rows: []
			},
		}
	},

	computed: {
		attrsCount() {
			if (!this.thead && !this.$slots['thead']) {
				return 0;
			}
			else {
				return this.thead
					? this.thead.length
					: this.$slots['thead']()[0]['children'].length;
			}
		},
	},

	watch: {
		$route(value, old) {
			if (
				value.name === old.name &&
				!isEqual(value.query, old.query)
			) {
				this.getData();
			}
		}
	},

	mounted() {
		this.getData();
	},

	methods: {
		getData() {

			this.loading = true;

			axios.get(
					this.api,
					{
						params:  {
							...{
								pageNum: this.$route.query.pageNum ?? 1,
								pageSize: 10,
							},
							...this.$route.query,
						},
					}
				)
				.then(({ data }) => {
					this.data = this.handleResponseDataManually(data);
				})
				.finally(() => {
					this.loading = false;
				});
		},
		refresh() {
			this.getData();
		}
	}
}