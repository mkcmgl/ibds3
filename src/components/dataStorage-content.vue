<template>
    <div class="px-6 overflow-y-auto relative flex items-center justify-center">

        <template v-if="loading">
            <p class="text-xl tracking-widest text-slate-500 min-h-[600px] flex items-center justify-center">
                <i class="mdi mdi-loading mdi-spin mr-4"></i>
                加载中...
            </p>
        </template>
        <template v-else-if="Object.keys(detailData).length">
            <div
                class="w-[45%] flex items-center overflow-y-auto h-[600px]">
                <ul class="flex items-center overflow-y-auto h-[100%]">
                    <li  
                    v-for="(itemContent, index) in content"
                    tabindex="0"
                    role="button"
                    @click="activeHistoryIndex = index"
                     class="flex items-center"
                     :class="{
                         'text-[#7561F8]': index === activeHistoryIndex,
                         'text-slate-700': index !== activeHistoryIndex
                     }"
                    >
                    <div
                        class="w-32 border-r-2 border-[#7561F8] pr-6 py-16 timestamp relative text-[90%]"
                        :active="index === activeHistoryIndex">
                        <div>
                            <p
                                v-for="time in itemContent.transactionTime.split(' ')"
                                class="leading-6 text-right">
                                {{ time }}
                            </p>
                        </div>
                    </div>
                    <div
                        class="rounded border-2 ml-6 w-64 overflow-hidden text-sm"
                        :class="{
                            'border-[#7561F8] bg-[#7561F8] text-white': index === activeHistoryIndex,
                            'border-slate-300 bg-[#ECE9FF] text-slate-900': index !== activeHistoryIndex
                        }">
                        <p
                            class="break-all p-2">
                            {{ itemContent.transactionId }}
                        </p>
                        <p
                            class="truncate p-2 bg-white"
                            :class="{
                                'text-[#7561F8]': index === activeHistoryIndex,
                                'text-slate-600': index !== activeHistoryIndex
                            }">
                            签名方： {{ itemContent.nickName }}
                        </p>
                    </div>
                    </li>
                </ul>

            </div>

            <ul class="w-[55%] px-8 py-4">
                <li :key="key" v-for="({ label, key, value }) in [
                    {
                        label: '交易哈希值',
                        key: 'transactionId',
                        value: activeHistory.transactionId
                    },
                    {
                        label: '区块号',
                        key: 'blockNum',
                        value: activeHistory.blockNum
                    },
                    {
                        label: '区块哈希值',
                        key: 'blockHash',
                        value: activeHistory.blockHash
                    },
                    {
                        label: '业务 ID',
                        key: 'bizId',
                        value: hash
                    },
                    {
                        label: '业务类型',
                        key: 'bizTypeId',
                        value: '公共存证服务'
                    },
                    {
                        label: '签名方',
                        key: 'txTime',
                        value: activeHistory.nickName
                    },
                    {
                        label: '交易时间',
                        key: 'transactionTime',
                        value: activeHistory.transactionTime
                    },
                    {
                        label: '交易内容',
                        key: 'transactionContent',
                        value: activeHistory.transactionContent
                    },
                    {
                        label: '签名',
                        key: 'signature',
                        value: activeHistory.signature
                    }
                ]" class="flex text-[90%] mb-4">
                    <p class="w-[100px] text-slate-500 text-base">
                        {{ label }}
                    </p>
                    <p class="w-[calc(100%-100px)] break-all">
                        <i-copyer class="cursor-pointer text-slate-900 hover:text-blue-600" :content="value">
                            {{ value }}
                        </i-copyer>
                    <div class="mt-2" v-if="key === 'signature'">
                        <!-- <signature-check-dialog :proof-data="content" /> -->
                    </div>
                    <div class="mt-2" v-if="key === 'data' && activeHistory.encryptMode !== 0">
                        <!-- <decrypt-content-dialog :proof-data="content" :file-name="content?.fileName" /> -->
                    </div>
                    </p>
                </li>
            </ul>


        </template>
        <template v-else>
            <p class="text-xl tracking-widest text-slate-500 min-h-[500px] flex items-center justify-center">
                无相关的交易详情
            </p>
        </template>

    </div>
</template>

<script setup>
import ICopyer from '~ui/components/copyer/component.vue';
import SignatureCheckDialog from '~/prefabs/relations/index/signature-check-dialog.vue';
import DecryptContentDialog from '~/prefabs/relations/index/decrypt-content-dialog.vue';
</script>

<script>

import axios from '~/plugins/axios.js';

export default {

    props: {
        hash: {
            required: true,
        }
    },
        computed: {
        activeHistory() {
            return this.content[this.activeHistoryIndex] ?? {};
        },
    },
    data() {
        return {
            loading: false,
            content: [],
            detailData: {},
            activeHistoryIndex: 0,
        }
    },

    mounted() {
        this.refreshHashContent()
    },

    methods: {
        refreshHashContent() {
            this.loading = true;
            axios.get(`/proofChainData/getChainDataDetail/${this.hash}`)
                .then(({ data }) => {
                    this.content = data.data;
                    this.detailData = data.data[0];
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>