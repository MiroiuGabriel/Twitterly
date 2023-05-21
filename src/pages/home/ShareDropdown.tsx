import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Icon } from '../../components';
import { useCopyToClipboard } from 'usehooks-ts';

export const ShareDropdown: React.FC<{
	children: React.ReactNode;
	link: string;
}> = ({ children, link }) => {
	const [_, copy] = useCopyToClipboard();
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className="max-w-[260px] w-full bg-black text-[#e7e9ea] text-[15px] font-bold fill-[#e7e9ea] shadow-twitter rounded-xl"
					align="end"
					sideOffset={-30}
				>
					<DropdownMenu.Item
						onClick={() => copy(link)}
						className="flex px-4 py-3 cursor-pointer items-center data-[highlighted]:bg-[#ffffff08] data-[highlighted]:outline-none data-[highlighted]:shadow-item rounded-tr-xl rounded-tl-xl"
					>
						<Icon name="link" className="pr-3" />
						Copy link to Tweet
					</DropdownMenu.Item>
					<DropdownMenu.Item className="flex px-4 py-3 cursor-pointer items-center data-[highlighted]:bg-[#ffffff08] data-[highlighted]:outline-none data-[highlighted]:shadow-item">
						<Icon name="share" className="pr-3" />
						Share Tweet via...
					</DropdownMenu.Item>
					<DropdownMenu.Item className="flex px-4 py-3 cursor-pointer items-center data-[highlighted]:bg-[#ffffff08] data-[highlighted]:outline-none data-[highlighted]:shadow-item">
						<Icon name="messages" className="pr-3" />
						Share via Direct Message
					</DropdownMenu.Item>
					<DropdownMenu.Item className="flex px-4 py-3 cursor-pointer items-center data-[highlighted]:bg-[#ffffff08] data-[highlighted]:outline-none data-[highlighted]:shadow-item rounded-br-xl rounded-bl-xl">
						<Icon name="bookmarkAdd" className="pr-3" />
						Bookmark
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
