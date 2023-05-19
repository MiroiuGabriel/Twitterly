import { Fragment } from 'react';
import { EmojiList } from './EmojiList';
import { StickyCategoryHeader } from './StickyCategoryHeader';
import { useEmojiPickerStore } from './store';
import { Category, Emoji, SkinTone } from './emojiCategories';
import { useIntersectingNavbar } from './useIntersectingNavbar';

export const CategoriesRenderer: React.FC<{
	categories: Category[];
	onEmojiClick: (emoji: Emoji) => void;
	activeSkinTone: SkinTone;
}> = ({ categories, onEmojiClick, activeSkinTone }) => {
	const addToTemporaryRecent = useEmojiPickerStore(
		state => state.addToTemporaryRecent
	);
	const onMouseOut = useEmojiPickerStore(state => state.onMouseOut);
	const onMouseOver = useEmojiPickerStore(state => state.onMouseOver);
	const clearRecentEmojis = useEmojiPickerStore(
		state => state.clearRecentEmojis
	);

	useIntersectingNavbar();

	return (
		<>
			{categories.map(({ name, list }) =>
				name === 'Recent' && !Boolean(list?.length) ? (
					<Fragment key={name}></Fragment>
				) : (
					<div
						id={name}
						className="flex flex-col -scroll-m-[0.5px]"
						key={name}
					>
						<StickyCategoryHeader name={name}>
							{name === 'Recent' && (
								<button
									onClick={clearRecentEmojis}
									className="font-bold text-[#1d9bf0] text-sm bg-transparent hover:bg-[#1d9bf01a] focus:bg-[#1d9bf01a] transition-colors duration-200 ease-in-out h-6 px-3 rounded-full"
								>
									Clear all
								</button>
							)}
						</StickyCategoryHeader>
						<EmojiList
							customkey={
								name === 'Recent' ? 'recent' : 'category'
							}
							list={list}
							activeSkinTone={activeSkinTone}
							onClick={emoji => {
								addToTemporaryRecent(emoji);
								onEmojiClick(emoji);
							}}
							onMouseOut={onMouseOut}
							onMouseOver={onMouseOver}
						/>
					</div>
				)
			)}
		</>
	);
};
