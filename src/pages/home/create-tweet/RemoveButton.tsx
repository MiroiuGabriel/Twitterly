import clsx from 'clsx';
import { Icon } from '../../../components';

export type RemoveImageCallback = () => void;

type RemoveButtonProps = {
	onRemove: RemoveImageCallback;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const RemoveButton: React.FC<RemoveButtonProps> = ({
	onRemove,
	className,
	...props
}) => {
	return (
		<button
			className={clsx(
				'absolute fill-white top-1 left-1 p-1.5 backdrop-blur-sm bg-[#0f1419bf] rounded-full hover:bg-[#272c30bf] transition-colors duration-200 ease-in-out',
				className
			)}
			onClick={onRemove}
			{...props}
		>
			<Icon name="close" className="h-[18px]" />
		</button>
	);
};
