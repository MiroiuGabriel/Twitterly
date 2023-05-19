import { useMemo } from 'react';
import { SkinTonePicker } from './SkinTonePicker';
import { useEmojiPickerStore } from './store';
import { Category } from './emojiCategories';

const SMILEYS_CATEGORY = 1;

export const Footer: React.FC<{ categories: Category[] }> = ({
	categories,
}) => {
	const emojiInfo = useEmojiPickerStore(state => state.emojiInfo);
	const activeSkinTone = useEmojiPickerStore(state => state.activeSkinTone);

	const handEmoji = useMemo(
		() =>
			categories[SMILEYS_CATEGORY].list?.filter(
				emoji =>
					emoji.skinTone === activeSkinTone &&
					emoji.name === 'Waving hand'
			)[0].value,
		[activeSkinTone]
	);

	return (
		<div className="flex items-center justify-between p-3 border-t border-[#2f3336]">
			<span className="text-3xl select-none">
				{emojiInfo?.value ?? handEmoji}
			</span>
			<p className="max-w-[180px] text-[#71767b] w-full truncate text-sm">
				{emojiInfo?.name}
			</p>
			<SkinTonePicker />
		</div>
	);
};
