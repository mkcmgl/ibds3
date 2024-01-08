export default {

    emits: [
        'submit',
    ],

    data() {
        return {
            columns: {},
        }
    },

    provide () {
        return {
            registerColumn: this.registerColumn,
            unregisterColumn: this.unregisterColumn,
        }
    },

    methods: {
        
        registerColumn (vm) {
            this.columns[vm.id] = vm;
        },
        unregisterColumn (vm) {
            delete this.columns[vm.id];
        },

        refresh () {
            Object.values(this.columns)
                .forEach(vm => vm.refresh());
        },
        submit (e) {
            this.$nextTick(() => {
                if (!this.validate()) {
                    this.$emit('submit', e);
                }
            });
        },

        validate() {
            let hasError = false;

            Object.values(this.columns)
                .forEach(vm => {
                    hasError = !!vm.validateManually() || hasError;
                });
            
            return hasError;
        }
    }
}