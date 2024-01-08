<template>
    <ol
        class="flex items-center list-none">
        <li
            v-for="(label, index) in map"
            class="flex items-center">
            <h1
                class="text-2xl rounded-full p-[3px] mx-3 text-center text-white"
                :class="[
                    step >= index
                        ? 'bg-blue-500'
                        : 'bg-blue-100'
                ]">
                <span
                    class="h-[60px] w-[60px] flex items-center justify-center rounded-full border-[4px] border-white">
                    {{ index + 1 }} 
                </span>
            </h1>
            <p
                class="mx-3">
                {{ label }}
            </p>
            <div
                v-if="index !== (map.length - 1)"
                class="relative">
                <hr
                    class="border-b-2 border-dotted border-t-0 border-x-0 border-blue-300 w-[100px] relative top-1/2"/>
            </div>
            
        </li>
    </ol>
</template>

<script>
import script from './script.js';

export default {

    name: 'i-steps',

    mixins: [
        script,
    ],
}
</script>