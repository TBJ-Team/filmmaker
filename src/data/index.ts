import Rodux from "@rbxts/rodux";

export enum Actions {
	NewProject = "NewProject",
}

export interface Project {}

export interface App {
	project: Project;
}

export interface ActionNewProject extends Rodux.Action<Actions.NewProject> {}

export function createProject(): ActionNewProject & Rodux.AnyAction {
	return {
		type: Actions.NewProject,
	};
}

export const projectReducer = Rodux.createReducer<Project, ActionNewProject>(
	{},
	{
		[Actions.NewProject]: (state, action) => {
			return {};
		},
	},
);

const filmmakerReducer = Rodux.combineReducers<App>({
	project: projectReducer,
});

export const store: Rodux.Store<App> = new Rodux.Store<App>(filmmakerReducer);
