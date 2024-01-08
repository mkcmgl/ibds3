<template>
    <h1 class="my-6 text-xl font-semibold">
        概览
    </h1>

    <div class="flex">
        <div class="w-[calc(100%-17rem)]">
            <div class="bg-white p-6  rounded relative flex items-center justify-between">
                <div class="flex items-center">
                    <img class="w-12 h-12 mr-6" src="/images/default-avatar.png" alt="用户">
                    <div class="">
                        <p>
                            欢迎使用区块链开发者服务平台
                        </p>
                        <p class="mt-4">
                            区块链开发服务平台是基于自研区块链底层技术，对区块链基础设施进行了场景化封装，以RestAPI的形式为开发者提供区块链技术支撑，帮助开发者快速搭建区块链应用和服务，满足用户个性化需求，简化区块链应用研发路径，在兼顾高安全、快速部署、方便易用等特性的同时，有效降低开发及使用成本。
                        </p>
                    </div>
                </div>
            </div>

            <div class="bg-white p-6 my-6 rounded relative ">
                <p class="mb-4">
                    数据概览
                </p>
                <div class="flex justify-around ">
                    <div class="w-1/2 border-r border-solid">
                        <p class="mb-4">
                            存证业务总数
                        </p>
                        <p>XXXX</p>
                    </div>
                    <div class="w-1/2 pl-3">
                        <p class="mb-4">
                            存证业务总数
                        </p>
                        <p>XXXX</p>
                    </div>
                </div>

            </div>
            <div class="bg-white p-6 my-6 rounded relative ">
                <p class="mb-4">区块链开发服务</p>
                <div class="flex items-center justify-around">
                    <div class="w-1/2 flex ">
                        <img class="w-12 h-12 mr-6" src="/images/default-avatar.png" alt="用户">
                        <div class="w-2/3">
                            <p class="mb-4">
                                可信存证
                            </p>
                            <p>
                                依托可信联盟链，将关键环节数据、文件上链存证，确保确权明晰、难以篡改

                            </p>
                        </div>
                    </div>
                    <div class="w-1/2 flex ">
                        <img class="w-12 h-12 mr-6" src="/images/default-avatar.png" alt="用户">
                        <div class="w-2/3">
                            <p class="mb-4">
                                灵活便捷
                            </p>
                            <p>
                                通过封装通用区块链场景并以RestAPI的形式对外提供，满足在不同业务场景的个性需求，应用更加灵活便捷
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div>
            <div class=" ml-4 p-2 w-64 bg-white  rounded relative ">
                <div class="flex justify-between">
                    <p>个人中心</p>

                    <p class="text-center">
                        <router-link class="w-8 text-blue-600 hover:text-blue-500" :to="{
                            name: 'accountCenter',
                        }">
                            前往
                        </router-link>
                    </p>
                </div>
                <div class="flex items-center justify-between break-all ">
                    <img class="w-12 h-12 mr-6" src="/images/default-avatar.png" alt="用户">
                    <div class="">
                        <p>
                            账户： {{ user.userName }}
                        </p>
                        <p class="my-2">
                            链上地址： {{ user.chainAddress }}
                        </p>
                        <button @click="showUpdatePasswordDialog = true" class="text-blue-600 hover:text-blue-500"
                            type="button">
                            更改密码
                        </button>
                    </div>

                </div>

            </div>
        </div>
    </div>




    <update-password-dialog v-model="showUpdatePasswordDialog" />
</template>

<script setup>
import IButton from '~ui/components/button/component.vue';
import updatePasswordDialog from '~/prefabs/index/update-password-dialog.vue';
</script>

<script>
import { useAuth } from '~/store/auth.js';

export default {

    metaInfo() {
        return {
        }
    },

    data() {
        return {
            showUpdatePasswordDialog: false,
        }
    },

    computed: {
        user() {
            return useAuth().user;
        },
        isVerified() {
            return useAuth().isVerified;
        },
        isAdmin() {
            return useAuth().isAdmin;
        },
    },

}
</script>