type Keybind = {
	actionId: string;
	text: string;
	statusTip: string;
	iconName?: string;
	allowBinding?: boolean;
}

/**
 * Create a keybind for use in Roblox studio
 * @param bind Keybind information
 * @param Callback Callback to be run on keypress
 */
export function CreateBind(bind: Keybind, Callback: () => void) {
	let action = plugin.CreatePluginAction(bind.actionId, bind.text, bind.statusTip, bind.iconName, bind.allowBinding);
	action.Triggered.Connect(Callback);
	return action;
}