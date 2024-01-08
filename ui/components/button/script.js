export default {

    props: {
        loading: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        tag: {
            type: String,
            required: false,
            default: 'button',
        },
        outline: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        computedDisabled() {
            return this.disabled || this.loading;
        }
    }
}