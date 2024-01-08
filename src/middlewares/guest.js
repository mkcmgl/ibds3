import { useAuth } from '~/store/auth.js';

const auth = async (to, from, next) => {

	await useAuth().refreshUser();

	if (Object.keys(useAuth().user).length > 0) {
		next({
			name: 'index'
		});
	}
	else {
		next();
	}
}

export default auth;