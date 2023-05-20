import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import TextareaAutosize from 'react-textarea-autosize';
import { CreateTweetContextProvider, useCreateTweetStore } from './context';
import { ImagesGridPreview } from './ImagesGridPreview';
import { Poll } from './Poll';
import { Actions } from './Actions';
import { VideoPreview } from './VideoPreview';
import { Icon } from '../../../components';
import { formatDate } from '../../../utils';
import clsx from 'clsx';
import { GifPreview } from './GifPreview';
import { FormEvent, useRef } from 'react';
import { tweetService } from '../../../services/tweetService';

const CreateTweet = () => {
	const attachment = useCreateTweetStore(state => state.attachment);
	const text = useCreateTweetStore(state => state.text);
	const setText = useCreateTweetStore(state => state.setText);
	const scheduled = useCreateTweetStore(state => state.scheduled);

	const setIsScheduleModalOpen = useCreateTweetStore(
		state => state.setIsScheduleModalOpen
	);

	const placeholder =
		attachment === 'POLL' ? 'Ask a question...' : "What's happening?";

	const ref = useRef<LoadingBarRef>(null);

	const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		ref.current?.continuousStart();

		await tweetService.sendTweet();

		ref.current?.complete();
	};

	return (
		<form className="flex flex-col" onSubmit={handleSubmit}>
			<LoadingBar
				color="#1d9bf0"
				ref={ref}
				height={3}
				containerStyle={{ position: 'absolute' }}
			/>
			{scheduled && (
				<div
					className="mt-1 flex gap-3 mb-4 cursor-pointer group relative items-center"
					onClick={() => setIsScheduleModalOpen(true)}
				>
					<Icon name="calendar" className="fill-[#71767b]" />
					<p className="text-sm text-[#71767b] group-hover:underline">
						Will send on {formatDate(scheduled)}
					</p>
				</div>
			)}
			<TextareaAutosize
				className={clsx(
					'placeholder:text-[#6e767d] text-xl bg-black my-3 text-[#d9d9d9] resize-none outline-none focus:outline',
					scheduled && 'my-0'
				)}
				placeholder={placeholder}
				maxRows={20}
				value={text}
				onChange={event => setText(event.target.value)}
			/>
			{attachment === 'POLL' && <Poll />}
			{attachment === 'IMAGE' && (
				<div>
					<ImagesGridPreview />
				</div>
			)}
			{attachment === 'VIDEO' && <VideoPreview />}
			{attachment === 'GIF' && <GifPreview />}
			<Actions />
		</form>
	);
};

export const TweetCreator = () => (
	<CreateTweetContextProvider>
		<CreateTweet />
	</CreateTweetContextProvider>
);
