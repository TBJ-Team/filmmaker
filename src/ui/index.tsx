import { Globals } from "globals";
import * as Roact from "@rbxts/roact";
import { GraphEditor } from "ui/graphEditor";

const plugin = Globals.plugin;

const graphEditor = new DockWidgetPluginGuiInfo(Enum.InitialDockState.Bottom, true);
const widget = plugin.CreateDockWidgetPluginGui("GraphEditor", graphEditor);
widget.Title = "Graph Editor";

export const GraphEditorMount = Roact.mount(<GraphEditor/>, widget);