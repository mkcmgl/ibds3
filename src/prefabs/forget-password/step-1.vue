<template>

    <div>

        <img
            class="block mx-auto my-6"
            src="/images/check.png"/>

        <h2
            class="my-6 text-xl text-center">
            重置密码成功
        </h2>

        <p
            class="my-6">
            <i-button
                class="w-48 text-center leading-10 mx-auto"
                tag="router-link"
                :to="{
                    name: 'login',
                }">
                立即去登录
            </i-button>
        </p>

        <p
            class="text-slate-400 text-center">
            {{ countdown }}S 后自动跳转登录页
        </p>

    </div>

</template>

<script setup>
import IButton from '~ui/components/button/component.vue';
</script>

<script>
export default {
    
    data() {
        return {
            countdown: 3,
        }
    },

    mounted() {
        this.countdown = 3;
        this.timer = setInterval(() => {
            this.countdown--;
            if (this.countdown === 0) {
                clearInterval(this.timer);
                this.$router.push({
                    name: 'login',
                });
            }
        }, 1000);
    }

};
</script>