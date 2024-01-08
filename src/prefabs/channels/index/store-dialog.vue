<template>

    <i-dialog
        v-model="show"
        prevent
        :loading="loading">

        <template
            #title>
            创建通道
        </template>

        <template
            v-slot="{ close }"
            #default>
        
            <i-form
                @submit="store"
                ref="form"
                class="p-6">

                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        名称
                    </p>
                    <i-input
                        class="w-[calc(100%-8rem)]"
                        v-model="form.channelName"
                        v-model:error="error.channelName"
                        placeholder="请输入虚拟通道名称"
                        attr="虚拟通道名称"
                        name="name"
                        :rules="[
                            'required',
                            'no-emoji',
                            'max:20'
                        ]"/>
                </div>


                <div
                    class="flex">
                    <p
                        class="w-32 leading-[3rem] text-right mr-4">
                        描述
                    </p>
                    <i-textarea
                        class="w-[calc(100%-8rem)]"
                        v-model="form.description"
                        v-model:error="error.description"
                        placeholder="请输入虚拟通道描述"
                        attr="虚拟通道描述"
                        name="description"
                        :max="100"
                        :rules="[
                            'required',
                            'no-emoji',
                            'max:100'
                        ]"/>
                </div>

                <footer
                    class="flex items-center justify-between">

                    <button
                        class="border-slate-200 border-2 block h-[calc(theme('space.10')+2px)] rounded overflow-hidden transition tracking-widest scale-100 active:scale-[99%] hover:scale-[101%] w-32"
                        type="button"
                        v-wave
                        :disabled="loading"
                        @click="close">
                        取消
                    </button>

                    <i-button
                        class="w-32"
                        :loading="loading">
                        确定
                    </i-button>
                </footer>

            </i-form>
        </template>

    </i-dialog>

</template>

<script setup>
import IDialog from '~ui/components/dialog/component.vue';
import IForm from '~ui/components/form/component.vue';
import IInput from '~ui/components/input/component.vue';
import IButton from '~ui/components/button/component.vue';
import ITextarea from '~ui/components/textarea/component.vue';
</script>

<script>

import axios from '~/plugins/axios.js';
import { notify } from '@kyvg/vue3-notification';
import { useAuth } from '~/store/auth.js';

export default {

    props: {
        modelValue: {
            required: true,
            type: Boolean
        },
    },

    emits: [
        'update:modelValue',
        'store',
    ],

    data() {
        return {
            form: {
                channelName: '',
                description: '',
            },
            error: {
                channelName: '',
                description: '',
            },

            loading: false,
        }
    }, 

    computed: {
        show: {
            get() {
                return this.modelValue;
            },
            set(value) {

                if (!value) {
                    this.$refs.form.refresh();
                }

                this.$emit('update:modelValue', value);
            } 
        }
    },

    methods: {
        store() {
            this.loading = true;

            const { user } = useAuth();

            const memberList = [
                user.userId
            ];

            axios.post('/channel/create', {
                    ...this.form,
                    memberList,
                })
                .then(() => {
                    notify({
                        text: '虚拟通道创建成功',
				        type: 'green',
                    });
                    this.show = false;
                    this.$emit('store');
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>