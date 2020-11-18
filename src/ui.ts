import { Globals } from "./globals";

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
	// paths of frames that have been selected
	private selected: string[] = [];
	private busy = false;
	private uiFrame: Frame;

	public constructor(frame: Frame) {
		this.uiFrame = frame;
	}

	render() {
		while (this.busy) {
			wait();
		}
	}
	frame() {}
}
