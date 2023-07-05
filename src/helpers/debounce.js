// interface FunctionParameters<ARGS extends any[]> {
// 	fn: (...args: ARGS) => void;
// 	timeDelay: number;
// }

// interface FunctionResult<RES_ARGS extends any[]> {
// 	result: (...args: RES_ARGS) => void;
// }

// TODO: Finish debounce function!
export function debounce(fn, timeDelay) {
	let timeout = null;
	
	return function() {
		
		timeout = setTimeout(() => {
			fn.apply(this, ...arguments)
		}, timeDelay)
	}
}