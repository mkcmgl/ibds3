<template>

	<section
		class="inspur-media-input-wrapper relative mb-6"
		:class="{
			'flex items-center': display === 'column',
		}"
		:key="`inspur-media-input-${id}`"
		v-bind="$attrsClassStyleIdOnly">

		<component
			:is="previewSrc ? 'div' : 'label'"
			:for="`inspur-media-input-${id}`"
			class="inspur-media-input border-slate-200 border-2 rounded relative h-[200px] w-[min(360px,100%)] flex items-center justify-center cursor-pointer"
			:class="{
				'invalid': hasError,
			}">

			<input
				class="outline-none opacity-0"
				:id="`inspur-media-input-${id}`"
				role="input"
				type="file"
				ref="input"
				v-bind="$attrsWithoutClassStyleId"
				@change="addMedia"
				:accept="accepts" 
				:required="
					(required || false) ?
						(computedValue.size ? false : true) :
						false
				">

			<component
				:is="previewTag"
				class="max-w-full max-h-full absolute"
				v-if="previewSrc"
				:src="previewSrc"
				controls/>

			<button
				v-if="previewSrc"
				class="absolute top-1 right-1 w-10 h-10 block rounded-full"
				aria-label="删除文件"
				@click="refresh"
				v-wave>
				<i
                    class="
                        mdi mdi-delete-outline 
                    "></i>
			</button>

			
			<span
				v-if="!previewSrc"
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
				<i
                    class="
                        mdi mdi-plus
                    "/>
				<slot name="hint">
					添加文件
				</slot>
			</span>
		</component>

		<ol
			v-if="!hideTips"
			class="text-sm list-decimal leading-6 my-2"
			:class="[
				{
					'text-red-500': hasError,
					'text-slate-400': !hasError
				},
				display === 'row'
					? 'pl-6'
					: 'pl-10'
			]">
			<slot
				name="tips">
				<li>
					支持图片（jpg、png、gif格式）、音频（mp3、wav）、视频（mp4、mpeg、avi）
				</li>
				<li>
					一次只上传一个文件、且不超过50M
				</li>
				<li>
					为保障原创者的合法权益请上传自有原创文件
				</li>
			</slot>
		</ol>	
		
		<p
			class="text-xs text-red-500 absolute leading-6 top-full left-0"
			v-if="hasError"
			v-html="error"/>

	</section>

</template>

<style lang="scss">
.inspur-media-input-wrapper {

	.inspur-media-input {

		@apply text-slate-400;

		&:not(.invalid) {
			&:focus,
			&:hover {
				@apply border-blue-500 text-blue-500 cursor-pointer;
			}
		}

		&.invalid {
			@apply border-red-300 text-red-300;
		}
	}

}
</style>

<script>

import input from '~ui/mixins/input.js';

export default {

	mixins: [
		input,
	],

	name: 'i-media-input',

	props: {
		

		required: {
			required: false,
			type: Boolean,
			default: false,
		},

		hideTips: {
			required: false,
			type: Boolean,
			default: false,
		},

		rules: {
			type: Array,
			default: () => [
				'file',
				'mimetypes:image/png,image/jpg,image/jpeg,image/gif,audio/mpeg,audio/wav,video/mp4,video/mpeg,video/avi',
			]
		},

		display: {
			required: false,
			type: String,
			default: 'row',
			validator: display => {
				return ['row', 'column'].includes(display);
			},
		},


	},

	data() {
		return {
			previewSrc: '',
			previewTag: 'img',
		}
	},

	computed: {
		accepts() {
			let rules = Array.isArray(this.rules)
				? this.rules
				: this.rules.split('|');

			let acceptFormats = rules.find(rule => rule.startsWith('mimetypes:'));

			if (acceptFormats) {
				return acceptFormats.replace('mimetypes:', '');
			}
			else {
				return false;
			}
		},
	},

	emits: [
		'blur',
		'update:modelValue'
	],

	methods: {
		addMedia() {

			this.previewSrc = '';

			let { input } = this.$refs;

			if (input.files === undefined) {
				input.value = '';
				return false;
			}

			let files = input.files;

			if (files.length === 0) {
				input.value = '';
				return false;
			}

			this.value = files[0];

			setTimeout(() => {
				let error = this.validateManually();

				if (!error) {
					switch(files[0].type.split('/')[0]) {
						case 'image':
							this.previewTag = 'img';
							break;
						case 'video':
							this.previewTag = 'video';
							break
						case 'audio':
							this.previewTag = 'audio';
							break;
					}
					this.previewSrc = URL.createObjectURL(files[0]);

					this.$emit(
						'update:error',
						''
					);
				}

				this.$emit('blur');

				input.value = '';
				
			}, 0);
		},
		clearValue() {
			this.$emit(
				'update:modelValue',
				null
			);
			this.previewSrc = '';
		},
	}
}
</script>