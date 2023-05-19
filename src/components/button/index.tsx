import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonProps = {
	variant?: 'primary' | 'outline';
	children: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
	primary:
		'text-[#e7e9ea] bg-[#1da1f2] border-transparent hover:bg-[#1a91da] focus:bg-[#1a91da]',
	outline:
		'text-[#1da1f2] border-[#1da1f2] bg-transparent hover:bg-[#1da1f21a] focus:bg-[#1da1f21a]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, variant = 'primary', ...props }, ref) => {
		return (
			<button
				className={clsx(
					'rounded-full border w-full no-underline h-[48px] font-bold disabled:opacity-50 disabled:cursor-default transition-colors duration-200 ease-in-out',
					variants[variant],
					className
				)}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		);
	}
);
