import { useEmojiPickerStore } from './store';
import clsx from 'clsx';
import { Category } from './emojiCategories';

export const Navigation: React.FC<{ category: Category }> = ({ category }) => {
	const activeCategory = useEmojiPickerStore(state => state.activeCategory);
	const text = useEmojiPickerStore(state => state.text);

	return (
		<div className="flex flex-col items-center justify-center">
			<button
				disabled={Boolean(text.length)}
				onClick={() =>
					document.getElementById(category.name)?.scrollIntoView()
				}
				className={clsx(
					'text-xl transition duration-200 ease-in-out',
					activeCategory !== category.name &&
						'filter grayscale opacity-50 hover:filter-none hover:opacity-100 disabled:pointer-events-none'
				)}
			>
				{category.emoji}
			</button>
			<div
				className={clsx(
					'h-1 w-full rounded-full',
					activeCategory === category.name
						? 'bg-[#1d9bf0]'
						: 'bg-transparent'
				)}
			/>
		</div>
	);
};
