import { routes } from '../../axiosConfig';
import { InfiniteScroll, Spinner } from '../../components';
import { tweetService } from '../../services/tweetService';
import { Tweet } from './Tweet';

export const LIMIT = 1;

export const Feed = () => {
	return (
		<div>
			<InfiniteScroll
				getKey={(index, prev) =>
					`${routes.tweet.profileTweets}?offset=${
						index * LIMIT
					}&limit=${LIMIT}`
				}
				isReachingEnd={data =>
					data !== undefined &&
					data.filter(d => d.length !== 0).length !== 0 &&
					data[data.length - 1].length < LIMIT
				}
				fetcher={tweetService.getProfileTweets}
				loadingIndicator={
					<div className="my-4 flex justify-center w-full">
						<Spinner />
					</div>
				}
				offset={-100}
			>
				{tweets =>
					tweets.map(tweet => <Tweet {...tweet} key={tweet.id} />)
				}
			</InfiniteScroll>
		</div>
	);
};
