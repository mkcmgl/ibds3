import input from '~ui/mixins/input.js';

export default {

    mixins: [
        input
    ],

    props: {
        type: {
            type: String,
            default: 'text',
            required: false,
        },
    },

    data () {
        return {
            showPassword: false,
        }
    },

    computed: {
        computedType() {
            if (this.type === 'password' && this.showPassword) {
                return 'text';
            }
            return this.type;
        },
        hasPrefix() {
            return this.$slots.prefix;
        },
    }
}