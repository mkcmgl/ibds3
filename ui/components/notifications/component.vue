<template>
	<notifications
        position="top center"
        width="400px"
        :max="3"
        :duration="3000">
        <template
            #body="props">
            <div
                class="border-2 shadow py-1.5 px-3 rounded mt-3 relative min-h-[3rem] w-[400px] flex items-center text-sm"
                :class="getColorClasses(props.item.type ?? null)"
                role="alert">
                <div
                    class="w-[calc(100%-2.5rem)]">

                    <p>
                        <template
                            v-if="Object.keys(props.item.data).includes('icon')">
                            <i
                                class="mdi mr-2"
                                :class="props.item.data.icon"></i>
                        </template>
                        <span
                            class="text-slate-600"
                            v-html="props.item.text"></span>
                    </p>
                    
                </div>
                <span
                    class="absolute right-2 top-1/2 translate-y-[-50%]">
                    <button
                        type="button"
                        @click="props.close"
                        class="rounded w-10 h-10 block "
                        aria-label="关闭提示框"
                        v-wave>
                        <i class="mdi mdi-close"></i>
                    </button>
                </span>
            </div>
        </template>
    </notifications>
</template>

<script>
import script from './script.js';

export default {

    name: 'i-notifications',

    mixins: [
        script,
    ],
}
</script>