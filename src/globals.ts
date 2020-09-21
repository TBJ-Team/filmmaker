// Spaghetti to bring the plugin global between modules

interface Globals {
	plugin: Plugin;
}

export const Globals: Globals = {} as Globals;