import attributes from '~ui/mixins/attributes.js';

export default {

    mixins: [ attributes ],

    props: {
        modelValue: {
            required: true,
        },
    },

    emits: [
        'update:modelValue'
    ],

    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        },
        hasPlaceholder () {
            return !!this.$slots.default;
        }
    },
}