import {Executor, Runnable, THREAD_MAP} from "./utils/thread";
import { RunService } from "@rbxts/services";


export class FilmmakerClient extends Executor<Runnable> {
	public static plugin: Plugin;

	private readonly thread: thread = this.createThread();
	private stopped: boolean = false;

	public constructor() {
		super("Animation Executor");
		THREAD_MAP.set(coroutine.running(), "Main Thread")
		this.start();
		this.register();
	}

	public stop() {
		this.stopped = true;
		this.cancel();
	}

	protected createThread() {
		return coroutine.create(() => this.waitUntilStopped());
	}

	protected wait() {
		RunService.Stepped.Wait();
	}

	protected waitUntilStopped() {
		while (!this.stopped) {
			this.runTasks(() => this.stopped);
		}
	}

	getThread(): thread {
		return this.thread;
	}
}