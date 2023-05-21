import { useEffect, useRef } from 'react';
import { Icon, VideoPlayer } from '../../components';
import { useInView } from 'framer-motion';
import { Ref } from '../../components/video-player';

export const VideoPreview: React.FC<{ video: string }> = ({ video }) => {
	const controlsRef = useRef<Ref>(null);
	const ref = useRef<HTMLDivElement>(null);

	const inView = useInView(ref, {
		amount: 0.9,
	});

	useEffect(() => {
		if (inView) controlsRef.current?.play();
		else controlsRef.current?.pause();
	}, [inView]);

	return (
		<div ref={ref} className="relative">
			{!inView && (
				<div className="absolute left-1/2  top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1d9bf0] flex items-center rounded-full p-1.5 w-fit h-fit justify-center border-4 border-white">
					<Icon name="play" className="fill-white" size="xs" />
				</div>
			)}
			<VideoPlayer src={video} className="mt-3" ref={controlsRef} />
		</div>
	);
};
