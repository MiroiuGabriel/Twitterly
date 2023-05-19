import clsx from 'clsx';

export type ImageProps = {
	src: string;
	children?: React.ReactNode;
	imageClassName?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const Image: React.FC<ImageProps> = ({
	src,
	children,
	className,
	imageClassName,
	onClick,
	...props
}) => {
	return (
		<div
			style={{
				backgroundImage: `url(${src})`,
			}}
			onClick={onClick}
			className={clsx(
				'flex bg-center bg-no-repeat bg-cover rounded-2xl relative',
				className
			)}
		>
			<img
				src={src}
				className={clsx(
					'w-full h-full opacity-0 -z-10',
					imageClassName
				)}
				{...props}
			/>
			{children}
		</div>
	);
};
