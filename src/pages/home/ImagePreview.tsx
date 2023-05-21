import { Image } from './create-tweet/Image';

export type ImagePreviewProps = {
	images: string[];
};

export const ImagePreview: React.FC<ImagePreviewProps> = ({ images }) => {
	if (images.length === 1) return <Image src={images[0]} />;

	return (
		<div className={`grid grid-cols-2 max-h-[280px] h-full gap-[2px]`}>
			{images.length === 2 && (
				<>
					<Image
						src={images[0]}
						className="rounded-none rounded-tl-2xl rounded-bl-2xl"
					/>
					<Image
						src={images[1]}
						className="rounded-none rounded-tr-2xl rounded-br-2xl"
					/>
				</>
			)}
			{images.length === 3 && (
				<>
					<Image
						src={images[0]}
						className="rounded-none rounded-tl-2xl rounded-bl-2xl"
					/>
					<div className="grid grid-rows-2 gap-[2px]">
						<Image
							src={images[1]}
							imageClassName={`aspect-[2/1]`}
							className="rounded-none rounded-tr-2xl"
						/>
						<Image
							src={images[2]}
							imageClassName={`aspect-[2/1]`}
							className="rounded-none rounded-br-2xl"
						/>
					</div>
				</>
			)}
			{images.length === 4 && (
				<>
					<Image
						src={images[0]}
						imageClassName={`aspect-[2/1]`}
						className="rounded-none rounded-tl-2xl"
					/>
					<Image
						src={images[1]}
						imageClassName={`aspect-[2/1]`}
						className="rounded-none rounded-tr-2xl"
					/>
					<Image
						src={images[2]}
						imageClassName={`aspect-[2/1]`}
						className="rounded-none rounded-bl-2xl"
					/>
					<Image
						src={images[3]}
						imageClassName={`aspect-[2/1]`}
						className="rounded-none rounded-br-2xl"
					/>
				</>
			)}
		</div>
	);
};
