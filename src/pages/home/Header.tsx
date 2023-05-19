import { IconButton } from '../../components';
import { HeaderProps } from '.';

export const Header: React.FC<HeaderProps> = ({ title, icon }) => {
	const scrollToTop = () =>
		window.scrollTo({
			behavior: 'smooth',
			left: 0,
			top: 0,
		});

	return (
		<div className="h-[53px] px-4 flex justify-between items-center border-b border-[#2f3336] sticky top-0 bg-black">
			<h1
				className="font-black text-xl text-[#D9D9D9] cursor-pointer"
				onClick={scrollToTop}
			>
				{title}
			</h1>
			<IconButton name={icon} className="fill-[#1da1f2]"></IconButton>
		</div>
	);
};
