import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { Input } from './Input';

type InputWithCharacterLimitProps = {
	placeholder: string;
	maxLength?: number;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

const isControlledMissingValueOrHandler = (
	value: undefined | string,
	onChange: Function | undefined
): boolean => {
	return (
		(value === undefined && typeof onChange === 'function') ||
		(typeof value === 'string' && onChange === undefined)
	);
};

export const InputWithCharacterLimit: React.FC<InputWithCharacterLimitProps> =
	forwardRef<HTMLInputElement, InputWithCharacterLimitProps>(
		({ placeholder, maxLength = 25, onChange, value, ...props }, ref) => {
			const [text, setText] = useState('');

			if (isControlledMissingValueOrHandler(value, onChange)) {
				throw new Error(
					'Input must have both value and onChange handler'
				);
			}

			const handleChange = (
				event: React.ChangeEvent<HTMLInputElement>
			) => {
				if (onChange) onChange(event);
				else setText(event.target.value);
			};

			const charactersUsed = value ? value.length : text.length;

			return (
				<div className="relative group">
					<p className="absolute text-[#6e767d] group-focus-within:visible invisible text-sm right-0 pr-1 top-0.5 z-10">
						{charactersUsed} / 25
					</p>
					<Input
						value={value ?? text}
						maxLength={maxLength}
						onChange={handleChange}
						placeholder={placeholder}
						{...props}
						ref={ref}
					/>
				</div>
			);
		}
	);
