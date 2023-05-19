import { useRef, forwardRef, InputHTMLAttributes } from 'react';
import { Icon } from '../icon';
import { mergeRefs } from '../../utils';

export type SearchInputProps = {
	onClear: () => void;
	value: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const SearchInput: React.FC<SearchInputProps> = forwardRef(
	({ onChange, onClear, value, ...props }, ref) => {
		const inputRef = useRef<HTMLInputElement>(null);

		return (
			<div
				className="m-1 border-2 border-[#2f3336] rounded-full min-h-[40px] flex items-center focus-within:border-[#1d9bf0] bg-black"
				onClick={() => inputRef.current?.focus()}
			>
				<Icon name="search" className="ml-3 fill-[#71767b]" size="xs" />
				<input
					ref={mergeRefs([inputRef, ref])}
					className="caret-[#1d9bf0] h-full pl-1 text-sm leading-4  pr-4 flex-grow bg-black outline-none text-[#e7e9ea] rounded-full placeholder:text-[#71767b]"
					value={value}
					onChange={onChange}
					{...props}
				/>
				{value && (
					<button className="mr-3 rounded-full" onClick={onClear}>
						<Icon
							name="remove"
							className="w-[22px] h-[22px] fill-[#eff3f4]"
							size="xs"
						/>
					</button>
				)}
			</div>
		);
	}
);
