<template>
        
    <header
        class="bg-white px-6 py-3 flex items-center justify-between">
        <router-link
            :to="{
                name: 'index'
            }"
            class="flex items-center">
            <img
                src="/images/logo.png"
                alt="区块链开发服务系统"
                class="h-8 mr-4">
            区块链开发服务系统
        </router-link>
        <span
            class="flex items-center text-slate-600 text-sm">
            <img
                src="/images/default-avatar.png"
                alt="未登录"
                class="h-6 mr-4">
            未登录
        </span>
    </header>

    <div
        class="relative m-8 flex items-center justify-center">

        <h2
            class="absolute left-0 text-xl">
            找回密码
        </h2>

        <i-steps
            :step="step"
            :map="[
                '重置密码',
                '完成',
            ]"/>
    </div>

    <div
        class="bg-white p-8 m-8 rounded">

        <component
            class="w-[480px] mx-auto my-8"
            :is="`forget-password-step-${step}`"
            v-model:step="step"
            v-model:phone="phone"/>

    </div>

</template>

<script setup>
import ISteps from '~ui/components/steps/component.vue';
</script>

<script>

import ForgetPasswordStep0 from '~/prefabs/forget-password/step-0.vue';
import ForgetPasswordStep1 from '~/prefabs/forget-password/step-1.vue';

export default {

    metaInfo() {
		return {
			title: '找回密码',
		}
	},

    components: {
        ForgetPasswordStep0,
        ForgetPasswordStep1,
    },

    data() {
        return {
            step: 0,
            phone: '',
        }
    }
}
</script>