function ParticBarrelDest(x, y)
{
	var barrel = new Texture("Textures/Levels/Particles/barrelDestroyed.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 8, barrel);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 32, 32]);
	this.sprite.addKeyframe(0, [32, 0, 32, 32]);
	this.sprite.addKeyframe(0, [64, 0, 32, 32]);
	this.sprite.addKeyframe(0, [96, 0, 32, 32]);
	this.sprite.addKeyframe(0, [128, 0, 32, 32]);
	this.sprite.addKeyframe(0, [160, 0, 32, 32]);
	this.sprite.addKeyframe(0, [192, 0, 32, 32]);
	this.sprite.addKeyframe(0, [224, 0, 32, 32]);
	this.sprite.addKeyframe(0, [256, 0, 32, 32]);

	this.active = true;
	this.TimerActive = 1100;
}


ParticBarrelDest.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	if(this.active){
		this.TimerActive -= deltaTime;
		if(this.TimerActive <= 0){
			this.active = false;
		}
		if(this.TimerActive <= 600){
			this.sprite.y += 2;
		}
	}
}

ParticBarrelDest.prototype.draw = function draw()
{
	this.sprite.draw();
}