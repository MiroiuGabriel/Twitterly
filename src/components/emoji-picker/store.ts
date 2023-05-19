import EMOJI_CATEGORIES, { Emoji, SkinTone } from './emojiCategories';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { debounce, uniqueValueArray } from '../../utils';

type EmojiPicker = {
	open: boolean;
	text: string;
	searchText: string;
	activeSkinTone: SkinTone;
	activeCategory: string;
	recentEmojis: Emoji[];
	emojiInfo: Emoji | undefined;
	temporaryRecentEmojis: Emoji[];
	setActiveCategory: (name: string) => void;
	addToRecent: () => void;
	setOpen: (open: boolean) => void;
	addToTemporaryRecent: (emoji: Emoji) => void;
	onMouseOver: (emoji: Emoji) => void;
	onMouseOut: () => void;
	clearRecentEmojis: () => void;
	setSearchText: (text: string) => void;
	clearSearchText: () => void;
	setActiveSkinTone: (skinTone: SkinTone) => void;
};

export const useEmojiPickerStore = create<EmojiPicker>()(
	persist(
		(set, get) => ({
			open: false,
			activeSkinTone: 'Light',
			activeCategory: 'Recent',
			text: '',
			searchText: '',
			recentEmojis: [],
			emojiInfo: undefined,
			temporaryRecentEmojis: [],
			setActiveCategory: name => set({ activeCategory: name }),
			addToTemporaryRecent: emoji =>
				set(state => ({
					temporaryRecentEmojis: uniqueValueArray(
						[...state.temporaryRecentEmojis, emoji],
						'name'
					),
				})),
			addToRecent: () => {
				if (!Boolean(get().temporaryRecentEmojis.length)) return;
				set(state => ({
					recentEmojis: uniqueValueArray(
						[...state.recentEmojis, ...state.temporaryRecentEmojis],
						'name'
					),
					temporaryRecentEmojis: [],
				}));
			},
			setOpen: open => {
				get().addToRecent();
				set({ open });
			},
			onMouseOver: emoji =>
				set({
					emojiInfo: {
						value: emoji.value,
						name: emoji.name,
						categoryId: emoji.categoryId,
					},
				}),
			onMouseOut: () => set({ emojiInfo: undefined }),
			clearRecentEmojis: () => set({ recentEmojis: [] }),
			setSearchText: text => {
				if (!Boolean(text.length)) set({ activeCategory: 'Recent' });
				else set({ activeCategory: '' });
				set({ text });
				debounce(() => set({ searchText: text }))();
			},
			clearSearchText: () => set({ text: '', searchText: '' }),
			setActiveSkinTone: skinTone =>
				set(state => ({
					activeSkinTone: skinTone,
					recentEmojis: state.recentEmojis.map(emoji =>
						emoji.skinTone && emoji.skinTone !== skinTone
							? EMOJI_CATEGORIES.find(
									category => category.id === emoji.categoryId
							  )!.list.filter(
									curr =>
										curr.name === emoji.name &&
										curr.skinTone === skinTone
							  )[0]
							: emoji
					),
				})),
		}),
		{
			name: 'emoji-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: state =>
				Object.fromEntries(
					Object.entries(state).filter(([key]) =>
						['activeSkinTone', 'recentEmojis'].includes(key)
					)
				),
		}
	)
);
