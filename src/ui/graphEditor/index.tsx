import { FAnimation } from "animation";
import { Theme } from "ui/utils"
import * as Roact from "@rbxts/roact";

const widgetInfo = new DockWidgetPluginGuiInfo(Enum.InitialDockState.Bottom);

type GraphProps = {
	animation: FAnimation
};

export class GraphEditor extends Roact.Component<GraphProps> {

	public render(): Roact.Element | undefined {
		return (<frame></frame>);
	}
}

