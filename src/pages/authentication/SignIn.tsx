import { ActionFunction, redirect } from 'react-router-dom';
import { Button, Input, Link } from '../../components';
import { AuthenticationError, authService } from '../../services/authService';
import { AuthLayout } from '../shared';
import { useFormState } from '../../hooks';
import { screens } from '../../routerConfig';

export const SignIn = () => {
	const { error, isSubmitting } = useFormState();

	return (
		<AuthLayout error={error} title="Sign in to Twitter">
			<Input placeholder="Email" autoFocus name="email" />
			<Input placeholder="Password" type="password" name="password" />
			<Button type="submit" disabled={isSubmitting}>
				Sign in
			</Button>
			<div className="mx-auto">
				<Link to={screens.RESET}>Forgot password?</Link>
				<span className="text-[#6e767d]"> · </span>
				<Link to={screens.SIGN_UP}>Sign up for Twitter</Link>
			</div>
		</AuthLayout>
	);
};

const action: ActionFunction = async ({ request }) => {
	const data = await request.formData();

	const email = data.get('email') as string;
	const password = data.get('password') as string;

	try {
		await authService.signIn(email, password);
	} catch (error) {
		if (error instanceof AuthenticationError) return error;
	}

	return redirect(screens.HOME);
};

SignIn.action = action;
