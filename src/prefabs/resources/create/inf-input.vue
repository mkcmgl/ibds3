<template>
    <div
        class="my-6 p-6 bg-white rounded">

        <div
            class="flex items-center justify-between mb-4">
            <h3
                class="font-bold text-lg">
                数据项信息
            </h3>
            <i-button
                class="px-2 text-sm"
                @click="show = true"
                type="button">
                添加数据项
            </i-button>
        </div>

        <i-dialog
            v-model="show"
            prevent>
            
            <template
                #title>
                添加数据项
            </template>

            <i-form
                ref="formComponent"
                @submit.prevent="addInf">

                <div
                    class="flex mt-4">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        字段名称
                    </p>
                    <i-input
                        class="w-[calc(100%-16rem)]"
                        v-model="form.columnName"
                        v-model:error="error.columnName"
                        placeholder="请输入字段名称"
                        attr="字段名称"
                        name="columnName"
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
                        字段描述
                    </p>
                    <i-input
                        class="w-[calc(100%-16rem)]"
                        v-model="form.columnDescription"
                        v-model:error="error.columnDescription"
                        placeholder="请输入字段描述"
                        attr="字段描述"
                        name="columnDescription"
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
                        字段类型
                    </p>
                    <i-select
                        class="w-[calc(100%-16rem)]"
                        v-model="form.columnType"
                        v-model:error="error.columnType"
                        placeholder="请选择字段类型"
                        attr="字段类型"
                        name="columnType"
                        :rules="[
                            'required',
                        ]">
                        <option
                            v-for="t in ['char', 'varchar', 'blob', 'text', 'int', 'float', 'double', 'decimal', 'datetime', 'timestamp']"
                            :key="t"
                            :value="t">
                            {{ t }}
                        </option>
                    </i-select>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        字段长度
                    </p>
                    <i-input
                        class="w-[calc(100%-16rem)]"
                        v-model="form.columnLength"
                        v-model:error="error.columnLength"
                        placeholder="请输入字段长度"
                        attr="字段长度"
                        name="columnLength"
                        :rules="[
                            'required',
                            'number',
                            'max:11',
                            'min:1'
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        是否为空
                    </p>
                    <i-checkbox
                        :reset-value="false"
                        name="is-null"
                        v-model="form.isNull">
                        可空
                    </i-checkbox>
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
                        class="w-32"
                        :loading="loading">
                        添加数据项
                    </i-button>

                </footer>
                

            </i-form>
        </i-dialog>

        

        <table
            class="i-table">
            <thead>
                <tr>
                    <th>
                        字段名称
                    </th>
                    <th>
                        字段描述
                    </th>
                    <th>
                        字段类型
                    </th>
                    <th>
                        字段长度
                    </th>
                    <th>
                        是否为空
                    </th>
                    <th>
                        操作
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(inf, index) in computedValue"
                    :key="inf.columnName + '-' + index">
                    <td>
                        {{ inf.columnName }}
                    </td>
                    <td>
                        {{ inf.columnDescription }}
                    </td>
                    <td>
                        {{ inf.columnType }}
                    </td>
                    <td>
                        {{ inf.columnLength }}
                    </td>
                    <td>
                        {{ inf.isNull === 1 ? '可空' : '不可空' }}
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
                        暂无数据项
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
    columnName: '',
    columnDescription: '',
    columnType: '',
    columnLength: '',
    isNull: false,
});
const error = ref({
    columnName: '',
    columnDescription: '',
    columnType: '',
    columnLength: '',
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

    let newValue = cloneDeep(form.value);

    newValue.isNull = newValue.isNull ? 1 : 0;

    computedValue.value = cloneDeep([newValue, ...computedValue.value]);
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
        columnName: '',
        columnDescription: '',
        columnType: '',
        columnLength: '',
        isNull: false,
    };
};

const close = () => {
    show.value = false;
    refreshForm();
};

</script>