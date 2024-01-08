import lodash from 'lodash';

export default {
    computed: {
        $attrsWithoutClassStyleId() {
			return lodash.omit(this.$attrs, ['class', 'style', 'id']);
		},
		$attrsClassStyleIdOnly() {
			return lodash.pick(this.$attrs, ['class', 'style', 'id']);
		},
    }
}