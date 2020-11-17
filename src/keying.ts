function setPath<T extends Instance>(path: string, instance: Instance, value: never) {
	for (const v of path.split(".")) {
		if (instance[<InstanceProperties<T>>v]) {
			instance[<InstanceProperties<T>>v] = value;
			break;
		}
	}
}

function recurse(instance: Instance, ancestor: Instance, out: Instance[] = []): Instance[] | undefined {
	if (instance.Parent === ancestor) {
		out.insert(0, instance.Parent);
		return out;
	} else if (instance.Parent) {
		out.insert(0, instance.Parent);
		return recurse(instance.Parent, ancestor, out);
	}
	return undefined;
}

function getPath(instance: Instance, ancestor: Instance, property: string): string {
	const out = recurse(instance, ancestor);
	if (out) {
		for (const inst of out.slice(1, out.size())) {
		}
	}
	return "";
}

export class Animation {
	private char: Model;

	public constructor(char: Model) {
		this.char = char;
	}

	public lerp(time: number) {}
}

export class Frame {
	public value: Vector3 = new Vector3();

	public constructor(value?: Vector3) {
		if (value) {
			this.value = value;
		}
	}
}
