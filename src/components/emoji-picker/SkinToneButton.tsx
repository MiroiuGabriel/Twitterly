import { useRef } from 'react';
import { Icon } from '../icon';
import clsx from 'clsx';
import { SkinToneItem } from './SkinTonePicker';
import { useEmojiPickerStore } from './store';
import { useHover } from 'usehooks-ts';

export const SkinToneButton: React.FC<
	SkinToneItem & {
		close: () => void;
	}
> = ({ color, skinTone, close, shadow }) => {
	const activeSkinTone = useEmojiPickerStore(state => state.activeSkinTone);
	const setActiveSkinTone = useEmojiPickerStore(
		state => state.setActiveSkinTone
	);

	const hoverRef = useRef(null);
	const isHover = useHover(hoverRef);

	const isActive = activeSkinTone === skinTone;

	return (
		<button
			ref={hoverRef}
			className={clsx(
				'fill-black rounded-full h-4 w-4 transition-shadow duration-200 ease-in-out',
				activeSkinTone === skinTone && 'shadow-skin'
			)}
			style={{
				backgroundColor: color,
				boxShadow: isHover && !isActive ? shadow : '',
			}}
			onClick={() => {
				setActiveSkinTone(skinTone);
				close();
			}}
		>
			{activeSkinTone === skinTone && (
				<Icon name="checkmark" size="xxs" onClick={() => {}} />
			)}
		</button>
	);
};
