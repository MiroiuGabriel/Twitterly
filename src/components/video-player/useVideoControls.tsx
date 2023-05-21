import {
	SyntheticEvent,
	useRef,
	useState,
	KeyboardEvent,
	useEffect,
} from 'react';
import { formatDuration } from '../../utils';
import { useEffectOnce, useLocalStorage } from 'usehooks-ts';

export const useVideoControls = () => {
	const [isDirty, setIsDirty] = useState(true);
	const [duration, setDuration] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [volume, setVolume] = useLocalStorage('player-volume', 1);
	const [progress, setProgress] = useState(0);
	const [time, setTime] = useState('0:00');

	const ref = useRef<HTMLVideoElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const isDraggingRef = useRef(false);
	const previousVolumeRef = useRef<number>(volume);

	useEffectOnce(() => {
		const onFullScreenChange = (ev: Event) => {
			if (document.fullscreenElement) {
				setIsFullscreen(true);
			} else setIsFullscreen(false);
		};

		if (wrapperRef.current) {
			wrapperRef.current.addEventListener(
				'fullscreenchange',
				onFullScreenChange
			);
		}

		return () =>
			wrapperRef.current?.removeEventListener(
				'fullscreenchange',
				onFullScreenChange
			);
	});

	const play = async () => {
		if (isDirty) setIsDirty(false);
		ref.current!.volume = volume;
		ref.current?.play().catch(err => {
			setIsDirty(true);
			console.error(err);
			ref.current?.pause();
			setIsPlaying(false);
		});
		setIsPlaying(true);
	};

	const pause = () => {
		ref.current?.pause();
		setIsPlaying(false);
	};

	const enterFullScreen = async () => {
		wrapperRef.current!.requestFullscreen({
			navigationUI: 'hide',
		});
	};

	const exitFullscreen = async () => {
		document.exitFullscreen();
	};

	const handleSpacebarPlay = (ev: KeyboardEvent<HTMLVideoElement>) => {
		if (ev.key === ' ') {
			if (isPlaying) pause();
			else play();
		}
	};

	const onTimeUpdate = (ev: SyntheticEvent<HTMLVideoElement>) => {
		const { currentTime, duration } = ev.target as HTMLVideoElement;
		if (isDraggingRef.current) return;
		setProgress((currentTime / duration) * 100);
		setTime(formatDuration(currentTime));
	};

	const updateProgress = (seek: number) => {
		isDraggingRef.current = true;
		ref.current!.currentTime = (ref.current!.duration / 100) * seek;
		setProgress(seek);
	};

	const onLoadedMetadata = (ev: SyntheticEvent<HTMLVideoElement, Event>) => {
		const video = ev.target as HTMLVideoElement;
		setDuration(video.duration);
	};

	const setVolumeLevel = (level: number) => {
		if (level < 0 || level > 1)
			throw new RangeError('Level must be between 0 and 1');

		ref.current!.volume = level;
		setVolume(level);
	};

	const toggleVolume = () => {
		if (volume > 0) {
			previousVolumeRef.current = volume;
			setVolumeLevel(0);
		} else {
			setVolumeLevel(
				previousVolumeRef.current === 0 ? 1 : previousVolumeRef.current
			);
		}
	};

	const setIsDragging = (value: boolean) => (isDraggingRef.current = value);

	return {
		ref,
		onTimeUpdate,
		onLoadedMetadata,
		isPlaying,
		play,
		pause,
		enterFullScreen,
		handleSpacebarPlay,
		time,
		duration: formatDuration(duration),
		volume,
		progress,
		setVolume: setVolumeLevel,
		updateProgress,
		exitFullscreen,
		setIsDragging,
		isFullscreen,
		wrapperRef,
		toggleVolume,
		isDirty,
	};
};
