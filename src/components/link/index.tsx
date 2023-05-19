import { AnchorHTMLAttributes, forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

type LinkProps = {
	to: string;
	color?: string;
	isExternal?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
	(
		{
			color = 'text-[#1b95e0]',
			to,
			isExternal,
			children,
			className,
			...props
		},
		ref
	) => (
		<RouterLink
			className={clsx(color, 'hover:underline', className)}
			target={isExternal ? '_blank' : undefined}
			rel={isExternal ? 'noopener' : undefined}
			ref={ref}
			to={to}
			{...props}
		>
			{children}
		</RouterLink>
	)
);
