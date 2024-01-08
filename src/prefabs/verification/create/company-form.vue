<template>
	<i-form
		@submit="verify">

		<h2 class="text-xl font-bold pb-4 flex justify-between items-center">
			基本信息
		</h2>
		
		<div>

			<div
				class="flex">
				<p
					class="w-48 leading-[3rem] text-right mr-4">
					统一社会信用编码
					<sup
						class="text-red-500">*</sup>
				</p>
				<i-input
					class="w-[calc(50%-12rem)]"
					v-model="form.uniformSocialCreditCode"
					v-model:error="error.uniformSocialCreditCode"
					attr="统一社会信用编码"
					placeholder="请输入统一社会信用编码"
					:rules="[
						'required',
						'string',
						'social-credit-code',
						'no-emoji',
					]"/>
			</div>
			
			<div
				class="flex">
				<p
					class="w-48 leading-[3rem] text-right mr-4">
					机构名称
					<sup
						class="text-red-500">*</sup>
				</p>
				<i-input
					class="w-[calc(50%-12rem)]"
					v-model="form.name"
					v-model:error="error.name"
					attr="机构名称"
					placeholder="请输入机构名称"
					tip="认证审核通过后，名称不可修改"
					:rules="[
						'required',
						'string',
						'max:50',
						'no-emoji',
					]"/>
			</div>

			<div
				class="flex">
				<p
					class="w-48 leading-[3rem] text-right mr-4">
					营业执照
					<sup
						class="text-red-500">*</sup>
				</p>
				<i-media-input
					display="column"
					v-model="form.picture1"
					v-model:error="error.picture1"
					attr="营业执照"
					:rules="[
						'required',
						'file',
						'suffixs:png,jpg,jpeg',
						`max:${5 * 1024 * 1024}`
					]">
					<template
						#hint>
						上传图片
					</template>
					<template
						#tips>
						<li class="whitespace-nowrap">
							支持的图片格式包括 JPG、JPEG 和 PNG
						</li>
						<li>
							图片不得超过5M
						</li>
						<li>
							上传的图片需清晰完整
						</li>
					</template>
				</i-media-input>
			</div>

			<div
				class="
					flex
				">
				<p
					class="w-48 leading-[3rem] text-right mr-4">
					地址
					<sup
						class="text-red-500">*</sup>
				</p>
				<i-address-input
					class="w-1/2"
					v-model="form.address"
					v-model:error="error.address"
					attr="地址"
					:rules="[
						'required',
						'string',
						'max:100',
						'no-emoji',
					]"/>
			</div>

			<div
				class="
					flex
				">
				<p
					class="w-48 leading-[3rem] text-right mr-4">
					<span
						class="leading-[3rem]">
						<sup
							class="text-red-500">*</sup>
						详细地址		
					</span>
				</p>
				<i-input
					class="w-[calc(50%-12rem)]"
					v-model="form.addressDetail"
					v-model:error="error.addressDetail"
					attr="详细地址"
					placeholder="请输入详细地址"
					:rules="[
						'required',
						'string',
						'max:100',
						'no-emoji',
					]"/>
			</div>
		</div>

		<h2 class="text-xl font-bold pb-4 flex justify-between items-center">
			联系人信息
		</h2>

		<div>
			
			<div
				class="
					flex
				">
				<p
					class="w-48 leading-[3rem] text-right mr-4">
					<span
						class="leading-[3rem]">
						<sup
							class="text-red-500">*</sup>
						联系人姓名		
					</span>
				</p>
				<i-input
					class="w-[calc(50%-12rem)]"
					v-model="form.contact"
					v-model:error="error.contact"
					placeholder="请输入联系人姓名"
					attr="联系人姓名"
					:rules="[
						'required',
						'string',
						'max:50',
						'no-emoji',
					]"/>
			</div>

			<div
				class="
					flex
				">
				<p
					class="w-48 leading-[3rem] text-right mr-4">
					<span
						class="leading-[3rem]">
						<sup
							class="text-red-500">*</sup>
						联系人手机号		
					</span>
				</p>
				<i-input
					class="w-[calc(50%-12rem)]"
					v-model="form.phoneNumber"
					v-model:error="error.phoneNumber"
					placeholder="请输入联系人手机号"
					attr="联系人手机号"
					:rules="[
						'required',
						'phone',
					]"/>
			</div>
		</div>

		<footer>
			<i-button
				:loading="loading"
				type="submit"
				class="w-48 mx-auto">
				提交审核
			</i-button>
		</footer>

	</i-form>

	
</template>

<script setup>

import IForm from '~ui/components/form/component.vue';
import IInput from '~ui/components/input/component.vue';
import IMediaInput from '~ui/components/media-input/component.vue';
import IAddressInput from '~ui/components/address-input/component.vue';
import IButton from '~ui/components/button/component.vue';

import { ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import axios from '~/plugins/axios.js';

const form = ref({
	uniformSocialCreditCode: '',
	name: '',
	address: null,
	picture1: '',
	addressDetail: '',
	contact: '',
	phoneNumber: '',
});

const error = ref({
	uniformSocialCreditCode: '',
	name: '',
	address: '',
	picture1: '',
	addressDetail: '',
	contact: '',
	phoneNumber: '',
});

const loading = ref(false);

const emits = defineEmits(['submitted']);

const verify = () => {

	loading.value = true;

	let formData = new FormData;

	Object.keys(form.value).forEach(key => {
		formData.append(key, form.value[key]);
	});

	formData.append('verifyType', 2);

	axios.post(
			`/system/certificates/add`,
			formData,
		)
		.then(({ data }) => {
			notify({
				type: 'green',
				text: '实名认证请求已提交',
				data: {
					icon: 'check'
				}
			});
			emits('submitted');
		})
		.finally(() => {
			loading.value = false;
		});
};

</script>