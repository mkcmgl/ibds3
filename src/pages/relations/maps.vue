<template>
    <header
        class="my-6 flex items-center justify-between">
        <h1
            class="text-xl font-semibold">
            数据溯源
        </h1>
    </header>

    <i-filter
        :filters="{
            txHash: '交易哈希',
        }"/>

    <div
        v-if="Object.keys(data).length"
        class="flex my-6">
        <maps-charts
            @active-hash="setActiveHash"
            ref="chart"
            class="w-full"
            :data="data"/>
    </div>

    <hash-dialog
        v-model="showHashDialog"
        v-if="activeHash"
        :hash="activeHash"/>

</template>

<script setup>
import IFilter from '~ui/components/paginatable-page/filter/component.vue';
import MapsCharts from '~/prefabs/relations/maps/charts.vue';
import HashDialog from '~/components/hash-dialog.vue';
</script>

<script>
import axios from '~/plugins/axios.js';

export default {

    metaInfo() {
		return {
			title: '数据溯源'
		}
	},

    computed: {
        txHash() {
            return this.$route.query.txHash || '';
        },
    },

    watch: {
        txHash() {
            this.fetchData();
        },
    },

    beforeMount() {
        this.fetchData();
    },

    data() {
        return {
            loading: false,
            data: {},

            activeHash: null,
            showHashDialog: false,
        }
    },

    methods: {
        fetchData() {
            this.loading = true;
            axios.get(
                '/trace/flow/initLinks',
                {
                    params: {
                        txHash: this.txHash,
                    },
                }
            )
            .then(({ data }) => {
                this.data = data.links;
            })
            .finally(() => {
                this.loading = false;
            });
        },

        setActiveHash(hash) {
            this.activeHash = hash;
            this.showHashDialog = true;
        },
    },
}
</script>