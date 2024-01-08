<template>
    
    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            实名认证审核
        </h1>
    </header>

    <i-paginatable-page
		api="/system/certificates/list"
		:filters="{
			account: '账号',
			applicant: '申请方',
			certificationType: {
				label: '认证类型',
				input: {
					placeholder: '请选择认证类型',
					attr: '认证类型',
				},
				options: [
					{
						label: '企业实名认证',
						value: '2',
					},
					{
						label: '个人实名认证',
						value: '1',
					}
				]
			},
			status: {
				label: '审核状态',
				input: {
					placeholder: '请选择审核状态',
					attr: '审核状态',
					rules: [
                        'number'
                    ]
				},
				options: [
					{
						label: '待审核',
						value: 1,
					},
					{
						label: '审核通过',
						value: 2,
					},
					{
						label: '审核驳回',
						value: 3,
					},
					{
						label: '实名认证处理中',
						value: 4
					}
				]
			},
		}"
		:thead="[
			'账号', '手机号', '申请方', '认证类型', '申请时间', '审核状态', '审核时间', '操作'
		]">
		<template
			#tr="{id, account, phoneNumber, applicant, applicationDate, certificationDate, certificationType, status}">
			<td>
				{{ account }}	
			</td>
			<td>
				{{ phoneNumber }}
			</td>
			<td>
				{{ applicant }}
			</td>
			<td>
				{{ certificationType }}
			</td>
			<td>
				{{ applicationDate }}
			</td>
			<td>
				{{ status }}
			</td>
			<td>
				{{ certificationDate }}
			</td>
			<td>
				<router-link
					class="text-blue-500 hover:text-blue-800"
					:to="{
						name: 'verifications/show',
						params: {
							id,
						}
					}">
					操作
				</router-link>
			</td>
		</template>
	</i-paginatable-page>

</template>

<script setup>

import IPaginatablePage from '~ui/components/paginatable-page/component.vue';


</script>

<script>
import translator from '~/mixins/translators/verification.js';
export default {

    mixins: [
        translator,
    ],

    metaInfo() {
        return {
            title: '实名认证审核'
        };
    }
}

</script>