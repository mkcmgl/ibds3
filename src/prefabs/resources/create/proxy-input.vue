<template>
    <div
        class="my-6 p-6 bg-white rounded">

        <div
            class="flex items-center justify-between mb-4">
            <h3
                class="font-bold text-lg">
                服务接口信息
            </h3>
            <i-button
                class="px-2 text-sm"
                @click="show = true"
                type="button">
                添加服务接口信息
            </i-button>
        </div>

        <i-dialog
            v-model="show"
            prevent>
            
            <template
                #title>
                添加服务接口信息
            </template>

            <i-form
                ref="formComponent"
                @submit.prevent="addInf">

                <div
                    class="flex mt-4">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        接口名称
                    </p>
                    <i-input
                        class="w-[calc(100%-16rem)]"
                        v-model="form.interfaceName"
                        v-model:error="error.interfaceName"
                        placeholder="请输入接口名称"
                        attr="接口名称"
                        name="interfaceName"
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
                        接口地址
                    </p>
                    <i-input
                        class="w-[calc(100%-16rem)]"
                        v-model="form.address"
                        v-model:error="error.address"
                        placeholder="请输入接口地址"
                        attr="接口地址"
                        name="address"
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
                        添加服务接口信息
                    </i-button>

                </footer>
                

            </i-form>
        </i-dialog>

        

        <table
            class="i-table">
            <thead>
                <tr>
                    <th>
                        接口名称
                    </th>
                    <th>
                        接口地址
                    </th>
                    <th>
                        操作
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(inf, index) in computedValue"
                    :key="inf.interfaceName + '-' + index">
                    <td>
                        {{ inf.interfaceName }}
                    </td>
                    <td>
                        {{ inf.address }}
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
                        暂无服务接口信息
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
import ISelect from '~ui/components/select/component.vue';
import IButton from '~ui/components/button/component.vue';
import ICheckbox from '~ui/components/checkbox/component.vue';
import { cloneDeep } from 'lodash';

import { computed, ref } from 'vue';

const loading = ref(false);

const show = ref(false);
const form = ref({
    interfaceName: '',
    address: '',
});
const error = ref({
    interfaceName: '',
    address: '',
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
        interfaceName: '',
        address: '',
    };
};

const close = () => {
    show.value = false;
    refreshForm();
};

</script>