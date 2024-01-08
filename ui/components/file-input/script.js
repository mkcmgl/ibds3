import input from '~ui/mixins/input.js';

export default {

    mixins: [
        input
    ],

    computed: {
        hasPrefix() {
            return this.$slots.prefix;
        },
    }
}