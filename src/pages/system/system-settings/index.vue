<template>
    <header class="my-6 flex items-center justify-between">
        <h1 class="text-xl font-semibold">
            基础设置
        </h1>
    </header>
    <div class="bg-white p-6 my-6 rounded relative flex items-center ">
        <button @click="setSelection = 1" class=" hover:text-blue-500" :class="{ 'text-blue-600': setSelection === 1 }"
            type="button">
            全局策略
        </button>
        <button @click="setSelection = 2" class="ml-16  hover:text-blue-500"
            :class="{ 'text-blue-600': setSelection === 2 }" type="button">
            个性化设置
        </button>
        <!-- <i-button
                type="button"
                @click="showUpdatePasswordDialog = true"
                class="w-32">
                更改密码
            </i-button> -->
    </div>
    <div v-if="setSelection === 1" class="bg-white p-6 my-6 rounded relative  ">
        <div class="flex leading-10">
            <p class="w-28 ">
                初始化登录密码
            </p>
            <div class="ml-6 w-[calc(100%-8.5rem)] border-solid border-b flex justify-between items-center">
                <p>
                    已设置。6-20字符，需包含数字、字母、区分大小写
                </p>
                <button @click="showEditPasswordDialog = true" class="w-8 text-blue-600 hover:text-blue-500" type="button">
                    修改
                </button>
            </div>
        </div>
        <div class="flex leading-10">
            <p class="w-28 ">
                数据上报
            </p>
            <div class="ml-6 w-[calc(100%-8.5rem)] border-solid border-b flex justify-between items-center">
                <p>
                    已启用。数据上报地址：http://xxxx
                </p>
                <button @click="showEditAddressDialog = true" class="w-8 text-blue-600 hover:text-blue-500" type="button">
                    修改
                </button>
            </div>
        </div>
        <div class="flex leading-10">
            <p class="w-28 ">
                实名认证
            </p>
            <div class="ml-6 w-[calc(100%-8.5rem)] border-solid border-b flex justify-between items-center">
                <p>
                    已启用
                </p>
                <button @click="showEditAuthenticationDialog = true" class="w-8 text-blue-600 hover:text-blue-500"
                    type="button">
                    修改
                </button>
            </div>
        </div>
    </div>
    <div v-if="setSelection === 2" class="bg-white p-6 my-6 rounded relative  ">
        <div class="flex justify-between items-center leading-10">
            <p class="w-28 ">
                个性化信息
            </p>
            <p class="text-center">
                <router-link class="w-8 text-blue-600 hover:text-blue-500" 
                :to="{
                    name: 'system/setting/edit-personalized',
                }">
                    编辑
                </router-link>
            </p>
        </div>
        <div class="flex leading-10">
            <p class="w-28 ">
                系统名称：
            </p>
            <div class="ml-6 w-[calc(100%-8.5rem)] flex justify-between items-center">
                <p>
                    区块链开发服务平台
                </p>
            </div>
        </div>
        <div class="flex leading-10">
            <p class="w-28 ">
                英文名称:
            </p>
            <div class="ml-6 w-[calc(100%-8.5rem)] flex justify-between items-center">
                <p>
                    Blockchain Development Service
                </p>
            </div>
        </div>
        <div class="flex leading-10">
            <p class="w-28 ">
                LOGO:
            </p>
            <div class="ml-6   flex justify-between items-center">
                <p>
                    LOGO.jpeg
                </p>
                <button @click="showEditAuthenticationDialog = true" class="w-8 ml-6 text-blue-600 hover:text-blue-500"
                    type="button">
                    查看
                </button>
            </div>
        </div>
        <div class="flex leading-10">
            <p class="w-28 ">
                登录页背景图：
            </p>
            <div class="ml-6   flex justify-between items-center">
                <p>
                    登录页背景图.jpeg
                </p>
                <button @click="showEditAuthenticationDialog = true" class="w-8 ml-6 text-blue-600 hover:text-blue-500"
                    type="button">
                    查看
                </button>
            </div>
        </div>
        <div class="flex leading-10">
            <p class="w-28 ">
                注册页背景图：
            </p>
            <div class="ml-6   flex justify-between items-center">
                <p>
                    注册页背景图.jpeg
                </p>
                <button @click="showEditAuthenticationDialog = true" class="w-8 ml-6 text-blue-600 hover:text-blue-500"
                    type="button">
                    查看
                </button>
            </div>
        </div>
        <div class="flex leading-10">
            <p class="w-28 ">
                版权信息：
            </p>
            <div class="ml-6   flex justify-between items-center">
                <p>
                    建设单位：浪潮集团
                </p>

            </div>
        </div>

    </div>
    <edit-password-dialog v-if="showEditPasswordDialog" v-model="showEditPasswordDialog" />
    <editAddressDialogVue v-if="showEditAddressDialog" v-model="showEditAddressDialog" />
    <editAuthenticationDialog v-if="showEditAuthenticationDialog" v-model="showEditAuthenticationDialog" />
</template>

<script  setup>
import editPasswordDialog from "./edit-password-dialog.vue";
import editAddressDialogVue from "./edit-address-dialog.vue";
import editAuthenticationDialog from "./edit-authentication-dialog.vue";
import { ref, onBeforeMount } from 'vue';
import axios from '~/plugins/axios.js';
import IPaginatablePage from '~ui/components/paginatable-page/component.vue';
import IButton from '~ui/components/button/component.vue';
import PlusIcon from '~/components/icons/plus.vue';

import DataStatisticsIndexTr from '~/prefabs/data-storage/tr.vue';


</script>

<script>
export default {
    data() {
        return {
            showEditPasswordDialog: false,
            showEditAddressDialog: false,
            showEditAuthenticationDialog: false,
            setSelection: 1,

        }
    },
    created() {
        this.$route.params.setSelection == 2?this.setSelection=2:this.setSelection=1;
    },

}
</script>