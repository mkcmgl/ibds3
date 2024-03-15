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
        <el-form  label-position="left" ref="settingFormRef" :model="settingForm" :rules="settingRules" label-width="120px"
            class="demo-ruleForm text-sm flex-1 max-w-[750px] m-auto" :size="formSize">
            <el-form-item label="系统名称" prop="systemName">
                <el-input v-model="settingForm.systemName" placeholder="请输入系统名称" />
            </el-form-item>
            <el-form-item label="英文名称" prop="esName">
                <el-input v-model="settingForm.esName" placeholder="请输入英文名称" />
            </el-form-item>

            <el-form-item label="LOGO" prop="logo">
                <el-upload class="uploadImg" v-model:file-list="fileList" :class="{ uploadImgDisabled: uploadDisabled1 }"
                    action="#" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                    :on-success="handleSuccess" :limit="1">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>


            </el-form-item>
            <el-form-item label="登陆页背景图" prop="loginImg">
                <el-upload class="uploadImg" v-model:file-list="fileList" :class="{ uploadImgDisabled: uploadDisabled1 }"
                    action="#" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                    :on-success="handleSuccess" :limit="1">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

            </el-form-item>
            <el-form-item label="注册页背景图" prop="registerImg">
                <el-upload class="uploadImg" v-model:file-list="fileList" :class="{ uploadImgDisabled: uploadDisabled1 }"
                    action="#" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                    :on-success="handleSuccess" :limit="1">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="版权信息" prop="copyrightMsg">
                <el-input type="textarea" maxlength="50" show-word-limit autosize v-model="settingForm.copyrightMsg"
                    placeholder="请输入版权信息" />
            </el-form-item>
        </el-form>


        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>

<script setup>

import { ref, onBeforeMount, onMounted } from 'vue';
import axios from '~/plugins/axios.js';
import IPaginatablePage from '~ui/components/paginatable-page/component.vue';
import IButton from '~ui/components/button/component.vue';
import PlusIcon from '~/components/icons/plus.vue';

import DataStatisticsIndexTr from '~/prefabs/data-storage/tr.vue';

import { Plus } from '@element-plus/icons-vue'
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const fileList = ref([])
const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
    console.log(`output->fileList.value`, fileList.value);

}
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}

const handleSuccess = (file) => {
    console.log(file)
    console.log(`output->fileList.value`, fileList.value);
}
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
                ],
                logo: [
                    { required: true, message: "请上传LOGO", trigger: "blur" },
                ],
                loginImg: [
                    { required: true, message: "请上传登陆页背景图", trigger: "blur" },
                ],
                registerImg: [
                    { required: true, message: "请上传注册页背景图", trigger: "blur" },
                ],
            }

        }
    },
    created() {

    },
    onMounted() {
        this.resetForm();
    },
    methods: {
        back() {
            this.$router.push({
                name: 'system/setting/setSelection',
                params: {
                    setSelection: '2'
                }
            });
        },
        submitSettingForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(`output111`);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        resetForm() {
            this.$refs.settingFormRef.resetFields()
        },
    },
}
</script>
<style lang="scss" scoped>
.uploadImg {
    margin-right: 1rem;

    ::v-deep(.el-upload-dragger) {
        height: 100%;
    }

    ::v-deep(.el-icon--close-tip) {
        display: none !important;
    }
}

.uploadImgDisabled {
    ::v-deep(.el-upload--picture-card) {
        display: none;
    }
}
</style>