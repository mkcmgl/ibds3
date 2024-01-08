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
					真实姓名
					<sup
						class="text-red-500">*</sup>
				</p>
				<i-input
					class="w-[calc(50%-12rem)]"
					v-model="form.name"
					v-model:error="error.name"
					attr="真实姓名"
					placeholder="请填写真实姓名"
					:rules="[
						'required',
						'string',
						'no-emoji',
						'no-space',
					]"/>
			</div>

			<div
				class="flex">
				<p
					class="w-48 leading-[3rem] text-right mr-4">
					身份证号
					<sup
						class="text-red-500">*</sup>
				</p>
				<i-input
					class="w-[calc(50%-12rem)]"
					v-model="form.idNumber"
					v-model:error="error.idNumber"
					attr="身份证号"
					placeholder="请填写身份证号"
					:rules="[
						'required',
						'id-card'
					]"/>
			</div>

			<div
				class="flex">
				<p
					class="w-48 leading-[3rem] text-right mr-4">
					身份证人像面
					<sup
						class="text-red-500">*</sup>
				</p>
				<i-media-input
					display="column"
					v-model="form.picture1"
					v-model:error="error.picture1"
					attr="身份证人像面"
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
				class="flex">
				<p
					class="w-48 leading-[3rem] text-right mr-4">
					身份证国徽面
					<sup
						class="text-red-500">*</sup>
				</p>
				<i-media-input
					display="column"
					v-model="form.picture2"
					v-model:error="error.picture2"
					attr="身份证国徽面"
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
import IButton from '~ui/components/button/component.vue';

import { ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import axios from '~/plugins/axios.js';

const form = ref({
	name: '',
	idNumber: '',
	picture1: null,
	picture2: null,
});

const error = ref({
	name: '',
	idNumber: '',
	picture1: '',
	picture2: '',
});

const loading = ref(false);

const emits = defineEmits([
	'submitted',
]);

const verify = () => {

	loading.value = true;

	let formData = new FormData;

	Object.keys(form.value).forEach(key => {
		formData.append(key, form.value[key]);
	});

	formData.append('verifyType', 1);

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