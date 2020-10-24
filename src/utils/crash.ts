import { ServerScriptService, Stats } from "@rbxts/services";
import { FilmmakerClient } from "../filmmaker";
import { THREAD_MAP } from "./thread";

export const LOGS_FOLDER: Folder = new Instance("Folder", ServerScriptService);

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

	public constructor(cause: any, severity: string = CrashSeverity.FATAL) {
		this.cause = cause;
		this.severity = severity;
		this.put();
	}

	private static comment(): string {
		return CrashReport.COMMENTS[math.random(CrashReport.COMMENTS.size())] || "No comment found!";
	}

	private put() {
		this.dataSet.set("Filmmaker Version", PKG_VERSION);
		this.dataSet.set("Instance Count", tostring(Stats.InstanceCount));
		this.dataSet.set("Heartbeat", tostring(Stats.HeartbeatTimeMs));
		this.dataSet.set("Memory Usage", collectgarbage("count") + " KB");
		this.dataSet.set("Cause", tostring(this.cause));
		this.dataSet.set("Severity", this.severity)
		this.dataSet.set("Thread", THREAD_MAP.get(coroutine.running()) || "<UNKNOWN>");
		this.dataSet.set("Exit Code", "66");
	}

	public toString(): string {
		let str = "--[[\n";
		str += " * " + CrashReport.comment();
		str += "\n\n";
		this.dataSet.entries().forEach(([key, value]) => {
			str += `${key}\t\t${value}\n`
		});
		str += `\n${debug.traceback()}\n\n]]`
		return str;
	}

	public openScript(): ModuleScript {
		let out = new Instance("ModuleScript", LOGS_FOLDER);
		out.Source = this.toString();
		FilmmakerClient.plugin.OpenScript(out);
		return out;
	}
}