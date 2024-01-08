<template>
    <h1 class="my-6 text-xl font-semibold">
        证书模板
    </h1>
    <div class="flex items-center bg-[rgb(229,238,248)]  mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="16"
            height="16" style="" filter="none">
            <g>
                <path
                    d="M16 1.778c7.855 0 14.222 6.367 14.222 14.222s-6.367 14.222-14.222 14.222-14.222-6.367-14.222-14.222 6.367-14.222 14.222-14.222zM16.089 21.6c-0.687 0-1.244 0.557-1.244 1.244s0.557 1.244 1.244 1.244 1.244-0.557 1.244-1.244c0-0.687-0.557-1.244-1.244-1.244zM17.013 7.911h-1.849c-0.193 0-0.324 0.149-0.32 0.333l0.263 11.779c0.004 0.193 0.151 0.333 0.329 0.333h1.304c0.169 0 0.325-0.149 0.329-0.333l0.263-11.779c0.004-0.193-0.139-0.333-0.32-0.333z"
                    fill="rgba(15,64,245,1)"></path>
            </g>
        </svg>
        <p class="ml-2 text-[#6C6C6C]">
            您可通过启用“存证证书”为链上数据生成存证证书。启用“存证证书”前您需先新增、启用一个证书模板。
        </p>
    </div>
    <div class="bg-white p-6  rounded relative ">
        <div class="flex items-center">
            <div class="">
                <p>
                    存证证书
                </p>

                <div class="flex items-center">
                    <p class="w-24 leading-[3rem] text-right mr-4">
                        存证证书
                    </p>
                    <el-switch v-model="value1" />
                </div>
            </div>
        </div>
    </div>
    <div class="bg-white p-6  rounded relative ">
        <div class="flex items-center  justify-between">
            <p>
                证书模板
            </p>
            <i-button type="button" @click="showUpdatePasswordDialog = true" class="w-[120px] text-sm h-8">
                新增证书模板
            </i-button>
        </div>
        <el-table :data="templateData">
            <el-table-column label="模板名称" width="180" prop="name"></el-table-column>
            <el-table-column label="模板背景" width="180" prop="bg"></el-table-column>
            <el-table-column pro="type" label="状态">
                <template #default="scope">
                    <el-switch v-model="scope.row.type" />
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="180" prop="createTime"></el-table-column>
            <el-table-column label="更新时间" width="180" prop="updateTime"></el-table-column>
            <el-table-column label="操作" width="180">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleClick">预览</el-button>
                    <el-button link type="primary" size="small">编辑</el-button>
                     <el-button link type="primary" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import IButton from '~ui/components/button/component.vue';
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
            value1: false,
            templateData: [
                {
                    name: 'test',
                    bg: 'test',
                    type: false,
                    createTime: 'test',
                    updateTime: 'test',
                }
            ]
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