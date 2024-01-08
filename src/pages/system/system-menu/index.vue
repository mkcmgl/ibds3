<template>
    <header class="my-6 flex items-center justify-between">
        <h1 class="text-xl font-semibold">
            基础设置
        </h1>
    </header>
</template>

<script setup>

import { ref, onBeforeMount } from 'vue';
import axios from '~/plugins/axios.js';
import IPaginatablePage from '~ui/components/paginatable-page/component.vue';
import IButton from '~ui/components/button/component.vue';
import PlusIcon from '~/components/icons/plus.vue';

import DataStatisticsIndexTr from '~/prefabs/data-storage/tr.vue';


</script>

<script>
export default {

}
</script>