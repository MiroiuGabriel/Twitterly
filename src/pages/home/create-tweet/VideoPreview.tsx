import { useCreateTweetStore } from './context';
import { RemoveButton } from './RemoveButton';
import { VideoPlayer } from '../../../components';

export const VideoPreview = () => {
	const video = useCreateTweetStore(state => state.video)!;
	const setAttachment = useCreateTweetStore(state => state.setAttachment);
	const setVideo = useCreateTweetStore(state => state.setVideo);

	const onRemove = () => {
		setVideo(null);
		setAttachment('NONE');
	};

	return (
		<div className="relative">
			<RemoveButton onRemove={onRemove} className="z-10" />
			<VideoPlayer src={video.src} />
		</div>
	);
};
