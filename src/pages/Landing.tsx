import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { Icon } from '../components';
import { screens } from '../routerConfig';

export const Landing = () => {
	const navigate = useNavigate();

	return (
		<div className="grid grid-rows-[1fr,auto] min-h-screen">
			<div className="grid grid-rows-[1fr,auto] lg:grid-cols-[1fr,auto]">
				<div className="order-2 lg:order-1 bg-landing bg-cover bg-no-repeat bg-center flex justify-center items-center">
					<Icon
						name="twitter"
						className="!max-h-[250px] !h-full my-10 lg:my-0 lg:max-h-[320px] max-w-xs fill-white"
					/>
				</div>
				<div className="order-1 lg:order-2 justify-center lg:justify-normal lg:mx-0 flex items-center min-w-[45vw] px-4">
					<div className="flex flex-col p-5">
						<Icon
							name="twitter"
							className="max-h-[50px] !h-full w-fit pb-4 fill-[#D9D9D9]"
						/>
						<h1 className="text-4xl leading-[calc(52.5px)] xs:text-6xl xs:leading-[calc(84px)] text-[#D9D9D9] my-12 tracking-tighter font-black">
							Happening now
						</h1>
						<h2 className="text-3xl tracking-tighter mb-8 text-[#D9D9D9] font-black">
							Join Twitter today.
						</h2>
						<div className="flex flex-col xs:flex-row lg:flex-col gap-5 mb-4">
							<Button
								className="max-w-sm"
								onClick={() => navigate(screens.SIGN_UP)}
							>
								Sign up
							</Button>
							<Button
								className="max-w-sm"
								variant="outline"
								onClick={() => navigate(screens.SIGN_IN)}
							>
								Sign in
							</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-4 py-3 text-sm cursor-pointer child-hover:underline text-[#6e767d]">
				<p>About</p>
				<p>Help Center</p>
				<p>Terms of Service</p>
				<p>Privacy Policy</p>
				<p>Cookie Policy</p>
				<p>Ads info</p>
				<p>Blog</p>
				<p>Status</p>
				<p>Careers</p>
				<p>Brand Resources</p>
				<p>Advertising</p>
				<p>Marketing</p>
				<p>Twitter for Business</p>
				<p>Developers</p>
				<p>Directory</p>
				<p>Settings</p>
				<p>&#169; 2021 Twitter, Inc.</p>
			</div>
		</div>
	);
};
