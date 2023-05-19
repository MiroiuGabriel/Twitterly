import * as RadixSlider from '@radix-ui/react-slider';
import clsx from 'clsx';
import { useBoolean } from 'usehooks-ts';

type SliderProps = {
	hideOnHover?: boolean;
};

export const Slider: React.FC<
	SliderProps & RadixSlider.SliderProps & React.RefAttributes<HTMLSpanElement>
> = ({ hideOnHover = true, ...props }) => {
	const hide = 'scale-0 group-hover/slider:scale-100';

	const { setFalse, setTrue, value } = useBoolean();

	return (
		<RadixSlider.Root
			className="data-[orientation=horizontal]:h-5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col touch-none select-none flex relative items-center group/slider"
			{...props}
		>
			<RadixSlider.Track className="bg-[#ffffff54] relative flex-grow rounded-lg data-[orientation=horizontal]:h-[2px]  data-[orientation=vertical]:h-full  data-[orientation=vertical]:w-1 data-[orientation=horizontal]:group-hover/slider:h-1">
				<RadixSlider.Range className="absolute bg-white rounded-full data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
			</RadixSlider.Track>
			<RadixSlider.Thumb
				className={clsx(
					'block w-4 transition duration-200 ease-in-out shadow-thumb h-4 bg-white rounded-2xl outline-none focus:outline',
					hideOnHover && hide,
					value && 'scale-100'
				)}
				onKeyUp={ev => {
					if (ev.code === 'Tab') setTrue();
				}}
				onBlur={() => setFalse()}
			/>
		</RadixSlider.Root>
	);
};
