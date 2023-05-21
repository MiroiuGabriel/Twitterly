import { useEffect } from 'react';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import { Fetcher, KeyedMutator } from 'swr';
import { useIntersection } from './useIntersection';

type InfiniteScrollProps<T> = {
	children: (item: T[], mutate: KeyedMutator<T[][]>) => React.ReactNode;
	loadingIndicator?: React.ReactNode;
	emptyIndicator?: React.ReactNode;
	endingIndicator?: React.ReactNode;
	validatingIndicator?: React.ReactNode;
	getKey: SWRInfiniteKeyLoader;
	isReachingEnd: boolean | ((data: T[][] | undefined) => boolean);
	offset?: number;
	fetcher: Fetcher<T[], string>;
	revalidateIfStale?: boolean;
	revalidateOnFocus?: boolean;
	revalidateOnReconnect?: boolean;
};

export const InfiniteScroll = <T,>(props: InfiniteScrollProps<T>) => {
	const {
		children,
		loadingIndicator,
		endingIndicator,
		emptyIndicator,
		validatingIndicator,
		isReachingEnd,
		getKey,
		fetcher,
		offset = 0,
		revalidateIfStale = true,
		revalidateOnFocus = true,
		revalidateOnReconnect = true,
	} = props;

	const { data, isLoading, isValidating, setSize, mutate } = useSWRInfinite<
		T[]
	>(getKey, {
		fetcher: fetcher,
		revalidateIfStale: revalidateIfStale,
		revalidateOnFocus: revalidateOnFocus,
		revalidateOnReconnect: revalidateOnReconnect,
	});

	const [intersecting, ref] = useIntersection<HTMLDivElement>();

	const ending =
		typeof isReachingEnd === 'function'
			? isReachingEnd(data)
			: isReachingEnd;

	const isEmpty = data?.[0]?.length === 0;

	const validating = !isEmpty && !isLoading && isValidating;

	useEffect(() => {
		if (intersecting && !isValidating && !ending && !isEmpty) {
			setSize(size => size + 1);
		}
	}, [intersecting, isValidating, setSize, ending]);

	return (
		<>
			<div className="text-red-500" onClick={() => mutate()}>
				mutate
			</div>
			{typeof children === 'function'
				? data?.map(item => children(item, mutate))
				: children}
			<div style={{ position: 'relative' }}>
				<div
					ref={ref}
					style={{ position: 'absolute', top: offset }}
				></div>
			</div>
			{ending ? endingIndicator : null}
			{isEmpty ? emptyIndicator : null}
			{validating ? validatingIndicator : null}
			{isLoading ? loadingIndicator : null}
		</>
	);
};
