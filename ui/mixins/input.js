import uuid from '~ui/utils/uuid.js';
import validate from '~ui/utils/validate.js';
import attributes from './attributes.js';

export default {
    
    inheritAttrs: false,

    mixins: [
        attributes,
    ],

    data() {
        return {
            id: uuid(),
        }
    },

    props: {

        modelValue : {
            required: true,
        },

        rules: {
            type: Array,
            default: () => [],
            required: false,
        },
        
        error: {
            type: String,
            default: '',
            required: false,
        },

        tip: {
            type: String,
            default: '',
            required: false,
        },

        attr: {
            type: String,
            default: '',
            required: false,
        },

        messages: {
            type: Object,
            default: () => {},
            required: false,
        },

        // 不在 form 中注册
        preventDefault: {
            type: Boolean,
            default: false,
            required: false,
        },

        resetValue: {
            required: false,
        },

        trigger: {
			required: false,
			type: [String, Array],
			default: 'blur',
			validator: value => {
				value = Array.isArray(value) ? value : [value];
				return value.every(trigger => ['input', 'change', 'blur'].includes(trigger));
			}
		},
        
    },


    emits: [
        'update:modelValue',
        'update:error',
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

        hasError() {
            return this.error !== '';
        },
        hasTip () {
            return this.tip !== '';
        },

        computedTrigger() {
			let trigger = Array.isArray(this.trigger) ?
				this.trigger :
				[this.trigger],
				result = {};

			trigger.forEach(tr => {
				result[tr] = this.validate;
			});

			return result;
		},
    },

    inject: {
        registerColumn: {
            default: () => () => {},
        },
        unregisterColumn: {
            default: () => () => {},
        },
    },

    methods: {

        validate($event) {

            let error = validate(
                $event.target.value || this.value,
                this.rules,
                this.messages
            );

            if (error !== null) {
                this.$emit(
                    'update:error',
                    (error ?? '').replace(':attr', this.attr || this.placeholder)    
                );
            }
            else {
                this.clearError();
            }

            return error;
        },

        validateManually() {
            return this.validate({
                target: {
                    value: this.value,
                }
            });
        },

        clearError() {
            this.$emit('update:error', '');
        },

        clearValue() {
            this.value = this.resetValue ?? '';
        },

        refresh() {
            this.clearError();
            this.clearValue();
        },

    },

    mounted() {
        if (!this.preventDefault) {
            this.registerColumn(this);
        }
    },

    beforeUnmount() {
        if (!this.preventDefault) {
            this.unregisterColumn(this);
        }
    },
}