import { IconButton } from '../icon-button';
import { Slider } from '../slider';
import { useVideoControls } from './useVideoControls';
import { HTMLProps, forwardRef, useImperativeHandle, useRef } from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import clsx from 'clsx';
import { useHover } from 'usehooks-ts';

type VideoPlayerProps = {
	src: string;
	className?: string;
} & HTMLProps<HTMLVideoElement>;

export type Ref = {
	play: () => void;
	pause: () => void;
};

export const VideoPlayer = forwardRef<Ref, VideoPlayerProps>(
	({ src, className, ...props }, videoRef) => {
		const {
			ref,
			onTimeUpdate,
			enterFullScreen,
			handleSpacebarPlay,
			isPlaying,
			pause,
			play,
			volume,
			setVolume,
			duration,
			time,
			onLoadedMetadata,
			progress,
			updateProgress,
			exitFullscreen,
			isFullscreen,
			wrapperRef,
			setIsDragging,
			toggleVolume,
			isDirty,
		} = useVideoControls();

		const playingState = isPlaying ? 'pause' : 'play';
		const fullscreenState = isFullscreen
			? 'exitFullScreen'
			: 'enterFullScreen';

		const togglePlay = isPlaying ? pause : play;
		const audioState = volume === 0 ? 'audioMuted' : 'audio';

		const audioRef = useRef<HTMLDivElement>(null);
		const isHovering = useHover(audioRef);

		useImperativeHandle(videoRef, () => ({ play, pause }), []);

		return (
			<div
				className={clsx(
					'relative rounded-2xl cursor-pointer group select-none',
					className
				)}
				ref={wrapperRef}
			>
				<video
					src={src}
					ref={ref}
					controls={false}
					className={clsx(
						'rounded-2xl no-controls-fullscreen h-full w-full',
						isFullscreen && 'rounded-none'
					)}
					onTimeUpdate={onTimeUpdate}
					onLoadedMetadata={onLoadedMetadata}
					loop
					tabIndex={0}
					onKeyUp={handleSpacebarPlay}
					onClick={togglePlay}
					{...props}
				></video>
				<div
					className={clsx(
						'invisible opacity-0 group-hover:opacity-100 group-hover:visible transition duration-200 ease-in-out absolute bottom-0 flex-col px-1 w-full before:content-normal before:absolute before:inset-0 before:bg-controls before:-z-10 z-0 bg-transparent'
					)}
				>
					{!isHovering && (
						<div className="px-1">
							<Slider
								value={[progress]}
								min={0}
								max={100}
								step={1}
								onValueChange={value => {
									updateProgress(value[0]);
								}}
								onValueCommit={() => setIsDragging(false)}
							/>
						</div>
					)}
					<div className="flex justify-between w-full cursor-default">
						<IconButton
							name={playingState}
							className="fill-white"
							size="md"
							onClick={togglePlay}
							type="button"
						/>
						<div className="flex items-center">
							<span className="text-white text-[15px] mx-1s">
								{time} / {duration}
							</span>
							<div ref={audioRef}>
								<HoverCard.Root closeDelay={0} openDelay={0}>
									<HoverCard.Trigger asChild>
										<div>
											<IconButton
												name={audioState}
												onClick={toggleVolume}
												className="fill-white"
												size="md"
												type="button"
											/>
										</div>
									</HoverCard.Trigger>
									<HoverCard.Content side="top">
										<div className="h-32 rounded-2xl py-4 px-1 bg-[#0000004d]">
											<Slider
												hideOnHover={false}
												orientation="vertical"
												value={[volume]}
												min={0}
												max={1}
												step={0.1}
												onValueChange={value => {
													setVolume(value[0]);
												}}
											/>
										</div>
									</HoverCard.Content>
								</HoverCard.Root>
							</div>
							<IconButton
								size="md"
								onClick={
									isFullscreen
										? exitFullscreen
										: enterFullScreen
								}
								name={fullscreenState}
								className="fill-white"
								type="button"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
);
