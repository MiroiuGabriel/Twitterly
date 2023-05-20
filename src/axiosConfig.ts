import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { router, screens } from './routerConfig';
import { authService } from './services';

const baseURL = 'https://localhost:7043/api/v1';

export const routes = {
	auth: {
		signIn: '/auth/sign-in',
		signUp: '/auth/sign-up',
		signOut: '/auth/sign-out',
		sendResetEmail: (email: string) => `/auth/reset?email=${email}`,
		reset: (token: string) => `/auth/reset/${token}`,
	},
	tweet: {
		postTweet: '/tweet',
	},
};

export const client = axios.create({
	baseURL,
	withCredentials: true,
});

client.interceptors.response.use(
	response => response,
	err => {
		const response = err.response as AxiosResponse;
		const isAuthenticated = authService.isAuthenticatedOutsideReact();

		if (
			isAuthenticated &&
			response &&
			response.status === HttpStatusCode.Unauthorized
		) {
			router.navigate(screens.SESSION_EXPIRED, {
				replace: true,
			});
		}
		return Promise.reject(err);
	}
);
