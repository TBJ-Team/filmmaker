# Installation
Filmmaker is quite flexible for the fact that it can be installed and used from many sources. All have their own advantages
and disadvantages, however. Some releases allow you to modify Filmmaker to your own needs, or use other peoples
modifications on your own build of Filmmaker.

## Installing Filmmaker
### Roblox Plugin
[:octicons-link-24: Hyperlink][1] · :octicons-flame-24: Recommended

There is a Roblox release that is always up to date with the Github releases. A significant reason for using this release
would be the fact that it allows you to have it automatically updated for you, instead of having to modify or rebase your
local version.

[1]: https://www.roblox.com/library/6087328523/Filmmaker

### Github Releases
[:octicons-link-24: Hyperlink][2] · :octicons-check-24: Supported · :octicons-git-branch-24: Moddable

There are GitHub releases dating back all the way to very early versions of Filmmaker. This allows you to use older versions
of Filmmaker without having to install using other, less trustworthy methods. You can also download the source code for
a given version, and modify and build from there.

To install a built binary (`.rbxmx`), you must locate your plugins folder, which can be found using the `Plugins Folder` button under
the `Plugins` tab in Roblox Studio. 

![Location of Plugins Folder](/images/Plugin_Folder_Toolbar.png)

Then, drag the `.rbxmx` into the plugins folder. You may have to reboot your Roblox Studio client to initialize the plugin.

To manually build Filmmaker, you need <a href="https://rojo.space/docs" target="_blank">Rojo</a> and <a href="https://roblox-ts.com" target="_blank">roblox-ts</a> installed.
Your file structure for the source code should look something like this (it comes like this by default):

```
.
├─ src/
│  └─ ...
├─ package.json
├─ default.project.json
└─ ...
```

First, open terminal and set your working directory to the root folder.

```
cd /path/to/Filmmaker
```

Then, compile the TypeScript and build the model file.

```
rbxtsc && rojo build --output Filmmaker.rbxmx
```

If everything worked, there should be a built binary called `Filmmaker.rbxmx` in the root folder. Then, you could easily
repeat the process detailed before to install it locally.

[2]: https://github.com/GyroLabs/filmmaker/releases/

### Modified Roblox Releases
[:octicons-link-24: Hyperlink][3] · :octicons-alert-24: Unsupported

There may be other releases on the Roblox library. However, many of these may be malicious or extremely buggy. We are not
liable for any damages caused by these unsupported releases.

[3]: https://www.roblox.com/develop/library?CatalogContext=2&Keyword=Filmmaker&SortAggregation=5&LegendExpanded=true&Category=7
