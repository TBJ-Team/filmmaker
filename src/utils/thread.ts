export type Runnable = (...args: any[]) => void;

export const THREAD_MAP: Map<thread, string> = new Map<thread, string>();

/**
 * ThreadExecutor is used to execute Runnables on a specific thread
 */
export abstract class Executor<T extends Runnable> {

	protected stack: T[] = [];
	protected name: string;
	protected executions: number = 0;

	protected constructor(name: string) {
		this.name = name;
	}

	/**
	 * Allows your Executor to be recognized by the crash logs.
	 * @protected
	 */
	protected register() {
		THREAD_MAP.set(this.getThread(), this.name);
	}

	public abstract getThread(): thread;

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
		}
	}

	public start(): void {
		coroutine.resume(this.getThread());
	}

	protected wait() {
		wait(1 / 1000);
	}

	public runTasks(stopCondition: () => boolean): void {
		debug.profilebegin(this.name + " Run Tasks");
		this.executions++;
		try {
			while (!stopCondition()) {
				if (!this.runTask()) {
					this.wait();
				}
			}
		} catch (e) {
			error(`Task failure: ${this.name}!`, 2);
			error(e, 1);
		} finally {
			this.executions--;
			debug.profileend();
		}
	}

	protected executeTask(t: T) {
		t();
	}

	protected runAll() {
		while (this.runTask()) {
		}
	}

	protected runTask() {
		let runnable = this.stack.pop();
		if (runnable) {
			debug.profilebegin(this.name + " Start Task");
			this.executeTask(runnable);
			debug.profileend();
			return true;
		} else if (this.executions === 0) {
			return false;
		}
		return false;
	}
}