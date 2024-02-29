function Barrel(x, y)
{
	var barrel = new Texture("Textures/Levels/Barrel/Idle/Barrel.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 0, barrel);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 32, 32, 32]);
}


Barrel.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
}

Barrel.prototype.draw = function draw()
{
	this.sprite.draw();
}

Barrel.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x, this.sprite.y, this.sprite.x + this.sprite.width, this.sprite.y + this.sprite.height);
	
	return box;
}