<style lang="scss">
    #steps-list {
        @apply flex items-center justify-center -mx-2;

        .step {
            
            @apply flex items-center justify-center mx-2;
            
            span {
                @apply h-8 w-8 rounded-full block leading-8 text-center mr-4 border text-slate-300 border-slate-300;
            }

            &:not(:last-child)::after {
                @apply h-1 w-[100px] border-b-2 block ml-2;
                content: ' ';
            }

            &.current-step {
                span {
                    @apply bg-blue-500 text-white border-blue-500;
                }
            }
            &.after-step {
                span {
                    @apply bg-white text-blue-500 border-blue-500;
                }
            }
        }
        
    }

    span {
        @apply cursor-text;
    }
    
</style>

<template>
    
    <td>
        {{ random.randomIndex }}
    </td>
    <td>
        {{ random.randomNumber }}
    </td>
    <td>
        <button
            @click="show = true"
            class="text-sm text-white bg-blue-500 hover:bg-blue-400 p-1.5 rounded"
            v-wave>
            校验
        </button>
    </td>

    <i-dialog
        width="70vw"
        v-model="show">
        <template #title>
            随机数生成过程
        </template>
        <header
            class="my-8">

            <ul
                id="steps-list">
                <li
                    class="step"
                    v-for="(label, index) in [
                        '算法介绍',
                        '基本信息',
                        '拼接',
                        '计算'
                    ]"
                    :class="{
                        'current-step': step === (index + 1),
                        'after-step': step > index + 1,
                    }">
                    <span>
                        <template
                            v-if="step > index + 1">
                            <i
                                class="mdi mdi-check"></i>
                        </template>
                        <template
                            v-else>
                            {{ index + 1 }}
                        </template>
                    </span>
                    {{ label }}
                </li>
            </ul>

        </header>

        <div
            class="my-8 text-sm min-h-[300px]">
            
            <div
                class="w-4/5 mx-auto">
                <template
                    v-if="step === 1">
                    <ul>
                        <li
                            class="mb-4">
                            <h5
                                class="text-base mb-2 font-bold">
                                参数
                            </h5>
                            <p>
                                可信随机数范围R、 创建时输入I、 随机数个数M、 随机数N、 交易哈希、 交易时间戳、 字符串A <br>
                                其中，交易哈希为将随机数描述，随机数范围等信息写链而获得。 字符串A为拼接而成，拼接过程如下
                            </p>
                        </li>
                        <li
                            class="mb-4">
                            <h5
                                class="text-base mb-2 font-bold">
                                情况分解
                            </h5>
                            <p
                                class="flex items-start my-1">
                                <span
                                    class="w-[200px] inline-block">
                                    输入I不为空，个数M大于1
                                </span>
                                <span
                                    class="font-bold w-[calc(100%-200px)] inline-block">
                                    顺序拼接交易哈希、交易时间戳、输入、序号（从0开始)获得A
                                </span>
                            </p>
                            <p
                                class="flex items-start my-1">
                                <span
                                    class="w-[200px] inline-block">
                                    输入I不为空，个数M为1
                                </span>
                                <span
                                    class="font-bold w-[calc(100%-200px)] inline-block">
                                    顺序拼接交易哈希、交易时间戳、输入获得A
                                </span>
                            </p>
                            <p
                                class="flex items-start my-1">
                                <span
                                    class="w-[200px] inline-block">
                                    输入I为空，个数M大于1
                                </span>
                                <span
                                    class="font-bold w-[calc(100%-200px)] inline-block">
                                    顺序拼接交易哈希、交易时间戳、序号（从0开始）获得A
                                </span>
                            </p>
                            <p
                                class="flex items-start my-1">
                                <span
                                    class="w-[200px] inline-block">
                                    输入I为空，个数M为1
                                </span>
                                <span
                                    class="font-bold w-[calc(100%-200px)] inline-block">
                                    顺序拼接交易哈希、交易时间戳获得A
                                </span>
                            </p>
                            <p
                                class="flex items-start my-1">
                                <span
                                    class="w-[200px] inline-block">
                                    有重复随机数
                                </span>
                                <span
                                    class="font-bold w-[calc(100%-200px)] inline-block">
                                    随机数个数大于1的情况下，如果当前生成的随机数之前已经生成，则将序号加1，重新生成拼接字符串A
                                </span>
                            </p>
                        </li>
                        <li
                            class="mb-4">
                            <h5
                                class="text-base mb-2 font-bold">
                                计算过程
                            </h5>
                            <p>
                                使用MD5算法对字符串A进行哈希，获得哈希之后的字符串H，取H的后5位记为B，将B作为一个十六进制数，进而转换为十进制数C <br>
                                随机数的计算方式为：N = (C*R)/1048576，将N向下取整
                            </p>
                        </li>
                    </ul>
                </template>
                
                <template
                    v-else-if="step === 2">
                    <ul>
                        <li
                            class="flex items-start mb-4">
                            <span
                                class="w-[100px] inline-block font-bold">
                                交易哈希
                            </span>
                            <i-copyer
                                tag="span"
                                class="text-slate-900 hover:text-blue-600 cursor-pointer w-[calc(100%-100px)] inline-block"
                                :content="entire.random_macro.transactionId">
                                {{ entire.random_macro.transactionId }}
                            </i-copyer>
                        </li>
                        <li
                            class="flex items-start mb-4">
                            <span
                                class="w-[100px] inline-block font-bold">
                                交易时间
                            </span>
                            <span
                                class="w-[calc(100%-100px)] inline-block">
                                {{ entire.random_macro.createTime }}
                            </span>
                        </li>
                        <li
                            class="flex items-start mb-4">
                            <span
                                class="w-[100px] inline-block font-bold">
                                随机数范围
                            </span>
                            <span
                                class="w-[calc(100%-100px)] inline-block">
                                {{ entire.random_macro.randomRange }}
                            </span>
                        </li>
                        <li
                            class="flex items-start mb-4">
                            <span
                                class="w-[100px] inline-block font-bold">
                                时间戳
                            </span>
                            <span
                                class="w-[calc(100%-100px)] inline-block">
                                {{ entire.random_macro.randomId.split('_')[2] }}
                            </span>
                        </li>
                        <li
                            class="flex items-start mb-4">
                            <span
                                class="w-[100px] inline-block font-bold">
                                输入
                            </span>
                            <span
                                class="w-[calc(100%-100px)] inline-block">
                                {{ entire.random_macro.randomInput }}
                            </span>
                        </li>
                        <li
                            class="flex items-start mb-4">
                            <span
                                class="w-[100px] inline-block font-bold">
                                序号
                            </span>
                            <span
                                class="w-[calc(100%-100px)] inline-block">
                                {{ random.randomIndex }}
                            </span>
                        </li>
                    </ul>
                </template>

                <template
                    v-else-if="step === 3">
                    <ul>
                        <li
                            class="mb-4 border-b pb-4">
                            <h5
                                class="text-base mb-2 font-bold">
                                规则
                            </h5>
                            <p
                                class="text-center">
                                交易哈希
                                <span
                                    class="text-blue-500 px-2">
                                    +
                                </span>
                                交易时间戳
                                <span
                                    class="text-blue-500 px-2">
                                    +
                                </span>
                                输入
                                <span
                                    class="text-blue-500 px-2">
                                    +
                                </span>
                                序号
                            </p>
                        </li>
                        <li
                            class="mb-4 border-b pb-4">
                            <h5
                                class="text-base mb-2 font-bold">
                                过程
                            </h5>
                            <p
                                class="text-center">
                                <span
                                    class="font-bold block">
                                    {{ entire.random_macro.transactionId }}
                                </span>
                                <span
                                    class="text-blue-500 block py-2">
                                    +
                                </span>
                                <span
                                    class="font-bold block">
                                    {{ entire.random_macro.randomId.split('_')[2] }}
                                </span>
                                <span
                                    class="text-blue-500 block py-2">
                                    +
                                </span>
                                <span
                                    class="font-bold block">
                                    {{ entire.random_macro.randomInput }}
                                </span>
                                <span
                                    class="text-blue-500 block py-2">
                                    +
                                </span>
                                <span
                                    class="font-bold block">
                                    {{ random.randomIndex }}
                                </span>
                            </p>
                        </li>
                        <li
                            class="mb-4 pb-4">
                            <h5
                                class="text-base mb-2 font-bold">
                                结果
                            </h5>
                            <p
                                class="text-center">
                                {{ rawString }}
                            </p>
                        </li>
                    </ul>
                </template>

                <template
                    v-else-if="step === 4">
                    <ul>
                        <li
                            class="flex items-start mb-4">
                            <span
                                class="w-[150px] inline-block font-bold">
                                哈希前字符串
                            </span>
                            <span
                                class="w-[calc(100%-150px)] inline-block text-sm">
                                {{ rawString }}
                            </span>
                        </li>
                        <li
                            class="flex items-start mb-4">
                            <span
                                class="w-[150px] inline-block font-bold">
                                哈希方法
                            </span>
                            <span
                                class="w-[calc(100%-150px)] inline-block text-sm">
                                MD5算法
                            </span>
                        </li>
                        <li
                            class="flex items-start mb-4">
                            <span
                                class="w-[150px] inline-block font-bold">
                                哈希后字符串
                            </span>
                            <span
                                class="w-[calc(100%-150px)] inline-block text-sm">
                                {{ hashString }}
                            </span>
                        </li>
                        <li
                            class="flex items-start mb-4">
                            <span
                                class="w-[150px] inline-block font-bold">
                                后 5 位转 10 进制
                            </span>
                            <span
                                class="w-[calc(100%-150px)] inline-block text-sm">
                                {{ hashNumber }}
                            </span>
                        </li>
                        <li
                            class="flex items-start mb-4">
                            <span
                                class="w-[150px] inline-block font-bold">
                                计算
                            </span>
                            <span
                                class="w-[calc(100%-150px)] inline-block text-sm">
                                ({{ hashNumber }} * {{ entire.random_macro.randomRange }}) / 1048576 = {{ rawResult }}
                            </span>
                        </li>
                        <li
                            class="flex items-start mb-4">
                            <span
                                class="w-[150px] inline-block font-bold">
                                向下取整
                            </span>
                            <span
                                class="w-[calc(100%-150px)] inline-block text-sm">
                                {{ result }}
                            </span>
                        </li>
                    </ul>
                </template>


            </div>
            
        </div>

        <footer
            class="my-8 pb-8 flex items-center justify-center">
            <button
                v-if="step > 1"
                @click="step--"
                class="mx-4 p-2 text-white bg-blue-500 hover:bg-blue-400 rounded"
                v-wave>
                上一步
            </button>
            <button
                v-if="step < 4"
                @click="step++"
                class="mx-4 p-2 text-white bg-blue-500 hover:bg-blue-400 rounded"
                v-wave>
                下一步
            </button>
        </footer>
    </i-dialog>
    
</template>

<script setup>

import { ref, computed } from 'vue';
import md5 from 'md5';

import IDialog from '~ui/components/dialog/component.vue';
import ICopyer from '~ui/components/copyer/component.vue';

const props = defineProps({
    random: {
        type: Object,
        required: true
    },
    entire: {
        type: Object,
        required: true
    }
});

const show = ref(false);

const step = ref(1);

const rawString = computed(() => {
    return (
        props.entire.random_macro.transactionId +
        props.entire.random_macro.randomId.split('_')[2] +
        props.entire.random_macro.randomInput +
        props.random.randomIndex
    ).trim();
});

const hashString = computed(() => {
    return md5(rawString.value);
});

const hashNumber = computed(() => {
    return parseInt(hashString.value.slice(-5), 16);
});

const rawResult = computed(() => {
    return (hashNumber.value * props.entire.random_macro.randomRange)/1048576;
});

const result = computed(() => {
    return Math.floor(rawResult.value);
});

</script>