import { defineStore } from 'pinia';
import axios from '~/plugins/axios.js';
import Cookie from 'js-cookie';

export const useAuth = defineStore('auth', {
    
    state: () => ({
        _user: {},
        _token: Cookie.get('ibds2-token') || '',
    }),

    getters: {
        user() {
            return this._user;
        },
        token() {
            return this._token;
        },

        isAdmin() {
            // return true;
            return this.user?.roles?.includes('admin') ?? false;
        },
        isVerified () {
            return this.user?.status === 2;
        },
        verificationStatus () {
            return this.user?.status ?? 0;
        },
    },

    actions: {

        setUser(user) {
            this._user = user;
        },

        setToken(token) {
            this._token = token;
            Cookie.set('ibds2-token', token, {expires: 365});
        },

        async forceRefreshUser() {
            try{
                let { data } = await axios.get('/system/user/getUserInfo', {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });

                this.setUser(data.data);
            }
            catch(error) {
                this.clearAuth();
            }
        },

        async refreshUser() {
            // /system/user/getUserInfo
            if (
				this.token
				&& Object.keys(this.user).length === 0
			) {
				await this.forceRefreshUser();
			}
        },

        clearAuth() {
			this._token = null;
			this._user = {};
			Cookie.remove('ibds2-token');
		},
    },
});