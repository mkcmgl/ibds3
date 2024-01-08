<style lang="scss">
    #login-tabs {
        .tabs-button {
            @apply py-3 w-[var(--option-width)];
            &.active {
                @apply text-blue-400 hover:text-blue-600;
            }
            &:not(.active) {
                @apply text-slate-400;
            }
        }
        &::after {
            @apply rounded block w-[30px] -translate-x-1/2 left-[var(--marker-offset)] h-[3px] absolute bottom-0 z-10 transition-[left] origin-center bg-blue-500;
	        content: ' ';
        }
    }
</style>

<template>
    <div
        id="login-tabs"
        class="flex relative mb-4"
        :style="computedStyles">
        <button
            v-for="({value, label}, index) in options"
            class="tabs-button"
            type="button"
            :class="{
                'active': activeTabIndex === index
            }"
            @click="computedModelValue = value"
            v-html="label"
            v-wave/>
    </div>
</template>

<script>
import TabsScript from '~ui/components/tabs/script.js';

export default {

    mixins: [
        TabsScript
    ],
}
</script>