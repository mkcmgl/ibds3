<style lang="scss">
    .i-paginator {
        a {
            @apply border mx-1 w-9 h-9 flex items-center justify-center rounded text-sm; 
        }
    }
</style>

<template>
	<footer
		class="mt-4 flex items-center justify-end -mx-2 i-paginator">
		
		<span
			class="text-sm mx-2">
			共 {{ total }} 条
		</span>

		<nav
			class="paginator mx-2 flex items-center">
			<a
				@click.prevent="
					pageNum === 1 ? false : changePage(pageNum === 1 ? 1 : pageNum - 1)
				"
				:href="$router.resolve(getRouteFromPage(pageNum === 1 ? 1 : pageNum - 1)).href"
				:disabled="pageNum === 1"
				title="上一页"
				v-wave="pageNum !== 1">
				<i
					class="mdi mdi-arrow-left"></i>
			</a>

			<template
				v-for="index in pageIndexArray">
				<span
					class="select-none px-2"
					v-if="
						index === (length - 2) &&
						pageNum < (length - 4)
					">
					...
				</span>
				<a
					:href="$router.resolve(getRouteFromPage(index)).href"
					@click.prevent="changePage(index)"
					:class="{
						'bg-blue-500 text-white': index === pageNum,
						'text-blue-500': index !== pageNum
					}"
					:style="{
						'font-size': `${Math.pow(2, (-1 * index.toString().length) + 1) * 100}%`
					}"
					v-wave>
					{{ index }}
				</a>
				<span
					class="select-none px-2"
					v-if="
						index === 3 &&
						pageNum > 5
					">
					...
				</span>
			</template>

			<a
				@click.prevent="
					pageNum === length ? false : changePage(pageNum === length ? length : pageNum + 1)
				"
				:href="$router.resolve(getRouteFromPage(pageNum === length ? length : pageNum + 1)).href"
				:disabled="pageNum === length"
				title="下一页"
				v-wave="pageNum !== length">
				<i
					class="mdi mdi-arrow-right"></i>
			</a>
		</nav>

		<form
			@submit.prevent="changePageByInput"
			class="flex items-center mx-2 text-sm">
			前往
			<input
				class="w-24 mx-2 p-2 border-2 rounded text-sm bg-transparent"
				type="number"
				step="1"
				:min="1"
				:max="length"
				ref="pageNumInput"
				:value="pageNum"
				@keydown.enter="changePage($event.target.value)"/>
			页
		</form>
	</footer>
</template>

<script>
import script from './script.js';

export default {

	name: 'i-paginator',

	mixins: [
        script
    ],
}
</script>