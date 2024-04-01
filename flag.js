

function Flag(x, y) //TODO
{
	var barrel = new Texture("Textures/Levels/Flag/FlagPole.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 8, barrel);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(1, [32, 32, 32, 32]);

}


Intbarrel.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
}

Intbarrel.prototype.draw = function draw()
{
	this.sprite.draw();
}

Intbarrel.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x, this.sprite.y, this.sprite.x + this.sprite.width, this.sprite.y + this.sprite.height);
	
	return box;
}
 



