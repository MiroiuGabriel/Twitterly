import { IconButton } from '../../components';
import { useEffect, useState } from 'react';

type LikeProps = {
	onLike?: () => void;
	onUnlike?: () => void;
	liked?: boolean;
};

export const Like: React.FC<LikeProps> = () => {
	const [state, setState] = useState('initial');

	useEffect(() => {
		let timeoutId: number;
		if (state === 'liking')
			timeoutId = setTimeout(() => setState('liked'), 700);

		return () => clearTimeout(timeoutId);
	}, [state]);

	return (
		<>
			{state === 'initial' ? (
				<IconButton
					onClick={() => setState('liking')}
					name="heart"
					className="fill-[#71767b] hover:fill-[#f91880] focus:fill-[#f91880] peer hover:bg-[#f918801a] focus:bg-[#f918801a]"
				/>
			) : state === 'liking' ? (
				<div className="h-5 w-5 flex items-center justify-center mr-4 cursor-pointer">
					<div
						style={{
							backgroundImage:
								'url("https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png")',
							backgroundPosition: 'left',
							backgroundRepeat: 'no-repeat',
							backgroundSize: '2900%',
						}}
						className="animate-heart h-[50px] w-[50px] absolute -mr-4"
					></div>
				</div>
			) : (
				<IconButton
					onClick={() => setState('initial')}
					name="heartFilled"
					className="fill-[#f91880] peer hover:bg-[#f918801a] focus:bg-[#f918801a]"
					iconClassName="animate-resize"
				/>
			)}
		</>
	);
};
