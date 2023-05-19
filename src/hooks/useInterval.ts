import { useEffect, useRef } from 'react';

export const useInterval = (callback: Function, tick: number) => {
	const intervalRef = useRef<number>();

	useEffect(() => {
		const intervalId = setInterval(callback, tick);
		intervalRef.current = intervalId;
		return () => clearInterval(intervalId);
	}, []);

	const clear = () => {
		clearInterval(intervalRef.current);
	};

	return clear;
};
