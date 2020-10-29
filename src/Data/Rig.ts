import {Globals} from "../globals";

const plugin = Globals.plugin;

enum RigType {
	R6 = 1,
	R15 = 2,
	Custom = 3,
}

/**
 * Rig is an umbrella class that lays out how a rig should be loaded, and how to
 * save it into a usable format.
 * 
 * @see FBXRig
 */
export abstract class Rig {
	type: RigType;
	model?: Model;

	/**
	 * A base constructor for the rig class.
	 * @param rigType The RigType to use.
	 */
	constructor(rigType: RigType = RigType.R15) {
		this.type = rigType;
	}

	abstract async load(): Promise<Model>;
	abstract get(): Model | undefined;
}

export class FBXRig extends Rig {

	constructor(rigType: RigType = RigType.R15) {
		if (rigType === RigType.Custom) {
			warn("Due to the limitations of FBX loading, it is currently impossible to load in custom rigs. Sorry!");
			rigType = RigType.R15;
		}
		super(rigType);
	}

	async load(): Promise<Model> {
		let rig = plugin.ImportFbxRig(this.type === RigType.R15);
		rig.Parent = undefined;
		if (!rig.FindFirstChildWhichIsA("Motor6D", true)) {
			throw "Failed to import rig correctly! Did you import a Roblox rig?";
		}
		return rig;
	}

	get(): Model | undefined {
		if (!this.model) {
			const [success, data] = this.load()
				.catch(e => warn("Failed to load model! %s".format(e as string)))
				.await();
			if (success) {
				this.model = data as Model;
				return data as Model;
			} else {
				warn("Model import failure! Possibly fatal! %s".format(data as string));
				return undefined;
			}
		}
		return this.model;
	}
}

// export class GeneratedRig extends Rig {

// 	load(): Promise<Model> {
// 	}
// 	get(): Model | undefined {
// 	}


// }