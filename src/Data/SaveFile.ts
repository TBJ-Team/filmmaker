import { Animation } from "Animation";

/** 
 * SaveFormat is the base class for all saving related to Filmmaker. All other
 * saving formats can and (eventually) *will* be added to this file for use.
 * Usage should only be through getters and setters.
 * 
 * @see DefaultSaveFormat
 */
interface SaveFormat {
	data: Animation;
	instance: Instance;
	
	getData(): Animation;
	setData(anim: Animation): this;
	getInst(): Instance; 
	setInst(inst: Instance): this;
}

/** 
 * The default Filmmaker save format. Saves to a group of values.
 */
export class DefaultSaveFormat implements SaveFormat {
	data: Animation = new Animation();
	instance: Instance = new Instance("Folder");

	constructor();
	constructor(inst: Instance);
	constructor(anim: Animation);
	constructor(obj?: Instance | Animation){
		if (obj instanceof Animation) {

		} else if (obj instanceof Instance) {
			
		}
	}

	getData(): Animation {
		return this.data;
	}
	setData(anim: Animation): this {
		return this;
	}
	getInst(): Instance {
		return this.instance;
	}
	setInst(inst: Instance): this {
		return this;
	}

}