import { useEffect } from 'react';
import { useEmojiPickerStore } from './store';

export const useIntersectingNavbar = () => {
	const setActiveCategory = useEmojiPickerStore(
		state => state.setActiveCategory
	);

	useEffect(() => {
		const visibleCategories = new Map();
		const elements = document.querySelectorAll('[data-entry]');
		const root = document.querySelector('[data-root]');

		const hasIOSupport = !!window.IntersectionObserver;

		if (!hasIOSupport || !Boolean(elements.length)) return;

		const options = { threshold: [0.0, 1.0], root: root };

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				const name = entry.target.getAttribute('data-entry');
				visibleCategories.set(name, entry.intersectionRatio);
			});

			const ratios = [...visibleCategories];

			for (const [name, ratio] of ratios) {
				if (ratio) {
					setActiveCategory(name);
					break;
				}
			}
		}, options);

		elements.forEach(element => observer.observe(element));

		return () => observer.disconnect();
	}, []);
};
