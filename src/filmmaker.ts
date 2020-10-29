import {TaskScheduler, Runnable, THREAD_MAP} from "./utils/thread";

/**
 * Easy implementation for a TaskScheduler
 */
export class Scheduler extends TaskScheduler<Runnable> {

	private thread: thread = this.createThread();
	private stopped: boolean = false;

	public constructor(name: string) {
		super(name);
		this.start();
	}

	public stop() {
		this.stopped = true;
		this.cancel();
	}

	protected createThread() {
		let out = coroutine.create(() => this.waitUntilStopped());
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