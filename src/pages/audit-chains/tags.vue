<template>

    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            侧链标签
        </h1>
        <span
            class="flex -mx-2">
            <i-button
                class="flex items-center justify-center mx-2 px-2"
                @click="showStoreDialog = true">
                <plus-icon
                    class="mr-2"/>
                申请侧链标签
            </i-button>
        </span>
    </header>

    <i-paginatable-page
        ref="page"
        api="/logLabel/label/list"
        :thead="[
            '标签Id', '标签名称', '标签哈希', '证书ID', '通道名称', '交易数', '创建时间', '操作'
        ]">

        <template
			#tr="{ label, labelName, labelHash, identityId, channelName, txCount, createTime }">
            <td>
                {{ label }}
            </td>
            <td>
                {{ labelName }}
            </td>
            <td>
                <span
                    class="
                        truncate
                        block
                        w-32
                    ">
                    {{ labelHash }}
                </span>
            </td>
            <td>
                {{ identityId }}
            </td>
            <td>
                {{ channelName }}
            </td>
            <td>
                {{ txCount }}
            </td>
            <td>
                {{ createTime }}
            </td>
            <td>
                <router-link
                    class="
                        text-blue-500
                        hover:underline
                    "
                    :to="{
                        name: 'audit-chains/tags/edit',
                        params: {
                            id: label
                        },
                        query: {
                            from: $route.fullPath
                        }
                    }">
                    查看
                </router-link>
            </td>
        </template>
    </i-paginatable-page>

    <div
        class="my-6 p-6 bg-white rounded">
        <h3
            class="mb-4 font-bold text-lg">
            说明
        </h3>
        <p
            class="
                text-gray-500
                leading-6
                text-sm
            ">
            标签可以理解为每台物联网设备的标识，这台物联网设备上产生并上传的交易（日志）都在可以对应的标签下查找到 <br>
            您也可以将标签作为每个项目的标识，项目中产生的交易（日志）都可以在对应的标签下找到 <br>
            每个标签对应一对公私钥，用于对上传的交易（日志）签名与验签。您可以点击提取按钮来查询标签对应的公私钥
        </p>
    </div>



    <store-dialog
        v-model="showStoreDialog"
        @store="refresh"/>

</template>

<script setup>
import { ref } from 'vue';
import IPaginatablePage from '~ui/components/paginatable-page/component.vue';
import IButton from '~ui/components/button/component.vue';
import StoreDialog from '~/prefabs/audit-chains/tags/store-dialog.vue';
import PlusIcon from '~/components/icons/plus.vue';

const showStoreDialog = ref(false);

</script>

<script>
export default {

    metaInfo: {
        title: '侧链标签',
    },

    methods: {
        refresh() {
            this.$refs.page.refresh();
        },
    }
}
</script>