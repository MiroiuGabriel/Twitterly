import { createContext, useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStore, createStore } from 'zustand';

type Attachment = 'POLL' | 'GIF' | 'IMAGE' | 'VIDEO' | 'NONE';
type Choice = 'choice1' | 'choice2' | 'choice3' | 'choice4';

type Image = {
	id: string;
	src: string;
};

type CreateTweet = {
	attachment: Attachment;
	text: string;
	images: Image[];
	video: string;
	gif: string;
	choices: number;
	choice1: string;
	choice2: string;
	choice3: string;
	choice4: string;
	minutes: number;
	hours: number;
	days: number;
	scheduled: Date | null;
	setScheduled: (date: Date | null) => void;
	isScheduleModalOpen: boolean;
	setIsScheduleModalOpen: (open: boolean) => void;
	setText: (text: string) => void;
	addImage: (src: string) => void;
	removeImage: (id: string) => void;
	setVideo: (src: string) => void;
	setAttachment: (attachment: Attachment) => void;
	addChoice: () => void;
	setChoice: (choice: Choice, value: string) => void;
	setMinutes: (minutes: number) => void;
	setHours: (hours: number) => void;
	setDays: (days: number) => void;
};

export const createTweetStore = () =>
	createStore<CreateTweet>()((set, get) => ({
		attachment: 'NONE',
		text: '',
		images: [],
		video: '',
		gif: '',
		choices: 2,
		choice1: '',
		choice2: '',
		choice3: '',
		choice4: '',
		days: 1,
		hours: 0,
		minutes: 0,
		scheduled: null,
		isScheduleModalOpen: false,
		setScheduled: date => set({ scheduled: date }),

		setIsScheduleModalOpen: open => {
			set({ isScheduleModalOpen: open });
		},
		addImage: src =>
			set(state => ({
				images: [...state.images, { id: uuidv4(), src }],
			})),
		removeImage: id =>
			set(state => ({
				images: state.images.filter(image => image.id !== id),
			})),
		setVideo: src => set({ video: src }),
		setText: text => set({ text }),
		setAttachment: attachment => set({ attachment }),
		addChoice: () =>
			set(state =>
				state.choices < 4 ? { choices: state.choices + 1 } : state
			),
		setChoice: (choice, value) => set({ [choice]: value }),
		setDays: (days: number) =>
			set(state => ({
				days,
				hours:
					days === 7
						? 0
						: days === 0 && state.minutes === 0
						? 1
						: state.hours,
				minutes: days === 7 ? 0 : state.minutes,
			})),
		setHours: (hours: number) =>
			set(state => ({
				minutes:
					state.days === 0 && hours === 0 && state.minutes < 5
						? 5
						: state.minutes,
				hours,
			})),
		setMinutes: (minutes: number) => set({ minutes }),
	}));

type CreateTweetStore = ReturnType<typeof createTweetStore>;

const CreateTweetContext = createContext<CreateTweetStore | null>(null);

type CreateTweetContextProviderProps = {
	children: React.ReactNode;
};

export const CreateTweetContextProvider: React.FC<
	CreateTweetContextProviderProps
> = ({ children }) => {
	const createTweetStoreRef = useRef<CreateTweetStore>();
	if (!createTweetStoreRef.current) {
		createTweetStoreRef.current = createTweetStore();
	}

	return (
		<CreateTweetContext.Provider value={createTweetStoreRef.current}>
			{children}
		</CreateTweetContext.Provider>
	);
};

export const useCreateTweetStore = <T,>(
	selector: (state: CreateTweet) => T
) => {
	const storeApi = useContext(CreateTweetContext);
	if (!storeApi)
		throw new Error('Missing CreateTweetContext.Provider in the tree');
	return useStore(storeApi, selector);
};
