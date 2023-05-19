import { Month, daysByMonth } from '../hooks';

export const dateReducer = (
	state: InternalDate,
	action: ActionType
): InternalDate => {
	switch (action.type) {
		case 'SET_MONTH':
			return {
				...state,
				month: action.value,
				numberOfDays: daysByMonth.get(action.value)!,
			};
		case 'SET_DAY':
			return { ...state, day: action.value };
		case 'SET_YEAR':
			return { ...state, year: action.value };
	}
};

export type InternalDate = {
	month: Month;
	day: number;
	year: number;
	numberOfDays: number;
};

type SetMonthAction = {
	type: 'SET_MONTH';
	value: Month;
};

type SetDayOrYearAction = {
	type: 'SET_DAY' | 'SET_YEAR';
	value: number;
};

type ActionType = SetMonthAction | SetDayOrYearAction;
