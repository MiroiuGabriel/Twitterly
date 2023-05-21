import { InfiniteScroll, Spinner } from '../../components';
import { Tweet } from './Tweet';
import { LIMIT, useFeed } from './FeedContext';

export const Feed = () => {
	const { swr } = useFeed();
	return (
		<div>
			<InfiniteScroll
				limit={LIMIT}
				swr={swr}
				isReachingEnd={data =>
					data !== undefined &&
					data.filter(d => d.length !== 0).length !== 0 &&
					data[data.length - 1].length < LIMIT
				}
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
