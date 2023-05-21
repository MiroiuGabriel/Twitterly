import { createContext, useContext } from 'react';
import { routes } from '../../axiosConfig';
import { InfiniteScroll, Spinner } from '../../components';
import { Tweet as MyTweet, tweetService } from '../../services/tweetService';
import { Tweet } from './Tweet';
import { SWRInfiniteKeyLoader } from 'swr/infinite';
import { KeyedMutator } from 'swr';

export const LIMIT = 1;

export const feedGetKey: SWRInfiniteKeyLoader = (index, prev) =>
	`${routes.tweet.profileTweets}?offset=${index * LIMIT}&limit=${LIMIT}`;

type MutateProps = {
	mutate: KeyedMutator<MyTweet[][]>;
};

const TweetContext = createContext<MutateProps | null>(null);

const TweetProvider: React.FC<MutateProps & { children: React.ReactNode }> = ({
	mutate,
	children,
}) => {
	return (
		<TweetContext.Provider value={{ mutate }}>
			{children}
		</TweetContext.Provider>
	);
};

export const useTweet = () => {
	const context = useContext(TweetContext);
	if (context === null) {
		throw new Error('useTweet must be within TweetProvider');
	}

	return context;
};

export const Feed = () => {
	return (
		<div>
			<InfiniteScroll
				getKey={feedGetKey}
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
				{(tweets, mutate) =>
					tweets.map(tweet => (
						<TweetProvider mutate={mutate}>
							<Tweet {...tweet} key={tweet.id} />
						</TweetProvider>
					))
				}
			</InfiniteScroll>
		</div>
	);
};
