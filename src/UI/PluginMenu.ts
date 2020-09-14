type MenuItem = {
	id: string,
	name: string,
	icon?: string,
	callback: () => void;
};
type Menu = {
	items: Array<Menu | MenuItem | Seperator>,
	icon?: string,
	name: string,
	id: number;
};
type Seperator = {};


function is<T>(val: any, index: keyof T): val is T {
	return (<T>val)[index] !== undefined;
}

export class PluginMenu {

	private callbackMap: Map<string, () => void> = new Map();
	private menu: globalThis.PluginMenu;

	constructor(hierachy: Menu) {
		this.menu = this.createMenu(hierachy);
	}

	createMenu(hierachy: Menu) {
		let menu = plugin.CreatePluginMenu(tostring(hierachy.id), hierachy.name, hierachy.icon);
		hierachy.items.forEach(element => {
			if (is<Menu>(element, "items")) {
				let newMenu = this.createMenu(element as Menu);
				menu.AddMenu(newMenu);
			} else if (is<MenuItem>(element, "icon")) {
				menu.AddNewAction(element.id, element.name, element.icon);
				this.callbackMap.set(element.id, element.callback);
			} else {
				menu.AddSeparator();
			}
		});
		return menu;
	}

	async show() {
		let selected = this.menu.ShowAsync();
		if (selected && this.callbackMap.has((selected as PluginAction).ActionId)) {
			let callback = this.callbackMap.get((selected as PluginAction).ActionId);
			callback!();
		} else {
			throw "User did not select an action!";
		}
	}
}