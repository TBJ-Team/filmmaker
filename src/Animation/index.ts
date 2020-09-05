class Animation {
	instances: AnimationInstance[] = [];

	
}

class AnimationInstance {
	AnimationObject: Instance;

	constructor(AnimationObject: Instance) {
		this.AnimationObject = AnimationObject;
	}
}

export = Animation;