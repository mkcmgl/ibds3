<template>
    <i-dialog v-model="show" width="1000px">

        <template #title>
            交易详情
        </template>

        <hash-content :hash="hash" />

    </i-dialog>
</template>

<script setup>
import IDialog from '~ui/components/dialog/component.vue';
import HashContent from './dataStorage-content.vue';
</script>

<script>
export default {

    props: {
        modelValue: {
            required: true,
            type: Boolean
        },
        hash: {
            required: true,
        }
    },

    emits: [
        'update:modelValue',
    ],

    computed: {
        show: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    }
}
</script>