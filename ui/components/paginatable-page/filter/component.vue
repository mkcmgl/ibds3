<template>

    <div
        class="p-6 bg-white rounded my-6">

        <i-form
            ref="form"
            class="flex items-top justify-between"
            @submit="updateFilter">
            
            <div
                class="grid grid-cols-3 gap-2 w-[calc(100%-240px)]">

                <template
					v-for="(filter, key) in filters">
					<div
                        class="flex -mb-6">

                        <p
                            class="leading-[3rem] w-[100px]"
                            v-html="filter?.label ?? filter"/>

                        <p
                            class="w-[calc(100%-100px)]">
                            <template
                                v-if="key === 'startTxTime' || key === 'endTxTime'">
                                <i-input
                                    v-if="key === 'startTxTime'"
                                    type="date"
                                    attr="交易开始日期"
                                    placeholder="请输入交易开始日期"
                                    v-model="form[key]"
                                    v-model:error="error[key]"
                                    :rules="[
                                        'date',
                                    ]"/>
                                <i-input
                                    v-else
                                    type="date"
                                    attr="交易结束日期"
                                    placeholder="请输入交易结束日期"
                                    v-model="form[key]"
                                    v-model:error="error[key]"
                                    :rules="[
                                        'date',
                                        function () {
                                            if (form.startTxTime && !form.endTxTime) {
                                                return '交易结束日期不能为空';
                                            }
                                            if (form.startTxTime && form.endTxTime) {
                                                if ((new Date(form.startTxTime).getTime()) > (new Date(form.endTxTime).getTime())) {
                                                    return '不能早于交易结束日期'
                                                }
                                                if (
                                                    form.startTxTime.split('-')[0] !== form.endTxTime.split('-')[0] ||
                                                    form.startTxTime.split('-')[1] !== form.endTxTime.split('-')[1]
                                                ) {
                                                    return '与交易开始日期必须在同一月份';
                                                }
                                            }
                                        }
                                    ]"/>
                            </template>
                            <template
                                v-else-if="typeof filter === 'string'">
                                <i-input
                                    :attr="filter"
                                    :placeholder="`请输入${filter}`"
                                    v-model="form[key]"
                                    v-model:error="error[key]"
                                    :rules="[
                                        'no-emoji'
                                    ]"/>
                            </template>
                            <template
                                v-else>
                                <i-select
                                    v-if="Object.keys(filter).includes('options')"
                                    v-model="form[key]"
                                    v-model:error="error[key]"
                                    v-bind="allowInputAttrs(filter.input)">
                                    <option
                                        v-for="{label, value} in filter.options"
                                        :value="value">
                                        {{ label }}
                                    </option>
                                </i-select>
                                <i-input
                                    v-else
                                    v-model="form[key]"
                                    v-model:error="error[key]"
                                    v-bind="allowInputAttrs(filter.input)"/>
                            </template>
                        </p>
                        

                    </div>
				</template>

            </div>

            <footer
                class="w-[240px] flex justify-end -mx-2">
                <i-button
                    class="w-[6.5rem] mx-2"
                    type="submit"
                    :loading="loading">
                    <search-icon/>
                    搜索
                </i-button>
                <i-button
                    class="w-[6.5rem] mx-2"
                    type="button"
                    outline
                    @click="refreshFilter">
                    <reset-icon/>
                    重置
                </i-button>
            </footer>

        </i-form>

    </div>

</template>

<script setup>
import IForm from '~ui/components/form/component.vue';
import IButton from '~ui/components/button/component.vue';
import IInput from '~ui/components/input/component.vue';
import ISelect from '~ui/components/select/component.vue';
import SearchIcon from './search-icon.vue';
import ResetIcon from './reset-icon.vue';
</script>

<script>
import script from './script.js';

export default {

    name: 'i-filter',

    mixins: [
        script,
    ],

}
</script>


