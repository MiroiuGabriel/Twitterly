import * as RadixSwitch from '@radix-ui/react-switch';
import clsx from 'clsx';

export const Switch: React.FC<RadixSwitch.SwitchProps> = ({
	className,
	style,
	...props
}) => {
	return (
		<div className="h-5">
			<RadixSwitch.Root
				className={clsx(
					'flex items-center rounded-xl w-10 h-[70%] data-[state=checked]:bg-[#6bc9fb] data-[state=unchecked]:bg-[#939393] relative outline-none',
					className
				)}
				{...props}
			>
				<RadixSwitch.Thumb className="block shadow-thumb w-5 h-5 rounded-full transition-transform duration-100 translate-x-0 will-change-transform data-[state=checked]:translate-x-[20px] data-[state=checked]:bg-[#1d9bf0] data-[state=unchecked]:bg-[#fafafa]" />
			</RadixSwitch.Root>
		</div>
	);
};
