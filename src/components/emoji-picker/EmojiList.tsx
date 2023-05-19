import { Emoji, SkinTone } from './emojiCategories';

type EmojiListProps = {
	list: Emoji[];
	activeSkinTone: SkinTone;
	onClick: (emoji: Emoji) => void;
	onMouseOver: (emoji: Emoji) => void;
	onMouseOut: () => void;
	customkey?: string;
};

export const EmojiList: React.FC<EmojiListProps> = ({
	list,
	activeSkinTone,
	onMouseOut,
	onMouseOver,
	onClick,
	customkey,
}) => {
	return (
		<div className="grid grid-cols-9 gap-1 p-3">
			{list?.map(emoji =>
				emoji.skinTone && emoji.skinTone !== activeSkinTone ? null : (
					<div
						draggable={false}
						key={`${customkey}-${emoji.name}` ?? emoji.name}
						aria-label={emoji.name}
						className="cursor-default select-none text-2xl font-sans"
						onClick={() => onClick(emoji)}
						onMouseOver={() => onMouseOver(emoji)}
						onMouseOut={onMouseOut}
					>
						{emoji.value}
					</div>
				)
			)}
		</div>
	);
};
