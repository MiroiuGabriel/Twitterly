import { Icon } from '../icon';
import { SkinToneButton } from './SkinToneButton';
import { SkinTone } from './emojiCategories';
import { SKINTONE_LIST } from './skintoneList';
import { useEmojiPickerStore } from './store';
import { useToggle } from 'usehooks-ts';

export type SkinToneItem = {
	skinTone: SkinTone;
	color: string;
	shadow: string;
};

export const SkinTonePicker = () => {
	const [expanded, toggle] = useToggle();

	const activeSkinTone = useEmojiPickerStore(state => state.activeSkinTone);

	const activeColor = SKINTONE_LIST.filter(
		skin => skin.skinTone === activeSkinTone
	)[0].color;

	return expanded ? (
		<div className="flex mx-3 gap-2">
			{SKINTONE_LIST.map(skin => (
				<SkinToneButton
					skinTone={skin.skinTone}
					shadow={skin.shadow}
					color={skin.color}
					key={skin.color}
					close={toggle}
				/>
			))}
		</div>
	) : (
		<button
			className="mx-3 shadow-skin fill-black rounded-full"
			style={{
				backgroundColor: activeColor,
			}}
		>
			<Icon name="checkmark" className="h-4" onClick={toggle} />
		</button>
	);
};
