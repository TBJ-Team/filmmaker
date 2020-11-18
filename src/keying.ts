const Selection = game.GetService("Selection");

/**
 * Set the value for a given path.
 * @param path
 * @param ancestor
 * @param value
 */
function setPath<T extends Instance>(path: string, ancestor: Instance, value: never) {
	let inst: Instance | undefined = ancestor;
	const pathArray = path.split(".");
	for (const v of pathArray.slice(0, pathArray.size() - 1)) {
		inst = inst.FindFirstChild(v);
		if (inst === undefined) {
			return;
		}
	}
	inst[<InstanceProperties<T>>pathArray[pathArray.size() - 1]] = value;
}

function getValue<T extends Instance>(path: string, ancestor: Instance): unknown {
	let inst: Instance | undefined = ancestor;
	const pathArray = path.split(".");
	for (const v of pathArray.slice(0, pathArray.size() - 1)) {
		inst = inst.FindFirstChild(v);
		if (inst === undefined) {
			return;
		}
	}
	return inst[<InstanceProperties<T>>pathArray[pathArray.size() - 1]];
}

function recurse(instance: Instance, ancestor: Instance, out: Instance[] = []): Instance[] | undefined {
	if (out.size() === 0) {
		out.push(instance);
	}
	if (instance.Parent === ancestor) {
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
		return `${out.join(".")}.${property}`;
	}
	return "";
}

export class Animation {
	private char: Model;

	public constructor(char: Model) {
		this.char = char;
	}

	public interp(time: number) {}

	public insert() {}
}

export class Frame {
	private data = new Map<string, unknown>();
}
