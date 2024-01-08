<template>
	<div class=" overflow-auto w-full">
		<table
			class="i-table ">
			<thead>
				<slot name="thead"/>
			</thead>
			<tbody>
				<template
					v-if="loading">
					<tr
						v-for="i in 10">
						<td
							:colspan="attrsCount">
							<span
								class="i-loading h-4"
								aria-label="加载中"></span>		
						</td>
					</tr>
				</template>
				<template
					v-else>
					<tr
						v-for="card in list">
						<slot
							name="card"
							:card="card"/>
					</tr>
					<tr
						v-if="list.length === 0">
						<td
							:colspan="attrsCount"
							class="text-slate-500 text-center">
							<p
								class="py-4 text-base">
								未找到相关结果
							</p>
						</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>

</template>

<script>
import script from './script.js';

export default {

    name: 'i-list',

    mixins: [
        script
    ],
}
</script>