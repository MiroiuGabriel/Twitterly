import clsx from 'clsx';
import { ExplicitIconProps, IconMapping, Size } from '../../icons';

const sizes: Record<Size, string> = {
	xs: 'h-4',
	sm: 'h-5',
	md: 'h-6',
	lg: 'h-7',
	xl: 'h-8',
	'2xl': 'h-10',
};

export const Icon: React.FC<ExplicitIconProps> = ({
	name,
	className,
	size = 'sm',
	...props
}) => {
	const IconComponent = IconMapping[name];

	return (
		<IconComponent className={clsx(className, sizes[size])} {...props} />
	);
};
