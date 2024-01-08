<style lang="scss">
    .login-button {
        background-image: linear-gradient(90deg,#65DAFB 0%,#3642CB 100%);
    
        &::before {
            position: absolute;
            content: " ";
            inset: 0;
            background-image: linear-gradient(270deg, #65DAFB 0%, #3642CB 100%);
            z-index: -1;
            transition: opacity 0.25s linear;
            opacity: 0;
        }

        &:hover::before {
            opacity: 1;
        }
    }
</style>

<template>
    <button
        class="login-button overflow-hidden p-2.5 text-center text-blue-100 rounded-full w-full mb-4 tracking-widest relative"
        :disabled="computedDisabled"
        :class="[
            {
                'cursor-not-allowed backdrop-grayscale': computedDisabled,
                'scale-100 hover:scale-[101%] active:scale-[99%] transition': !computedDisabled,
            }
        ]"
        v-wave="!computedDisabled">

        <i
            v-if="loading"
            class="mdi mdi-loading mdi-spin mr-2"></i>

        <slot/>
    </button>
</template>

<script>
import ButtonScript from '~ui/components/button/script.js';

export default {

    mixins: [
        ButtonScript
    ],

}
</script>