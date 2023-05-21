import React, { useEffect } from 'react';
import type { SWRInfiniteResponse } from 'swr/infinite';
import { useIntersection } from './useIntersection';

type InfiniteScrollProps<T> = {
	swr: SWRInfiniteResponse<T>;
	children: (item: T) => React.ReactNode;
	loadingIndicator?: React.ReactNode;
	emptyIndicator?: React.ReactNode;
	endingIndicator?: React.ReactNode;
	validatingIndicator?: React.ReactNode;
	isReachingEnd?: boolean | ((swr: T[] | undefined) => boolean);
	offset?: number;
	limit: number;
};

export const InfiniteScroll = <T,>(
	props: InfiniteScrollProps<T>
): React.ReactElement<InfiniteScrollProps<T>> => {
	const {
		swr,
		swr: { setSize, data, isValidating, isLoading },
		children,
		loadingIndicator,
		endingIndicator,
		emptyIndicator,
		validatingIndicator,
		isReachingEnd,
		limit,
		offset = 0,
	} = props;

	const [intersecting, ref] = useIntersection<HTMLDivElement>();

	const ending = !isReachingEnd
		? data !== undefined &&
		  data.filter(d => (d as T[]).length !== 0).length !== 0 &&
		  (data[data.length - 1] as T[]).length < limit
		: typeof isReachingEnd === 'function'
		? isReachingEnd(swr.data)
		: isReachingEnd;

	const isEmpty = (data?.[0] as T[] | undefined)?.length === 0;
	const validating = !isEmpty && !isLoading && isValidating;

	useEffect(() => {
		if (intersecting && !isValidating && !ending && !isEmpty) {
			setSize(size => size + 1);
		}
	}, [intersecting, isValidating, setSize, ending]);

	return (
		<>
			{typeof children === 'function'
				? data?.map(item => children(item))
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

export default InfiniteScroll;
