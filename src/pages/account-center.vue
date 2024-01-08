<template>
    <h1
        class="my-6 text-xl font-semibold">
        个人中心
    </h1>

    <div
        v-if="
            !isVerified && !isAdmin
        "
        class="
            my-6 py-2 px-6 bg-red-50 border-2 border-red-400 rounded
        ">
        <p>
            <i
                class="
                    mdi mdi-alert text-red-600 pr-2
                "></i>
            您的账户未完成实名认证，请先完成
            
            <router-link
                class="
                    text-blue-600 no-underline hover:underline
                "
                :to="{
                    name: 'verification/create'
                }">
                实名认证
                <i
                    class="
                        mdi mdi-open-in-new pl-2
                    "></i>  
            </router-link>
            
            。
        </p>
    </div>

    <div
        class="bg-white p-6 my-6 rounded relative flex items-center justify-between">
        <div
            class="flex items-center">
            <img
                class="w-12 h-12 mr-6"
                src="/images/default-avatar.png"
                alt="用户">
            <div
                class="leading-10">
                <p>
                    账户： {{ user.userName }}
                </p>
                <p>
                    链上地址： {{ user.chainAddress }}
                </p>
            </div>
        </div>
        <i-button
            type="button"
            @click="showUpdatePasswordDialog = true"
            class="w-32">
            更改密码
        </i-button>
    </div>

    <update-password-dialog
        v-model="showUpdatePasswordDialog"/>
        
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
			title: '个人中心',
		}
	},

    data() {
        return {
            showUpdatePasswordDialog: false,
        }
    },

    computed: {
        user () {
            return useAuth().user;
        },
        isVerified () {
            return useAuth().isVerified;
        },
        isAdmin () {
            return useAuth().isAdmin;
        },
    },
    
}
</script>