/// <reference types="@rbxts/types/plugin" />

import { Animation } from "./Animation";

export {};

const toolbar = plugin.CreateToolbar("MyToolbar");
const button = toolbar.CreateButton("MyButton", "", "");

button.Click.Connect(() => {
	print("Button clicked!");
});
