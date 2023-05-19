import { Navigate, createBrowserRouter } from 'react-router-dom';
import {
	Email,
	Home,
	Landing,
	Reset,
	ResetPassword,
	ResetSuccess,
	SignIn,
	SignUp,
} from './pages';
import { authService } from './services';
import { SessionExpired } from './pages/authentication/SessionExpired';

export const screens = {
	LANDING: '/',
	HOME: '/home',
	SIGN_IN: '/sign-in',
	SIGN_UP: '/sign-up',
	CHECK_EMAIL: '/check-email',
	RESET_SUCCESS: '/reset-success',
	RESET: '/reset',
	SESSION_EXPIRED: '/session-expired',
};

type ComponentWithChildren = { children: React.ReactNode };

const AuthenticationRoute: React.FC<ComponentWithChildren> = ({ children }) => {
	const isAuthenticated = authService.isAuthenticated();

	if (isAuthenticated) return <Navigate to="/home" replace />;

	return <>{children}</>;
};

const ProtectedRoute: React.FC<ComponentWithChildren> = ({ children }) => {
	const isAuthenticated = authService.isAuthenticated();

	if (isAuthenticated) return <>{children}</>;

	return <Navigate to="/sign-in" replace />;
};

export const router = createBrowserRouter([
	{
		path: screens.LANDING,
		element: (
			<AuthenticationRoute>
				<Landing />
			</AuthenticationRoute>
		),
	},
	{
		path: screens.SIGN_IN,
		element: (
			<AuthenticationRoute>
				<SignIn />
			</AuthenticationRoute>
		),
		action: SignIn.action,
	},
	{
		path: screens.SIGN_UP,
		element: (
			<AuthenticationRoute>
				<SignUp />
			</AuthenticationRoute>
		),
		action: SignUp.action,
	},
	{
		path: screens.RESET,
		element: (
			<AuthenticationRoute>
				<Reset />
			</AuthenticationRoute>
		),
		action: Reset.action,
	},
	{
		path: screens.CHECK_EMAIL,
		element: (
			<AuthenticationRoute>
				<Email />
			</AuthenticationRoute>
		),
	},
	{
		path: `${screens.RESET}/:token`,
		element: (
			<AuthenticationRoute>
				<ResetPassword />
			</AuthenticationRoute>
		),
		action: ResetPassword.action,
	},
	{
		path: screens.RESET_SUCCESS,
		element: (
			<AuthenticationRoute>
				<ResetSuccess />
			</AuthenticationRoute>
		),
	},
	{
		path: screens.HOME,
		element: (
			<ProtectedRoute>
				<Home />
			</ProtectedRoute>
		),
	},
	{
		path: screens.SESSION_EXPIRED,
		element: (
			<ProtectedRoute>
				<SessionExpired />
			</ProtectedRoute>
		),
	},
	{
		path: '/explore',
		element: (
			<ProtectedRoute>
				<Home />
			</ProtectedRoute>
		),
	},
]);
