import * as RadixTooltip from '@radix-ui/react-tooltip';

type TooltipProps = {
	message: string;
	children: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({ children, message }) => {
	return (
		<RadixTooltip.Provider delayDuration={500}>
			<RadixTooltip.Root>
				<RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
				<RadixTooltip.Portal>
					<RadixTooltip.Content
						sideOffset={2}
						className="text-white bg-[#5b7083cc] rounded-sm text-[11px] px-1 py-0.5"
						side="bottom"
					>
						{message}
					</RadixTooltip.Content>
				</RadixTooltip.Portal>
			</RadixTooltip.Root>
		</RadixTooltip.Provider>
	);
};
