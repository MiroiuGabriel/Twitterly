import { SearchInput } from '../input/SearchInput';
import * as Popover from '@radix-ui/react-popover';
import { useEmojiPickerStore } from './store';
import { Footer } from './Footer';
import { Categories } from './Categories';
import EMOJI_CATEGORIES, { Category, Emoji, SkinTone } from './emojiCategories';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './Navigation';
import { useIntersectingNavbar } from './useIntersectingNavbar';

type EmojiPickerProps = {
	children: React.ReactNode;
	onEmojiClick: (emoji: Emoji) => void;
	defaultSkinTone?: SkinTone;
	searchPlaceholder?: string;
	skinTonesDisabled?: boolean;
	searchDisabled?: boolean;
	autoFocusSearch?: boolean;
};

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
	children,
	onEmojiClick,
	searchPlaceholder = 'Search emojis',
	searchDisabled,
	autoFocusSearch,
}) => {
	const text = useEmojiPickerStore(state => state.text);
	const setSearchText = useEmojiPickerStore(state => state.setSearchText);
	const clearSearchText = useEmojiPickerStore(state => state.clearSearchText);
	const recentEmojis = useEmojiPickerStore(state => state.recentEmojis);
	const open = useEmojiPickerStore(state => state.open);
	const setOpen = useEmojiPickerStore(state => state.setOpen);

	useIntersectingNavbar();

	const categories: Category[] = [
		{ id: 0, name: 'Recent', emoji: '🕑', list: recentEmojis },
		...EMOJI_CATEGORIES,
	];

	return (
		<Popover.Root
			open={open}
			onOpenChange={open => {
				setOpen(open);
			}}
		>
			<Popover.Trigger asChild>{children}</Popover.Trigger>
			<AnimatePresence>
				{open && (
					<Popover.Portal forceMount>
						<Popover.Content asChild>
							<motion.div
								className="z-20"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<Popover.Arrow className="fill-black" />
								<div className="flex flex-col w-80 h-96 bg-black shadow-twitter rounded-2xl">
									<SearchInput
										value={text}
										onChange={ev =>
											setSearchText(ev.target.value)
										}
										onClear={clearSearchText}
										placeholder={searchPlaceholder}
										disabled={searchDisabled}
										autoFocus={autoFocusSearch}
									/>
									<div className="grid grid-cols-8  mt-1">
										{categories.map(category => (
											<Navigation
												category={category}
												key={category.name}
											/>
										))}
									</div>
									<div
										className="h-full overflow-y-auto"
										data-root="root"
									>
										<Categories
											onEmojiClick={onEmojiClick}
											categories={categories}
										/>
									</div>
									<Footer categories={categories} />
								</div>
							</motion.div>
						</Popover.Content>
					</Popover.Portal>
				)}
			</AnimatePresence>
		</Popover.Root>
	);
};
