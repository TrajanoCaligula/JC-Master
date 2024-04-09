

function Icon(x, y)
{
	var icon = new Texture("Textures/Levels/Barrel/Idle/Coin.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 8, icon);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 16, 16]);
	this.sprite.addKeyframe(0, [16, 0, 16, 16]);
	this.sprite.addKeyframe(0, [32, 0, 16, 16]);
	this.sprite.addKeyframe(0, [48, 0, 16, 16]);
}


Icon.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
}

Icon.prototype.draw = function draw()
{
	this.sprite.draw();
}


