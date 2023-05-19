import { Fetcher } from 'swr';
import { GifMedia } from './GifsFeed';

export const gifFetcher: Fetcher<GifMedia[], string> = async key =>
	fetch(key)
		.then(res => res.json())
		.then(response => {
			return response.data.map((data: any) => {
				const still_image = data.images.downsized_still;
				const gif = data.images.downsized;
				const id = data.id;

				return {
					id,
					still_image: still_image.url,
					gif: gif.url,
				};
			});
		});
