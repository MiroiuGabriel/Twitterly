import { useCreateTweetStore } from './context';
import { Image } from './Image';
import { RemoveButton } from './RemoveButton';
import { Icon } from '../../../components';
import { useToggle } from 'usehooks-ts';

export const GifPreview = () => {
	const [isPlaying, toggle] = useToggle(false);
	const gif = useCreateTweetStore(state => state.gif)!;
	const setGif = useCreateTweetStore(state => state.setGif);

	return (
		<>
			<Image
				src={isPlaying ? gif.gif : gif.still_image}
				onClick={toggle}
				className="cursor-pointer"
			>
				<RemoveButton onRemove={() => setGif(null)} />
				{!isPlaying && (
					<div className="absolute left-1/2  top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1d9bf0] flex items-center rounded-full p-1.5 w-fit h-fit justify-center border-4 border-white">
						<Icon name="play" className="fill-white" size="xs" />
					</div>
				)}
				<div className="absolute left-3 bottom-3 bg-[#000000c4] px-1 py-0.5 text-sm text-white rounded-[4px]">
					GIF
				</div>
			</Image>
			{
				<div className="text-[#71767b] flex items-center gap-2 mt-1">
					via{' '}
					<img src="https://abs.twimg.com/a/1501527574/img/t1/icon_giphy.png" />
					<span className="font-bold">GIPHY</span>
				</div>
			}
		</>
	);
};
