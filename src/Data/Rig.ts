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

	/**
	 * A base constructor for the rig class.
	 * @param rigType The RigType to use.
	 */
	constructor(rigType: RigType = RigType.R15) {
		this.type = rigType;
	}
	
	abstract save(): Instance;
	abstract load(): void;
}

export class FBXRig extends Rig {

	constructor(rigType: RigType = RigType.R15) {
		if (rigType === RigType.Custom) {
			warn("Due to the limitations of FBX loading, it is currently impossible to load in custom rigs. Sorry!");
			rigType = RigType.R15;
		}
		super(rigType);
	}

	save(): Instance {
		throw "Method not implemented.";
	}

	load(): void {
		let rig = plugin.ImportFbxRig(this.type === RigType.R15);
		rig.Parent = undefined;
		if (!rig.FindFirstChildWhichIsA("Motor6D", true)) {

		}
	}
}

export class GeneratedRig extends Rig {

	save(): Instance {
		throw "Method not implemented.";
	}

	load(): void {
		

	}

}