<template>
	<form
		@submit.prevent="submit">
		<slot/>
	</form>
</template>

<script>
import script from './script.js';

export default {

    name: 'i-form',

    mixins: [
        script,
    ],
    
}
</script>