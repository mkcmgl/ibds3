<style lang="scss">
    .login-checkbox {
        .checkbox {
            &::after {
                @apply h-[10px] w-[5px] absolute left-1.5 top-0.5 border-b-2 border-r-2 border-white block rotate-45 scale-0 transition-transform duration-75;
                content: ' ';
            }
        }

        input:checked ~ .checkbox {
            @apply bg-blue-500;

            &::after {
                @apply scale-100;
            }
        }
    }
</style>

<template>
    <label
        class="inline-flex items-center login-checkbox relative cursor-pointer">
        <input
            class="absolute opacity-0 h-0 w-0"
            type="checkbox"
            :checked="value"
            @change="value = $event.target.checked"/>
        <span
            class="relative w-4 h-4 rounded-sm checkbox bg-blue-600"></span>
        <span
            class="ml-3 select-none cursor-pointer text-blue-400 text-[90%]"
            v-if="hasPlaceholder">
            <slot/>
        </span>
    </label>
</template>

<script>
import CheckboxScript from '~ui/components/checkbox/script.js';

export default {

    mixins: [
        CheckboxScript
    ],

}
</script>