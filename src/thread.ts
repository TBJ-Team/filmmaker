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
		t();
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
