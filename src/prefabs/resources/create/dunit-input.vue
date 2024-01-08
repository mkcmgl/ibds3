<template>
    <div
        class="my-6 p-6 bg-white rounded">

        <div
            class="flex items-center justify-between mb-4">
            <h3
                class="font-bold text-lg">
                资源分组信息
            </h3>
            <i-button
                class="px-2 text-sm"
                @click="show = true"
                type="button">
                添加资源分组信息
            </i-button>
        </div>

        <i-dialog
            v-model="show"
            prevent>
            
            <template
                #title>
                添加资源分组信息
            </template>

            <i-form
                ref="formComponent"
                @submit.prevent="addInf">

                <div
                    class="flex mt-4">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        资源分组ID
                    </p>
                    <i-input
                        class="w-[calc(100%-16rem)]"
                        v-model="form.unitId"
                        v-model:error="error.unitId"
                        placeholder="请输入资源分组ID"
                        attr="资源分组ID"
                        name="unitId"
                        :rules="[
                            'required',
                            'no-emoji',
                            'max:64',
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        资源分组描述
                    </p>
                    <i-input
                        class="w-[calc(100%-16rem)]"
                        v-model="form.unitDesc"
                        v-model:error="error.unitDesc"
                        placeholder="请输入资源分组描述"
                        attr="资源分组描述"
                        name="unitDesc"
                        :rules="[
                            'required',
                            'no-emoji',
                            'max:64',
                        ]"/>
                </div>


                <footer
                    class="flex items-center justify-between px-8 py-4">

                    <button
                        class="border-slate-200 border-2 block h-[calc(theme('space.10')+2px)] rounded overflow-hidden transition tracking-widest scale-100 active:scale-[99%] hover:scale-[101%] w-32"
                        type="button"
                        v-wave
                        @click="close">
                        取消
                    </button>

                    <i-button
                        class="px-2"
                        :loading="loading">
                        添加资源分组信息
                    </i-button>

                </footer>
                

            </i-form>
        </i-dialog>

        

        <table
            class="i-table">
            <thead>
                <tr>
                    <th>
                        资源分组ID
                    </th>
                    <th>
                        资源分组描述
                    </th>
                    <th>
                        操作
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(inf, index) in computedValue"
                    :key="inf.unitId + '-' + index">
                    <td>
                        {{ inf.unitId }}
                    </td>
                    <td>
                        {{ inf.unitDesc }}
                    </td>
                    <td>
                        <button
                            class="text-red-600 text-sm"
                            type="button"
                            @click="deleteInf(index)">
                            删除
                        </button>  
                    </td>
                </tr>
                <tr
                    v-if="computedValue.length === 0">
                    <td
                        class="p-6 text-center text-slate-600"
                        colspan="6">
                        暂无资源分组信息
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup>

import IDialog from '~ui/components/dialog/component.vue';
import IForm from '~ui/components/form/component.vue';
import IInput from '~ui/components/input/component.vue';
import IButton from '~ui/components/button/component.vue';
import { cloneDeep } from 'lodash';

import { computed, ref } from 'vue';

const loading = ref(false);

const show = ref(false);
const form = ref({
    unitId: '',
    unitDesc: '',
});
const error = ref({
    unitId: '',
    unitDesc: '',
});

const props = defineProps({
    modelValue: {
        required: true,
        type: Array,
    }
});

const emits = defineEmits([
    'update:modelValue',
]);

const computedValue = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', value);
    }
});

const addInf = () => {
    computedValue.value = cloneDeep([form.value, ...computedValue.value]);
    show.value = false;
    refreshForm();
};

const deleteInf = (index) => {
    let pervious = computedValue.value;
    pervious = pervious.filter((_, i) => i !== index);
    computedValue.value = cloneDeep(pervious);
}

const formComponent = ref(null);

const refreshForm = () => {
    formComponent.value.refresh();
    form.value = {
        unitId: '',
        unitDesc: '',
    };
};

const close = () => {
    show.value = false;
    refreshForm();
};

</script>