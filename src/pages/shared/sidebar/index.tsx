import { Icon, Button, Link } from '../../../components';
import { SidebarLink } from './SidebarLink';

export const Sidebar = () => {
	return (
		<header className="flex flex-col mx-3 h-screen w-[275px] sticky top-0">
			<div className="flex flex-col">
				<Link
					to="/home"
					className="fill-[#D9D9D9] p-3 rounded-full hover:bg-[#1da1f21a] focus:bg-[#1da1f21a] transition-all duration-200 ease-in-out w-fit"
				>
					<Icon name="twitter" size="lg" />
				</Link>
				<SidebarLink
					to="/home"
					label="Home"
					icon={{
						normal: 'house',
						active: 'houseFilled',
					}}
				/>
				<SidebarLink
					to="/explore"
					label="Explore"
					icon={{
						normal: 'hashtag',
						active: 'hashtagFilled',
					}}
				/>
				<SidebarLink
					to="/notifications"
					label="Notifications"
					icon={{
						normal: 'notifications',
						active: 'notificationsFilled',
					}}
				/>
				<SidebarLink
					to="/messages"
					label="Messages"
					icon={{
						normal: 'messages',
						active: 'messagesFilled',
					}}
				/>
				<SidebarLink
					to="/bookmarks"
					label="Bookmarks"
					icon={{
						normal: 'bookmarks',
						active: 'bookmarksFilled',
					}}
				/>
				<SidebarLink
					to="/lists"
					label="Lists"
					icon={{
						normal: 'lists',
						active: 'listsFilled',
					}}
				/>
				<SidebarLink
					to="/feed"
					label="Profile"
					icon={{
						normal: 'profile',
						active: 'profileFilled',
					}}
				/>
				<SidebarLink
					to="/feed"
					label="More"
					icon={{
						normal: 'more',
						active: 'more',
					}}
				/>
				<Button className="my-4 w-[90%] text-lg">Tweet</Button>
			</div>
			<div></div>
		</header>
	);
};
