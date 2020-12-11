import { Globals, Schedulers } from "./globals";
import * as Roact from "@rbxts/roact";

function GraphEditor(props: RbxJsxProps) {
	return (
		<frame Size={new UDim2(1, 0, 1, 0)}>
			<frame Size={new UDim2()}></frame>
			<Graph />
		</frame>
	);
}

export class UI {
	private readonly graphEditor: DockWidgetPluginGui;

	public constructor() {
		this.graphEditor = Globals.plugin.CreateDockWidgetPluginGui(
			"FilmmakerGraph",
			new DockWidgetPluginGuiInfo(Enum.InitialDockState.Bottom, false),
		);
		Roact.mount(<GraphEditor />, this.graphEditor, "GraphFrame");
	}
}

class Graph extends Roact.Component {
	render(): Roact.Element | undefined {
		return undefined;
	}
}
