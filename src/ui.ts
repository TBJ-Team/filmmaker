import { Globals, Schedulers } from "./globals";

export class UI {
	private readonly graphEditor: DockWidgetPluginGui;
	private readonly graphFrame: Frame;
	private graph: Graph;

	public constructor() {
		this.graphEditor = Globals.plugin.CreateDockWidgetPluginGui(
			"FilmmakerGraph",
			new DockWidgetPluginGuiInfo(Enum.InitialDockState.Bottom, false),
		);
		this.graphFrame = new Instance("Frame");
		this.graphFrame.Parent = this.graphEditor;
		this.graphFrame.Size = new UDim2(1, 0, 1, 0);
		this.graph = new Graph(this.graphFrame);
	}
}

class Graph {
	private busy = false;
	private uiFrame: Frame;

	public constructor(frame: Frame) {
		this.uiFrame = frame;
	}

	render() {
		Schedulers.UI.execute(() => {
			while (this.busy) {
				wait();
			}
		});
	}

	setData(map: Map<number, number>) {}

	frame() {}
}
