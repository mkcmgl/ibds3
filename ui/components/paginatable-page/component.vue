<template>
	<i-filter
		v-if="filters"
		:filters="filters"/>
	<div
		class="my-6 p-6 bg-white rounded">
		<slot name="caption"/>
		<i-list
			:loading="loading"
			:attrs-count="attrsCount"
			:list="data.rows">
			<template
				#thead>
				<slot
					name="thead">
					<tr>
						<th
							v-for="attr in thead"
							v-html="attr"/>
					</tr>
				</slot>		
			</template>
			<template
				#card="{ card }">
				<slot
					name="tr"
					v-bind="card"/>
			</template>
		</i-list>
		<i-paginator
			v-if="!disabledPaginator"
			:total="data.total"/>
	</div>
</template>

<script setup>
import IFilter from '~ui/components/paginatable-page/filter/component.vue';
import IList from '~ui/components/paginatable-page/list/component.vue';
import IPaginator from '~ui/components/paginatable-page/paginator/component.vue';
</script>

<script>

import script from './script.js';

export default {

    inheritAttrs: false,

    name: 'i-paginatable-page',

    mixins: [
        script,
    ],

	expose: [
		'refresh',
	],
    
}
</script>