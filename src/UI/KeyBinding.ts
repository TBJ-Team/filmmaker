type Keybind = {
	actionId: string;
	text: string;
	statusTip: string;
	iconName?: string;
	allowBinding?: boolean;
}

export function CreateBind(bind: Keybind, Callback: () => void) {
	let action = plugin.CreatePluginAction(bind.actionId, bind.text, bind.statusTip, bind.iconName, bind.allowBinding);
	action.Triggered.Connect(Callback);
	return action;
}