import { useEffect, useState } from 'react';
import {
	IconButton,
	InfiniteScroll,
	Modal,
	SearchInput,
	Spinner,
	Switch,
	Tooltip,
} from '../../../components';
import { Image } from './Image';
import { client } from '../../../axiosConfig';
import useSWRInfinite from 'swr/infinite';
import { Fetcher } from 'swr';
import { useDebounce, useLocalStorage } from 'usehooks-ts';

const fallbackColors = [
	'#ff7a00',
	'#00ba7c',
	'#1d9bf0',
	'#7856ff',
	'#f91880',
	'#ffd400',
];

type GifModalProps = {
	disabled: boolean;
};

const LIMIT = 50;

type GifMedia = {
	id: string;
	width: number | string;
	height: number | string;
	still_image: string;
	gif: string;
};

type GifProps = {
	media: Omit<GifMedia, 'id'>;
	isPlaying: boolean;
};

const gifFetcher: Fetcher<GifMedia[], string> = async key =>
	fetch(key)
		.then(res => res.json())
		.then(response => {
			// if (response.data.pagination.total_count === 0)
			// 	throw new Error('No data found');
			return response.data.map((data: any) => {
				console.log(response);
				const still_image = data.images.downsized_still;
				const gif = data.images.downsized;
				const id = data.id;

				return {
					id,
					width: still_image.width,
					height: still_image.height,
					still_image: still_image.url,
					gif: gif.url,
				};
			});
		});

const Gif: React.FC<GifProps> = ({ isPlaying, media }) => {
	return (
		<div
			style={{
				backgroundColor:
					fallbackColors[
						Math.floor(Math.random() * fallbackColors.length)
					],
				backgroundImage: `url(${
					isPlaying ? media.gif : media.still_image
				})`,
			}}
			className="flex bg-center bg-no-repeat bg-cover relative"
		>
			<img
				src={isPlaying ? media.gif : media.still_image}
				className="w-full h-full opacity-0 -z-10"
			/>
		</div>
	);
};

type GifFeed = {
	searchText: string;
	isPlaying: boolean;
	toggleIsPlaying: (checked: boolean) => void;
};

const GifsFeed: React.FC<GifFeed> = ({
	searchText,
	isPlaying,
	toggleIsPlaying,
}) => {
	const swr = useSWRInfinite(
		(index, prev) => {
			return `https://api.giphy.com/v1/gifs/search?api_key=3Ye28d1sj5rJwslNb7JC4VmjA8FYMdBJ&q=${searchText}&limit=${LIMIT}&offset=${
				LIMIT * (index + 1)
			}&rating=g&lang=en`;
		},
		{
			fetcher: gifFetcher,
		}
	);

	return (
		<>
			<div className="flex justify-between px-4 my-3 items-center">
				<p className="text-[#71767b]">Auto-play GIFs</p>
				<Switch checked={isPlaying} onCheckedChange={toggleIsPlaying} />
			</div>
			<div className="grid grid-cols-[repeat(3,1fr)] gap-0.5 mt-1 rounded-bl-2xl m-0.5">
				<InfiniteScroll
					swr={swr}
					loadingIndicator={new Array(4).fill(
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
						/>
					)}
					isReachingEnd={swr =>
						swr.data?.[0].length === 0 ||
						(swr.data?.length === undefined
							? true
							: swr.data[swr.data.length - 1].length < LIMIT)
					}
				>
					{response =>
						response.map(media => (
							<Gif
								isPlaying={isPlaying}
								key={media.id}
								media={{
									gif: media.gif,
									height: media.height,
									width: media.width,
									still_image: media.still_image,
								}}
							/>
						))
					}
				</InfiniteScroll>
			</div>
		</>
	);
};

export const GifModal: React.FC<GifModalProps> = ({ disabled }) => {
	const [text, setText] = useState('');
	const [isPlaying, setIsPlaying] = useLocalStorage('gif-playing', false);

	const debouncedText = useDebounce(text, 300);

	return (
		<Modal
			trigger={
				<div>
					<Tooltip message="GIF">
						<IconButton
							type="button"
							name="uploadGIF"
							disabled={disabled}
							size="sm"
						/>
					</Tooltip>
				</div>
			}
		>
			<div className="fixed top-[5%] left-1/2 -translate-x-1/2 bg-black max-w-[600px] rounded-2xl max-h-[650px] h-full overflow-y-scroll">
				<div className="px-4 pt-2 flex items-center sticky top-0 z-10 bg-[#000000a6] backdrop-blur-md">
					{text ? (
						<Tooltip message="Back">
							<IconButton
								type="button"
								name="arrowLeft"
								className="fill-[#eff3f4] mr-4 -ml-2"
								onClick={() => setText('')}
							/>
						</Tooltip>
					) : (
						<Tooltip message="Close">
							<Modal.Close asChild>
								<IconButton
									type="button"
									name="close"
									className="fill-[#eff3f4] mr-4 -ml-2"
								/>
							</Modal.Close>
						</Tooltip>
					)}
					<div className="flex-grow">
						<SearchInput
							onClear={() => setText('')}
							onChange={ev => setText(ev.target.value)}
							value={text}
							placeholder="Search for GIFs"
						/>
					</div>
				</div>
				{Boolean(debouncedText.length) ? (
					<GifsFeed
						searchText={debouncedText}
						isPlaying={isPlaying}
						toggleIsPlaying={checked => setIsPlaying(checked)}
					/>
				) : (
					<div className="grid grid-cols-2 gap-0.5 mt-1 rounded-bl-2xl m-0.5">
						<Image
							onClick={() => setText('Agree')}
							className="rounded-none h-40 cursor-pointer group-focus:shadow-gif"
							src="https://media4.giphy.com/media/WJjLyXCVvro2I/giphy_s.gif"
						>
							<p className="absolute bottom-0 p-2 w-full text-white text-xl font-bold bg-gradient-to-t from-[#000000bf] to-transparent">
								Agree
							</p>
						</Image>
						<Image
							className="rounded-none h-40 cursor-pointer"
							onClick={() => setText('Applause')}
							src="https://media.tenor.com/images/5656c0cd4de11821336ab2bb920d383a/raw"
						>
							<p className="absolute bottom-0 p-2 w-full text-white text-xl font-bold bg-gradient-to-t from-[#000000bf] to-transparent">
								Applause
							</p>
						</Image>
						<Image
							className="rounded-none h-40 cursor-pointer"
							onClick={() => setText('Awww')}
							src="https://media3.giphy.com/media/rpf0Du8NasK6Q/giphy_s.gif"
						>
							<p className="absolute bottom-0 p-2 w-full text-white text-xl font-bold bg-gradient-to-t from-[#000000bf] to-transparent">
								Awww
							</p>
						</Image>

						<Image
							className="rounded-none h-40 cursor-pointer"
							onClick={() => setText('Dance')}
							src="https://media.tenor.com/images/3b39c942b33fc56ac8c821396393b9ae/raw"
						>
							<p className="absolute bottom-0 p-2 w-full text-white text-xl font-bold bg-gradient-to-t from-[#000000bf] to-transparent">
								Dance
							</p>
						</Image>
						<Image
							className="rounded-none h-40 cursor-pointer"
							onClick={() => setText('Deal with it')}
							src="https://media4.giphy.com/media/tqiYB9X6goN68/giphy_s.gif"
						>
							<p className="absolute bottom-0 p-2 w-full text-white text-xl font-bold bg-gradient-to-t from-[#000000bf] to-transparent">
								Deal with it
							</p>
						</Image>
						<Image
							className="rounded-none h-40 cursor-pointer"
							onClick={() => setText('Do not want')}
							src="https://media.tenor.com/images/4ecdc09c97e239087d685c40250e71b2/raw"
						>
							<p className="absolute bottom-0 p-2 w-full text-white text-xl font-bold bg-gradient-to-t from-[#000000bf] to-transparent">
								Do not want
							</p>
						</Image>
						<Image
							className="rounded-none h-40 cursor-pointer"
							onClick={() => setText('Eww')}
							src="https://media2.giphy.com/media/10FHR5A4cXqVrO/giphy_s.gif"
						>
							<p className="absolute bottom-0 p-2 w-full text-white text-xl font-bold bg-gradient-to-t from-[#000000bf] to-transparent">
								Eww
							</p>
						</Image>
						<Image
							className="rounded-none h-40 cursor-pointer"
							onClick={() => setText('Eye roll')}
							src="https://media.tenor.com/images/8a9769fcb9a6bd09c1762004c69de6d9/raw"
						>
							<p className="absolute bottom-0 p-2 w-full text-white text-xl font-bold bg-gradient-to-t from-[#000000bf] to-transparent">
								Eye roll
							</p>
						</Image>
						<Image
							className="rounded-none h-40 cursor-pointer"
							onClick={() => setText('Facepalm')}
							src="https://media.tenor.com/images/1b58b8869489f53b36407f357faf0168/raw"
						>
							<p className="absolute bottom-0 p-2 w-full text-white text-xl font-bold bg-gradient-to-t from-[#000000bf] to-transparent">
								Facepalm
							</p>
						</Image>
						<Image
							className="rounded-none h-40 cursor-pointer"
							onClick={() => setText('Fist bump')}
							src="https://media.tenor.com/images/63994fa89c1c83e080db63dc604ae2bc/raw"
						>
							<p className="absolute bottom-0 p-2 w-full text-white text-xl font-bold bg-gradient-to-t from-[#000000bf] to-transparent">
								Fist bump
							</p>
						</Image>
						<Image
							className="rounded-none h-40 cursor-pointer"
							onClick={() => setText('Good luck')}
							src="https://media.tenor.com/images/a9da611f5736a740600d8ea0168baa4f/tenor.png"
						>
							<p className="absolute bottom-0 p-2 w-full text-white text-xl font-bold bg-gradient-to-t from-[#000000bf] to-transparent">
								Good luck
							</p>
						</Image>
						<Image
							className="rounded-none h-40 cursor-pointer"
							onClick={() => setText('Happy dance')}
							src="https://media.tenor.com/images/8a4ca6bf8aedee0fb984190cca42eab6/raw"
						>
							<p className="absolute bottom-0 p-2 w-full text-white text-xl font-bold bg-gradient-to-t from-[#000000bf] to-transparent">
								Happy dance
							</p>
						</Image>
					</div>
				)}
			</div>
		</Modal>
	);
};
