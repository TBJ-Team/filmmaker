import { FAnimation } from "animation";

/**
 * Save is the base class that most saving and loading from Instances in the current
 * place is handled.
 */
export abstract class Save {

	/** Create a Instance to be saved to the current place. */
	abstract save(anim: FAnimation): Instance;
	/** Preview a looped version of the animation. Mostly for saving to Roblox */
	abstract preview(time?: number): void;
}

export class RobloxSave extends Save {

	save(anim: FAnimation): Instance {
		const out = new Instance("KeyframeSequence"); // TODO: create a viable solution for roblox saves
		return out;
	}

	preview(time?: number): void {

	}

}