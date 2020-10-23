import Bezier from "@rbxts/cubic-bezier";

export class MatrixStack {

	private stack: CFrame[] = [ new CFrame() ];

	public translate(x: number | CFrame, y: number, z: number): void {
		if (typeIs(x, "CFrame")) {
			this.stack[this.stack.size() - 1] = this.peek().mul(<CFrame> x);
			return;
		}
		this.stack[this.stack.size() - 1] = this.peek().mul(new CFrame(x, y, z));
	}

	public push(): void {
		this.stack.push(new CFrame().mul(this.peek()));
	}

	public peek(): CFrame {
		return this.stack[this.stack.size() - 1];
	}

	public pop(): void {
		this.stack.pop();
	}

	public isEmpty(): boolean {
		return this.stack.size() === 1;
	}
}

export class FKeyframe {

	private poses: FPose[] = new Array();
	private time: number = 0;

	add(value: CFrame, limb: Motor6D) {
		this.poses.push(new FPose(value, limb));
	}

}

export class FPose {

	public x1: number = 0.42; 
	public y1: number = 0;
	public x2: number = 0.58;
	public y2: number = 1;

	public motor: Motor6D;
	/** Transform to be applied */
	public value: CFrame;

	constructor(value: CFrame, motor: Motor6D) {
		this.value = value;
		this.motor = motor;
	}

	lerp(other: FPose, alpha: number) {
		const newBezier = new Bezier(other.x1, other.y1, this.x2, this.y2);
		return other.value.Lerp(this.value, newBezier(alpha));
	}
}