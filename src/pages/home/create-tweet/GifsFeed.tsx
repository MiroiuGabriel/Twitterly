import { InfiniteScroll, Spinner, Switch } from '../../../components';
import { useCreateTweetStore } from './context';
import { gifFetcher } from './gifFetcher';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const fallbackColors = [
	'#ff7a00',
	'#00ba7c',
	'#1d9bf0',
	'#7856ff',
	'#f91880',
	'#ffd400',
];

const LIMIT = 20;

export type GifFeed = {
	searchText: string;
	isPlaying: boolean;
	toggleIsPlaying: (checked: boolean) => void;
};

export type GifMedia = {
	id: string;
	still_image: string;
	gif: string;
};

type GifProps = {
	media: GifMedia;
	isPlaying: boolean;
};

export const Gif: React.FC<GifProps> = ({ isPlaying, media }) => {
	const ref = useRef<HTMLDivElement>(null);
	const setGif = useCreateTweetStore(state => state.setGif);
	const setIsGifModalopen = useCreateTweetStore(
		state => state.setIsGifModalopen
	);
	const inView = useInView(ref);

	return (
		<div
			onClick={() => {
				setGif(media);
				setIsGifModalopen(false);
			}}
			ref={ref}
			style={{
				backgroundColor:
					fallbackColors[
						Math.floor(Math.random() * fallbackColors.length)
					],
				backgroundImage: `url(${
					inView && isPlaying ? media.gif : media.still_image
				})`,
			}}
			className="flex bg-center bg-no-repeat bg-cover relative cursor-pointer"
		>
			<img
				src={inView && isPlaying ? media.gif : media.still_image}
				className="w-full h-full opacity-0 -z-10"
			/>
		</div>
	);
};

export const GifsFeed: React.FC<GifFeed> = ({
	searchText,
	isPlaying,
	toggleIsPlaying,
}) => {
	return (
		<>
			<div className="flex justify-between px-4 my-3 items-center">
				<p className="text-[#71767b]">Auto-play GIFs</p>
				<Switch checked={isPlaying} onCheckedChange={toggleIsPlaying} />
			</div>
			<div className="grid grid-cols-[repeat(3,1fr)] gap-0.5 mt-1 rounded-bl-2xl m-0.5">
				<InfiniteScroll
					getKey={(index, prev) =>
						`https://api.giphy.com/v1/gifs/search?api_key=3Ye28d1sj5rJwslNb7JC4VmjA8FYMdBJ&q=${searchText}&limit=${LIMIT}&offset=${
							LIMIT * index
						}&rating=g&lang=en`
					}
					fetcher={gifFetcher}
					loadingIndicator={
						<div className="col-span-3 mx-auto mt-10">
							<Spinner />
						</div>
					}
					endingIndicator={
						<div className="text-[#71767b] text-sm col-span-3 my-4 mx-auto">
							No more gifs...
						</div>
					}
					validatingIndicator={Array.from({ length: 4 }).map(
						(_, i) => (
							<div
								style={{
									backgroundColor:
										fallbackColors[
											Math.floor(
												Math.random() *
													fallbackColors.length
											)
										],
								}}
								key={i}
							></div>
						)
					)}
					emptyIndicator={
						<div className="flex flex-col max-w-[400px] mx-auto p-8 mt-4 col-span-3">
							<img
								className="mb-8"
								src="https://abs.twimg.com/responsive-web/client-web/portrait-bust-wearing-sunglasses-800x400.v1.6310bab9.png"
							/>
							<p className="text-[#e7e9ea] mb-2 text-3xl font-bold">
								No GIFs found
							</p>
							<p className="text-[#71767b] text-sm">
								Try searching for something else instead.
							</p>
						</div>
					}
					isReachingEnd={data =>
						data !== undefined &&
						data.filter(d => d.length !== 0).length !== 0 &&
						data[data.length - 1].length < LIMIT
					}
					offset={-300}
					revalidateIfStale={false}
					revalidateOnFocus={false}
					revalidateOnReconnect={false}
				>
					{gifs =>
						gifs.map(media => (
							<Gif
								isPlaying={isPlaying}
								key={media.id}
								media={{
									gif: media.gif,
									still_image: media.still_image,
									id: media.id,
								}}
							/>
						))
					}
				</InfiniteScroll>
			</div>
		</>
	);
};
