import { InputHTMLAttributes, forwardRef, useRef } from 'react';

type InputProps = {
	placeholder: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ placeholder, id, autoComplete = 'off', ...props }, ref) => (
		<div className="w-full relative h-[50px] overflow-hidden box-border border border-[#2f3336] pl-1 rounded-[4px] focus-within:border-[#1da1f2]">
			<input
				required
				className="peer text-[1.063rem] w-full h-full pt-[15px] border-none outline-none bg-black text-base text-[#e7e9ea]"
				id={id}
				ref={ref}
				autoComplete={autoComplete}
				{...props}
			/>
			<label
				htmlFor={id}
				className="pl-1 text-xl absolute left-0 bottom-1/2 translate-y-1/2 pointer-events-none text-[#6e767d] transition-all duration-200 ease-in-out
				peer-focus:-translate-y-0.5 peer-focus:text-sm peer-focus:text-[#1da1f2]
				peer-valid:-translate-y-0.5 peer-valid:text-sm peer-valid:text-[#1da1f2]"
			>
				{placeholder}
			</label>
		</div>
	)
);
