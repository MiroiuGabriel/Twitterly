import { ActionFunction, redirect } from 'react-router-dom';
import { Button, Input, Link, Select } from '../../components';
import { Month, useDate, useFormState } from '../../hooks';
import { authService } from '../../services';
import {
	AuthenticationError,
	UserWithPassword,
} from '../../services/authService';
import { AuthLayout } from '../shared';
import { HttpStatusCode } from 'axios';
import { screens } from '../../routerConfig';

export const SignUp = () => {
	const {
		day,
		daysInMonth,
		month,
		monthsInYear,
		setDay,
		setMonth,
		setYear,
		year,
		years,
	} = useDate();

	const { error, isSubmitting } = useFormState();

	return (
		<AuthLayout error={error} title="Sign up to Twitter">
			<Input placeholder="Email" autoFocus name="email" />
			<div className="flex gap-4">
				<Input placeholder="First Name" name="firstName" />
				<Input placeholder="Last Name" name="lastName" />
			</div>
			<Input placeholder="Password" type="password" name="password" />
			<Input
				placeholder="Confirm Password"
				type="password"
				name="confirmPassword"
			/>
			<div className="flex gap-4">
				<Select
					className="flex-grow"
					label="Year"
					options={years}
					value={year}
					name="year"
					onChange={event => setYear(+event.target.value)}
				></Select>
				<Select
					className="flex-grow-[2]"
					label="Month"
					options={monthsInYear}
					value={month}
					name="month"
					onChange={event => setMonth(event.target.value as Month)}
				></Select>
				<Select
					className="flex-grow"
					label="Day"
					value={day}
					options={daysInMonth}
					name="day"
					onChange={event => setDay(+event.target.value)}
				></Select>
			</div>
			<Button type="submit" disabled={isSubmitting}>
				Sign up
			</Button>
			<div className="mx-auto">
				<Link to={screens.RESET}>Forgot password?</Link>
				<span className="text-[#6e767d]"> · </span>
				<Link to={screens.SIGN_IN}>Sign in to Twitter</Link>
			</div>
		</AuthLayout>
	);
};

const action: ActionFunction = async ({ request }) => {
	const data = await request.formData();

	const confirmPassword = data.get('confirmPassword');

	const submission = {
		email: data.get('email'),
		firstName: data.get('firstName'),
		lastName: data.get('lastName'),
		password: data.get('password'),
		dateOfBirth: new Date(
			`${data.get('month')} ${data.get('day')}, ${data.get('year')}`
		),
	} as Partial<UserWithPassword>;

	if (submission.password !== confirmPassword) {
		return new AuthenticationError(
			'Passwords do not match',
			HttpStatusCode.Forbidden
		);
	}

	try {
		await authService.signUp(submission);
	} catch (error) {
		if (error instanceof AuthenticationError) return error;
	}

	return redirect(screens.SIGN_IN);
};

SignUp.action = action;
