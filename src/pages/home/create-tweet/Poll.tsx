import {
	IconButton,
	Select,
	InputWithCharacterLimit,
} from '../../../components/';
import { useCreateTweetStore } from '../../../context';

const daysRange = Array.from(new Array(8)).map((_, index) => index);
const hoursRange = Array.from(new Array(24)).map((_, index) => index);
const minutesRangeDefault = Array.from(new Array(60)).map((_, index) => index);

const PollLength = () => {
	const minutes = useCreateTweetStore(state => state.minutes);
	const hours = useCreateTweetStore(state => state.hours);
	const days = useCreateTweetStore(state => state.days);

	const setMinutes = useCreateTweetStore(state => state.setMinutes);
	const setHours = useCreateTweetStore(state => state.setHours);
	const setDays = useCreateTweetStore(state => state.setDays);

	const hoursDisabled = days === 7;
	const minutesDisabled = days === 7;

	const minutesRange =
		days === 0 && hours === 0
			? minutesRangeDefault.slice(5, minutesRangeDefault.length)
			: minutesRangeDefault;

	return (
		<div className="border-b border-t border-[#2f3336] p-3">
			<p className="text-[#e7e9ea] mb-2 text-sm">Poll length</p>
			<div className="flex gap-4">
				<Select
					options={daysRange}
					label="Days"
					className="grow"
					value={days}
					onChange={event => setDays(+event.target.value)}
					name="days"
				/>
				<Select
					options={hoursRange}
					label="Hours"
					className="grow"
					value={hours}
					onChange={event => setHours(+event.target.value)}
					name="hours"
					disabled={hoursDisabled}
				/>
				<Select
					options={minutesRange}
					label="Minutes"
					className="grow"
					value={minutes}
					onChange={event => setMinutes(+event.target.value)}
					name="minutes"
					disabled={minutesDisabled}
				/>
			</div>
		</div>
	);
};

export const Poll = () => {
	const choices = useCreateTweetStore(state => state.choices);
	const choice1 = useCreateTweetStore(state => state.choice1);
	const choice2 = useCreateTweetStore(state => state.choice2);
	const choice3 = useCreateTweetStore(state => state.choice3);
	const choice4 = useCreateTweetStore(state => state.choice4);

	const setAttachment = useCreateTweetStore(state => state.setAttachment);
	const addChoice = useCreateTweetStore(state => state.addChoice);
	const setChoice = useCreateTweetStore(state => state.setChoice);

	return (
		<div className="flex flex-col my-1 pt-3 rounded-2xl border border-[#2f3336]">
			<div className="flex px-3">
				<div className="flex flex-col gap-3 grow mb-3">
					<InputWithCharacterLimit
						placeholder="Choice 1"
						name="choice-1"
						value={choice1}
						onChange={event => {
							setChoice('choice1', event.target.value);
						}}
					/>
					<InputWithCharacterLimit
						placeholder="Choice 2"
						name="choice-2"
						value={choice2}
						onChange={event => {
							setChoice('choice2', event.target.value);
						}}
					/>
					{(choices === 3 || choices === 4) && (
						<InputWithCharacterLimit
							placeholder="Choice 3 (optional)"
							name="choice-3"
							autoFocus
							value={choice3}
							onChange={event => {
								setChoice('choice3', event.target.value);
							}}
						/>
					)}
					{choices === 4 && (
						<InputWithCharacterLimit
							placeholder="Choice 4 (optional)"
							name="choice-4"
							autoFocus
							value={choice4}
							onChange={event => {
								setChoice('choice4', event.target.value);
							}}
						/>
					)}
				</div>
				<div className="flex flex-col justify-end">
					{choices < 4 && (
						<IconButton
							onClick={addChoice}
							type="button"
							className="mb-4 ml-1 h-fit fill-[#1da1f2]"
							name="plus"
						/>
					)}
				</div>
			</div>
			<PollLength />
			<button
				type="button"
				className="text-[#f4212e] hover:bg-[#f4212e1a] p-4 text-sm transition-colors duration-200 ease-in-out"
				onClick={() => setAttachment('NONE')}
			>
				Remove poll
			</button>
		</div>
	);
};
