import { ActionFunction, redirect } from 'react-router-dom';
import { Button, Input } from '../../components';
import { AuthLayout } from '../shared';
import { authService } from '../../services';
import { AuthenticationError } from '../../services/authService';
import { useFormState } from '../../hooks';
import { screens } from '../../routerConfig';

export const Reset = () => {
	const { error, isSubmitting } = useFormState();

	return (
		<AuthLayout title="Reset your password" error={error}>
			<Input autoFocus placeholder="Enter your email" name="email" />
			<Button type="submit" disabled={isSubmitting}>
				Send email
			</Button>
		</AuthLayout>
	);
};

const action: ActionFunction = async ({ request }) => {
	const data = await request.formData();
	const email = data.get('email') as string;

	try {
		await authService.sendResetPasswordEmail(email);
	} catch (error) {
		if (error instanceof AuthenticationError) return error;
	}

	return redirect(`${screens.CHECK_EMAIL}?email=${email}`);
};

Reset.action = action;
