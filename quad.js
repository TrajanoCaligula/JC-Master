
// Quad. Draws a rectangle in a given color.

function Quad(x, y, width, height, color = "white")
{
	this.x = x
	this.y = y
	this.width = width
	this.height = height
	this.color = color
}

Quad.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Draw the rectangle
	context.fillStyle = this.color;
	context.fillRect(this.x, this.y, this.width, this.height);
}


