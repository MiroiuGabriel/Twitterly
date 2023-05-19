export const StickyCategoryHeader: React.FC<{
	name: string;
	children?: React.ReactNode;
}> = ({ name, children }) => {
	return (
		<div
			className="sticky -top-[0.10px] bg-black p-3 flex justify-between items-center border-t border-[#2f3336]"
			data-entry={name}
		>
			<p className="text-[#e7e9ea] font-bold text-[17px]">{name}</p>
			{children}
		</div>
	);
};
