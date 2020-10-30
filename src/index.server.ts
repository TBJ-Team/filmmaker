/// <reference types="@rbxts/types/plugin" />

import { Scheduler } from "filmmaker";
import { THREAD_MAP } from "utils/thread";
import { Globals, Schedulers } from "globals";
import * as Roact from "@rbxts/roact";
import {GraphEditor} from "./ui";

Globals.plugin = plugin;
THREAD_MAP.set(coroutine.running(), "Main Thread");

let animationScheduler = new Scheduler("Animation Thread");
Schedulers.ANIMATION = animationScheduler;

let uiScheduler = new Scheduler("UI Thread");
Schedulers.UI = uiScheduler;

uiScheduler.execute(() => {
	Roact.mount(Roact.createElement(GraphEditor, {}))
});