const HAT_BORN = 0;
const HAT_LEFT = 1;
const HAT_RIGHT = 2;

function Hat(x, y, map)
{
	// Loading spritesheets
	var hat = new Texture("Textures/Levels/Hat.png");

	// Prepare PIRATE sprite & its animations
	this.sprite = new Sprite(x, y, 64, 64, 8, hat);

	//STAND
	this.sprite.addAnimation();
	this.sprite.addKeyframe(HAT_BORN, [0, 0, 32, 32]); 
	this.sprite.addKeyframe(HAT_BORN, [32, 0, 32, 32]);
	this.sprite.addKeyframe(HAT_BORN, [64, 0, 32, 32]);
	this.sprite.addKeyframe(HAT_BORN, [96, 0, 32, 32]);
	this.sprite.addKeyframe(HAT_BORN, [128, 0, 32, 32]);
	this.sprite.addKeyframe(HAT_BORN, [160, 0, 32, 32]);
	this.sprite.addKeyframe(HAT_BORN, [192, 0, 32, 32]);

	//WALK
	this.sprite.addAnimation();
	this.sprite.addKeyframe(HAT_LEFT, [0, 32, 32, 32]); 
	this.sprite.addKeyframe(HAT_LEFT, [32, 32, 32, 32]);
	this.sprite.addKeyframe(HAT_LEFT, [64, 32, 32, 32]);
	this.sprite.addKeyframe(HAT_LEFT, [96, 32, 32, 32]);
	this.sprite.addKeyframe(HAT_LEFT, [128, 32, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(HAT_RIGHT, [128, 32, 32, 32]);
	this.sprite.addKeyframe(HAT_RIGHT, [96, 32, 32, 32]);
	this.sprite.addKeyframe(HAT_RIGHT, [64, 32, 32, 32]);
	this.sprite.addKeyframe(HAT_RIGHT, [32, 32, 32, 32]);
	this.sprite.addKeyframe(HAT_RIGHT, [0, 32, 32, 32]); 

	// Set initial animation
	this.sprite.setAnimation(HAT_BORN);

	
	// Set tilemap for collisions
	this.map = map;
	
	// Set attributes for jump
	this.jumpAngle = 0;
	this.isfalling = 0;
	this.direction = RIGHT;

	this.isBorn = false;
	this.Dead = false;
	this.bornTime = 700;
	
}


Hat.prototype.update = function(deltaTime)
{
	if(this.Dead)return;
	else if(!this.isBorn){
		this.sprite.update(deltaTime);
		this.bornTime -= deltaTime;
		if(this.bornTime <= 0) {
			this.isBorn = true;
			if(this.direction == LEFT) this.sprite.setAnimation(HAT_LEFT);
			else this.sprite.setAnimation(HAT_RIGHT);
		}
	}
	else{
		if(this.direction == LEFT){
			if(this.sprite.currentAnimation != HAT_LEFT) this.sprite.setAnimation(HAT_LEFT);
			this.sprite.x -= 2;
			if(this.map.collisionMoveLeft(this.sprite)){
				this.sprite.x += 2;
				this.direction = RIGHT;
			}
		}
		else{
			if(this.sprite.currentAnimation != HAT_RIGHT)this.sprite.setAnimation(HAT_RIGHT);
			this.sprite.x += 2;
			if(this.map.collisionMoveRight(this.sprite)){
			console.log("collision");
				this.sprite.x -= 2;
				this.direction = LEFT;
			}
			
		}	
		// Move PIRATE so that it is affected by gravity
		this.sprite.y += 6;
		if(this.map.collisionMoveDown(this.sprite)) this.isfalling = false;
		else this.isfalling = true;
		// Update sprites
		this.sprite.update(deltaTime);
	}	
}


Hat.prototype.draw = function()
{
	this.sprite.draw();
}

Hat.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 10, this.sprite.y+35, this.sprite.x + this.sprite.width - 10, this.sprite.y + this.sprite.height);
	
	return box;
}

Hat.prototype.killed = function()
{
	this.Dead = true;
}


