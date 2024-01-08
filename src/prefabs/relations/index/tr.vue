<template>
    
    <td>
        <button
            type="button"
            class="text-blue-600 no-underline hover:underline"
            @click="showDetailDialog = true">
            {{ relation.traceId }}
        </button>
    </td>
    <td>
        <button
            type="button"
            class="text-blue-600 hover:text-blue-400 w-[min(8rem,500px)] truncate"
            @click="handleShowHashDialog(relation.rootTransactionHash)"
            :title="relation.rootTransactionHash">
            {{ relation.rootTransactionHash }}
        </button>
    </td>
    <td>
        <button
            type="button"
            class="text-blue-600 hover:text-blue-400 w-[min(8rem,500px)] truncate"
            @click="handleShowHashDialog(relation.currentTransactionHash)"
            :title="relation.currentTransactionHash">
            {{ relation.currentTransactionHash }}
        </button>
    </td>
    <td>
        {{ enums['bizType'][relation.bizType] }}
    </td>
    <td>
        {{ relation.bizId }}
    </td>
    <td>
        {{ relation.createTime }}
    </td>
    <td>
        <button
            type="button"
            class="text-blue-600"
            @click="showAddDialog = true">
            追加
        </button>
    </td>

    <detail-dialog
        v-model="showDetailDialog"
        :relation="relation"/>

    <add-dialog
        v-model="showAddDialog"
        :relation="relation"/>
    
    <hash-dialog
        v-model="showHashDialog"
        :hash="activeHash"/>

</template>

<script setup>
import DetailDialog from './detail-dialog.vue';
import HashDialog from '~/components/hash-dialog.vue';
import AddDialog from './add-dialog.vue';
import enums from '~/enums.json';
</script>

<script>
export default {

    props: {
        relation: {
            required: true,
        }
    },

    data() {
        return {
            showDetailDialog: false,
            showAddDialog: false,
            showHashDialog: false,
            
            activeHash: '',
        }
    },

    methods: {
        handleShowHashDialog(hash) {
            this.showHashDialog = true;
            this.activeHash = hash;
        }
    },
}
</script>