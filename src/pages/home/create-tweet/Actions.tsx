import {
	IconButton,
	Button,
	Tooltip,
	EmojiPicker,
	Modal,
} from '../../../components';
import { useCreateTweetStore } from '../../../context';
import { useImageOrVideoUpload } from '../../../hooks';
import { GifModal } from './GifModal';
import { ScheduleModal } from './ScheduleModal';

export const Actions = () => {
	const video = useCreateTweetStore(state => state.video);
	const setText = useCreateTweetStore(state => state.setText);
	const text = useCreateTweetStore(state => state.text);

	const images = useCreateTweetStore(state => state.images);
	const attachment = useCreateTweetStore(state => state.attachment);
	const setAttachment = useCreateTweetStore(state => state.setAttachment);
	const addImage = useCreateTweetStore(state => state.addImage);
	const setVideo = useCreateTweetStore(state => state.setVideo);

	const { onClick, onChange, ref } = useImageOrVideoUpload(
		src => {
			setAttachment('IMAGE');
			addImage(src);
		},
		src => {
			setAttachment('VIDEO');
			setVideo(src);
		}
	);

	const isActionDisabled =
		attachment === 'GIF' ||
		attachment === 'POLL' ||
		attachment === 'IMAGE' ||
		attachment === 'VIDEO';

	const isUploadDisabled =
		attachment === 'GIF' ||
		attachment === 'POLL' ||
		images.length === 4 ||
		Boolean(video.length);

	return (
		<div className="mt-3 mb-1 flex justify-between -ml-2">
			<div className="fill-[#1da1f2] flex disabled:child:opacity-50">
				<Tooltip message="Media">
					<IconButton
						size="sm"
						name="uploadImage"
						disabled={isUploadDisabled}
						onClick={onClick}
						type="button"
					/>
				</Tooltip>
				<input
					type="file"
					hidden
					onChange={onChange}
					ref={ref}
					accept="image/jpeg,image/png,image/webp,image/gif,video/*"
					multiple
				/>
				<GifModal disabled={isActionDisabled} />
				<Tooltip message="Poll">
					<IconButton
						name="poll"
						disabled={isActionDisabled}
						onClick={() => setAttachment('POLL')}
						size="sm"
					/>
				</Tooltip>
				<EmojiPicker
					onEmojiClick={emoji => {
						setText(text + emoji.value);
					}}
				>
					<div>
						<Tooltip message="Emoji">
							<IconButton type="button" name="emoji" size="sm" />
						</Tooltip>
					</div>
				</EmojiPicker>
				<ScheduleModal />
			</div>
			<Button type="submit" className="!w-[80px] !h-9" disabled>
				Tweet
			</Button>
		</div>
	);
};
