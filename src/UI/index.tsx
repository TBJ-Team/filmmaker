import Roact from "@rbxts/roact"

type AppState = {
	target: Instance
}

class App extends Roact.Component<AppState> {

	render(): Roact.Element {
		return 	<Roact.Portal target={this.props.target}>
					<frame Key="MainFrame" Size={new UDim2(0.5, 0, 0.5, 0)}/>
				</Roact.Portal>;
	}
}

export = App;