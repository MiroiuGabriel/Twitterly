import * as Dialog from '@radix-ui/react-dialog';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

type ModalProps = {
	trigger: React.ReactNode;
	children: React.ReactNode;
} & Dialog.DialogProps;

type RadixElement<Props, Element> = ForwardRefExoticComponent<
	Props & RefAttributes<Element>
>;

type CompositionProps = {
	Close: RadixElement<Dialog.DialogCloseProps, HTMLButtonElement>;

	Title: RadixElement<Dialog.DialogTitleProps, HTMLHeadingElement>;
	Description: RadixElement<
		Dialog.DialogDescriptionProps,
		HTMLParagraphElement
	>;
};
export const Modal: React.FC<ModalProps> & CompositionProps = ({
	trigger,
	children,
	...props
}) => {
	return (
		<Dialog.Root {...props}>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-[#5b708366]" />
				<Dialog.Content>{children}</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

Modal.Close = Dialog.Close;
Modal.Title = Dialog.Title;
Modal.Description = Dialog.Description;
