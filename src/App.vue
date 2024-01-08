<template>
    <metainfo>
		<template
			v-slot:title="{ content }">
			{{ content ? `${content} | ${appName}` : `${appName}` }}
		</template>
	</metainfo>
    <i-notifications/>
    <router-view/>
</template>

<script setup>
import INotifications from '~ui/components/notifications/component.vue';

const appName = import.meta.env.VITE_APP_NAME || '区块链开发服务系统 服务平台';
</script>