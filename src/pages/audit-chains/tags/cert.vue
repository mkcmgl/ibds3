<template>
    <header
        class="flex items-center my-6">
        <router-link
            class="h-10 w-10 text-center leading-10 bg-transparent hover:bg-slate-500/25 inline-block rounded"
            :to="{
                name: 'audit-chains/tags/edit',
                params: {
                    id,
                }
            }">
            <i
                class="mdi mdi-arrow-left"></i>
        </router-link>
        <h1 class="text-xl font-semibold ml-4">
            侧链标签证书
        </h1>
    </header>

    <div
        class="my-6 p-6 rounded bg-white shadow-sm">
        <ul
            class="detail-list">
            <li>
                <span>
                    证书 ID
                </span>
                <span>
                    {{ cert.identityId }}
                </span>
            </li>
            <li>
                <span>
                    证书类型
                </span>
                <span>
                    {{ cert.identityType }}
                </span>
            </li>
            <li>
                <span>
                    证书公钥
                </span>
                <span>
                    {{ cert.publicKey }}
                </span>
            </li>
            <li>
                <span>
                    证书私钥
                </span>
                <span>
                    {{ cert.privateKey }}
                </span>
            </li>
            <li>
                <span>
                    证书内容
                </span>
                <span>
                    {{ cert.cert }}
                </span>
            </li>
            <li>
                <span>
                    apiKey
                </span>
                <span>
                    {{ cert.apiKey }}
                </span>
            </li>
            <li>
                <span>
                    apiSecret
                </span>
                <span>
                    {{ cert.apiSecret }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup>

import { onBeforeMount, ref } from 'vue';
import axios from '~/plugins/axios.js';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    identityId: {
        type: String,
        required: true,
    },
});

const cert = ref({});

onBeforeMount(async () => {
    const { data } = await axios.get(`/logLabel/label/cert/${props.identityId}`);
    cert.value = data.data;
});

</script>