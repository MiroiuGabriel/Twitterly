import clsx from 'clsx';
import { Button } from '../../components';
import { PollAttachment } from '../../services/tweetService';
import { formatPollPercentage } from '../../utils';

type ResultProps = {
	percentage: string;
	text: string;
	isBiggest: boolean;
};

const Result: React.FC<ResultProps> = ({ percentage, text, isBiggest }) => {
	return (
		<div className="h-8 relative">
			<div
				className={clsx(
					'bg-[#333639] h-full rounded-[4px] relative',
					isBiggest && percentage !== '0' && '!bg-[#1d9bf094]'
				)}
				style={{
					width:
						percentage === '0'
							? '2%'
							: `${Math.min(100, 2 + +percentage)}%`,
				}}
			>
				<div className="pl-3 absolute top-1/2 -translate-y-1/2 text-[15px] text-[#e7e9ea]">
					{text}
				</div>
			</div>
			<div className="pr-3 absolute top-1/2 right-0 -translate-y-1/2 text-[15px] text-[#e7e9ea]">
				{percentage}%
			</div>
		</div>
	);
};

export const Poll: React.FC<{
	poll: PollAttachment;
	id: number;
	hasVoted: boolean;
	onVote: (choice: 'choice1' | 'choice2' | 'choice3' | 'choice4') => void;
	isAuthor?: boolean;
}> = ({ poll, id, hasVoted, isAuthor, onVote }) => {
	const { choice1, choice2, endDate, statistics, choice3, choice4 } = poll;
	const total = Object.values(statistics)
		.map(x => x ?? 0)
		.reduce((acc, curr) => acc + curr, 0);

	const showResults =
		Date.now() > new Date(endDate).getTime() || hasVoted || isAuthor;

	const per1 = formatPollPercentage((statistics.choice1 / total) * 100);
	const per2 = formatPollPercentage((statistics.choice2 / total) * 100);
	const per3 = formatPollPercentage((statistics.choice3 / total) * 100);
	const per4 = formatPollPercentage((statistics.choice4 / total) * 100);

	const biggest = formatPollPercentage(
		Math.max(+per1, Math.max(Math.max(+per2, +per3), +per4))
	);

	return (
		<>
			<div className="flex flex-col gap-1 mt-3">
				{showResults ? (
					<>
						<Result
							isBiggest={biggest === per1}
							percentage={per1}
							text={choice1}
						/>
						<Result
							isBiggest={biggest === per2}
							percentage={per2}
							text={choice2}
						/>
						{choice3 && (
							<Result
								percentage={per3}
								isBiggest={biggest === per3}
								text={choice3}
							/>
						)}
						{choice4 && (
							<Result
								percentage={per4}
								isBiggest={biggest === per4}
								text={choice4}
							/>
						)}
					</>
				) : (
					<>
						<Button
							variant="outline"
							className="!h-8"
							onClick={() => onVote('choice1')}
						>
							{choice1}
						</Button>
						<Button
							variant="outline"
							className="!h-8"
							onClick={() => onVote('choice2')}
						>
							{choice2}
						</Button>
						{choice3 && (
							<Button
								variant="outline"
								className="!h-8"
								onClick={() => onVote('choice3')}
							>
								{choice3}
							</Button>
						)}
						{choice4 && (
							<Button
								variant="outline"
								className="!h-8"
								onClick={() => onVote('choice4')}
							>
								{choice4}
							</Button>
						)}
					</>
				)}
			</div>
			{showResults && (
				<div className="mt-3 text-[15px] text-[#71767b]">
					{total} votes · Final results
				</div>
			)}
		</>
	);
};
