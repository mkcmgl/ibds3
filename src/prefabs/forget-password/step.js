export default {

    props: {
        step: {
            type: Number,
            required: true,
        }
    },

    emits: [
        'update:modelValue'
    ],
}