<template>

    <div
        class="px-6 overflow-y-auto relative flex items-center justify-center">
        
        <template
            v-if="loading">
            <p
                class="text-xl tracking-widest text-slate-500 min-h-[600px] flex items-center justify-center">
                <i
                    class="mdi mdi-loading mdi-spin mr-4"></i>
                加载中...
            </p>
        </template>
        <template
            v-else-if="Object.keys(content).length">

            <div
                class="w-[45%] flex items-center">
                <div
                    class="w-32 border-r-2 border-dashed border-slate-200 pr-6 timestamp active relative text-[90%] text-[#7561F8] min-h-[600px] flex items-center justify-end">
                    <div>
                        <p
                            v-for="time in content.txTime.split(' ')"
                            class="leading-6 text-right">
                            {{ time }}
                        </p>
                    </div>
                </div>
                <div
                    class="rounded border-2 ml-6 w-64 overflow-hidden text-sm border-[#7561F8] bg-[#7561F8] text-white">
                    <p
                        class="break-all p-2">
                        {{ content.txHash }}
                    </p>
                    <p
                        class="truncate p-2 bg-white text-[#7561F8]">
                        签名方： {{ content.signer }}
                    </p>
                </div>
            </div>
            
            <ul
                class="w-[55%] px-8 py-4">
                <li
                    :key="key"
                    v-for="({ label, key, value }) in [
                        {
                            label: '交易哈希值',
                            key: 'txHash',
                            value: content.txHash
                        },
                        {
                            label: '区块高度',
                            key: 'blockHeight',
                            value: content.blockHeight
                        },
                        {
                            label: '区块哈希值',
                            key: 'blockHash',
                            value: content.blockHash
                        },
                        {
                            label: '业务 ID',
                            key: 'bizId',
                            value: content.bizId
                        },
                        {
                            label: '签名方',
                            key: 'signer',
                            value: content.signer
                        },
                        {
                            label: '交易时间',
                            key: 'txTime',
                            value: content.txTime
                        },
                        {
                            label: '交易内容',
                            key: 'data',
                            value: content.data
                        },
                        {
                            label: '存证描述',
                            key: 'proofDataDesc',
                            value: content.proofDataDesc
                        },
                        {
                            label: '签名',
                            key: 'signature',
                            value: content.signature
                        }
                    ]"
                    class="flex text-[90%] mb-4">
                    <p
                        class="w-[100px] text-slate-500">
                        {{ label }}
                    </p>
                    <p
                        class="w-[calc(100%-100px)] break-all">
                        <i-copyer
                            class="cursor-pointer text-slate-900 hover:text-blue-600"
                            :content="value">
                            {{ value }}
                        </i-copyer>
                        <div
                            class="mt-2"
                            v-if="key === 'signature'">
                            <signature-check-dialog
                                :proof-data="content"/>
                        </div>
                        <div
                            class="mt-2"
                            v-if="key === 'data' && content.encryptMode !== 0">
                            <decrypt-content-dialog
                                :proof-data="content"
                                :file-name="content?.fileName"/>
                        </div>
                    </p>
                </li>
            </ul>


        </template>
        <template
            v-else>
            <p
                class="text-xl tracking-widest text-slate-500 min-h-[500px] flex items-center justify-center">
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

    data() {
        return {
            loading: false,
            content: {},
        }
    },

    mounted() {
        this.refreshHashContent()
    },

    methods: {
        refreshHashContent () {
            this.loading = true;
            axios.get(`/trace/history/getTxHashDetail?hash=${this.hash}`)
                .then(({ data }) => {
                    this.content = data.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>