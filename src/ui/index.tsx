import * as Roact from "@rbxts/roact";
import {Globals} from "../globals";

const plugin = Globals.plugin;

function DockWidget(props: RbxJsxProps & { info: DockWidgetPluginGuiInfo }) {
	let widget = plugin.CreateDockWidgetPluginGui(tostring(props.Key), props.info);
	return <Roact.Portal target={widget}>
		{...(props[Roact.Children] as RoactChild[])}
	</Roact.Portal>
}

export class GraphEditor extends Roact.Component {

	render(): Roact.Element | undefined {
		return <DockWidget info={new DockWidgetPluginGuiInfo()}>
			<frame Size={new UDim2(1, 0, 1, 0)}>

			</frame>
		</DockWidget>;
	}
}