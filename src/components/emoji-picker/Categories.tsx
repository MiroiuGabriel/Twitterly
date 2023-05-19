import { NoEmojiesFound } from './NoEmojiesFound';
import { EmojiList } from './EmojiList';
import { StickyCategoryHeader } from './StickyCategoryHeader';
import { useEmojiPickerStore } from './store';
import { Category, Emoji } from './emojiCategories';
import { CategoriesRenderer } from './CategoriesRenderer';

export const Categories: React.FC<{
	onEmojiClick: (emoji: Emoji) => void;
	categories: Category[];
}> = ({ onEmojiClick, categories }) => {
	const searchText = useEmojiPickerStore(state => state.searchText);
	const activeSkinTone = useEmojiPickerStore(state => state.activeSkinTone);
	const addToTemporaryRecent = useEmojiPickerStore(
		state => state.addToTemporaryRecent
	);
	const onMouseOut = useEmojiPickerStore(state => state.onMouseOut);
	const onMouseOver = useEmojiPickerStore(state => state.onMouseOver);

	const foundEmojis = categories
		.slice(1, categories.length)
		.map(category => category.list)
		.map(emojis =>
			emojis.filter(
				emoji =>
					emoji.name
						.toLocaleLowerCase()
						.includes(searchText.toLocaleLowerCase().trim()) &&
					(emoji.skinTone ? activeSkinTone === emoji.skinTone : true)
			)
		)
		.flat();

	return (
		<>
			{searchText ? (
				Boolean(foundEmojis.length) ? (
					<div className="flex flex-col">
						<StickyCategoryHeader name="Search results" />
						<EmojiList
							customkey="found"
							list={foundEmojis}
							activeSkinTone={activeSkinTone}
							onClick={emoji => {
								addToTemporaryRecent(emoji);
								onEmojiClick(emoji);
							}}
							onMouseOut={onMouseOut}
							onMouseOver={onMouseOver}
						/>
					</div>
				) : (
					<NoEmojiesFound />
				)
			) : (
				<CategoriesRenderer
					categories={categories}
					onEmojiClick={onEmojiClick}
					activeSkinTone={activeSkinTone}
				/>
			)}
		</>
	);
};
