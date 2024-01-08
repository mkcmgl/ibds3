<template>

    <component
        :is="tag"
        class="block h-[calc(theme('space.10')+2px)] rounded overflow-hidden transition tracking-widest"
        :class="[
            computedDisabled
                ? 'cursor-not-allowed'
                : 'scale-100 active:scale-[99%] hover:scale-[101%]',
            outline
                ? 'border-2 ' + (
                    computedDisabled
                        ? 'text-slate-500 border-slate-500'
                        : 'text-blue-500 bg-transparent hover:text-blue-700 border-blue-500 hover:border-blue-700'
                )
                : (
                    computedDisabled
                        ? 'bg-blue-300 text-slate-200 opacity-50'
                        : 'bg-blue-500 text-white hover:bg-blue-700'
                )               
        ]"
        :disabled="computedDisabled"
        v-wave="!computedDisabled">
        <slot/>
    </component>

</template>

<script>
import script from './script.js';

export default {

    name: 'i-button',

    mixins: [
        script
    ],
    
}
</script>