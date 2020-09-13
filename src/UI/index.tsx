import Roact from "@rbxts/roact";
import { Rigger } from "./Rigger";
import { CreateBind } from "./KeyBinding";

const NEW_FRAME = CreateBind({
	actionId: "NEW_FRAME",
	text: "Create new frame",
	statusTip: "Create a new keyframe without pressing a GUI button! Yay!"
}, () => {
	
});

const TOOLBAR = plugin.CreateToolbar("Filmmaker");

type AppState = {
	target: Instance;
}

export class App extends Roact.Component<AppState> {

	constructor(props: AppState) {
		if (!props.target) {
			props.target = game.GetService("StarterGui");
		}
		super(props);
	}

	render(): Roact.Element {
		return 	<Roact.Portal target={this.props.target}>
					<frame Key="MainFrame" Size={new UDim2(0.5, 0, 0.5, 0)}/>
				</Roact.Portal>;
	}
}