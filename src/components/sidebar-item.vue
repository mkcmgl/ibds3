<style lang="scss">
.sidebar-item {

    @apply text-sm;

    &>summary::-webkit-details-marker {
        display: none;
    }

    summary>p>svg,
    i {
        @apply fill-current mr-4;
    }

    summary>span {
        @apply transition-[transform] rotate-180;
    }

    &[open]>summary>span {
        @apply rotate-0;
    }

    a:not(.router-link-exact-active) {
        @apply border-transparent hover:bg-blue-600/25;
    }
}
</style>

<template>
    
    <p v-if="item.noChildren" class=" select-none list-none text-sm"  >
        <router-link active-class="bg-blue-600/25 border-blue-600"
            class="block px-6 py-4 "
                :to="item.route" 
                v-wave  v-html="item.label">
        </router-link>
    </p>
    <details v-else class="sidebar-item">

        <summary  class="cursor-pointer select-none list-none flex items-center px-6 py-4 relative" v-wave>
            <p class="flex items-center" v-html="item.label" />
            <span class="block absolute right-6">
                <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="10" height="5.795"
                    viewBox="0 0 10 5.795">
                    <path
                        d="M171.376,362.025a.753.753,0,0,0,1.011.049l.054-.049,3.725-3.725,3.7,3.749a.753.753,0,0,0,1.011.055l.054-.048a.753.753,0,0,0,.055-1.011l-.048-.054-4.233-4.289a.753.753,0,0,0-1.017-.05l-.051.047-4.261,4.261a.753.753,0,0,0,0,1.066Z"
                        transform="translate(-171.155 -356.479)" />
                </svg>
            </span>
        </summary>
        <ul>
            <li v-for="({ label, route }) in item.items">
                <router-link active-class="bg-blue-600/25 border-blue-600"
                    class="block pr-6 pl-[calc(theme('space.12')+2px)] py-4 border-l-4" 
                    :to="route" v-html="label" 
                    v-wave />
            </li>
        </ul>
    </details>
</template>

<script>
export default {

    props: {
        item: {
            type: Object,
            required: true
        }
    },
}
</script>
