<template>

    <i-dialog
        v-model="show"
        width="1000px">

        <template
            #title>
            <div
                class="flex items-center justify-between">
                <p
                    class="relative w-full">
                    区块链信息-留痕记录
                    <small
                        class="text-slate-500">
                        （点击左侧时间轴，查看记录）
                    </small>
                </p>
                <p
                    class="text-base font-normal whitespace-nowrap">
                    溯源ID：{{ relation.traceId }}
                </p>
            </div>
        </template>

        <detail-content
            :relation="relation"/>
            
    </i-dialog>

</template>

<script setup>
import IDialog from '~ui/components/dialog/component.vue';
import DetailContent from './detail-content.vue';
</script>

<script>

export default {

    props: {
        modelValue: {
            required: true,
            type: Boolean
        },
        relation: {
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

                if (value && !this.loaded) {
                    this.loadDetails();
                }

                this.$emit('update:modelValue', value);
            } 
        },
    }
}
</script>