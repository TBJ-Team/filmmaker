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
	KeyMap: Map<string, Map<number, Key>>;

	constructor(AnimationObject: Instance) {
		this.AnimationObject = AnimationObject;
		this.KeyMap = new Map();
	}

	getValue(Key: string, Time: number) {
		let sequence = this.KeyMap.get(Key);
		let largest = 0;
		let largestKey 
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