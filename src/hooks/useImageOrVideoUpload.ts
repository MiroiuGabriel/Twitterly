import { useRef } from 'react';

export const useImageOrVideoUpload = (
	onImageUpload: (src: string) => void,
	onVideoUpload: (src: string) => void
) => {
	const fileUploadInputRef = useRef<HTMLInputElement>(null);

	const onClick = () => fileUploadInputRef.current?.click();

	const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files!;

		for (const file of files) {
			const src = URL.createObjectURL(file);
			if (file.type.includes('image')) {
				onImageUpload(src);
			} else {
				onVideoUpload(src);
			}
		}
	};

	return { ref: fileUploadInputRef, onClick, onChange };
};
