import { Form } from 'react-router-dom';
import { Link, Icon } from '../../../components';
import { AuthenticationError } from '../../../services/authService';
import { screens } from '../../../routerConfig';

type AuthLayoutProps = {
	title: string;
	error?: AuthenticationError;
	method?: 'POST' | 'GET';
	children: React.ReactNode;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({
	title,
	error,
	method = 'POST',
	children,
}) => (
	<div className="max-w-md w-full mx-auto pt-5 px-4 flex flex-col">
		<Link to={screens.LANDING} className="w-fit">
			<Icon name="twitter" className="fill-[#D9D9D9]" size="2xl" />
		</Link>
		<h1 className="text-3xl text-[#D9D9D9] font-black mb-3 mt-8">
			{title}
		</h1>
		{error && (
			<p className="text-[0.938rem] text-[#e0245e]">{error.message}</p>
		)}
		<Form method={method} className="flex flex-col gap-6 my-3">
			{children}
		</Form>
	</div>
);
