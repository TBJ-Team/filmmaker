local Roact = require(script.Parent.Parent.Roact)

local Graph = Roact.Component:extend("Graph")

--[[
	Used to create a frame to represent a small part of the slope on the curve.
	Takes in two points on the screen and creates a frame connecting the two.
]]
local function RenderLine(point1, point2, frame)
	local difference = point2 - point1
	local slope = Roact.createElement(frame or "Frame", {
		Size = UDim2.new(0, difference.Magnitude + 1, 0, 2),
		Rotation = math.deg(math.atan2(difference.Y, difference.X)),
		Position = UDim2.new(
		0, (point1.x + difference.x/2) - (difference.Magnitude + 1) * 0.5,
		0, (point1.y + difference.y/2) - 1),
		BorderSizePixel = 0,
		BackgroundColor3 = Color3.new()
	})
	return slope
end

function Graph:init()

end

function Graph:shouldUpdate(newProps, newState)

end

function Graph:markDirty()

end

--[[
	Used to update the graph display with new information.
]]
function Graph:render()
	
end

return Graph