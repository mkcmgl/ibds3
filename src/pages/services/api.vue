<template>
    <h1
        class="my-6 text-xl font-semibold">
        封装 API
    </h1>

    <i-form
        ref="apiForm"
        class="p-6 bg-white rounded my-6 flex items-top justify-between"
        @submit="">

        <div
            class="grid grid-cols-5 gap-2 w-[calc(100%-240px)]">

            <div
                class="flex -mb-6 col-span-2">

                <p
                    class="leading-[3rem] w-[100px]">
                    接口组
                </p>

                <p
                    class="w-[calc(100%-100px)]">
                    <i-select
                        v-model="apiForm.group"
                        v-model:error="apiFormError.group"
                        placeholder="请选择接口组"
                        :rules="[
                            'required'
                        ]">
                        <option
                            v-for="{value, label} in apiGroupOptions"
                            :value="value">
                            {{ label }}
                        </option>
                    </i-select>
                </p>

            </div>

            <div
                class="flex -mb-6 col-span-2">

                <p
                    class="leading-[3rem] w-[100px]">
                    接口名称
                </p>

                <p
                    class="w-[calc(100%-100px)]">
                    <i-select
                        v-model="apiForm.name"
                        v-model:error="apiFormError.name"
                        placeholder="请选择接口名称"
                        :rules="[
                            'required'
                        ]">
                        <option
                            v-for="{apiInfId, apiInfName} in apiNameOptions"
                            :value="apiInfId">
                            {{ apiInfName }}
                        </option>
                    </i-select>
                </p>

            </div>

        </div>

        <footer
            class="w-[240px] flex justify-end -mx-2">
            <i-button
                class="w-[6.5rem] mx-2"
                type="button"
                outline
                @click="$refs.apiForm.refresh()">
                <reset-icon/>
                重置
            </i-button>
        </footer>

    </i-form>

    <div
        class="p-6 bg-white rounded my-6"
        v-if="Object.keys(apiInfo).length">
        <h2
            class="mb-4 font-bold">
            接口信息
        </h2>
        <highlightjs
            class="text-sm break-all rounded overflow-hidden"
            language="json"
            :code="apiInfoString"/>
    </div>

    <i-form
        class="p-6 bg-white rounded my-6"
        ref="form"
        @submit.prevent="sendRequest">

        <div
            class="flex items-start relative">

            <div
                class="w-[calc(50%-100px)]">

                <h2
                    class="mb-4 font-bold">
                    参数列表
                </h2>

                <i-textarea
                    v-model="form.formData"
                    v-model:error="error.formData"
                    attr="参数列表"
                    placeholder="请输入参数列表"
                    :max="-1"
                    :rules="[
                        'required',
                        'json',
                    ]"
                    reset-value="{}"/>

            </div>

            <div
                class="w-[200px]">
                <div
                    class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <i-button
                        class="w-[6.5rem] my-2 mx-auto"
                        type="submit"
                        :loading="loading">
                        发送请求
                    </i-button>
                    <i-button
                        class="w-[6.5rem] my-2 mx-auto"
                        type="button"
                        outline
                        @click="refresh">
                        <reset-icon/>
                        重置
                    </i-button>
                </div>
            </div>

            <div
                class="w-[calc(50%-100px)]">

                <h2
                    class="mb-4 font-bold">
                    接口返回
                </h2>

                <highlightjs
                    class="border-[2px] border-slate-200 min-h-[150px] p-2 w-full rounded outline-none bg-transparent py-2 block"
                    language="json"
                    :code="result"/>

            </div>
        </div>

        <h2
            class="my-4 font-bold">
            请求示例代码
        </h2>

        <highlightjs
            class="text-sm break-all rounded overflow-hidden"
            language="js"
            :code="`
var myHeaders = new Headers();
myHeaders.append('Authorization', 'Bearer ${token}');
myHeaders.append('Content-Type', 'application/json');

var raw = JSON.stringify(${form.formData});

var requestOptions = {
    headers: myHeaders,
    body: raw
};

fetch('${API_BASE}${apiInfo?.apiInfName ?? ''}', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
            `"/>


    </i-form>

</template>

<script setup>
import IForm from '~ui/components/form/component.vue';
import ITextarea from '~ui/components/textarea/component.vue';
import IButton from '~ui/components/button/component.vue';
import ISelect from '~ui/components/select/component.vue';
import ResetIcon from '~ui/components/paginatable-page/filter/reset-icon.vue';

const API_BASE = import.meta.env.VITE_API_BASE;
</script>

<script>

import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import { useAuth } from '~/store/auth.js';
import axios from '~/plugins/axios.js';

export default {

    metaInfo() {
		return {
			title: '封装 API',
		}
	},

    components: {
		highlightjs: hljsVuePlugin.component,
	},

    data() {
        return {

            loading: false,

            apiGroupOptions: [],
            apiNameOptions: [],
            apiForm: {
                group: '',
                name: '',
            },
            apiFormError: {
                group: '',
                name: '',
            },
            apiInfo: {},

            form: {
                formData: '{}'
            },
            error: {
                formData: ''
            },
            result: '',
        }
    },

    watch: {
        'apiForm.group'(value) {
            this.apiForm.name = '';

            if(value) {
                axios.get(`debugger/getApiInfList?apiGroupId=${value}`)
                    .then(({ data }) => {
                        this.apiNameOptions = data.data;
                    });
            }
            else {
                this.apiNameOptions = [];
            }
        },
        'apiForm.name'(value) {
            if(value) {
                axios.get(`/debugger/getApiInfo/${value}`)
                    .then(({ data }) => {
                        this.apiInfo = data.data;
                        if (data.data.apiParams) {
                            this.form.formData = JSON.stringify(data.data.apiParams, null, 4);
                        }
                    });
            }
            else {
                this.apiInfo = '';
            }
        }
    },

    computed: {
        apiInfoString() {
            return JSON.stringify(this.apiInfo, null, 4);
        },
        token() {
            return useAuth().token;
        },
    },

    async beforeMount() {
        let { data } = await axios.get('debugger/getApiGroupList');

        this.apiGroupOptions = data.data.map(({apiGroupId, apiGroupName}) => ({
            label: apiGroupName,
            value: apiGroupId,
        }));
    },

    methods: {
        sendRequest() {
            if(!this.$refs.apiForm.validate()) {
                axios[this.apiInfo.requestMethod.toLowerCase()](
                        this.apiInfo.apiInfName,
                        JSON.parse(this.form.formData)
                    )
                    .then(({ data }) => {
                        this.result = JSON.stringify(data, null, 4);
                    })
                    .catch(error => {
                        this.result = JSON.stringify(error, null, 4);
                    });
            }
        },
        refresh() {
            this.$refs.form.refresh();
            this.$refs.apiForm.refresh();
            this.result = '';
        }
    }
}
</script>