import Easing from "./Easing";

export type Animatable = 
	| BasePart
	| Light
	| JointInstance;

type AnimatableValue =
	| Tweenable
	| undefined;

/**
 * All of an animation.
 */
export class Animation {
	instances: AnimationInstance[] = [];

	addInstance(inst: Animatable): AnimationInstance {
		let animInst: AnimationInstance = new AnimationInstance(inst);
		this.instances.push(animInst);
		return animInst;
	}
}

class AnimationInstance {
	AnimationObject: Animatable;
	KeyMap: Map<string, Sequence<AnimatableValue>>;

	constructor(AnimationObject: Animatable) {
		this.AnimationObject = AnimationObject;
		this.KeyMap = new Map();
	}

	/**
	 * Get a usable value for display from an index and a time in frames.
	 * @param Key Index to manipulate
	 * @param Frame Frame number to get
	 */
	getValue(Key: InstanceProperties<Animatable>, Frame: number): AnimatableValue {
		if (!this.KeyMap.has(Key)) { return; }
		let sequence = this.KeyMap.get(Key)!;
		let keys = sequence.Keys!;
		let leftFrame = 0;
		let leftKey: Key | undefined;
		let rightFrame = math.huge;
		let rightKey: Key | undefined;
		if (!sequence) { return; }
		keys.forEach((k: Key, i: number) => {
			let large: boolean = leftFrame < i && i < Frame;
			if (large) {
				leftFrame = i;
				leftKey = k;
			}
			return large;
		});
		keys.forEach((k: Key, i: number) => {
			let large: boolean = rightFrame > i && i > Frame;
			if (large) {
				rightFrame = i;
				rightKey = k;
			}
			return large;
		});
		if (!leftKey) { leftKey = rightKey; }
		if (!rightKey) { rightKey = leftKey; }
		if (!leftKey && !rightKey) { return sequence.Default; }
	}

	setValue(Key: InstanceProperties<Animatable>, Frame: number, Value: AnimatableValue): void {
		let assertionValue = (<Animatable>this.AnimationObject)[Key];
		if (typeOf(assertionValue) === typeOf(Value)) {
			if (!this.KeyMap.has(Key)) {
				
			}
		} else {
			throw "Wrong type!";
		}
	}
}

class Sequence<T> {
	Default: T;
	Keys: Key[] = [];

	constructor(Default: T) {
		this.Default = Default;
	}
}

class Key {
	x1: number = 0.42; 
	y1: number = 0;
	x2: number = 0.58;
	y2: number = 1;

	value?: AnimatableValue;
}
