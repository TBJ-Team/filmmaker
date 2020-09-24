import * as Roact from "@rbxts/roact";
import { withTheme } from "ui/utils";

export class GraphEditor extends Roact.Component {

	public render(): Roact.Element | undefined {
		return withTheme(t => <frame BackgroundColor3={t.backgroundMain} Size={new UDim2(1, 0, 1, 0)}>
				
			</frame>);
	}
}