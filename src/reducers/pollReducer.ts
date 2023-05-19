export type PollLength = {
	days: number;
	hours: number;
	minutes: number;
};

type ActionType = {
	type: 'SET_DAYS' | 'SET_HOURS' | 'SET_MINUTES';
	value: number;
};

export const pollReducer = (state: PollLength, action: ActionType) => {
	switch (action.type) {
		case 'SET_DAYS':
			return {
				...state,
				days: action.value,
			};
		case 'SET_HOURS':
			return {
				...state,
				hours: action.value,
			};
		case 'SET_MINUTES': {
			return {
				...state,
				minutes: action.value,
			};
		}
	}
};
