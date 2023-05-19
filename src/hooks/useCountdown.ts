import { useState } from 'react';
import { useInterval } from './useInterval';

export const useCountdown = (initialTime: number) => {
	const [time, setTime] = useState(initialTime);
	const clear = useInterval(() => setTime(prev => prev - 1000), 1000);

	if (time === 0) clear();

	return time;
};
