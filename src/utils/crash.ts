import { ServerStorage, Stats } from "@rbxts/services";
import { THREAD_MAP } from "./thread";
import { Globals } from "../globals";

import config from "utils/crash_config.json";

function round2(num: number, numDecimalPlaces: number = 0) {
	return tonumber(("%." + (numDecimalPlaces) + "f").format(num));
}

export declare const gcinfo: () => number;

export const LOGS_FOLDER: Folder = new Instance("Folder", ServerStorage);
LOGS_FOLDER.Name = "Filmmaker Crash Logs";

export class CrashReport {

	private static readonly COMMENTS: string[] = config.comments;

	private readonly cause: any;
	private readonly dataSet: Map<string, string> = new Map<string, string>();

	private logFile?: ModuleScript = undefined;

	public constructor(cause: any) {
		this.cause = cause;
		this.put();
	}

	public static openCause(cause: any) {
		let report = new CrashReport(cause);
		report.open();
		return report;
	}

	private static comment(): string {
		return CrashReport.COMMENTS[math.random(CrashReport.COMMENTS.size() - 1)];
	}

	private put() {
		// i know it looks wretched but its the power of trial and error
		this.dataSet.set("Filmmaker Version", PKG_VERSION);
		this.dataSet.set("Instance Count\t", tostring(Stats.InstanceCount));
		this.dataSet.set("Heartbeat\t\t", round2(Stats.HeartbeatTimeMs, 2) + " ms");
		this.dataSet.set("Memory Usage\t", gcinfo() + " KB");
		this.dataSet.set("Cause\t\t\t", tostring(this.cause));
		this.dataSet.set("Thread\t\t\t", THREAD_MAP.get(coroutine.running()) || "<UNKNOWN>");
		this.dataSet.set("Time\t\t\t", os.date("%c"));
	}

	public toString(): string {
		let str = "--[[\n";
		str += "// " + CrashReport.comment();
		str += "\n\n";
		str += "Filmmaker has crashed!\nIf you wanna report this, please submit a Github issue @ GyroLabs/Filmmaker";
		str += "\n\n";
		this.dataSet.forEach((value, key) => {
			str += `${key}\t\t${value}\n`
		});
		str += "\nStacktrace:\n\n";
		str += `${debug.traceback(undefined, 4)}\n\n]]`;
		return str;
	}

	public log(): ModuleScript {
		if (this.logFile) {
			return this.logFile;
		}
		let out = new Instance("ModuleScript", LOGS_FOLDER);
		// TODO: wtf
		// @ts-ignore
		out.Name = os.date(config.format);
		out.Source = this.toString();
		return out;
	}

	public open(): ModuleScript {
		let out = this.log();
		Globals.plugin.OpenScript(out);
		return out;
	}
}