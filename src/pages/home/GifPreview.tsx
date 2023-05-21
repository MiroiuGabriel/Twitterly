import { useToggle } from 'usehooks-ts';
import { Icon } from '../../components';
import { Image } from './create-tweet/Image';
import { GifAttachment } from '../../services/tweetService';
import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

type GifPreviewProps = {
	gif: GifAttachment;
};

export const GifPreview: React.FC<GifPreviewProps> = ({ gif }) => {
	const [isPlaying, toggle, setIsPlaying] = useToggle(false);
	const ref = useRef<HTMLDivElement>(null);

	const inView = useInView(ref, { amount: 0.8 });

	useEffect(() => {
		if (inView) setIsPlaying(true);
		else if (!inView && isPlaying) setIsPlaying(false);
	}, [inView]);

	return (
		<div className="mt-3" ref={ref}>
			<Image
				src={isPlaying ? gif.gif : gif.still_image}
				onClick={toggle}
				className="cursor-pointer"
			>
				{!inView && !isPlaying && (
					<div className="absolute left-1/2  top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1d9bf0] flex items-center rounded-full p-1.5 w-fit h-fit justify-center border-4 border-white">
						<Icon name="play" className="fill-white" size="xs" />
					</div>
				)}
				<div className="absolute left-3 bottom-3 flex items-center gap-0.5">
					<div className="bg-[#000000c4] p-1 h-full fill-white rounded-[4px]">
						<Icon
							name={isPlaying ? 'pause' : 'play'}
							className="fill-white"
							size="xxs"
						/>
					</div>
					<div className="bg-[#000000c4] px-1 text-sm text-white rounded-[4px]">
						GIF
					</div>
				</div>
			</Image>
			<div className="text-[#71767b] flex items-center gap-2 mt-1">
				via{' '}
				<img src="https://abs.twimg.com/a/1501527574/img/t1/icon_giphy.png" />
				<span className="font-bold">GIPHY</span>
			</div>
			<div></div>
		</div>
	);
};
