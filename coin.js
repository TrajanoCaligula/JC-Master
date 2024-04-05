
function Coin(x, y) //TODO
{
	var coin = new Texture("Textures/Levels/Coin.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 16, coin);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 16, 16]);
	this.sprite.addKeyframe(0, [16, 0, 16, 16]);
	this.sprite.addKeyframe(0, [32, 0, 16, 16]);
	this.sprite.addKeyframe(0, [48, 0, 16, 16]);
	// Set initial animation
	this.sprite.setAnimation(0);
	this.coinAlive = true;
	this.animationTime = 400;

	this.points = 100;
	
	this.sound = AudioFX('Sounds/intBarrel.mp3');
}


Coin.prototype.update = function(deltaTime)
{
	this.animationTime -= deltaTime;
	if(this.animationTime <= 0) this.coinAlive = false;
	else {
		this.sprite.y -= 3;
	}
	this.sprite.update(deltaTime);
}

Coin.prototype.draw = function draw()
{
	this.sprite.draw();
}

Coin.prototype.collisionBox = function()
{
	var box = new Box(0,0,0,0);
	
	return box;
}
 



