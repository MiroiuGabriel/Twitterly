import { useCreateTweetStore } from './context';
import { RemoveButton } from './RemoveButton';
import { Icon, VideoPlayer } from '../../../components';
import { Ref } from '../../../components/video-player';
import { useRef } from 'react';

export const VideoPreview = () => {
	const video = useCreateTweetStore(state => state.video)!;
	const setAttachment = useCreateTweetStore(state => state.setAttachment);
	const setVideo = useCreateTweetStore(state => state.setVideo);
	const controlsRef = useRef<Ref>(null);
	const onRemove = () => {
		setVideo(null);
		setAttachment('NONE');
	};

	return (
		<div className="relative">
			<RemoveButton onRemove={onRemove} className="z-10" />
			<VideoPlayer
				ref={controlsRef}
				src={video.src}
				dirtyIndicator={
					<div
						className="absolute left-1/2  top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1d9bf0] flex items-center rounded-full p-1.5 w-fit h-fit justify-center border-4 border-white"
						onClick={() => controlsRef.current?.play()}
					>
						<Icon name="play" className="fill-white" size="xs" />
					</div>
				}
			/>
		</div>
	);
};
