<template>
    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            实名认证审核
        </h1>
        
        <verification-dialog
			@refresh="getData"
			:disabled="[2, 3, 4].includes(data.status)"
			:user-id="id"/>
    </header>

    <div
        class="p-6 my-6 bg-white rounded">
        <h3
            class="border-b-2 border-b-slate-200 pb-4 mb-4 font-bold">
            基本信息		
        </h3>
        <ul
            class="detail-list">
            <li>
                <span>
                    认证类型
                </span>
                <span>
                    {{ data.verifyType }}
                </span>
            </li>
            <li>
                <span>
                    审核进度
                </span>
                <span>
                    {{ data.auditStatusDesc }}
                </span>
            </li>
            <li>
                <span>
                    申请时间
                </span>
                <span>
                    {{ data.applicationTime }}
                </span>
            </li>
            <li>
                <span>
                    审核时间
                </span>
                <span>
                    {{ data.approveTime }}
                </span>
            </li>

            <template
                v-if="data.userType === 2">
                <li>
                    <span>
                        机构名称
                    </span>
                    <span>
                        {{ data.name }}
                    </span>
                </li>
                <li>
                    <span>
                        营业执照
                    </span>
                    <span>
                        <img
                            :alt="data.picture1?.split('/').reverse()[0]"
                            :src="data.picture1"/>
                    </span>
                </li>
                <li>
                    <span>
                        地址
                    </span>
                    <span>
                        {{ data.address }}
                    </span>
                </li>
                <li>
                    <span>
                        详细地址
                    </span>
                    <span>
                        {{ data.addressDetail }}
                    </span>
                </li>
                <li>
                    <span>
                        联系人姓名
                    </span>
                    <span>
                        {{ data.contract }}
                    </span>
                </li>
                <li>
                    <span>
                        联系人手机号
                    </span>
                    <span>
                        {{ data.phoneNumber }}
                    </span>
                </li>
            </template>

            <template
                v-else>
                <li>
                    <span>
                        真实姓名
                    </span>
                    <span>
                        {{ data.name }}
                    </span>
                </li>
                <li>
                    <span>
                        身份证人像面
                    </span>
                    <span>
                        <img
                            :alt="data.picture1?.split('/').reverse()[0]"
                            :src="data.picture1"/>
                    </span>
                </li>
                <li>
                    <span>
                        身份证国徽面
                    </span>
                    <span>
                        <img
                            :alt="data.picture2?.split('/').reverse()[0]"
                            :src="data.picture2"/>
                    </span>
                </li>
            </template>
        </ul>
    </div>

    <div
        class="p-6 my-6 bg-white rounded">
        <h3
            class="border-b-2 border-b-slate-200 pb-4 mb-4 font-bold">
            审核意见	
        </h3>
        <ul
            class="detail-list">
            <li>
                <span>
                    审核结果
                </span>
                <span>
                    {{ data.auditStatusDesc }}
                </span>
            </li>
            <li>
                <span>
                    审核时间
                </span>
                <span>
                    {{ data.approveTime }}
                </span>
            </li>
            <li
                v-if="data.status == 3">
                <span>
                    驳回原因
                </span>
                <span>
                    {{ data.rejectReason }}
                </span>
            </li>
        </ul>
    </div>

    <div
        class="p-6 my-6 bg-white rounded">
        <h3
            class="border-b-2 border-b-slate-200 pb-4 mb-4 font-bold">
            链上地址	
        </h3>
        <ul
            class="detail-list">
            <li>
                <span>
                    账户地址
                </span>
                <span>
                    {{ data.addressOnChain }}
                </span>
            </li>
        </ul>
    </div>

</template>

<script setup>

import VerificationDialog from '~/prefabs/verifications/show/verification-dialog.vue';

import { ref, onBeforeMount } from 'vue';

import axios from '~/plugins/axios.js';

const data = ref({});

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});

const getData = () => {
    axios.get(
            `system/certificates/getInfo/${props.id}`
        )
        .then(({ data: response }) => {
            data.value = response.data;
        });
};

onBeforeMount(() => {
    getData();
});

</script>