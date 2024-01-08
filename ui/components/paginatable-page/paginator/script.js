import { pick } from 'lodash';

export default {

    props: {
		total: {
			required: true,
			type: Number,
		},
	},

	computed: {
		pageNum() {
			return Math.ceil(parseInt(this.$route.query.pageNum) || 1); 
		},
		pageSize() {
			return parseInt(this.$route.query.pageSize ?? 10); 
		},
		length() {
			return Math.ceil(parseInt(this.total) / this.pageSize) || 1;
		},
		pageIndexArray() {
			const result = [];
			for (let i = 1; i <= this.length; i++) {
				if (i < 4 || (this.length - i) < 3 || Math.abs(i - this.pageNum) < 2) {
					result.push(i);
				}
			}
			return result;
		},
	},

	methods: {
		changePageByInput() {
			this.changePage(this.$refs.pageNumInput.value);
		},
		getRouteFromPage(pageNum) {

			let query = {
				...this.$route.query
			};

			if (pageNum === 1) {
				delete query.pageNum;
			}
			else {
				query.pageNum = pageNum;
			}

			return {
				name: this.$route.name,
				params: this.$route.params,
				query: query
			};
		},
		changePage(pageNum) {

			let inputer = this.$refs.pageNumInput;

			if (
				inputer.value.trim().length === 0
			) {
				return false;
			}

			pageNum = parseInt(pageNum || 1);			

			if (isNaN(pageNum)) {
				pageNum = 1;
			}
			if (pageNum <= 0) {
				pageNum = 1;
			}
			if (pageNum > this.length) {
				pageNum = this.length;
			}

			this.$refs.pageNumInput.value = pageNum;

			let query = {
					...this.$route.query,
					pageNum: pageNum
				};

			if (pageNum === 1) {
				delete query.pageNum;
			}

			this.$router.push({
				...pick(this.$route, ['name', 'params']),
				query: query
			});
		},
	}
}