<template>

    <i-button
        class="px-2 ml-auto text-xs"
        @click="show = true">
        验签
    </i-button>

    <i-dialog
        v-model="show"
        prevent
        :loading="loading">

        <template #title>
            验签结果
        </template>

        <ul
            class="p-8"
            v-if="Object.keys(result).length">
            <li
                class="flex mb-2"
                v-for="(value, key) in result">
                <h5
                    class="text-slate-500 whitespace-nowrap w-[6rem]">
                    {{  resultMap[key] }}
                </h5>
                <p
                    class="w-[calc(100%-6rem)] break-all">
                    <i-copyer
                        v-if="key !== 'checkResult'"
                        class="cursor-pointer text-slate-900 hover:text-blue-600"
                        :content="value">
                        {{ value }}
                    </i-copyer>
                    <span
                        class="font-bold"
                        :class="
                            value === 1 ? 'text-green-600' : 'text-red-500'
                        "
                        v-else>
                        {{  value === 1 ? '吻合' : '不吻合'  }}
                    </span>
                </p>
            </li>
        </ul>

        <div
            v-else>
            <p
                class="text-center text-slate-500 p-16">
                加载中...
            </p>
        </div>
        
    </i-dialog>

</template>

<script setup>
import ICopyer from '~ui/components/copyer/component.vue';
import IDialog from '~ui/components/dialog/component.vue';
import IButton from '~ui/components/button/component.vue';
</script>

<script>
import axios from '~/plugins/axios.js';

export default {

    inheritAttrs: false,

    props: {
        proofData: {
            required: true,
        }
    },

    data() {
        return {
            show: false,
            loading: false,

            result: {},

            resultMap: {
                publicKey: '公钥',
                payload: '签名内容',
                algorithm: '签名算法',
                checkResult: '验证结果',
                signature: '数字签名',
            }
        }
    },

    watch: {
        show (val) {
            if (val && Object.keys(this.result).length === 0) {
                this.checkSignature();
            }
        }
    },

    methods: {
        checkSignature () {
            this.loading = true;
            axios.post('/proof/sign/check', {
                signature: this.proofData.signature,
                publicKey: this.proofData.publicKey,
                payload: this.proofData.data,
            })
            .then(({ data }) => {
                this.result = data.data;
            })
            .finally(() => {
                this.loading = false;
            });
        }
    }
}
</script>