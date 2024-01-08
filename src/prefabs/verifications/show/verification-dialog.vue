<template>

    <i-button
        class="w-32"
		@click="show = true"
		:disabled="disabled">
		审核
    </i-button>

    <i-dialog
        v-model="show"
        prevent
        :loading="loading">

        <template
            #title>
            账户审核
        </template>

        <template
            v-slot="{ close }"
            #default>
        
            <i-form
                @submit="handleSubmit"
                ref="form"
                class="p-6">


                <div
                    class="flex items-center mb-4">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        审核结果
                    </p>
                    <span
						class="-mx-2">
						<label
							class="mx-2">
							<input
								type="radio"
								name="status"
								required
								value="2"
								v-model="form.status">
							通过
						</label>
						<label
							class="mx-2">
							<input
								type="radio"
								name="status"
								required
								value="3"
								v-model="form.status">
							驳回
						</label>
					</span>
                </div>

                <div
                    v-if="form.status == 3"
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        驳回理由
                    </p>
                    <i-textarea
                        class="w-[calc(100%-8rem)]"
                        v-model="form.rejectReason"
                        v-model:error="error.rejectReason"
                        placeholder="请输入驳回理由"
                        attr="驳回理由"
                        name="rejectReason"
                        :max="100"
                        :rules="[
                            'required',
                            'max:100'
                        ]"/>
                </div>

                <footer
                    class="flex items-center justify-between">

                    <button
                        class="border-slate-200 border-2 block h-[calc(theme('space.10')+2px)] rounded overflow-hidden transition tracking-widest scale-100 active:scale-[99%] hover:scale-[101%] w-32"
                        type="button"
                        v-wave
                        @click="close">
                        取消
                    </button>

                    <i-button
                        class="w-32"
                        :loading="loading">
                        审核
                    </i-button>
                </footer>

            </i-form>
        </template>

    </i-dialog>

</template>

<script setup>
import IDialog from '~ui/components/dialog/component.vue';
import IForm from '~ui/components/form/component.vue';
import IButton from '~ui/components/button/component.vue';
import ITextarea from '~ui/components/textarea/component.vue';
</script>

<script>

import { notify } from '@kyvg/vue3-notification';
import axios from '~/plugins/axios.js';

export default {

    props: {
        userId: {
			required: true,
		},
        disabled: {
			required: true,
			type: Boolean,
		}
    },

    emits: [
        'update:modelValue',
        'refresh'
    ],

    watch: {
        show(value) {
            if (!value) {
                this.form = {
                    status: '',
                    rejectReason: '',
                };
            }
        },
        'form.status'(value) {
            if (value == 2) {
                this.error.rejectReason = '';
            }
        }
    },

    data () {

        return {
            loading: false,
            show: false,
            form: {
                status: '',
                rejectReason: '',
            },
            error: {
                status: '',
                rejectReason: '',
            }
        }
    },

    methods: {
        handleSubmit() {
            this.loading = true;
            axios.post(
                    '/system/certificates/audit',
                    {
                        userId: this.userId,
                        ...this.form
                    }
                )
                .then(() => {
                    notify({
                        text: this.form.status == 2
							? '实名认证已通过，写入区块中'
							: '实名认证请求已驳回',
                        type: 'green',
                    });
                    this.$emit('refresh');
                    this.show = false;
                })
                .finally(() => {
                    this.loading = false;
                });                    
        }
    }
}
</script>