import { useRef } from 'react';

export const useImageOrVideoUpload = (
	onImageUpload: (src: string, file: File) => void,
	onVideoUpload: (src: string, file: File) => void
) => {
	const fileUploadInputRef = useRef<HTMLInputElement>(null);

	const onClick = () => fileUploadInputRef.current?.click();

	const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files!;

		for (const file of files) {
			const src = URL.createObjectURL(file);
			if (file.type.includes('image')) {
				onImageUpload(src, file);
			} else {
				onVideoUpload(src, file);
			}
		}
	};

	return { ref: fileUploadInputRef, onClick, onChange };
};
