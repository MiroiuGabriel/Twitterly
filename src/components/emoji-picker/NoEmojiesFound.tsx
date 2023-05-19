import { StickyCategoryHeader } from './StickyCategoryHeader';

export const NoEmojiesFound = () => (
	<div className="flex flex-col">
		<StickyCategoryHeader name="Search results" />
		<div className="my-8 px-8">
			<div className="flex flex-col mx-auto">
				<p className="mb-2 font-black text-2xl text-[#e7e9ea]">
					No Emojis found
				</p>
				<p className="text-[#71767b] text-[15px] w-fit">
					Try searching for somethinge else instead
				</p>
			</div>
		</div>
	</div>
);
