import { ActionFunction, redirect } from 'react-router-dom';
import { Button, Input } from '../../components';
import { AuthLayout } from '../shared';
import { useFormState } from '../../hooks';
import { AuthenticationError, authService } from '../../services/authService';
import { HttpStatusCode } from 'axios';
import { screens } from '../../routerConfig';

export const ResetPassword = () => {
	const { error, isSubmitting } = useFormState();

	return (
		<AuthLayout title="Reset your password" error={error}>
			<Input
				placeholder="Enter your new password"
				name="password"
				type="password"
			/>
			<Input
				placeholder="Enter your password one more time"
				name="confirmPassword"
				type="password"
			/>
			<Button disabled={isSubmitting}>Reset Password</Button>
		</AuthLayout>
	);
};

const action: ActionFunction = async ({ request, params }) => {
	const data = await request.formData();

	const password = data.get('password') as string;
	const confirmPassword = data.get('confirmPassword') as string;

	const token = params.token!;

	if (password !== confirmPassword)
		return new AuthenticationError(
			'Passwords do not match',
			HttpStatusCode.Forbidden
		);

	try {
		await authService.resetPassword(token, password);
	} catch (error) {
		if (error instanceof AuthenticationError) return error;
	}

	return redirect(screens.SIGN_IN);
};

ResetPassword.action = action;
