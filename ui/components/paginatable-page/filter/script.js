import { omit, pick, isEqual } from 'lodash';

const objectEmptyAttrFilter = obj => {
	
    let result = {};

	Object.keys(obj).forEach(attr => {
		if (!!obj[attr]) {
			result[attr] = obj[attr];
		}
	});

	return result;
}

export default {

	props: {
		filters: {
			required: true,
		},
	},

	data() {
		let form = {},
            error = {},
            emptyForm = {};

		Object.keys(this.filters).forEach(key => {
			form[key] = this.$route.query[key] ?? '';
			error[key] = '';
			emptyForm[key] = '';
		});
        
		return {
			form,
			error,
			emptyForm,
			objectEmptyAttrFilter,
		}
	},

	computed: {
		queryInUrl() {
			return {
				...this.emptyForm,
				...omit(this.$route.query, ['pageSize', 'pageNum'])
			}
		},
		isFormEqualToQueryInUrl() {
			return isEqual(
				this.queryInUrl,
				this.form
			);
		},
	},

	watch: {
		queryInUrl(value) {
			if (
				!isEqual(this.form, value)
			) {
				this.form = value;
			}
		}
	},

	inject: {
		loading: {
			default: false
		}
	},

	methods: {
		refreshFilter() {
			this.$refs.form.refresh();
			this.updateFilter(true);
		},
		allowInputAttrs(attrs) {
			return omit(attrs, ['modelValue', 'error', 'options']);
		},
		updateFilter(force = false) {
			if (!this.isFormEqualToQueryInUrl || force) {
				
				let query = objectEmptyAttrFilter(this.form);

				this.$router.push({
					...pick(
						this.$route,
						['name', 'params']
					),
					query,
				});
			}
		}
	}
}