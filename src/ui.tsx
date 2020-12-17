import { Globals, Schedulers } from "./globals";
import * as Roact from "@rbxts/roact";
import { TextService } from "@rbxts/services";

/**
 * Mandatory type for all toolbar item properties.
 */
type ToolbarItem = { Order: number };

/**
 * A text button for the toolbar at the top of an editor.
 * @param props Properties of the menu.
 * @constructor
 */
function ToolbarMenu(props: { Clicked: () => void; Name: string } & ToolbarItem) {
	const textSize = TextService.GetTextSize(props.Name, 18, Enum.Font.Gotham, new Vector2(math.huge, 25));
	const theme = ((settings().Studio as unknown) as { Theme: StudioTheme }).Theme;
	return (
		<textbutton
			Text={props.Name}
			Event={{ Activated: props.Clicked }}
			Size={new UDim2(0, textSize.X + 2, 1, 0)}
			Font={Enum.Font.Gotham}
			TextColor3={theme.GetColor("MainText")}
			BorderSizePixel={0}
			TextSize={12}
			BackgroundColor3={theme.GetColor("MainBackground")}
			LayoutOrder={props.Order}
		/>
	);
}

/**
 * An image button for the toolbar at the top of an editor.
 * @param props Properties of the button.
 * @constructor
 */
function ToolbarButton(props: { Clicked: () => void; Icon: string } & ToolbarItem) {
	const theme = ((settings().Studio as unknown) as { Theme: StudioTheme }).Theme;
	return (
		<imagebutton
			BackgroundColor3={theme.GetColor("MainBackground")}
			AutoButtonColor={true}
			SizeConstraint={Enum.SizeConstraint.RelativeYY}
			Image={props.Icon}
			Event={{
				Activated: props.Clicked,
			}}
			Size={new UDim2(0.8, 0, 0.8, 0)}
			LayoutOrder={props.Order}
		>
			<uicorner CornerRadius={new UDim(0, 2)} />
		</imagebutton>
	);
}

/**
 * Separates elements of the toolbar by using a small "sliver."
 * @constructor
 */
function ToolbarSeparator(props: ToolbarItem) {
	const theme = ((settings().Studio as unknown) as { Theme: StudioTheme }).Theme;
	return (
		<frame
			BackgroundColor3={theme.GetColor("Separator")}
			BorderSizePixel={0}
			Size={new UDim2(0, 1, 0.8, 0)}
			LayoutOrder={props.Order}
		/>
	);
}

function GraphEditorToolbar(props: RbxJsxProps) {
	return Roact.createFragment({
		["Layout"]: (
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				Padding={new UDim(0, 5)}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>
		),
		["File Menu"]: (
			<ToolbarMenu
				Clicked={() => {
					print("Hello from File menu!");
				}}
				Name={"File"}
				Order={0}
			/>
		),
		["Edit Menu"]: (
			<ToolbarMenu
				Clicked={() => {
					print("Hello from Edit menu!");
				}}
				Name={"Edit"}
				Order={1}
			/>
		),
		["Seperator00"]: <ToolbarSeparator Order={2} />,
		["Linear Tangent"]: (
			<ToolbarButton
				Clicked={() => {
					print("Linear tangented!");
				}}
				Icon={"rbxassetid://1261714227"}
				Order={3}
			/>
		),
	});
}

function GraphEditor(props: RbxJsxProps) {
	// thank you roblox-ts, very cool
	const theme = ((settings().Studio as unknown) as { Theme: StudioTheme }).Theme;
	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundColor3={theme.GetColor("MainBackground")}>
			<frame
				Size={new UDim2(1, 0, 0, 25)}
				BackgroundColor3={theme.GetColor("MainBackground")}
				BorderSizePixel={0}
			>
				<GraphEditorToolbar />
			</frame>
			<frame
				Size={new UDim2(1, 0, 1, -25)}
				Position={new UDim2(0, 0, 0, 25)}
				BackgroundColor3={theme.GetColor("ScriptBackground")}
				BorderSizePixel={0}
			>
				<Graph />
			</frame>
		</frame>
	);
}

/**
 * Class that handles a lot of the Roact mounting and concurrency dedicated to UI.
 */
export class UI {
	private readonly graphEditor: DockWidgetPluginGui;

	/**
	 * Base constructor. Sets up the plugin UI and plugin toolbar.
	 */
	public constructor() {
		// graph editor widget
		this.graphEditor = Globals.plugin.CreateDockWidgetPluginGui(
			"FilmmakerGraph",
			new DockWidgetPluginGuiInfo(Enum.InitialDockState.Bottom, false),
		);
		this.graphEditor.Title = "Graph Editor";

		// check if there is already a toolbar
		// ignore the spaghetti
		if ((_G as { [name: string]: PluginToolbar | undefined })["Filmmaker" + PKG_VERSION] === undefined) {
			(_G as { [name: string]: PluginToolbar | undefined })[
				"Filmmaker" + PKG_VERSION
			] = Globals.plugin.CreateToolbar("Filmmaker " + PKG_VERSION);
		}
		const toolbar = (_G as { [name: string]: PluginToolbar | undefined })["Filmmaker" + PKG_VERSION]!;

		// create an open graph editor button
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

		// execute this later!
		Schedulers.UI.execute(() => {
			Roact.mount(<GraphEditor />, this.graphEditor, "GraphFrame");
		});
	}

	/**
	 * Toggle the visiblity of the Graph Editor.
	 * @private
	 */
	private toggleGraphEditor() {
		this.graphEditor.Enabled = !this.graphEditor.Enabled;
	}
}

type GraphProps = { data?: { [k: number]: number } };

/**
 * Represents a graph of many objects.
 */
class Graph extends Roact.Component<GraphProps> {
	public constructor(props: GraphProps) {
		super(props);
	}

	render(): Roact.Element | undefined {
		return Roact.createFragment({
			["Elements"]: <frame></frame>,
			["Graph"]: <frame></frame>,
		});
	}
}
