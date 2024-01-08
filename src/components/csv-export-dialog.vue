<template>

    <i-dialog
        v-model="show"
        prevent
        :loading="loading">

        <template
            #title>
            导出 CSV
        </template>

        <template
            #default="{close}">
            <i-form
                ref="form"
                class="p-6"
                @submit="exportCSV">

                <div
					v-for="(filter, key) in filters"
                    class="flex">

                    <p
                        class="w-36 leading-[3rem] text-right mr-4"
                        v-html="filter?.label ?? filter"/>

                    <p
                        class="relative w-[calc(100%-6rem)]">

                        <template
                            v-if="key === 'startTxTime' || key === 'endTxTime'">
                            <i-input
                                v-if="key === 'startTxTime'"
                                type="date"
                                attr="交易开始日期"
                                placeholder="请输入交易开始日期"
                                v-model="form[key]"
                                v-model:error="error[key]"
                                :rules="[
                                    'required',
                                    'date',
                                ]"/>
                            <i-input
                                v-else
                                type="date"
                                attr="交易结束日期"
                                placeholder="请输入交易结束日期"
                                v-model="form[key]"
                                v-model:error="error[key]"
                                :rules="[
                                    'required',
                                    'date',
                                    function () {
                                        if (form.startTxTime && form.endTxTime) {
                                            if (form.startTxTime && form.endTxTime) {
                                                if ((new Date(form.startTxTime).getTime()) > (new Date(form.endTxTime).getTime())) {
                                                    return '不能早于交易结束日期'
                                                }
                                                if (
                                                    form.startTxTime.split('-')[0] !== form.endTxTime.split('-')[0] ||
                                                    form.startTxTime.split('-')[1] !== form.endTxTime.split('-')[1]
                                                ) {
                                                    return '与交易开始日期必须在同一月份';
                                                }
                                            }
                                        }
                                    }
                                ]"/>
                        </template>
                        <template
                            v-else-if="typeof filter === 'string'">
                            <i-input
                                :attr="filter"
                                :placeholder="`请输入${filter}`"
                                v-model="form[key]"
                                v-model:error="error[key]"
                                :rules="[
                                    'no-emoji'
                                ]"/>
                        </template>
                        <template
                            v-else>
                            <i-select
                                v-if="Object.keys(filter).includes('options')"
                                v-model="form[key]"
                                v-model:error="error[key]"
                                v-bind="allowInputAttrs(filter.input)">
                                <option
                                    v-for="{label, value} in filter.options"
                                    :value="value">
                                    {{ label }}
                                </option>
                            </i-select>
                            <i-input
                                v-else
                                v-model="form[key]"
                                v-model:error="error[key]"
                                v-bind="allowInputAttrs(filter.input)"/>
                        </template>
                    </p>

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
                        确定导出
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
import ISelect from '~ui/components/select/component.vue';
</script>

<script>
import { omit } from 'lodash';
import { useAuth } from '~/store/auth.js';
import save from '~ui/utils/save.js';
import axios from '~/plugins/axios.js';
import { notify } from '@kyvg/vue3-notification';

export default {

    props: {
        modelValue: {
            required: true,
            type: Boolean
        },
        filters: {
            required: true,
            type: Object
        },
        api: {
            required: true,
            type: String
        },
        fileName: {
            required: true,
            type: String
        }
    },

    emits: [
        'update:modelValue',
    ],

    data() {

        let form = {},
            error = {};

		Object.keys(this.filters).forEach(key => {
			form[key] = this.$route.query[key] ?? '';
			error[key] = '';
		});

        return {
            form,
			error,
            loading: false
        }
    },

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
        },
    },

    methods: {
        allowInputAttrs(attrs) {
			return omit(attrs, ['modelValue', 'error', 'options']);
		},
        exportCSV () {

            

            this.loading = true;
            axios.post(
                    this.api,
                    this.form,
                    {
                        headers: {
                            Authorization: `Bearer ${useAuth().token}`
                        },
                        responseType: 'blob'
                    }
                )
                .then(async ({ data }) => {

                    if (data.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                        save(data, `${this.fileName}.csv`);

                        this.show = false;
                    } else {

                        data = JSON.parse(await data.text());

                        notify({
                            text: data.msg,
                            type: 'red',
                        });
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>