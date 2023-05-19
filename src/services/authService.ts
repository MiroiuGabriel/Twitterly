import { AxiosError, isAxiosError, HttpStatusCode } from 'axios';
import { client, routes } from '../axiosConfig';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export class AuthenticationError extends Error {
	public readonly statusCode: number;
	constructor(public message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		Object.setPrototypeOf(this, AuthenticationError.prototype);
	}
}

export type User = {
	email: string;
	firstName: string;
	lastName: string;
	handle: string;
	profilePictureUrl: string;
	dateOfBirth: Date;
	country: {
		code: string;
		name: string;
	};
};

type AuthErrorResponse = {
	message: string;
};

export type UserWithPassword = {
	password: string;
} & User;

type AuthStore = {
	user: User | null;
	setUser: (user: User | null) => void;
};

interface IAuthService {
	signIn: (email: string, password: string) => void;
	signUp: (user: Partial<User>) => void;
	signOut: () => void;
	sendResetPasswordEmail: (email: string) => void;
	resetPassword: (token: string, password: string) => void;
}

export const useAuthStore = create<AuthStore>()(
	persist(
		set => ({
			user: null,
			setUser: user => set({ user }),
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: state =>
				Object.fromEntries(
					Object.entries(state).filter(([key]) => key === 'user')
				),
		}
	)
);

class AuthService implements IAuthService {
	private handleAuthenticationError(error: AxiosError<AuthErrorResponse>) {
		if (isAxiosError(error)) {
			const { response } = error;
			if (
				!response ||
				response.status === HttpStatusCode.InternalServerError
			)
				throw new AuthenticationError(
					'The server has encountered a situation it does not know how to handle.',
					HttpStatusCode.InternalServerError
				);

			throw new AuthenticationError(
				response.data.message,
				response.status
			);
		}

		throw new AuthenticationError(
			'The server has encountered a situation it does not know how to handle.',
			HttpStatusCode.InternalServerError
		);
	}

	async signIn(email: string, password: string) {
		try {
			const { data: user } = await client.post<User>(routes.auth.signIn, {
				email,
				password,
			});
			this.setUser(user);
		} catch (error) {
			this.handleAuthenticationError(
				error as AxiosError<AuthErrorResponse>
			);
		}
	}

	async signUp(user: Partial<User>) {
		await client
			.post(routes.auth.signUp, user)
			.catch(this.handleAuthenticationError);
	}

	async signOut() {
		await client.delete(routes.auth.signOut);
		this.setUser(null);
	}

	async sendResetPasswordEmail(email: string) {
		await client
			.post(routes.auth.sendResetEmail(email))
			.catch(this.handleAuthenticationError);
	}

	async resetPassword(token: string, password: string) {
		await client
			.post(routes.auth.reset(token), { password })
			.catch(this.handleAuthenticationError);
	}

	getUser() {
		return useAuthStore().user;
	}

	setUser(user: User | null) {
		useAuthStore.getState().setUser(user);
	}

	isAuthenticated() {
		return this.getUser() !== null;
	}

	isAuthenticatedOutsideReact() {
		return useAuthStore.getState().user !== null;
	}
}

export const authService = new AuthService();
