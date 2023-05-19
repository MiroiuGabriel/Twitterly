import { useCallback, useMemo, useReducer } from 'react';
import { dateReducer, InternalDate } from '../reducers';

export type Month =
	| 'January'
	| 'February'
	| 'March'
	| 'April'
	| 'May'
	| 'June'
	| 'July'
	| 'August'
	| 'September'
	| 'October'
	| 'November'
	| 'December';

const months: Month[] = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const MonthsMap = months;

const currentYear = new Date().getFullYear();

const years = [...Array.from({ length: 116 }).map((_, i) => currentYear - i)];

export const daysByMonth = new Map<Month, number>([
	['January', 31],
	['February', 29],
	['March', 31],
	['April', 30],
	['May', 31],
	['June', 30],
	['July', 31],
	['August', 31],
	['September', 30],
	['October', 31],
	['November', 30],
	['December', 31],
]);

export type DateInitial = Omit<InternalDate, 'numberOfDays'>;

export const useDate = (initial?: DateInitial) => {
	const [state, dispatch] = useReducer(
		dateReducer,
		initial
			? { ...initial, numberOfDays: daysByMonth.get(initial.month)! }
			: {
					month: 'November',
					day: 16,
					year: 2003,
					numberOfDays: daysByMonth.get('November')!,
			  }
	);

	const days = useMemo(
		() => [
			...Array.from({ length: state.numberOfDays }).map((_, i) => i + 1),
		],
		[state.numberOfDays]
	);

	const setMonth = useCallback((value: Month) => {
		dispatch({
			type: 'SET_MONTH',
			value: value,
		});
	}, []);

	const setDay = useCallback((value: number) => {
		dispatch({
			type: 'SET_DAY',
			value: value,
		});
	}, []);

	const setYear = useCallback((value: number) => {
		dispatch({
			type: 'SET_YEAR',
			value: value,
		});
	}, []);

	return {
		month: state.month,
		day: state.day,
		year: state.year,
		daysInMonth: days,
		monthsInYear: months,
		years,
		setMonth,
		setDay,
		setYear,
	};
};
