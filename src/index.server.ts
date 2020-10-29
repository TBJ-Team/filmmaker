/// <reference types="@rbxts/types/plugin" />

import {Scheduler} from "filmmaker";
import {CrashReport} from "utils/crash";
import {THREAD_MAP} from "utils/thread";
import {Globals, Schedulers} from "globals";

Globals.plugin = plugin;
THREAD_MAP.set(coroutine.running(), "Main Thread");

let animationScheduler = new Scheduler("Animation Thread");
Schedulers.ANIMATION = animationScheduler;

let uiScheduler = new Scheduler("UI Thread");
Schedulers.UI = uiScheduler;

animationScheduler.execute(() => {
	new CrashReport("wtf").open();
	animationScheduler.stop();
});

uiScheduler.execute(() => {
	new CrashReport("test").open();
	uiScheduler.stop();
});