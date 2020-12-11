/// <reference types="@rbxts/types/plugin" />

import { Scheduler } from "filmmaker";
import { THREAD_MAP } from "thread";
import { Globals, Schedulers } from "globals";
import * as Roact from "@rbxts/roact";
import { FAnimation } from "./keying";
import { Workspace } from "@rbxts/services";

Globals.plugin = plugin;
THREAD_MAP.set(coroutine.running(), "Main Thread");

const animationScheduler = new Scheduler("Animation Thread");
Schedulers.ANIMATION = animationScheduler;

const uiScheduler = new Scheduler("UI Thread");
Schedulers.UI = uiScheduler;

new FAnimation(Workspace);

uiScheduler.execute(() => {});
