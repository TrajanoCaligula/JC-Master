function PointsDisplay(x, y, value)
{

	this.active = true;
	this.TimerActive = 400;
	this.value = value;
	this.x = x;
	this.y = y;
	this.deltaTime = 0;
	this.fontSize = 32;
}


PointsDisplay.prototype.update = function(deltaTime)
{
	if(this.active){
		this.TimerActive -= deltaTime;
		this.fontSize-=1;
		this.y-= 1;
		if(this.TimerActive <= 0) this.active = false;
	}

}

PointsDisplay.prototype.draw = function draw()
{
	var text = this.value.toString();
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");	
	context.fillStyle = "white";
	context.font = this.fontSize.toString() + "px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, this.x, this.y);
}