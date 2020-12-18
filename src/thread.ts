import { CrashReport } from "./data/crash";

export const THREAD_MAP: Map<thread, string> = new Map<thread, string>();

export type Runnable = (...args: unknown[]) => void;

export abstract class TaskScheduler<T extends Runnable> {
	protected stack: T[] = [];
	protected readonly name: string;
	protected executions = 0;

	protected constructor(name: string) {
		this.name = name;
	}

	public abstract getThread(): thread;

	/** Start or restart the thread */
	public abstract start(): void;

	public shouldExecute(): boolean {
		return coroutine.running() === this.getThread();
	}

	public cancel() {
		this.stack = [];
	}

	public execute(runnable: T) {
		if (this.shouldExecute()) {
			this.executeTask(runnable);
		} else {
			this.stack.push(runnable);
			this.start();
		}
	}

	public runTasks(stopCondition: () => boolean): void {
		this.executions++;
		try {
			while (!stopCondition()) {
				if (!this.runTask()) {
					coroutine.yield(); // pause the current thread until next execution
				}
			}
		} finally {
			this.executions--;
		}
	}

	protected executeTask(t: T) {
		try {
			t();
		} catch (e: unknown) {
			CrashReport.openCause(e);
		}
	}

	protected runTask() {
		const runnable = this.stack.pop();
		if (runnable) {
			this.executeTask(runnable);
			return true;
		} else if (this.executions === 0) {
			return false;
		}
		return false;
	}
}

/**
 * Multi-threading scheduler. Similar to the internal Task Scheduler.
 */
export class Scheduler extends TaskScheduler<Runnable> {
	private thread: thread = this.createThread();
	private stopped = false;

	public constructor(name: string) {
		super(name);
		this.start();
	}

	public stop() {
		this.stopped = true;
		this.cancel();
	}

	protected createThread() {
		const out = coroutine.create(() => this.waitUntilStopped());
		if (this.thread) {
			THREAD_MAP.delete(this.thread);
		}
		THREAD_MAP.set(out, this.name);
		return out;
	}

	protected waitUntilStopped() {
		while (!this.stopped) {
			this.runTasks(() => this.stopped);
		}
	}

	getThread(): thread {
		return this.thread;
	}

	start(): void {
		this.stopped = false;
		// if the current thread is dead then create a new one
		this.thread = coroutine.status(this.thread) !== "dead" ? this.thread : this.createThread();
		coroutine.resume(this.thread);
	}
}
