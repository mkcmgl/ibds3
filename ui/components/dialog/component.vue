<style lang="scss">
.dialog-enter-active {
	transition: all .15s ease;
	.i-dialog {
		animation: rebound-dialog .2s
	}
}
.dialog-leave-active {
	transition: all .1s ease;
	.i-dialog {
		transition: all .1s ease;
	}
}

.dialog-enter-from,
.dialog-leave-to {
	opacity: 0;
	.i-dialog {
		transform: scale(0.7);
	}
}

.i-dialog.shaking {
	animation: shaking-dialog .15s;
}

@keyframes rebound-dialog {
	0%{
		transform: scale(0.8);
	}
	40%{
		transform: scale(1.02);
	}
	80%{
		transform: scale(.98);
	}
	100%{
		transform: scale(1);
	}
}

@keyframes shaking-dialog {
	0%{
		transform: translateX(10px);
		filter: drop-shadow(0px 0px 0px theme('colors.red.300'));
	}
	25%{
		transform: translateX(-8px);
		filter: drop-shadow(0px 0px 15px theme('colors.red.300'));
	}
	50% {
		transform: translateX(6px);
		filter: drop-shadow(0px 0px 12px theme('colors.red.300'));
	}
	75%{
		transform: translateX(-4px);
		filter: drop-shadow(0px 0px 9px theme('colors.red.300'));
	}
	100%{
		transform: translateX(0px);
		filter: drop-shadow(0px 0px 0px theme('colors.red.300'));
	}
}
</style>

<template>

    <teleport
		to="body">
		
		<transition
			name="dialog">
			
			<div
				v-if="modelValue"
				class="fixed z-50 top-0 bottom-0 left-0 right-0 bg-slate-800/25 backdrop-blur overflow-y-auto"
				@click.self="prevent ? shakeDialog() : closeDialog()">

				<dialog
					class="i-dialog relative rounded p-0 transition-[transform,filter] mx-auto my-16"
					:class="{
						'shaking': shaking,
						'bg-white shadow': !customContent,
						'bg-transparent': customContent,
					}"
					:style="{
						'width': width,
						'height': height,
					}"
					v-bind="$attrs"
					open>

					<template
						v-if="!customContent">
						<header
							class="relative border-b-2 border-slate-200">
							<h3
								class="mr-16 px-6 text-lg font-bold h-16 leading-[4rem]">
								<slot
									name="title"/>
							</h3>
							<span
								class="right-2 top-1/2 absolute translate-y-[-50%]"
								v-if="!hideCloser">
								<button
									class="block h-12 w-12 text-center text-red-500 rounded"
									@click="closeDialog"
									aria-label="关闭模态框"
									v-wave>
									<i
                                        class="mdi mdi-close text-xl"></i>
								</button>
							</span>
						</header>
						<section>
                            <slot :close="closeDialog"/>
                        </section>
					</template>
					<template
						v-else>
						<slot :close="closeDialog"/>		
					</template>
					
				</dialog>
				
			</div>

		</transition>

	</teleport>

</template>

<script>
import script from './script.js';

export default {

    name: 'i-dialog',

    mixins: [
        script
    ],
    
}
</script>