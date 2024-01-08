<template>
    <div
        class="rounded p-6 bg-white">
        <div
            class="h-[600px]"
            ref="dom"/>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import * as echarts from 'echarts';

let chart = null;

const props = defineProps({
    data: {
        type: Object,
    }
});

const emits = defineEmits(['active-hash']);

const graph = computed(() => {
    let nodes = [], links = [];
    props.data.nodes.forEach((id) => {
        nodes.push({
            name: id,
            label: {
                normal: {
                    show: false,
                }
            }
        });
    });
    props.data.links.forEach((rawLink) => {
        links.push({
            ...rawLink,
            linkStyle: {
                curveness: 0.2,
            }
        });
    });
    return {
        nodes,
        links: props.data.links,
    };
});

const dom = ref(null);



const initialChart = async () => {
    chart = echarts.init(dom.value);

    chart.on('click', (params) => {
        if (params.dataType === 'node') {
            emits('active-hash', params.name)
        }
    });
}

const setChartData = () => {
    let option = {
        tooltip: {
            formatter: (t) => {
                t.name = t.name.replace('>', '→');
                return `
                    <div
                        class="max-w-[400px] break-all whitespace-normal">
                        ${t.dataType === 'edge' ? t.seriesName + '：' : ''}
                        ${t.name}
                    </div>
                `;
            }
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
            {
                name: "交易溯源",
                type: "graph",
                layout: "circular",
                roam: true,
                focusNodeAdjacency: true,
                edgeSymbol: ["circle", "arrow"],
                edgeSymbolSize: [4, 10],

                circular: {
                    rotateLabel: true
                },
                data: graph.value.nodes,
                links: graph.value.links,


                lineStyle: {
                    normal: {
                        color: "target",
                        curveness: .3
                    }
                },
                markPoint: {
                    label: {
                        show: false,
                    }
                }
                
            }
        ]
    };
    chart.setOption(option);

    window && window.addEventListener('resize', () => {
        chart.resize();
    });
}

watch(() => props.data, () => {
    setChartData();
});

onMounted(() => {
    initialChart()
        .then(() => {
            setChartData();
        });
});

defineExpose({
    refresh: setChartData
});
</script>