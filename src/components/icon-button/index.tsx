import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { IconType, Size } from '../../icons';
import { Icon } from '../icon';

type IconButtonProps = {
	name: IconType;
	size?: Size;
	iconClassName?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ className, name, size = 'sm', iconClassName, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={clsx(
					'w-fit p-2 rounded-full hover:bg-[#1da1f21a] focus:bg-[#1da1f21a] transition-all duration-200 ease-in-out disabled:pointer-events-none',
					className
				)}
				{...props}
			>
				<Icon name={name} size={size} className={iconClassName} />
			</button>
		);
	}
);
