import { Animation } from "Animation";

/** 
 * SaveFormat is the base class for all saving related to Filmmaker. All other
 * saving formats can and (eventually) *will* be added to this file for use.
 * Usage should only be through getters and setters.
 * 
 * @see DefaultSaveFormat
 */
abstract class SaveFormat {
	protected data: Animation = new Animation();
	protected instance: Instance = new Instance("Folder");

	constructor();
	constructor(inst: Instance);
	constructor(anim: Animation);
	constructor(obj?: Instance | Animation) {
		if (!obj) { return; }
		if (obj instanceof Animation) {

		} else if (obj instanceof Instance) {
			
		}
	}
	
	abstract getData(): Animation;
	abstract setData(anim: Animation): void;
	abstract getInst(): Instance; 
	abstract setInst(inst: Instance): void;
}

/** 
 * The default Filmmaker save format. Saves to a group of values.
 */
export class DefaultSaveFormat extends SaveFormat {
	protected data: Animation = new Animation();
	protected instance: Instance = new Instance("Folder");

	getData(): Animation {
		return this.data;
	}
	setData(anim: Animation): void {

	}
	getInst(): Instance {
		return this.instance;
	}
	setInst(inst: Instance): void {

	}

}

export class RobloxSaveFormat extends SaveFormat {
	protected data: Animation = new Animation();
	protected instance: Instance = new Instance("Folder");

	getData(): Animation {
		return this.data;
	}
	setData(anim: Animation): void {
		
	}
	getInst(): Instance {
		return this.instance;
	}
	setInst(inst: Instance): void {

	}

}