import { Scheduler } from "./filmmaker";
import { FAnimation } from "./animation";

export namespace Globals {
	export let plugin: Plugin;
	export let current: FAnimation;
}

export namespace Schedulers {
	export let ANIMATION: Scheduler;
	export let UI: Scheduler;
}
