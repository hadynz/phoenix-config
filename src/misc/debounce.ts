export default function debounce(
	func: () => void,
	wait: number,
	immediate?: boolean,
) {
	let timeout: number;
	return (...args: any[]) => {
		const later = () => {
			timeout = 0;
			if (!immediate) {
				func.apply(func, args);
			}
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) {
			func.apply(func, args);
		}
	};
}
