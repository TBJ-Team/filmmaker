import * as Rodux from "@rbxts/rodux";
import { Globals } from "../globals";

const Selection = game.GetService("Selection");

export enum Actions {
	NewProject = "NewProject",
	AddInstance = "AddInstance",
}

export interface Project {}

export interface App {
	project: Project;
}

export interface ActionNewProject extends Rodux.Action<Actions.NewProject> {}
export interface ActionAddInstance extends Rodux.Action<Actions.AddInstance> {
	instance: Instance;
}

export function createProject(): ActionNewProject & Rodux.AnyAction {
	return {
		type: Actions.NewProject,
	};
}

export function addInstance(): ActionAddInstance & Rodux.AnyAction {
	return {
		type: Actions.AddInstance,
		instance: Selection.Get()[0],
	};
}

export const projectReducer = Rodux.createReducer<Project, ActionNewProject | ActionAddInstance>(
	{},
	{
		[Actions.NewProject]: (state, action) => {
			return {};
		},
		[Actions.AddInstance]: (state, action: ActionAddInstance) => {
			return {};
		},
	},
);

const filmmakerReducer = Rodux.combineReducers<App>({
	project: projectReducer,
});

export const store: Rodux.Store<App> = new Rodux.Store<App>(filmmakerReducer);
