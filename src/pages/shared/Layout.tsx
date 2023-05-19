type LayoutProps = {
	left?: React.ReactNode;
	middle: React.ReactNode;
	right?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ left, middle, right }) => {
	return (
		<div className="flex justify-center">
			{left}
			{middle}
			{right}
		</div>
	);
};
