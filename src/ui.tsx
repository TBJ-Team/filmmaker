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

	/**
	 * Ignore the spaghetti for _G. I have to hack around the type checking.
	 */
	public constructor() {
		this.graphEditor = Globals.plugin.CreateDockWidgetPluginGui(
			"FilmmakerGraph",
			new DockWidgetPluginGuiInfo(Enum.InitialDockState.Bottom, false),
		);
		this.graphEditor.Title = "Graph Editor";
		// type stupid_GHackThatIHaveToDoBecauseTypescriptIsDumb = ;
		if ((_G as { ["filmemaekr2.0!"]?: PluginToolbar })["filmemaekr2.0!"] === undefined) {
			(_G as { ["filmemaekr2.0!"]?: PluginToolbar })["filmemaekr2.0!"] = Globals.plugin.CreateToolbar(
				"Filmmaker " + PKG_VERSION,
			);
		}
		// do this later!
		Schedulers.UI.execute(() => {
			Roact.mount(<GraphEditor />, this.graphEditor, "GraphFrame");
		});
	}
}

class Graph extends Roact.Component {
	render(): Roact.Element | undefined {
		return undefined;
	}
}
