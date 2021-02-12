/**
 * Animation module.
 */

/**
 * Why was this removed ;-;
 * Slices a table out of another. Returns a sub-table.
 * @param t Array to slice
 * @param first First element to slice from
 * @param last Last element to slice fomr
 */
function slice<T>(t: T[], first: number, last: number) {
	const out: T[] = [];
	for (let i = first; i < math.min(last, t.size()); i++) {
		out[i] = t[i];
	}
	return out;
}

export class FAnimation {
	private frames: CFrame[] = [];
	private char: Model;

	public constructor(char: Model) {
		this.char = char;
	}

	/**
	 * Apply the animation at `frame`
	 * @param time
	 */
	apply(time: number) {}
}

class FKeyframe {}
