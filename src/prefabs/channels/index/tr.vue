<template>
    <td>
        <router-link
            class="text-blue-600 hover:text-blue-500"
            :to="{
                name: 'channels/show',
                params: {
                    id: channel.channelId
                }
            }">
            {{ channel.channelId }}
        </router-link>
    </td>
    <td>
        {{ channel.channelName }}
    </td>
    <td>
        {{ channel.userId }}
    </td>
    <td>
        {{ channel.description }}
    </td>
    <td>
        {{ channel.createTime }}
    </td>
</template>

<script setup>

const props = defineProps({
    channel: {
        type: Object,
        required: true
    }
});

</script>