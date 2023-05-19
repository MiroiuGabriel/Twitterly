import { SelectHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import { Icon } from '../icon';

type SelectProps = {
	options: string[] | number[];
	label: string;
	error?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ label, options, id, className, error = false, ...props }, ref) => (
		<div
			className={clsx(
				'bg-black relative border border-[#2f3336] rounded-[4px] focus-within:border-[#1DA1F2] group',
				className,
				error && 'border-[#f4212e] focus-within:border-[#ff212e]'
			)}
		>
			<label
				htmlFor={id}
				className={clsx(
					'text-[#6E767D] absolute text-sm px-2 pt-2 group-focus-within:text-[#1DA1F2]',
					error && 'text-[#f4212e] group-focus-within:text-[#f4212e]'
				)}
			>
				{label}
			</label>
			<select
				id={id}
				ref={ref}
				{...props}
				className="mt-1 w-full pt-6 px-2 pb-1 bg-black text-[#e7e9ea] appearance-none outline-none border-none text-lg cursor-pointer disabled:cursor-default"
			>
				{options.map(option => (
					<option
						value={option}
						key={option}
						className="hover:bg-[#1DA1F2]"
					>
						{option}
					</option>
				))}
			</select>
			<Icon
				name="arrowDown"
				className="h-6 fill-[#6E767D] absolute top-1/2 right-3 -mt-3 pointer-events-none"
			/>
		</div>
	)
);
