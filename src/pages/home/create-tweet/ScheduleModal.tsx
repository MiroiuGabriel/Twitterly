import { FormEvent, FormEventHandler, useState } from 'react';
import { Icon, IconButton, Modal, Select, Tooltip } from '../../../components';
import { DateInitial, Month, MonthsMap, useDate } from '../../../hooks';
import {
	formatDate,
	formatTwoDigits,
	getTimezoneName,
	isToday,
} from '../../../utils';
import { Form } from 'react-router-dom';
import { useCreateTweetStore } from './context';

const today = new Date(Date.now());

const yearsRange = Array.from({ length: 3 }).map(
	(_, i) => today.getFullYear() + i
);
const hoursRange = Array.from({ length: 12 }).map((_, i) => i + 1);
const minutesRange = Array.from({ length: 61 }).map((_, i) =>
	formatTwoDigits(i)
);

const meridianRange = ['AM', 'PM'];

const timezone = getTimezoneName();

const dateOptions: DateInitial = {
	day: today.getDate(),
	month: MonthsMap[today.getMonth()],
	year: today.getFullYear(),
};

export const ScheduleModal = () => {
	const isScheduleModalOpen = useCreateTweetStore(
		state => state.isScheduleModalOpen
	);

	const setIsScheduleModalOpen = useCreateTweetStore(
		state => state.setIsScheduleModalOpen
	);

	const setScheduled = useCreateTweetStore(state => state.setScheduled);

	const scheduled = useCreateTweetStore(state => state.scheduled);

	const {
		day,
		daysInMonth,
		month,
		monthsInYear,
		setDay,
		setMonth,
		setYear,
		year,
	} = useDate(dateOptions);

	const [hours, setHours] = useState(1);
	const [minutes, setMinutes] = useState('00');
	const [meridian, setMeridian] = useState('PM');

	const parsedDate = Date.parse(
		`${month} ${day}, ${year} ${formatTwoDigits(
			hours
		)}:${minutes} ${meridian}`
	);

	const date = formatDate(new Date(parsedDate));

	const currDate = new Date(Date.now());

	const parsedHour = meridian === 'AM' ? hours : 12 + hours;

	const today = isToday(new Date(parsedDate));

	const timeError =
		today &&
		parsedHour <= currDate.getHours() &&
		+minutes <= currDate.getMinutes();

	const dateError =
		monthsInYear.indexOf(month) < currDate.getMonth() ||
		(monthsInYear.indexOf(month) <= currDate.getMonth() &&
			day < currDate.getDate() &&
			year === currDate.getFullYear());

	const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		setIsScheduleModalOpen(false);
		setScheduled(new Date(parsedDate));
	};

	return (
		<Modal
			onOpenChange={setIsScheduleModalOpen}
			open={isScheduleModalOpen}
			trigger={
				<div>
					<Tooltip message="Schedule">
						<IconButton name="calendar" type="button" size="sm" />
					</Tooltip>
				</div>
			}
		>
			<div className="fixed top-0 sm:top-[5%] left-1/2 -translate-x-1/2 bg-black w-full h-full sm:h-fit sm:max-w-[600px] sm:rounded-2xl">
				<form
					className="px-4 py-3"
					action="/schedule"
					onSubmit={handleSubmit}
				>
					<div className="py-2 flex items-center">
						<Tooltip message="Close">
							<Modal.Close asChild>
								<IconButton
									type="button"
									name="close"
									className="fill-[#eff3f4] -ml-2"
									size="sm"
								/>
							</Modal.Close>
						</Tooltip>
						<Modal.Title className="font-bold text-xl flex-grow text-[#eff3f4] ml-4">
							Schedule
						</Modal.Title>

						{scheduled && (
							<button
								type="button"
								onClick={() => {
									setScheduled(null);
									setIsScheduleModalOpen(false);
								}}
								className="text-sm leading-4 text-[#eff3f4]  hover:bg-[#1da1f21a] focus:bg-[#1da1f21a] transition-colors duration-200 ease-in-out font-bold h-[32px] px-4 ml-3 rounded-full"
							>
								Clear
								<div className="h-[2px] bg-[#eff3f4]" />
							</button>
						)}

						<button
							type="submit"
							disabled={timeError || dateError}
							className="text-sm leading-4 text-[#0f1419] bg-[#eff3f4] hover:bg-[#d7dbdc] focus:bg-[#d7dbdc] transition-colors duration-200 ease-in-out font-bold h-[32px] px-4 ml-3 rounded-full disabled:bg-[#787a7a] disabled:pointer-events-none"
						>
							{scheduled ? 'Update' : 'Confirm'}
						</button>
					</div>
					<div className="flex gap-3 mb-4 items-center">
						<Icon name="calendar" className="fill-[#71767b]" />
						<p className="text-sm text-[#71767b]">
							Will send on {date}
						</p>
					</div>
					{dateError && (
						<p className="text-[#f4212e]">
							You can’t schedule a Tweet to send in the past.
						</p>
					)}
					<p className="text-[#71767b] mb-1">Date</p>
					<div className="flex gap-3 mb-4">
						<Select
							error={dateError}
							options={monthsInYear}
							label="Month"
							className="flex-grow-[2]"
							value={month}
							onChange={ev => setMonth(ev.target.value as Month)}
							name="month"
						/>
						<Select
							error={dateError}
							options={daysInMonth}
							value={day}
							onChange={ev => setDay(+ev.target.value)}
							label="Day"
							className="flex-grow"
							name="day"
						/>
						<Select
							error={dateError}
							options={yearsRange}
							value={year}
							onChange={ev => setYear(+ev.target.value)}
							label="Year"
							className="flex-grow"
							name="year"
						/>
					</div>
					<p className="text-[#71767b] mb-1">Time</p>
					<div className="flex gap-3">
						<Select
							error={timeError}
							options={hoursRange}
							label="Hour"
							className="flex-grow"
							name="hours"
							value={hours}
							onChange={ev => setHours(+ev.target.value)}
						/>
						<Select
							error={timeError}
							options={minutesRange}
							label="Minute"
							className="flex-grow"
							name="minutes"
							value={minutes}
							onChange={ev => setMinutes(ev.target.value)}
						/>
						<Select
							error={timeError}
							options={meridianRange}
							label="AM/PM"
							value={meridian}
							name="meridian"
							className="flex-grow"
							onChange={ev => setMeridian(ev.target.value)}
						/>
					</div>
					{!dateError && timeError && (
						<p className="text-[#f4212e]">
							You can’t schedule a Tweet to send in the past.
						</p>
					)}
					<p className="text-[#71767b] mb-1 mt-4">Time zone</p>
					<p className="mb-4 text-xl text-[#e7e9ea]">{timezone}</p>
				</form>
			</div>
		</Modal>
	);
};
