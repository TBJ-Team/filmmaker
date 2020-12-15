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
		const toolbar = (_G as { ["filmemaekr2.0!"]?: PluginToolbar })["filmemaekr2.0!"]!;
		const openGraphEditor = toolbar.CreateButton(
			"FilmmakerGraphEditor",
			"Graph Editor",
			"rbxassetid://0",
			"Open Graph Editor",
		);
		openGraphEditor.Click.Connect(() => {
			this.toggleGraphEditor();
			openGraphEditor.SetActive(false);
		});
		// do this later!
		Schedulers.UI.execute(() => {
			Roact.mount(<GraphEditor />, this.graphEditor, "GraphFrame");
		});
	}

	private toggleGraphEditor() {
		this.graphEditor.Enabled = !this.graphEditor.Enabled;
	}
}

type GraphProps = { data?: { [k: number]: number } };

class Graph extends Roact.Component<GraphProps> {
	public constructor(props: GraphProps) {
		super(props);
	}

	render(): Roact.Element | undefined {
		return undefined;
	}
}
