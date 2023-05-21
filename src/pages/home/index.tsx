import { Avatar, Link } from '../../components';
import { IconType } from '../../icons';
import { Layout } from '../shared';
import { Sidebar } from '../shared/sidebar';
import { Header } from './Header';
import { TweetCreator } from './create-tweet';
import { Feed } from './Feed';

export type HeaderProps = {
	title: string;
	icon: IconType;
};

export const Home = () => {
	return (
		<Layout
			left={<Sidebar />}
			middle={
				<main className="max-w-[600px] w-full border-l border-r border-[#2f3336]">
					<Header icon="sparkles" title="Home" />
					<div className="border-b border-[#2f3336] py-1 px-4 grid grid-cols-[auto,1fr] gap-3 relative overflow-hidden">
						<div className="mt-1">
							<Link to="/profile" className="h-fit rounded-full">
								<Avatar />
							</Link>
						</div>
						<TweetCreator />
					</div>
					<Feed />
				</main>
			}
		></Layout>
	);
};
