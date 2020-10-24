/// <reference types="@rbxts/types/plugin" />

import {FilmmakerClient} from "filmmaker";
import {CrashReport, CrashSeverity} from "./utils/crash";

FilmmakerClient.plugin = plugin;

let client = new FilmmakerClient();
new CrashReport("If you see this, please, PLEASE report it to Iplaydev.", CrashSeverity.FATAL).open();
client.stop();