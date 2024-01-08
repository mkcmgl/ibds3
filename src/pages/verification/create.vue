<template>

    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            实名认证
        </h1>
    </header>

    <div
        class="
        bg-white
            p-6
            my-6
            rounded
            relative
        "
        v-if="
            verificationStatus === 0 ||
            verificationStatus === 3
        ">

        <template
            v-if="
                userType === ''
            ">

            <p
                v-if="verificationStatus === 3"
                class="
                    mb-6 py-2 px-6 bg-red-50 border-2 border-red-400 rounded
                ">
                <strong>
                    驳回理由
                </strong>    ：{{ rejectReason }}
            </p>

            <div
                class="w-[200px] flex items-center mx-auto">
                
                <button
                    class="
                        flex
                        mx-2 text-slate-800 hover:text-blue-600 whitespace-nowrap
                        border-2 rounded p-4 border-slate-200 hover:border-blue-400
                    "
                    type="button"
                    @click="userType = 'company'">
                    <i
                        class="
                            mdi mdi-office-building pr-2
                        "></i>
                    企业认证    
                </button>

                <button
                    class="
                        flex
                        mx-2 text-slate-800 hover:text-blue-600 whitespace-nowrap
                        border-2 rounded p-4 border-slate-200 hover:border-blue-400
                    "
                    type="button"
                    @click="userType = 'individual'">
                    <i
                        class="
                            mdi mdi-account pr-2
                        "></i>
                    个人认证
                </button>

            </div>
        </template>
        <template
            v-else>
            <company-form
                v-if="
                    userType === 'company'
                "
                @submitted="updateUserInfo"/>
            <individual-form
                v-else
                @submitted="updateUserInfo"/>
        </template>

        
    </div>

    <div
        class="
        bg-white
            p-6
            my-6
            rounded
            relative
        "
        v-else>
        {{ translateVerification('status', verificationStatus) }}
    </div>


</template>

<script setup>
import { useAuth } from '~/store/auth.js';
import { ref, computed } from 'vue';

const auth = useAuth();

const verificationStatus = computed(() => {
    return auth.verificationStatus;
});

const rejectReason = computed(() => {
    return auth.user.rejectReason;
});

const userType = ref('');

const updateUserInfo = async () => {
    await auth.forceRefreshUser();
}

</script>

<script>

import { defineAsyncComponent, ref } from 'vue';
import translator from '~/mixins/translators/verification.js';

export default {

    mixins: [
        translator
    ],

    metaInfo: {
        title: '实名认证'
    },

    components: {
        IndividualForm: defineAsyncComponent(() => import('~/prefabs/verification/create/individual-form.vue')),
        CompanyForm: defineAsyncComponent(() => import('~/prefabs/verification/create/company-form.vue')),
    }
}
</script>