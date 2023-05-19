import { useActionData, useNavigation } from 'react-router-dom';
import { AuthenticationError } from '../services/authService';

export const useFormState = () => {
	const { state } = useNavigation();
	const error = useActionData() as AuthenticationError;

	const isSubmitting = state === 'submitting';

	return { error, isSubmitting };
};
