-- local Players = game:GetService("Players")

local Roact = require(script.Parent.Parent.Roact)
local Graph = require(script:WaitForChild("Graph"))
local Tree = require(script:WaitForChild("Tree"))

-- local Player = Players.LocalPlayer
-- local PlayerGui = Player:WaitForChild("PlayerGui")

local ui = Roact.Component:extend("FilmmakerUI")

function ui:render()
	return Roact.createElement("ScreenGui", {}, {
		Roact.createElement("Frame", {
			BorderSizePixel = 0,
		}, {
			Roact.createElement(Graph, {

			}),
			Roact.createElement(Tree, {
				
			})
		})
	})
end

return ui