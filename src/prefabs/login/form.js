import { useAuth } from '~/store/auth.js';
import IForm from '~ui/components/form/component.vue';
import LoginInput from './input.vue';
import LoginButton from './button.vue';
import CaptchaInput from './captcha-input.vue';

export default {

    components: {
        IForm,
        LoginInput,
        LoginButton,
        CaptchaInput,
    },

    data() {
        return {
            uuid: '',
            loading: false,
        }
    },

    methods: {
        handleResponse ({ token }) {
            useAuth().setToken(token);
            useAuth().refreshUser()
                .then(() => {
                    this.$router.push(
                        this.$route.query.redirect || {
                            name: 'index'
                        }
                    );
                });
        }
    }
}