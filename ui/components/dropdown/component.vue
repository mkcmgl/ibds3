<style lang="scss">

    .dropdown-enter-from,
    .dropdown-leave-to {
        @apply opacity-0;
        transform: rotateX(65deg) translateY(-15px);
    }

    .i-dropdown {

        & > ul:before {
            @apply absolute bottom-full right-4 block border-transparent border-8 border-b-white border-solid z-[-1];
            content: ' ';
        }

        li {
            &:first-child > * {
                @apply rounded-t;
            }

            &:last-child > * {
                @apply rounded-b;
            }
        }

        li > * {
            @apply bg-white p-2.5 w-full block border-b text-center;
        }

        li > button,
        li > a,
        li > .role-link {
            @apply hover:bg-blue-500 hover:text-white;
        }
    }
</style>

<template>
	<div
		class="i-dropdown relative"
		v-click-outside="() => {show = false}">
		<button
			type="button"
			@click="show = true"
			@focus="show = true"
			aria-label="显示下拉菜单"
            class="flex items-center justify-end w-full pr-8">
			<slot name="default"/>
            <span
                class="block absolute right-2 arrow-icon transition-[transform]"
                :class="{
                    'rotate-0': show,
                    'rotate-180': !show
                }">
                <svg
                    class="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="5.795"
                    viewBox="0 0 10 5.795">
                    <path d="M171.376,362.025a.753.753,0,0,0,1.011.049l.054-.049,3.725-3.725,3.7,3.749a.753.753,0,0,0,1.011.055l.054-.048a.753.753,0,0,0,.055-1.011l-.048-.054-4.233-4.289a.753.753,0,0,0-1.017-.05l-.051.047-4.261,4.261a.753.753,0,0,0,0,1.066Z" transform="translate(-171.155 -356.479)"/>
                </svg>
            </span>
		</button>
		<transition
			name="dropdown">
			<ul
				v-if="show"
				class="w-[min(100%,180px)] absolute top-[calc(100%+10px)] right-0 shadow-lg opacity-100 origin-top transition-all duration-150 min-w-[180px] bg-white z-10">
				<slot name="list"/>
			</ul>
		</transition>
	</div>
</template>

<script>
import script from './script.js';

export default {

    name: 'i-dropdown',

    mixins: [
        script
    ]
}
</script>