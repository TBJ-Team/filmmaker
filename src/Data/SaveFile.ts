import Animation from "../Animation/index";

/** 
 * A reusable instance for saving purposes.
 */
interface SaveFormat {
	/**
	 * Save current data to an instance for later use.
	 */
	save(): Instance;
	/**
	 * Set the animation to use for saving.
	 * @param anim Animation for use
	 */
	saveData(anim: Animation): SaveFormat;
	load(inst: Instance): Animation; 
}

/** 
 * The default Filmmaker save format. 
 */
class DefaultSaveFormat implements SaveFormat {
	
	private data: Animation = new Animation();
	
	constructor(inst?: Instance) {
		if (!inst) { return; }
		this.load(inst);
	}

	save(): Instance {
		return new Instance("Part");
	}
	
	saveData(anim: Animation) {
		this.data = anim;
		return this;
	}

	load(inst: Instance): Animation {
		let out: Animation = new Animation();
		return new Animation();
	}

}

export {}