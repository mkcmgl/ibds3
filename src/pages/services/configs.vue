<template>
    <h1
        class="my-6 text-xl font-semibold">
        配置管理
    </h1>

    <div
        class="p-6 bg-white rounded my-6">
        <div
            class="flex mb-2"
            v-for="(value, key) in configs">
            <p
                class="w-[100px]">
                {{ key }}
            </p>
            <p
                class="w-[calc(100%-100px)]">
                <i-copyer
                    class="cursor-pointer hover:text-blue-600 text-slate-700"
                    :content="value">
                    {{ value }}
                </i-copyer>
            </p>
        </div>
    </div>
</template>

<script setup>
import ICopyer from '~ui/components/copyer/component.vue';
</script>

<script>
import axios from '~/plugins/axios.js';

export default {

    metaInfo: {
        title: '配置管理',
    },

    data() {
        return {
            loading: true,
            configs: {},
        }
    },
    
    beforeMount() {
        this.fetchConfigs();
    },

    methods: {
        fetchConfigs() {
            this.loading = true;
            axios.get(`/system/user/getApiInfo`)
                .then(({ data }) => {
                    this.configs = data.data;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }

}
</script>