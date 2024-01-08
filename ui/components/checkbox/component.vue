<style lang="scss">
    .login-checkbox {
        .checkbox {
            &::after {
                @apply h-[10px] w-[5px] absolute left-1.5 top-0.5 border-b-2 border-r-2 border-blue-600 block rotate-45 scale-0 transition-transform duration-75;
                content: ' ';
            }
        }

        input:checked ~ .checkbox {
            @apply bg-slate-100;

            &::after {
                @apply scale-100;
            }
        }
    }
</style>

<template>
    <label
        class="inline-flex items-center login-checkbox relative cursor-pointer"
        v-bind="wrapperAttrs">
        <input
            class="absolute opacity-0 h-0 w-0"
            type="checkbox"
            :checked="value"
            @change="value = $event.target.checked"
            v-bind="exceptWrapperAttrs"/>
        <span
            class="relative w-4 h-4 rounded-sm checkbox bg-slate-100"></span>
        <span
            class="ml-3 select-none cursor-pointer text-[90%]"
            v-if="hasPlaceholder">
            <slot/>
        </span>
    </label>
</template>

<script>
import script from './script.js';

export default {

    mixins: [
        script
    ],

}
</script>