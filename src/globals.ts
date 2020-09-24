// Spaghetti to bring the plugin global between modules

interface Globals {
	plugin: Plugin;
	settings: () => GlobalSettings;
}

export const Globals: Globals = {} as Globals;