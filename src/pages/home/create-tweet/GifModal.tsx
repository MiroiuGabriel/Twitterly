import { useState } from 'react';
import { IconButton, Modal, SearchInput, Tooltip } from '../../../components';
import { Image } from './Image';

import { useDebounce, useLocalStorage } from 'usehooks-ts';
import { GifsFeed } from './GifsFeed';
import { useCreateTweetStore } from './context';
import clsx from 'clsx';

type GifModalProps = {
	disabled: boolean;
};

export const GifModal: React.FC<GifModalProps> = ({ disabled }) => {
	console.log('disabled', disabled);
	const [text, setText] = useState('');
	const [isPlaying, setIsPlaying] = useLocalStorage('gif-playing', false);

	const isGifModalopen = useCreateTweetStore(state => state.isGifModalopen);
	const setIsGifModalopen = useCreateTweetStore(
		state => state.setIsGifModalopen
	);

	const debouncedText = useDebounce(text, 300);

	return (
		<Modal
			open={isGifModalopen}
			onOpenChange={setIsGifModalopen}
			trigger={
				<div
					className={clsx(
						disabled && 'pointer-events-none opacity-50'
					)}
				>
					<Tooltip message="GIF">
						<IconButton type="button" name="uploadGIF" size="sm" />
					</Tooltip>
				</div>
			}
		>
			<div className="fixed top-0 sm:top-[5%] left-1/2 -translate-x-1/2 bg-black w-full sm:max-w-[600px] sm:rounded-2xl sm:max-h-[650px] h-full overflow-y-auto">
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
