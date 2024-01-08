<template>
    
    <header
        v-if="Object.keys(tag).length"
        class="flex items-center justify-between my-6">
        <div
            class="flex items-center">
            <router-link
                class="h-10 w-10 text-center leading-10 bg-transparent hover:bg-slate-500/25 inline-block rounded"
                :to="fromPath">
                <i
                    class="mdi mdi-arrow-left"></i>
            </router-link>
            <h1 class="text-xl font-semibold ml-4">
                侧链标签详情
            </h1>
        </div>
        <div
            class="flex items-center -mx-2">
            <button
                class="block h-[calc(theme('space.10')+2px)] rounded overflow-hidden transition tracking-widest scale-100 active:scale-[99%] hover:scale-[101%] bg-red-500 text-white hover:bg-red-700 w-32 mx-2"
                @click="showDestroyDialog = true">
                删除
            </button>
            <router-link
                class="flex items-center justify-center h-[calc(theme('space.10')+2px)] rounded overflow-hidden transition tracking-widest scale-100 active:scale-[99%] hover:scale-[101%] bg-blue-500 text-white hover:bg-blue-700 w-32 mx-2"
                :to="{
                    name: 'audit-chains/tags/cert',
                    params: {
                        id: tag.label,
                        identityId: tag.identityId,
                    }
                }">
                证书
            </router-link>
        </div>
    </header>

    <i-form
        @submit="update"
        class="p-6 my-6 bg-white rounded shadow">

        <div
            class="flex">
            <p
                class="w-32 leading-[3rem] text-right mr-4">
                侧链ID
            </p>
            <i-input
                class="w-[calc(50%-4rem)]"
                v-model="form.label"
                v-model:error="error.label"
                placeholder="请输入侧链ID"
                attr="侧链ID"
                name="label"
                :rules="[
                    'required',
                    'string',
                    'no-emoji',
                ]"/>
        </div>

        <div
            class="flex">
            <p
                class="w-32 leading-[3rem] text-right mr-4">
                侧链名称
            </p>
            <i-input
                class="w-[calc(50%-4rem)]"
                v-model="form.labelName"
                v-model:error="error.labelName"
                placeholder="请输入侧链名称"
                attr="侧链名称"
                name="labelName"
                :rules="[
                    'required',
                    'string',
                    'no-emoji',
                ]"/>
        </div>

        <div
            class="flex">
            <p
                class="w-32 leading-[3rem] text-right mr-4">
                用户描述
            </p>
            <i-textarea
                class="w-[calc(50%-4rem)]"
                v-model="form.note"
                v-model:error="error.note"
                placeholder="请输入用户描述"
                attr="用户描述"
                name="note"
                :max="-1"
                :rules="[
                    'required',
                    'no-emoji',
                ]"/>
        </div>

        <div
            class="flex">
            <p
                class="w-32 leading-[3rem] text-right mr-4">
                用户 ID
            </p>
            <span
                class="leading-[3rem] w-[calc(50%-4rem)]">
                {{ tag.userId }}
            </span>
        </div>

        <div
            class="flex">
            <p
                class="w-32 leading-[3rem] text-right mr-4">
                租户 ID
            </p>
            <span
                class="leading-[3rem] w-[calc(50%-4rem)]">
                {{ tag.tenantId }}
            </span>
        </div>

        <div
            class="flex">
            <p
                class="w-32 leading-[3rem] text-right mr-4">
                标签哈希
            </p>
            <span
                class="leading-[3rem] w-[calc(50%-4rem)]">
                {{ tag.labelHash }}
            </span>
        </div>

        <div
            class="flex">
            <p
                class="w-32 leading-[3rem] text-right mr-4">
                证书 ID
            </p>
            <span
                class="leading-[3rem] w-[calc(50%-4rem)]">
                {{ tag.identityId }}
            </span>
        </div>

        <div
            class="flex">
            <p
                class="w-32 leading-[3rem] text-right mr-4">
                删除标志
            </p>
            <span
                class="leading-[3rem] w-[calc(50%-4rem)]">
                {{ tag.isDeleted }}
            </span>
        </div>

        <footer
            class="flex items-center justify-end">
            <i-button
                class="w-32"
                :loading="loading">
                更新
            </i-button>
        </footer>

    </i-form>

    <destroy-dialog
        v-model="showDestroyDialog"
        :tag="tag"
        @destroyed="redirect"/>


</template>

<script setup>

import { onBeforeMount, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '~/plugins/axios.js';
import { notify } from '@kyvg/vue3-notification';
import { pick } from 'lodash';

import IForm from '~ui/components/form/component.vue';
import IInput from '~ui/components/input/component.vue';
import IButton from '~ui/components/button/component.vue';
import ITextarea from '~ui/components/textarea/component.vue';

import DestroyDialog from '~/prefabs/audit-chains/tags/edit/destroy-dialog.vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const tag = ref({});

const form = ref({
    label: '',
    labelName: '',
    note: ''
});

const error = ref({
    label: '',
    labelName: '',
    note: ''
});

onBeforeMount(async () => {
    const { data } = await axios.get(`/logLabel/get/label/${props.id}`);
    form.value = pick(
        data.data,
        ['label', 'labelName', 'note'],
    );
    tag.value = data.data;
});

const showDestroyDialog = ref(false);

const route = useRoute();

const fromPath = computed(() => {
    return route.query.from ?? {
        name: 'audit-chains/tags',
    };
});

const loading = ref(false);

const update = () => {
    loading.value = true;
    axios.post(`/logLabel/update/label`, tag.value)
        .then(() => {
            notify({
                type: 'green',
                text: '修改侧链标签成功',
            });
        })
        .finally(() => {
            loading.value = false;
        });
};

const router = useRouter();

const redirect = () => {
    router.push(fromPath.value);
}

</script>

<script>
export default {
    metaInfo() {
        return {
            title: `侧链标签详情`,
        };
    },
}
</script>