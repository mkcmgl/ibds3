import { useAuth } from '~/store/auth.js';

const auth = async (to, from, next) => {

	await useAuth().refreshUser();

	if (!useAuth().isVerified) {
		next();
	}
	else {
		next({
			name: 'index',
			query: {
				redirect: to.fullPath,
			}
		});
	}
}

export default auth;