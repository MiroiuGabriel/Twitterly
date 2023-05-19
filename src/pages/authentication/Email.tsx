import { Link, Icon } from '../../components';
import { useSearchParams } from 'react-router-dom';
import { screens } from '../../routerConfig';

export const Email = () => {
	const [searchParams] = useSearchParams();
	const email = searchParams.get('email');

	return (
		<div className="max-w-md w-full mx-auto pt-5 px-4 flex flex-col">
			<Link to={screens.LANDING} className="w-fit">
				<Icon name="twitter" className="w-[40px] fill-[#D9D9D9]" />
			</Link>
			<h1 className="text-3xl text-[#D9D9D9] font-black mb-3 mt-8">
				Check your email
			</h1>
			<p className="text-[#e7e9ea]">
				We've sent an email to{' '}
				<span className="text-[#1b95e0]">{email}</span>. Click the link
				in the email to reset your password.
			</p>
			<p className="text-[#e7e9ea] mt-4">
				If you don't see the email, check other places it might be, like
				your junk, spam, social, or other folders.
			</p>
			<Link to={screens.RESET} className="mt-4">
				I didn't recieve the email.
			</Link>
		</div>
	);
};
