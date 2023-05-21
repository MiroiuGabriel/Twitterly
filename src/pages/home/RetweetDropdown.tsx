import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Icon } from '../../components';

export const RetweetDropdown: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className="max-w-[260px] w-full bg-black text-[#e7e9ea] text-[15px] font-bold fill-[#e7e9ea] shadow-twitter rounded-xl"
					align="end"
					sideOffset={-30}
				>
					<DropdownMenu.Item className="flex px-4 py-3 cursor-pointer items-center data-[highlighted]:bg-[#ffffff08] data-[highlighted]:outline-none data-[highlighted]:shadow-item rounded-tr-xl rounded-tl-xl">
						<Icon name="retweet" className="pr-3" />
						Retweet
					</DropdownMenu.Item>
					<DropdownMenu.Item className="flex px-4 py-3 cursor-pointer items-center data-[highlighted]:bg-[#ffffff08] data-[highlighted]:outline-none data-[highlighted]:shadow-item rounded-tr-xl rounded-tl-xl">
						<Icon name="quote" className="pr-3" />
						Quote Tweet
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
