import { v4 as uuid } from 'uuid';
import { createTweetStore } from '../pages/home/create-tweet/context';
import { client, routes } from '../axiosConfig';

class TweetService {
	public async sendTweet() {
		const tweetStore = createTweetStore();

		const {
			attachment,
			gif,
			choice1,
			choice2,
			choice3,
			choice4,
			minutes,
			hours,
			days,
			video,
			images,
			text,
			scheduled,
		} = tweetStore.getState();

		let attachmentValue: string = '{}';

		const formData = new FormData();

		formData.append('text', text);
		formData.append('scheduled', JSON.stringify(scheduled));

		if (attachment === 'GIF') attachmentValue = JSON.stringify(gif);
		if (attachment === 'POLL')
			attachmentValue = JSON.stringify({
				ending: new Date(
					Date.now() +
						days * 24 * 60 * 60 * 1000 +
						hours * 60 * 60 * 1000 +
						minutes * 60 * 1000
				),
				choice1,
				choice2,
				choice3,
				choice4,
			});

		if (attachment === 'IMAGE') {
			for (const image of images) {
				formData.append(image.id, image.file);
			}
		}

		if (attachment === 'VIDEO') {
			formData.append(uuid(), video!.file);
		}

		// handle rest on server

		console.log(attachmentValue, 'attachmentValue');

		// await client.postForm(routes.tweet.postTweet, formData);

		//clear store

		createTweetStore().setState({
			text: '',
			choice1: '',
			choice2: '',
			choice3: '',
			choice4: '',
			choices: 2,
			gif: null,
			video: null,
			images: [],
			days: 1,
			hours: 0,
			minutes: 0,
			attachment: 'NONE',
			scheduled: null,
		});
	}
}

export const tweetService = new TweetService();
