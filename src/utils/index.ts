export const mergeRefs = <T = any>(
	refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> => {
	return value => {
		refs.forEach(ref => {
			if (typeof ref === 'function') {
				ref(value);
			} else if (ref != null) {
				(ref as React.MutableRefObject<T | null>).current = value;
			}
		});
	};
};

export const uniqueValueArray = <T extends Object>(
	array: T[],
	field: keyof T
) => [...new Map(array.map(obj => [obj[field], obj])).values()];

export const debounce = (func: Function, delay = 250) => {
	let timerId: number;

	return (...args: any) => {
		clearTimeout(timerId);
		timerId = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
};

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
	minimumIntegerDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'full',
	timeStyle: 'short',
});

export const formatDuration = (time: number) => {
	const seconds = Math.floor(time % 60);
	const minutes = Math.floor(time / 60) % 60;
	const hours = Math.floor(time / 3600);

	return hours === 0
		? `${minutes}:${leadingZeroFormatter.format(seconds)}`
		: `${hours}:${leadingZeroFormatter.format(
				minutes
		  )}:${leadingZeroFormatter.format(seconds)}}`;
};

export const formatTwoDigits = (minutes: number) =>
	leadingZeroFormatter.format(minutes);

export const formatDate = (date: Date) => {
	const parts = dateFormatter.format(date).split(',');
	parts[0] = parts[0].slice(0, 3);
	const temp = parts[1].split(' ');
	temp[1] = temp[1].slice(0, 3);
	parts[1] = temp.join(' ');

	return parts.join(',');
};

export const getTimezoneName = () => {
	const today = new Date();
	const short = today.toLocaleDateString(undefined);
	const full = today.toLocaleDateString(undefined, { timeZoneName: 'long' });

	// Trying to remove date from the string in a locale-agnostic way
	const shortIndex = full.indexOf(short);
	if (shortIndex >= 0) {
		const trimmed =
			full.substring(0, shortIndex) +
			full.substring(shortIndex + short.length);

		// by this time `trimmed` should be the timezone's name with some punctuation -
		// trim it from both sides
		return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');
	} else {
		// in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
		return full;
	}
};

export const isToday = (date: Date) => {
	const today = new Date();
	return (
		date.getDate() == today.getDate() &&
		date.getMonth() == today.getMonth() &&
		date.getFullYear() == today.getFullYear()
	);
};
