import { createContext, useContext } from 'react';
import { routes } from '../../axiosConfig';
import useSWRInfinite, {
	SWRInfiniteKeyLoader,
	SWRInfiniteResponse,
} from 'swr/infinite';
import { Tweet, tweetService } from '../../services/tweetService';
import { Fetcher, KeyedMutator } from 'swr';

type FeedProps = {
	mutate: KeyedMutator<Tweet[][]>;
	swr: SWRInfiniteResponse<Tweet[], any>;
};
export const FeedContext = createContext<FeedProps | null>(null);

export const feedGetKey: SWRInfiniteKeyLoader = (index, prev) =>
	`${routes.tweet.profileTweets}?offset=${index * LIMIT}&limit=${LIMIT}`;

export const LIMIT = 4;

export const feedFetcher: Fetcher<Tweet[], string> = async key =>
	tweetService.getProfileTweets(key);

export const useFeed = () => {
	const context = useContext(FeedContext);
	if (context === null) {
		throw new Error('useTweet must be within TweetProvider');
	}

	return context;
};

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const swr = useSWRInfinite(feedGetKey, {
		fetcher: feedFetcher,
	});

	return (
		<FeedContext.Provider value={{ mutate: swr.mutate, swr }}>
			{children}
		</FeedContext.Provider>
	);
};
