import { v4 as uuid } from 'uuid';
import { client, routes } from '../axiosConfig';
import { Attachment, Image, Video } from '../pages/home/create-tweet/context';
import { GifMedia } from '../pages/home/create-tweet/GifsFeed';
import { User } from './authService';

export type TweetData = {
	text: string;
	attachment: Attachment;
	images: Image[];
	video: Video | null;
	gif: GifMedia | null;
	scheduled: Date | null;
	poll: PollAttachment;
};

export type ImagesAttachment = {
	images: string[];
};

export type VideoAttachment = {
	video: string;
};

export type GifAttachment = GifMedia;

export type PollAttachment = {
	endDate: Date;
	choice1: string;
	choice2: string;
	choice3?: string;
	choice4?: string;
	statistics: {
		choice1: number;
		choice2: number;
		choice3: number;
		choice4: number;
	};
};

export type Tweet = {
	id: number;
	text: string;
	createdAt: string;
	attachmentType: Attachment;
	attachment: ImagesAttachment | VideoAttachment | GifAttachment | string;
	user: User;
};

class TweetService {
	public async sendTweet(tweetData: TweetData) {
		const { attachment, text, gif, images, poll, scheduled, video } =
			tweetData;

		let attachmentValue: string = '{}';

		const formData = new FormData();

		formData.append('text', text);
		formData.append('scheduled', JSON.stringify(scheduled?.getTime()));
		formData.append('attachmentType', attachment);

		if (attachment === 'GIF') attachmentValue = JSON.stringify(gif);
		if (attachment === 'POLL') attachmentValue = JSON.stringify(poll);

		if (attachment === 'IMAGE') {
			for (const image of images) {
				formData.append(image.id, image.file);
			}
		}

		if (attachment === 'VIDEO') {
			formData.append(uuid(), video!.file);
		}

		formData.append('attachment', attachmentValue);

		await client.postForm(routes.tweet.postTweet, formData);
		//TOOD: handle exception
	}

	public async getProfileTweets(url: string) {
		const { data } = await client.get<Tweet[]>(url);
		return data.map(d => ({
			...d,
			attachment: JSON.parse(d.attachment as string),
		}));
	}
}

export const tweetService = new TweetService();
