import { ServerStorage, Stats } from "@rbxts/services";
import { FilmmakerClient } from "../filmmaker";
import { THREAD_MAP } from "./thread";

function round2(num: number, numDecimalPlaces: number = 0) {
	return tonumber(("%." + (numDecimalPlaces) + "f").format(num));
}


export const LOGS_FOLDER: Folder = new Instance("Folder", ServerStorage);
LOGS_FOLDER.Name = "Filmmaker Crash Logs"

export enum CrashSeverity {
	FATAL = "!! WARNING: FATAL CRASH !! SUBMIT A BUG REPORT!",
	SEVERE = "SEVERE CRASH! SUBMIT A BUG REPORT",
	MINOR = "MINOR CRASH"
}

export class CrashReport {

	private static readonly COMMENTS: string[] = ["That was intended. No, seriously. That was meant to happen.",
		"Oops!", "Pop the champagne! Oh.", "Crud.", "Check out our sister game, Flimmaker!", "Calculated.",
		"Filmmaker was filmed in front of a live studio audience. Nobody laughed, but they were there.",
		"Beam me up, Roblox Studio.", "Anyway, here's Wonderwall.", "Execute Order 66. No, seriously. This is exit code 66.",
		"This is a ticket to file a restraining order against your nearest Mojangsta: ~~RESTRAINING ORDER~~"];

	private readonly severity: string;
	private readonly cause: any;
	private readonly dataSet: Map<string, string> = new Map<string, string>();

	private logFile?: ModuleScript = undefined;

	public constructor(cause: any, severity: string = CrashSeverity.FATAL) {
		this.cause = cause;
		this.severity = severity;
		this.put();
	}

	private static comment(): string {
		return CrashReport.COMMENTS[math.random(CrashReport.COMMENTS.size())] || "If you see this, start running.";
	}

	private put() {
		// i know it looks wretched but its the power of trial and error
		this.dataSet.set("Filmmaker Version", PKG_VERSION);
		this.dataSet.set("Instance Count\t", tostring(Stats.InstanceCount));
		this.dataSet.set("Heartbeat\t\t", round2(Stats.HeartbeatTimeMs, 2) + " ms");
		this.dataSet.set("Memory Usage\t", collectgarbage("count") + " KB");
		this.dataSet.set("Cause\t\t\t", tostring(this.cause));
		this.dataSet.set("Severity\t\t", this.severity)
		this.dataSet.set("Thread\t\t\t", THREAD_MAP.get(coroutine.running()) || "<UNKNOWN>");
		this.dataSet.set("Time\t\t\t", os.date("%c"));
		this.dataSet.set("Exit Code\t\t", "66");
	}

	public toString(): string {
		let str = "--[[\n";
		str += " * " + CrashReport.comment();
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
		out.Name = os.date("CRASH LOG - %c");
		out.Source = this.toString();
		return out;
	}

	public open(): ModuleScript {
		let out = this.log();
		FilmmakerClient.plugin.OpenScript(out);
		return out;
	}
}