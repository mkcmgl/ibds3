<template>
    
    <td>
        <button
            class="text-blue-600 hover:text-blue-400 w-[max(6rem,300px)] truncate"
            type="button"
            :title="file.txHash"
            @click="showHashDialog = true">
            {{ file.txHash }}
        </button>
    </td>
    <td>
        <button
            class="flex items-center text-blue-600 no-underline hover:underline"
            :class="{
                'cursor-not-allowed opacity-50': downloading,
            }"
            :title="file.fileName"
            @click="downloadFile(file)"
            :disabled="downloading">
            <span
                class="w-[min(6rem,300px)] truncate block">
                {{ file.fileName }}
            </span>
            <template
                v-if="!downloading">
                <download-icon/>
            </template>
            <template
                v-else>
                <i class="mdi mdi-loading mdi-spin"/>
            </template>
        </button>
    </td>
    <td>
        {{ enums['bizType'][file.bizType] }}
    </td>
    <td>
        <span
            class="w-[max(2rem,100px)] truncate block">
            {{ file.bizId }}
        </span>
    </td>
    <td>
        {{ enums['encryptMode'][file.encryptMode] }}
    </td>
    <td>
        {{ file.txTime }}
    </td>
    <td>
        <span
            class="w-[min(6rem,200px)] truncate block">
            {{ file.enterPrice }}
        </span>
    </td>
    <td>
        <div
            class="
                -mx-2
            ">
            <button
                @click="showCertDialog()"
                class="
                    mx-2 text-sm text-blue-600
                "
                type="button">
                查看
            </button>
            <button
                @click="downloadCert()"
                class="
                    mx-2 text-sm text-blue-600
                "
                type="button">
                下载
            </button>
        </div>
    </td>

    <hash-dialog
        v-model="showHashDialog"
        :hash="file.txHash"/>

    <i-dialog
        width="820px"
        v-model="isShowCertDialog">
        <template
            #title>
            存证证书
        </template>

        <div
            class="
                w-full p-[10px]
                cert-image-wrapper
            ">
            <canvas
                width="800"
                height="1150"
                :id="`cert-${file.txHash}`"/>
        </div>

    </i-dialog>
        
</template>

<script setup>
import enums from '~/enums.json';
import DownloadIcon from './download-icon.vue';
import HashDialog from '~/components/hash-dialog.vue';
import IDialog from '~ui/components/dialog/component.vue';
</script>

<script>

import HashFile from '~/mixins/file.js';

import axios from '~/plugins/axios.js';
import certJPG from '~/assets/cert.jpg';
import { drawWrappedText } from '~/utils/canvas.js';

export default {

    mixins: [
        HashFile,
    ],

    props: {
        file: {
            required: true,
        }
    },

    data() {
        return {
            showHashDialog: false,
            isShowCertDialog: false,
        }
    },


    methods: {
        showCertDialog() {

            axios.get(
                    `/proof/getProofDepositData/${this.file.txHash}`
                )
                .then((response) => {

                    let { data: cert } = response.data; 
                    
                    let canvas = document.getElementById(`cert-${this.file.txHash}`);
                    let ctx = canvas.getContext('2d');

                    let img = new Image();
                    img.src = certJPG;

                    img.onload = () => {

                        ctx.drawImage(img, 0, 0);

                        ctx.font = '18px Arial';
                        ctx.fillStyle = 'black';

                        // 存证主体
                        drawWrappedText(ctx, cert.proofSubject, 250, 375);
                        // 存证交易哈希
                        drawWrappedText(ctx, cert.proofTxHash, 250, 445);
                        // 用户链上地址
                        drawWrappedText(ctx, cert.proofAddress, 250, 515);
                        // 业务类型
                        drawWrappedText(ctx, cert.bizType, 250, 572);
                        // 区块高度
                        drawWrappedText(ctx, cert.blockNum, 250, 627);
                        // 区块哈希
                        drawWrappedText(ctx, cert.blockHash, 250, 682);
                        // 存证时间
                        drawWrappedText(ctx, cert.proofDate, 250, 767);

                        let newImg = new Image();
                        newImg.src = canvas.toDataURL('image/jpeg', 1.0);

                        ctx.drawImage(newImg, 0, 0);
                    }

                });


            this.isShowCertDialog = true;

        },
        downloadCert() {
            axios
                .get(`/proof/downloadProofDepositPdf/${this.file.txHash}`, {
                    responseType: 'blob',
                })
                .then((response) => {
                    let blob = new Blob([response.data], {
                        type: 'application/pdf',
                    });
                    let url = window.URL.createObjectURL(blob);
                    let link = document.createElement('a');
                    link.href = url;
                    link.download = `${this.file.txHash}.pdf`;
                    link.click();
                });
        }
    }
}
</script>