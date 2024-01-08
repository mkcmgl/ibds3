import { useAuth } from '~/store/auth.js';
import axios from '~/plugins/axios.js';

export default {

    data () {
        return {
            showLogoutDialog: false,
            logoutting: false,
        }
    },

    methods: {
        logout () {
            this.logoutting = true;
            axios.post('/logout')
                .then(() => {
                    this.showLogoutDialog = false;
                    useAuth().clearAuth();
                    this.$router.push({
                        name: 'login',
                    });
                })
                .finally(() => {
                    this.logoutting = false;
                });
        }
    },
}