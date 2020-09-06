import Easing from "./Easing";

/**
 * All of an animation.
 */
class Animation {
	instances: AnimationInstance[] = [];

	addInstance(inst: Instance): AnimationInstance {
		return new AnimationInstance(inst);
	}
}

class AnimationInstance {
	AnimationObject: Instance;
	KeyMap: Map<string, Key[]>;

	constructor(AnimationObject: Instance) {
		this.AnimationObject = AnimationObject;
		this.KeyMap = new Map();
	}

	getValue(Key: string, Frame: number) {
		let sequence = this.KeyMap.get(Key);
		let leftFrame = 0;
		let leftKey: Key | undefined;
		let rightFrame = math.huge;
		let rightKey: Key | undefined;
		if (!sequence) { return; }
		sequence.forEach((k: Key, i: number) => {
			let large: boolean = leftFrame < i && i < Frame;
			if (large) {
				leftFrame = i;
				leftKey = k;
			}
			return large;
		});
		sequence.forEach((k: Key, i: number) => {
			let large: boolean = rightFrame > i && i > Frame;
			if (large) {
				rightFrame = i;
				rightKey = k;
			}
			return large;
		});
		if (!leftKey || !rightKey) {
			
		}
	}
}

class Key {
	x1: number = 0.42; 
	y1: number = 0;
	x2: number = 0.58;
	y2: number = 1;

	value: any;
}

export = Animation;