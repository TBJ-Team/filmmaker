import { FAnimation } from "animation";
import * as Roact from "@rbxts/roact";
import { Theme, Animation, ThemeType } from "ui/utils"

const widgetInfo = new DockWidgetPluginGuiInfo(Enum.InitialDockState.Bottom, false);

export namespace GraphEditor {

	export class Editor extends Roact.Component {

		public render(): Roact.Element | undefined {
			return (
			<Theme.Consumer render={(value: ThemeType): Roact.Element => <Animation.Consumer render={(): Roact.Element => 
				<frame></frame> 
			}/>}/>);
		}
	}

	export function Mount() {
		const widget = plugin.CreateDockWidgetPluginGui("GraphEditor", widgetInfo);
		return Roact.mount(<Editor/>, widget)
	}

}