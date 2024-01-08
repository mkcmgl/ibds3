export default {

	methods: {
		translateVerification(col, value) {
			value = (value || '').toString();
			if (col == 'status') {
				switch (value) {
					case '0':
						return '未审核';
					case '1':
						return '待审核';
					case '2':
						return '审核通过';
					case '3':
						return '审核拒绝';
					case '4':
						return '实名认证处理中';
				}
			}
			else if (col === 'type') {
				switch (value) {
					case '2':
						return '企业';
					case '1':
						return '个人';
				}
			}
		}
	}
}