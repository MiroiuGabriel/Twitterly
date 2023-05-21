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
import { FormEvent, useRef, useState } from 'react';
import { tweetService } from '../../../services/tweetService';
import { useFeed } from '../FeedContext';

const CreateTweet = () => {
	const attachment = useCreateTweetStore(state => state.attachment);
	const text = useCreateTweetStore(state => state.text);
	const gif = useCreateTweetStore(state => state.gif);
	const images = useCreateTweetStore(state => state.images);
	const choice1 = useCreateTweetStore(state => state.choice1);
	const choice2 = useCreateTweetStore(state => state.choice2);
	const choice3 = useCreateTweetStore(state => state.choice3);
	const choice4 = useCreateTweetStore(state => state.choice4);
	const hours = useCreateTweetStore(state => state.hours);
	const days = useCreateTweetStore(state => state.days);
	const minutes = useCreateTweetStore(state => state.minutes);
	const video = useCreateTweetStore(state => state.video);
	const setText = useCreateTweetStore(state => state.setText);
	const scheduled = useCreateTweetStore(state => state.scheduled);
	const clearCreator = useCreateTweetStore(state => state.clearCreator);

	const setIsScheduleModalOpen = useCreateTweetStore(
		state => state.setIsScheduleModalOpen
	);
	const ref = useRef<LoadingBarRef>(null);
	const { mutate } = useFeed();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const placeholder =
		attachment === 'POLL' ? 'Ask a question...' : "What's happening?";

	const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		ref.current?.continuousStart();
		setIsSubmitting(true);

		await tweetService.sendTweet({
			attachment,
			gif,
			images,
			poll: {
				choice1,
				choice2,
				endDate: new Date(
					Date.now() +
						days * 24 * 60 * 60 * 1000 +
						hours * 60 * 60 * 1000 +
						minutes * 60 * 1000
				),
				choice3,
				choice4,
				statistics: {
					choice1: 0,
					choice2: 0,
					choice3: 0,
					choice4: 0,
				},
				votes: [],
			},
			scheduled,
			text,
			video,
		});

		mutate();

		ref.current?.complete();
		clearCreator();
		setIsSubmitting(false);
	};

	return (
		<form
			className={clsx('flex flex-col', isSubmitting && 'animate-pulse')}
			onSubmit={handleSubmit}
		>
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
					scheduled && 'my-0',
					isSubmitting && 'my-4'
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
			{<Actions />}
		</form>
	);
};

export const TweetCreator = () => (
	<CreateTweetContextProvider>
		<CreateTweet />
	</CreateTweetContextProvider>
);
