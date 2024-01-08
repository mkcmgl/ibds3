<template>
    <div class="flex justify-between mt-3">
        <div class=" w-[fit-content] flex items-center " @click="back">
            <svg xmlns="http://www.w3.org/2000/svg" class="cursor-pointer" width="6.28" height="10.499"
                viewBox="0 0 6.28 10.499">
                <path class="a"
                    d="M133.053,555.55l3.606-3.559a1.021,1.021,0,0,0,.009-1.418,1,1,0,0,0-.713-.3,1.07,1.07,0,0,0-.705.289l-4.29,4.233a1.019,1.019,0,0,0,0,1.423l4.26,4.26a1,1,0,0,0,1.418,0,1.019,1.019,0,0,0,0-1.417Z"
                    transform="translate(-130.669 -550.275)" />
            </svg>
            <h1 class="font-bold text-xl pl-3 leading-relaxed cursor-pointer">
                编辑
            </h1>
        </div>
        <div>
            <el-button type="primary" @click="submitSettingForm('settingFormRef')">保存</el-button>
        </div>
    </div>





    <div class="bg-white p-6 my-6 rounded relative  ">
        <div class="flex justify-between items-center leading-10">
            <p class="w-28 ">
                个性化信息
            </p>
        </div>
        <el-form ref="settingFormRef" :model="settingForm" :rules="settingRules" label-width="120px"
            class="demo-ruleForm text-sm flex-1 max-w-[750px] m-auto" :size="formSize">
            <el-form-item label="系统名称" prop="systemName">
                <el-input v-model="settingForm.systemName" placeholder="请输入系统名称" />
            </el-form-item>
            <el-form-item label="英文名称" prop="esName">
                <el-input v-model="settingForm.esName" placeholder="请输入英文名称" />
            </el-form-item>
            <el-form-item label="版权信息" prop="copyrightMsg">
                <el-input v-model="settingForm.copyrightMsg" placeholder="请输入版权信息" />
            </el-form-item>

        </el-form>

    </div>
</template>

<script setup>

import { ref, onBeforeMount, onMounted } from 'vue';
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
            settingForm: {
                systemName: '',
                esName: '',
                logo: '',
                loginImg: '',
                registerImg: '',
                copyrightMsg: ''
            },
            settingRules: {
                systemName: [
                    { required: true, message: "请输入系统名称", trigger: "blur" },
                    {
                        min: 1,
                        max: 20,
                        message: "系统名称长度必须介于 1 和 20 之间",
                        trigger: "blur",
                    },
                ],
                esName: [
                    { required: true, message: "请输入英文名称", trigger: "blur" },
                    {
                        min: 1,
                        max: 100,
                        message: "英文名称长度必须介于 1 和 100 之间",
                        trigger: "blur",
                    },
                ],
                copyrightMsg: [
                    { required: true, message: "请输入版权信息", trigger: "blur" },
                    {
                        min: 1,
                        max: 50,
                        message: "版权信息长度必须介于 1 和 50 之间",
                        trigger: "blur",
                    }, 
                ]
            }

        }
    },
    created() {
       
    },
    onMounted() { 
         this.reseForm();
    },
    methods: {
        back() {
            this.$router.back();
        },
        submitSettingForm(formName) { 
            this.$refs[formName].validate((valid) => {
                if (valid) { 
                    console.log(`output111`);
                } else {
                    console.log('error submit!!');
                    this.reseForm();
                    return false;
                }
             })
        },
        reseForm() { 
            this.$refs.settingFormRef.resetFields() 
        },
    },
}
</script>