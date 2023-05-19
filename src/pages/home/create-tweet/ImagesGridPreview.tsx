import { useCreateTweetStore } from './context';
import { Image, ImageProps } from './Image';
import { RemoveImageCallback, RemoveButton } from './RemoveButton';

const RemovableImage: React.FC<
	{ src: string; onRemove: RemoveImageCallback } & ImageProps
> = ({ src, onRemove, ...props }) => {
	return (
		<Image src={src} {...props}>
			<RemoveButton onRemove={onRemove} />
		</Image>
	);
};

export const ImagesGridPreview = () => {
	const images = useCreateTweetStore(state => state.images);
	const removeImage = useCreateTweetStore(state => state.removeImage);

	const onRemove = (id: string) => removeImage(id);

	if (images.length === 1)
		return (
			<RemovableImage
				src={images[0].src}
				onRemove={() => onRemove(images[0].id)}
			/>
		);

	return (
		<div className={`grid grid-cols-2 max-h-[280px] h-full gap-3`}>
			{images.length === 2 && (
				<>
					<RemovableImage
						src={images[0].src}
						onRemove={() => onRemove(images[0].id)}
					/>
					<RemovableImage
						src={images[1].src}
						onRemove={() => onRemove(images[1].id)}
					/>
				</>
			)}
			{images.length === 3 && (
				<>
					<RemovableImage
						src={images[0].src}
						onRemove={() => onRemove(images[0].id)}
					/>
					<div className="grid grid-rows-2 gap-3">
						<RemovableImage
							src={images[1].src}
							imageClassName={`aspect-[2/1]`}
							onRemove={() => onRemove(images[1].id)}
						/>
						<RemovableImage
							src={images[2].src}
							id={images[2].id}
							imageClassName={`aspect-[2/1]`}
							onRemove={() => onRemove(images[2].id)}
						/>
					</div>
				</>
			)}
			{images.length === 4 && (
				<>
					<RemovableImage
						src={images[0].src}
						imageClassName={`aspect-[2/1]`}
						onRemove={() => onRemove(images[0].id)}
					/>
					<RemovableImage
						src={images[1].src}
						imageClassName={`aspect-[2/1]`}
						onRemove={() => onRemove(images[1].id)}
					/>
					<RemovableImage
						src={images[2].src}
						imageClassName={`aspect-[2/1]`}
						onRemove={() => onRemove(images[2].id)}
					/>
					<RemovableImage
						src={images[3].src}
						imageClassName={`aspect-[2/1]`}
						onRemove={() => onRemove(images[3].id)}
					/>
				</>
			)}
		</div>
	);
};
