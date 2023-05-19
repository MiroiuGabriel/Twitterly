import clsx from 'clsx';
import { IconType } from '../../../icons';
import { Link, Icon } from '../../../components';
import { useMatch } from 'react-router-dom';

type SidebarLinkProps = {
	to: string;
	label: string;
	icon: {
		normal: IconType;
		active: IconType;
	};
};

export const SidebarLink: React.FC<SidebarLinkProps> = ({
	to,
	label,
	icon,
}) => {
	const isActive = Boolean(useMatch(to));

	const iconName = isActive ? icon.active : icon.normal;

	return (
		<Link to={to} className="py-1 hover:no-underline group">
			<div
				className={clsx(
					'flex w-fit p-3 rounded-full transition-all duration-200 ease-in-out text-[#d9d9d9] fill-[#d9d9d9] hover:text-[#1da1f2] hover:fill-[#1da1f2] group-focus-within:text-[#1da1f2] group-focus-within:fill-[#1da1f2]  hover:bg-[#1da1f21a]',
					isActive && '!text-[#1da1f2] !fill-[#1da1f2]'
				)}
			>
				<Icon name={iconName} size="lg" />
				<span
					className={clsx(
						'ml-4 mr-3 text-xl',
						isActive && 'font-bold'
					)}
				>
					{label}
				</span>
			</div>
		</Link>
	);
};
