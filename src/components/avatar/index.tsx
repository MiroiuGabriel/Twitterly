import clsx from 'clsx';
import * as RadixAvatar from '@radix-ui/react-avatar';

type AvatarProps = {
	src?: string;
	name?: string;
	className?: string;
};

const DEFAULT_AVATAR_URL =
	'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';

export const Avatar: React.FC<AvatarProps> = ({
	src = DEFAULT_AVATAR_URL,
	className,
}) => {
	return (
		<RadixAvatar.Root className="block w-12 h-12">
			<RadixAvatar.Image
				src={src}
				className={clsx(
					'rounded-full hover:brightness-75 transition-all duration-200 ease-in-out',
					className
				)}
			/>
		</RadixAvatar.Root>
	);
};
