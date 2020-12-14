/**
 * IKSystem is a glorified array of points that function as a wrapper for the
 * FABRIK algorithm.
 */
export class IKSystem {
	joints: Vector3[] = [];

	constructor(joints?: Vector3[]) {
		if (joints) this.joints = joints;
	}

	length(): number {
		let lastValue: Vector3 | undefined;
		let length = 0;
		this.joints.forEach((val: Vector3) => {
			let out = 0;
			if (lastValue) {
				out = lastValue.sub(val).Magnitude;
			}
			lastValue = val;
			length += out;
		});
		return length;
	}

	backwards() {}

	forwards() {}
}
