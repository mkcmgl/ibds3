<template>
    <td>
        <button class="text-blue-600 hover:text-blue-400 w-[max(6rem,300px)] truncate" type="button" 
            :title="dataStorage.transactionId"
            @click="showHashDialog = true">
            {{ dataStorage.transactionId }}
        </button>


    </td>
    <td>
        {{ dataStorage.bizTypeId }}
    </td>
    <td>
        {{ dataStorage.bizId }}
    </td>
    <td>
        {{ dataStorage.userId }}
    </td>
    <td>
        {{ dataStorage.useEncrypt }}
    </td>
    <td>
        {{ dataStorage.createTime }}
    </td>
    <hash-dialog v-model="showHashDialog" :hash="dataStorage.bizId" />
</template>

<script setup>
import HashDialog from '~/components/dataStorage-dialog.vue';

const props = defineProps({
    dataStorage: {
        type: Object,
        required: true
    }
});

</script>
<script>
export default {
    data() {
        return {
            showHashDialog: false,
        }
    },
}

</script>