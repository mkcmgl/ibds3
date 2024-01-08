<template>
    <ul
        class="absolute top-24 px-6 w-1/2 right-8 z-30"
        v-if="Object.keys(activeHistory).length">
        <li
            :key="key"
            v-for="({ label, key, value }) in [
                {
                    label: '交易哈希值',
                    key: 'txHash',
                    value: activeHistory.proofData.txHash
                },
                {
                    label: '区块高度',
                    key: 'blockHeight',
                    value: activeHistory.proofData.blockHeight
                },
                {
                    label: '区块哈希值',
                    key: 'blockHash',
                    value: activeHistory.proofData.blockHash
                },
                {
                    label: '业务 ID',
                    key: 'bizId',
                    value: activeHistory.proofData.bizId
                },
                {
                    label: '签名方',
                    key: 'signer',
                    value: activeHistory.proofData.signer
                },
                {
                    label: '交易时间',
                    key: 'txTime',
                    value: activeHistory.proofData.txTime
                },
                {
                    label: '交易内容',
                    key: 'data',
                    value: activeHistory.proofData.data
                },
                {
                    label: '签名',
                    key: 'signature',
                    value: activeHistory.proofData.signature
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
                        :proof-data="activeHistory?.proofData"/>
                </div>
                <div
                    class="mt-2"
                    v-if="key === 'data' && activeHistory?.proofData.encryptMode !== 0">
                    <decrypt-content-dialog
                        :proof-data="activeHistory?.proofData"
                        :file-name="activeHistory?.fileName"/>
                </div>
            </p>
        </li>
    </ul>

    <div
        class="px-6 h-[600px] overflow-y-auto relative -z-1"
        v-if="histories.length">
        <ul
            class="w-[45%] overflow-hidden ">
            <li
                v-for="({ proofData }, index) in histories"
                tabindex="0"
                role="button"
                @click="activeHistoryIndex = index"
                class="flex items-center"
                :class="{
                    'text-[#7561F8]': index === activeHistoryIndex,
                    'text-slate-700': index !== activeHistoryIndex
                }">
                
                <div
                    class="w-32 border-r-2 border-[#7561F8] pr-6 py-16 timestamp relative text-[90%]"
                    :active="index === activeHistoryIndex">
                    <p
                        v-for="time in proofData.txTime.split(' ')"
                        class="leading-6 text-right">
                        {{ time }}
                    </p>
                </div>
                <div
                    class="rounded border-2 ml-6 w-64 overflow-hidden text-sm"
                    :class="{
                        'border-[#7561F8] bg-[#7561F8] text-white': index === activeHistoryIndex,
                        'border-slate-300 bg-[#ECE9FF] text-slate-900': index !== activeHistoryIndex
                    }">
                    <p
                        class="break-all p-2">
                        {{ proofData.txHash }}
                    </p>
                    <p
                        class="truncate p-2 bg-white"
                        :class="{
                            'text-[#7561F8]': index === activeHistoryIndex,
                            'text-slate-600': index !== activeHistoryIndex
                        }">
                        签名方： {{ proofData.signer }}
                    </p>
                </div>

            </li>
        </ul>
    </div>

    <div
        class="px-6 h-[500px] overflow-y-auto relative flex items-center justify-center"
        v-else-if="loaded">
        <p
            class="text-xl tracking-widest text-slate-500">
            无相关的留痕记录
        </p>
    </div>
    <div
        class="px-6 h-[500px] overflow-y-auto relative flex items-center justify-center"
        v-else>
        <p
            class="text-xl tracking-widest text-slate-500">
            <i
                class="mdi mdi-loading mdi-spin mr-4"></i>
            加载中...
        </p>
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
        relation: {
            required: true,
        }
    },

    computed: {
        activeHistory() {
            return this.histories[this.activeHistoryIndex] ?? {};
        },
    },

    data() {
        return {
            loaded: false,
            histories: [],
            activeHistoryIndex: 0,
        }
    },


    mounted() {
        this.loadDetails();
    },

    methods: {
        loadDetails() {
            axios.get(`trace/code/detail?traceCode=${this.relation.traceId}`)
                .then(({ data }) => {
                    this.histories = data.history ?? [];
                    this.loaded = true;
                });
        }
    }
}
</script>