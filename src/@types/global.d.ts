declare global {
	interface Window {
		confirm(msg: string): boolean;
	}
}