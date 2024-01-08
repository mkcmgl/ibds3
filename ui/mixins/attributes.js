import { pick, omit } from 'lodash';

export default {

    inheritAttrs: false,

    data() {
        return {
            _wrapperAttrs: ['class', 'style', 'id'],
        }
    },

    computed: {
        wrapperAttrs() {
            return pick(this.$attrs, this._wrapperAttrs);
        },
        exceptWrapperAttrs() {
            return omit(this.$attrs, this._wrapperAttrs);
        },
    }
}