<template>
    <component
		:is="tag"
		:type="type"
		@click="writeToClipboard">
		<slot/>
		<i
			class="ml-2 mdi mdi-content-copy"
			v-if="icon"/>
	</component>
</template>

<script>
import script from './script.js';

export default {

    name: 'i-copyer',

    mixins: [
        script
    ]
}
</script>