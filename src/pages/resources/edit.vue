<template>

    <i-form
        @submit="handleSubmit">

        <header
            class="flex items-center justify-between my-6">
            <div
                class="flex items-center">
                <router-link
                    class="h-10 w-10 text-center leading-10 bg-transparent hover:bg-slate-500/25 inline-block rounded"
                    :to="{
                        name: 'resources/show',
                        params: {
                            id: id
                        }
                    }">
                    <i
                        class="mdi mdi-arrow-left"></i>
                </router-link>
                <h1 class="text-xl font-semibold ml-4">
                    资源 ID: {{ id }}
                </h1>
            </div>
        </header>

        <div
            class="my-6 p-6 bg-white rounded">

            <h3
                class="font-bold mb-6 text-lg">
                基础信息
            </h3>
            
            <div
                class="flex">
                <p
                    class="w-32 leading-[3rem] text-right mr-4">
                    数据资源名称
                </p>
                <i-input
                    class="w-[calc(50%-8rem)]"
                    v-model="form.resourceParam.dataResourceName"
                    v-model:error="error.resourceParam.dataResourceName"
                    placeholder="请输入数据资源名称"
                    attr="数据资源名称"
                    name="dataResourceName"
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
                    所属目录
                </p>
                <catalog-input
                    class="w-[calc(50%-8rem)]"
                    v-model="form.resourceParam.dataCatalogId"
                    v-model:error="error.resourceParam.dataCatalogId"
                    placeholder="请输入所属目录"
                    attr="所属目录"
                    name="dataCatalogId"
                    :rules="[
                        'required',
                    ]"/>
            </div>

            <div
                class="flex">
                <p
                    class="w-32 leading-[3rem] text-right mr-4">
                    共享类型
                </p>
                <i-select
                    class="w-[calc(50%-8rem)]"
                    v-model="form.resourceParam.shareType"
                    v-model:error="error.resourceParam.shareType"
                    placeholder="请选择共享类型"
                    attr="共享类型"
                    name="shareType"
                    :rules="[
                        'required',
                    ]">
                    <option
                        v-for="id in [0, 1, 2]"
                        :key="id"
                        :value="id">
                        {{ enums['shareType'][id] }}
                    </option>
                </i-select>
            </div>

        </div>

        <div
            class="my-6 p-6 bg-white rounded">

            <h3
                class="font-bold mb-6 text-lg">
                资源表信息
            </h3>
            
            <div
                class="flex">
                <p
                    class="w-32 leading-[3rem] text-right mr-4">
                    数据源
                </p>
                <data-source-id-select
                    class="w-[calc(50%-8rem)]"
                    v-model="form.resourceParam.dataSourceId"
                    v-model:error="error.resourceParam.dataSourceId"
                    attr="数据源"
                    placeholder="请选择数据源"
                    :rules="[
                        'required',
                    ]"/>
            </div>

            <div
                class="flex">
                <p
                    class="w-32 leading-[3rem] text-right mr-4">
                    数据库表名称
                </p>
                <i-input
                    class="w-[calc(50%-8rem)]"
                    v-model="form.resourceParam.tableName"
                    v-model:error="error.resourceParam.tableName"
                    placeholder="请输入数据库表名称"
                    attr="数据库表名称"
                    name="tableName"
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
                    运营方ID数据项
                </p>
                <i-input
                    class="w-[calc(50%-8rem)]"
                    v-model="form.resourceParam.opIdItem"
                    v-model:error="error.resourceParam.opIdItem"
                    placeholder="请输入运营方ID数据项"
                    attr="运营方ID数据项"
                    name="opIdItem"
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
                    数据分组ID数据项
                </p>
                <i-input
                    class="w-[calc(50%-8rem)]"
                    v-model="form.resourceParam.groupIdItem"
                    v-model:error="error.resourceParam.groupIdItem"
                    placeholder="请输入数据分组ID数据项"
                    attr="数据分组ID数据项"
                    name="groupIdItem"
                    :rules="[
                        'required',
                        'no-emoji',
                        'max:64',
                    ]"/>
            </div>

            <div
                class="flex mb-4">
                <p
                    class="w-32 leading-[3rem] text-right mr-4">
                    是否隐私
                </p>
                <div
                    class="flex items-center">
                    <i-checkbox
                        name="is-private"
                        v-model="form.resourceParam.isPrivacy">
                        隐私
                    </i-checkbox>
                </div>
            </div>

            <div
                class="flex">
                <p
                    class="w-32 leading-[3rem] text-right mr-4">
                    个体ID数据项
                </p>
                <i-input
                    class="w-[calc(50%-8rem)]"
                    v-model="form.resourceParam.unitIdItem"
                    v-model:error="error.resourceParam.unitIdItem"
                    placeholder="请输入个体ID数据项"
                    attr="个体ID数据项"
                    name="unitIdItem"
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
                    数据ID数据项
                </p>
                <i-input
                    class="w-[calc(50%-8rem)]"
                    v-model="form.resourceParam.dataIdItem"
                    v-model:error="error.resourceParam.dataIdItem"
                    placeholder="请输入数据ID数据项"
                    attr="数据ID数据项"
                    name="dataIdItem"
                    :rules="[
                        'required',
                        'no-emoji',
                        'max:64',
                    ]"/>
            </div>

        </div>       

    </i-form>

    <inf-input
        v-model="form.infParams"/>

    <proxy-input
        v-model="form.proxyParams"/>

    <dunit-input
        v-model="form.dunitParams"/>

</template>

<script setup>

import IForm from '~ui/components/form/component.vue';
import IInput from '~ui/components/input/component.vue';
import ISelect from '~ui/components/select/component.vue';
import IButton from '~ui/components/button/component.vue';
import ICheckbox from '~ui/components/checkbox/component.vue';
import CatalogInput from '~/prefabs/resources/create/catalog-input.vue';
import enums from '~/enums.json';

import DataSourceIdSelect from '~/prefabs/resources/create/data-source-id-select.vue';

import InfInput from '~/prefabs/resources/create/inf-input.vue';
import ProxyInput from '~/prefabs/resources/create/proxy-input.vue';
import DunitInput from '~/prefabs/resources/create/dunit-input.vue';

import axios from '~/plugins/axios.js';
import { ref, onBeforeMount } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import { useRouter } from 'vue-router';
import { omit } from 'lodash'; 

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const form = ref({
    dataResourceId: props.id,
    
    resourceParam: {
        // 基本信息
        dataResourceName: '',
        dataCatalogId: '',
        shareType: '',
        // 资源表信息
        dataSourceId: '',
        tableName: '',
        opIdItem: '',
        groupIdItem: '',
        isPrivacy: false,
        unitIdItem: '',
        dataIdItem: '',

        isOpRight: '1',
    },

    infParams: [],
    proxyParams: [],
    opParams: [
        {
            baasUserId: '9',
            opId: '9',
            opDesc: 'desc'
        }
    ],
    dunitParams: [],
});

const error = ref({

    resourceParam: {
        dataResourceName: '',
        dataCatalogId: '',
        shareType: '',
        dataSourceId: '',
        tableName: '',
        opIdItem: '',
        groupIdItem: '',
        // isPrivacy: '',
        unitIdItem: '',
        dataIdItem: '',
    },

    infParams: [],
    proxyParams: [],
    opParams: [],
    dunitParams: [],
});


onBeforeMount(async () => {

    const { data: source } = await axios.get(`/dataResource/getInf/${props.id}`);
    const { data } = source;

    let { resourceParam } = data;

    resourceParam.isPrivacy = resourceParam.isPrivacy === '是';

    // "shareType": {
    //     "0": "不共享",
    //     "1": "无条件共享",
    //     "2": "有条件共享"
    // },
    console.log('resourceParam', resourceParam);

    
    form.value = {
        ...form.value,
        resourceParam: {
            // 基本信息
            dataResourceName: '',
            dataCatalogId: '',
            shareType: '',
            // 资源表信息
            dataSourceId: '',
            tableName: '',
            opIdItem: '',
            groupIdItem: '',
            isPrivacy: false,
            unitIdItem: '',
            dataIdItem: '',

            isOpRight: '1',
            // ...resourceInf
        },

        infParams: data.infParams,
        proxyParams: data.proxyParams.map(item => {
            return {
                ...omit(item, ['proxyAddress']),
                address: item.proxyAddress
            };
        }),
        opParams: data.opParams,
        dunitParams: data.dunitParams,
    };
});

const loading = ref(false);
const router = useRouter();

const handleSubmit = () => {
    loading.value = true;

    let formData = form.value;

    formData.resourceParam.isPrivacy = formData.resourceParam.isPrivacy ? '1' : '0';

    axios.post(
            '/dataResource/update',
            formData,
        )
        .then(() => {
            notify({
                type: 'success',
                text: '资源修改成功',
            });
            router.push({
                name: 'resources/show',
                params: {
                    id: props.id
                }
            });
        })
        .finally(() => {
            loading.value = false;
        });
};

</script>

<script>
export default {
    metaInfo: {
        title: '编辑资源'
    },
}
</script>