<template>

    <i-dialog
        v-model="show"
        prevent
        :loading="loading">

        <template
            #title>
            新增子目录
        </template>

        <template
            v-slot="{ close }"
            #default>
        
            <i-form
                @submit="handleSubmit"
                ref="form"
                class="p-6">


                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        目录名称
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.catalogName"
                        v-model:error="error.catalogName"
                        placeholder="请输入目录名称"
                        attr="目录名称"
                        name="catalogName"
                        :rules="[
                            'required',
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        目录序号
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.catalogOrder"
                        v-model:error="error.catalogOrder"
                        placeholder="请输入目录序号"
                        attr="目录序号"
                        name="catalogOrder"
                        :rules="[
                            'required',
                            'number',
                            'max:100000',
                            'min:1'
                        ]"/>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        目录类型
                    </p>
                    <i-select
                        class="w-[calc(100%-8rem)]"
                        v-model="form.catalogType"
                        v-model:error="error.catalogType"
                        placeholder="请选择目录类型"
                        attr="目录类型"
                        name="catalogType"
                        :rules="[
                            'required',
                        ]">
                        <option
                            v-for="id in [1, 2]"
                            :key="id"
                            :value="id">
                            {{ id === 1 ? '中间' : '资源' }}目录
                        </option>
                    </i-select>
                </div>

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        目录描述
                    </p>
                    <i-textarea
                        class="w-[calc(100%-8rem)]"
                        v-model="form.catalogDescription"
                        v-model:error="error.catalogDescription"
                        placeholder="请输入目录描述"
                        attr="目录描述"
                        name="catalogDescription"
                        :max="100"
                        :rules="[
                            'max:100'
                        ]"/>
                </div>

                <footer
                    class="flex items-center justify-between">

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
                        确定
                    </i-button>
                </footer>

            </i-form>
        </template>

    </i-dialog>

</template>

<script setup>
import IDialog from '~ui/components/dialog/component.vue';
import IForm from '~ui/components/form/component.vue';
import IInput from '~ui/components/input/component.vue';
import IButton from '~ui/components/button/component.vue';
import ITextarea from '~ui/components/textarea/component.vue';
import ISelect from '~ui/components/select/component.vue';
</script>

<script>

import { notify } from '@kyvg/vue3-notification';
import axios from '~/plugins/axios.js';

export default {

    props: {
        modelValue: {
            required: true,
            type: Boolean
        },
        catalog: {
            required: true,
            type: Object
        }
    },

    emits: [
        'update:modelValue',
        'refresh'
    ],

    computed: {
        show: {
            get() {
                return this.modelValue;
            },
            set(value) {

                if (!value) {
                    this.$refs.form.refresh();
                }

                this.$emit('update:modelValue', value);
            } 
        }
    },

    data () {
        return {

            loading: false,

            form: {
                catalogName: '',
                catalogOrder: '',
                catalogDescription: '',
                catalogType: '',
            },
            error: {
                catalogName: '',
                catalogOrder: '',
                catalogDescription: '',
                catalogType: '',
            }
        }
    },

    methods: {
        handleSubmit() {
            this.loading = true;
            axios.post(
                    '/catalog/insertCatalog',
                    {
                        ...this.form,
                        pid: this.catalog.dataCatalogId,
                    }
                )
                .then(() => {
                    // notify({
                    //     text: '子目录添加成功',
                    //     type: 'success',
                    // });
                    this.$emit('refresh');
                    this.show = false;
                })
                .finally(() => {
                    this.loading = false;
                });                    
        }
    }
}
</script>