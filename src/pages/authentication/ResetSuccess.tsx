import { Link, Icon } from '../../components';
import { Navigate } from 'react-router-dom';
import { useCountdown } from '../../hooks';
import { screens } from '../../routerConfig';

export const ResetSuccess = () => {
	const time = useCountdown(5000);

	if (time === 0) return <Navigate to={screens.SIGN_IN} replace />;

	return (
		<div className="max-w-md w-full mx-auto pt-5 px-4 flex flex-col">
			<Link to="/" className="w-fit">
				<Icon name="twitter" className="w-[40px] fill-[#D9D9D9]" />
			</Link>
			<h1 className="text-3xl text-[#D9D9D9] font-black mb-3 mt-8">
				Congratulations!
			</h1>
			<p className="text-[#e7e9ea]">
				You've sucessfully changed your password.
			</p>
			<p className="text-[#e7e9ea]">
				You will be redirected to sign in page in {time / 1000} seconds
			</p>
		</div>
	);
};
