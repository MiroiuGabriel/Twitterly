import { KeyedMutator } from 'swr';
import { Avatar, IconButton, Link, Tooltip } from '../../components';
import {
	GifAttachment,
	ImagesAttachment,
	PollAttachment,
	Tweet as TweetProps,
	VideoAttachment,
	tweetService,
} from '../../services/tweetService';
import { getReadableDate } from '../../utils';
import { GifPreview } from './GifPreview';
import { ImagePreview } from './ImagePreview';
import { Like } from './Like';
import { VideoPreview } from './VideoPreview';
import { Poll } from './Poll';
import { useTweet } from './Feed';

export const Tweet: React.FC<TweetProps> = props => {
	const {
		attachment,
		attachmentType,
		createdAt,
		id,
		text,
		user,
		likes,
		isLiked,
		hasVoted,
		isAuthor,
	} = props;

	const { mutate } = useTweet();

	return (
		<article className="px-4 py-3 grid grid-cols-[auto,1fr] gap-3 border-[#2f3336] border-b">
			<div>
				<Link to="/profile" className="h-fit rounded-full">
					<Avatar />
				</Link>
			</div>
			<div className="flex flex-col">
				<div className="flex gap-1">
					<p className="text-[#e7e9ea] font-bold text-[15px]">
						{user.fullName}
					</p>
					<p className="text-[#71767b] text-[15px]">
						{user.handle}
						<span className="px-1">·</span>
						{getReadableDate(new Date(createdAt))}
					</p>
				</div>
				<pre className="text-[#e7e9ea] !text-[15px] leading-5 !font-chirp">
					{text}
					{id}
				</pre>
				{attachmentType === 'IMAGE' && (
					<div className="mt-3">
						<ImagePreview
							images={(attachment as ImagesAttachment).images}
						/>
					</div>
				)}
				{attachmentType === 'VIDEO' && (
					<VideoPreview
						video={(attachment as VideoAttachment).video}
					/>
				)}
				{attachmentType === 'GIF' && (
					<GifPreview gif={attachment as GifAttachment} />
				)}
				{attachmentType === 'POLL' && (
					<Poll
						poll={attachment as unknown as PollAttachment}
						id={id}
						hasVoted={hasVoted!}
						isAuthor={isAuthor}
						onVote={async (name: string) => {
							await tweetService.vote(id, name);
							mutate();
						}}
					/>
				)}
				<div className="max-w-[425px] w-full flex justify-between mt-3">
					<Tooltip message="Comment">
						<div className="flex items-center text-sm text-[#71767b] hover:text-[#1d9bf0]">
							<IconButton
								name="comment"
								className="hover:fill-[#1d9bf0] fill-[#71767b]  focus:fill-[#1d9bf0] peer hover:bg-[#1d9bf01a] focus:bg-[#1d9bf01a]"
							/>
							<span className="px-3 peer-focus:text-[#1d9bf0]">
								1
							</span>
						</div>
					</Tooltip>
					<Tooltip message="Retweet">
						<div className="flex items-center text-sm text-[#71767b] hover:text-[#00ba7c]">
							<IconButton
								name="retweet"
								className="hover:fill-[#00ba7c] fill-[#71767b]  focus:fill-[#00ba7c] peer hover:bg-[#00ba7c1a] focus:bg-[#00ba7c1a]"
							/>
							<span className="px-3 peer-focus:text-[#00ba7c]">
								1
							</span>
						</div>
					</Tooltip>
					<Tooltip message="Like">
						<div className="flex items-center text-sm text-[#71767b] hover:text-[#f91880]">
							<Like
								onLike={async () => {
									await tweetService.like(id);
									mutate();
								}}
								onUnlike={async () => {
									await tweetService.unlike(id);
									mutate();
								}}
								liked={isLiked}
							/>
							<span className="px-3 peer-focus:text-[#f91880] w-1">
								{likes}
							</span>
						</div>
					</Tooltip>
					<Tooltip message="Share">
						<div className="flex items-center text-sm text-[#71767b] hover:text-[#1d9bf0]">
							<IconButton
								name="share"
								className="hover:bg-[#1d9bf01a] focus:bg-[#1d9bf01a] fill-[#71767b] hover:fill-[#1d9bf0] focus:fill-[#1d9bf0] peer"
							/>
						</div>
					</Tooltip>
				</div>
			</div>
		</article>
	);
};
