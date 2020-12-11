import Rodux from "@rbxts/rodux";

export interface Project {}

export interface App {}

export const store: Rodux.Store<App> = new Rodux.Store<App>((app, action) => {
	return {};
});
