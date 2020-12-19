import { FAnimation } from "./animation";
import { Scheduler } from "./thread";

export namespace Globals {
	export let plugin: Plugin;
	export let current: FAnimation;
}

export namespace Schedulers {
	export let ANIMATION: Scheduler;
	export let UI: Scheduler;
}

export const THREAD_MAP: Map<thread, string> = new Map<thread, string>();
