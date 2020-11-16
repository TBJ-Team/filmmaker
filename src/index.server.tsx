/// <reference types="@rbxts/types/plugin" />

import { Scheduler } from "filmmaker";
import { THREAD_MAP } from "utils/thread";
import { Globals, Schedulers } from "globals";
import * as Roact from "@rbxts/roact";

Globals.plugin = plugin;
THREAD_MAP.set(coroutine.running(), "Main Thread");

let animationScheduler = new Scheduler("Animation Thread");
Schedulers.ANIMATION = animationScheduler;

let uiScheduler = new Scheduler("UI Thread");
Schedulers.UI = uiScheduler;
print("Hallo von main Faden!");

uiScheduler.execute(() => {

});
