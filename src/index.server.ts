/// <reference types="@rbxts/types/plugin" />

import { Scheduler } from "thread";
import { Globals, Schedulers, THREAD_MAP } from "globals";
import { FAnimation } from "./animation";
import { Workspace } from "@rbxts/services";
import { UI } from "./ui";

Globals.plugin = plugin;
THREAD_MAP.set(coroutine.running(), "Main Thread");

const animationScheduler = new Scheduler("Animation Thread");
Schedulers.ANIMATION = animationScheduler;

const uiScheduler = new Scheduler("UI Thread");
Schedulers.UI = uiScheduler;

new FAnimation(Workspace);

animationScheduler.execute(() => {});

uiScheduler.execute(() => {
	const ui = new UI();
});
