import { Globals, Schedulers } from "./globals";
import * as Roact from "@rbxts/roact";
import { TextService } from "@rbxts/services";

const theme = settings().Studio.Theme;

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
		["Separator00"]: <ToolbarSeparator Order={2} />,
		["Linear Tangent"]: (
			<ToolbarButton
				Clicked={() => {
					print("Linear tangent!");
				}}
				Icon={"rbxassetid://1261714227"}
				Order={3}
			/>
		),
	});
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
			new DockWidgetPluginGuiInfo(Enum.InitialDockState.Bottom, false, true),
		);
		this.graphEditor.Title = "Graph Editor";

		// check if there is already a toolbar
		// ignore the spaghetti
		if ((_G as { [name: string]: PluginToolbar | undefined })["Filmmaker" + PKG_VERSION] === undefined) {
			(_G as { [name: string]: PluginToolbar | undefined })[
				"Filmmaker" + PKG_VERSION
			] = Globals.plugin.CreateToolbar(
				"Filmmaker " + PKG_VERSION + (Globals.plugin.Name.find(".rbxm")[0] ? " (Local)" : ""),
			);
		}
		const toolbar = (_G as { [name: string]: PluginToolbar | undefined })["Filmmaker" + PKG_VERSION]!;

		// create an open graph editor button
		const openGraphEditor = toolbar.CreateButton(
			"FilmmakerGraphEditor",
			"Graph Editor",
			"rbxassetid://6101578744",
			"Open Graph Editor",
		);
		const crashButton = toolbar.CreateButton("ForceCrash", "Crash Filmmaker", "rbxassetid://0", "Forcefully Crash");
		openGraphEditor.Click.Connect(() => {
			this.toggleGraphEditor();
			openGraphEditor.SetActive(false);
		});
		crashButton.Click.Connect(() => {
			Schedulers.UI.execute(() => {
				throw "TEST CRASH. THIS IS A DRILL.";
			});
			print("Crashed!");
			crashButton.SetActive(false);
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

function GraphEditor(props: RbxJsxProps) {
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
				Active={false}
			>
				<Graph data={[]} />
			</frame>
		</frame>
	);
}

type GraphProps = { data: Array<[number, number, boolean]> };
type GraphState = { startCoords?: Vector2; endCoords?: Vector2; absoluteSize?: Vector2 };

/**
 * Represents a graph of many objects.
 */
class Graph extends Roact.PureComponent<GraphProps, GraphState> {
	private readonly graphFrame: Roact.Ref<Frame>;

	public constructor(props: GraphProps) {
		super(props);
		this.setState({ startCoords: new Vector2(-5, -5), endCoords: new Vector2(10, 10) });
		this.graphFrame = Roact.createRef();
	}

	zoomOut = (element: Frame, x: number, y: number) => {
		this.setState((prevState, props) => {
			return { startCoords: prevState.startCoords?.mul(1.25), endCoords: prevState.endCoords?.mul(1.25) };
		});
	};

	zoomIn = (element: Frame, x: number, y: number) => {
		this.setState((prevState, props) => {
			return { startCoords: prevState.startCoords?.mul(0.8), endCoords: prevState.endCoords?.mul(0.8) };
		});
	};

	graphChanged = (rbx: Frame) => {
		if (this.state.absoluteSize === rbx.AbsoluteSize) {
			return;
		}
		this.setState({
			startCoords: this.state.startCoords,
			endCoords: this.state.endCoords,
			absoluteSize: rbx.AbsoluteSize,
		});
	};

	render(): Roact.Element | undefined {
		const graphElements = this.props.data.mapFiltered(([t, value], index) => {
			if (index === this.props.data.size() - 1) {
				return undefined;
			}
			const [BFt, BF, keyFrame] = this.props.data[index + 1];

			return (
				// uh
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				<GraphNode
					A={value}
					B={BF}
					At={t}
					Bt={BFt}
					startCoords={this.state.startCoords || new Vector2(-5, -5)}
					endCoords={this.state.endCoords || new Vector2(10, 10)}
					graphSize={this.state.absoluteSize}
					keyFrame={keyFrame}
					Key={t}
				/>
			);
		});
		return Roact.createFragment({
			["Elements"]: (
				<frame
					Size={new UDim2(0.3, 0, 1, 0)}
					BackgroundColor3={theme.GetColor("MainBackground")}
					BorderSizePixel={0}
				/>
			),
			["Graph"]: (
				<frame
					Event={{ MouseWheelBackward: this.zoomOut, MouseWheelForward: this.zoomIn }}
					Size={new UDim2(0.7, 0, 1, 0)}
					Position={new UDim2(0.3, 0, 0, 0)}
					BackgroundColor3={theme.GetColor("ScriptBackground")}
					BorderSizePixel={0}
					Active={true}
					Change={{
						AbsoluteSize: this.graphChanged,
					}}
					ClipsDescendants={true}
				>
					{graphElements}
				</frame>
			),
		});
	}
}

type GraphNodeProps = {
	/** The first value */
	A: number;
	/** The second value */
	B: number;
	/** The frame that value A takes place*/
	At: number;
	/** The frame that value B takes place */
	Bt: number;

	keyFrame: boolean;

	startCoords: Vector2;
	endCoords: Vector2;
	graphSize?: Vector2;
};

/**
 * Represents a single "interval" on a graph.
 * @param props The properties of the node.
 * @constructor
 */
function GraphNode(props: GraphNodeProps) {
	if (!props.graphSize) {
		return undefined;
	}
	const domain = props.endCoords.X - props.startCoords.X;
	const range = props.endCoords.Y - props.startCoords.Y;
	const pA = new UDim2(0.05 + (props.At / domain) * 0.9, 0, 0.9 - ((props.A - props.startCoords.Y) / range) * 0.9, 0);
	const pB = new UDim2(0.05 + (props.Bt / domain) * 0.9, 0, 0.9 - ((props.B - props.startCoords.Y) / range) * 0.9, 0);
	const GraphSize = props.graphSize!;
	const lineStartX = pA.X.Scale * GraphSize.X;
	const lineStartY = pA.Y.Scale * GraphSize.Y;
	const lineEndX = pB.X.Scale * GraphSize.X;
	const lineEndY = pB.Y.Scale * GraphSize.Y;
	const Distance = new Vector2(lineStartX, lineStartY).sub(new Vector2(lineEndX, lineEndY)).Magnitude;
	return Roact.createFragment({
		[props.At]: (
			<frame
				Active={false}
				AnchorPoint={new Vector2(0.5, 0.5)}
				SizeConstraint={Enum.SizeConstraint.RelativeXX}
				BorderSizePixel={0}
				Rotation={math.deg(math.atan2(lineEndY - lineStartY, lineEndX - lineStartX))}
				Size={new UDim2(0, Distance + 1, math.clamp(0.2, 0.002, 0.0035), 0)}
				Position={new UDim2(0, (lineStartX + lineEndX) / 2, 0, (lineStartY + lineEndY) / 2)}
			/>
		),
		[props.At + "_point"]: (
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={pB}
				Size={new UDim2(0, 5, 0, 5)}
				BorderSizePixel={0}
				BackgroundColor3={new Color3(0, 0, 0)}
				BackgroundTransparency={props.keyFrame ? 0 : 1}
				ZIndex={2}
			/>
		),
	});
}
