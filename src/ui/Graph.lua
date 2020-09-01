local Roact = require(script.Parent.Parent.Roact)

local Graph = Roact.Component:extend("Graph")

--[[
	Used to create a frame to represent a small part of the slope on the curve.
	Takes in two points on the screen and creates a frame connecting the two.
]]
local function RenderLine(point1, point2, frame)
	local difference = point2 - point1
	local slope = frame or Instance.new("Frame")
	slope.Size = UDim2.new(0, difference.Magnitude + 1, 0, 2)
	slope.Rotation = math.deg(math.atan2(difference.Y, difference.X))
	slope.Position = UDim2.new(
		0,
		(point1.x + difference.x/2) - (difference.Magnitude + 1) * 0.5,
		0,
		(point1.y + difference.y/2) - 1)
	slope.BorderSizePixel = 0
	slope.BackgroundColor3 = Color3.new()
	return slope
end

function Graph:init()

end

function Graph:shouldUpdate()

end

function Graph:markDirty()

end

--[[
	Used to update the graph display with new information.
]]
function Graph:render()
	RenderLine(Vector2.new(1,2), Vector2.new(3,4), self.Frame)
end

return graph