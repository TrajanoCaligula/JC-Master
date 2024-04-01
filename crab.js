const CRAB_STAND_LEFT = 0;
const CRAB_STAND_RIGHT = 1;
const CRAB_WALK_LEFT = 2;
const CRAB_WALK_RIGHT = 3;
const CRAB_FALL_LEFT = 4;
const CRAB_FALL_RIGHT = 5;
const CRAB_HIT_LEFT = 6;
const CRAB_HIT_RIGHT = 7;

function Crab(x, y, map)
{
	// Loading spritesheets
	var carb = new Texture("Textures/Characters/Crab.png");

	// Prepare PIRATE sprite & its animations
	this.sprite = new Sprite(x, y, 64, 64, 8, carb);

	//STAND
	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [224, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [192, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [160, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [128, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [96, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [64, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [32, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [0, 224, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [0, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [32, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [64, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [96, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [128, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [160, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [192, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [224, 0, 32, 32]);

	//WALK
	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_WALK_RIGHT, [224, 256, 32, 32]);
	this.sprite.addKeyframe(CRAB_WALK_RIGHT, [192, 256, 32, 32]);
	this.sprite.addKeyframe(CRAB_WALK_RIGHT, [160, 256, 32, 32]);
	this.sprite.addKeyframe(CRAB_WALK_RIGHT, [128, 256, 32, 32]);
	this.sprite.addKeyframe(CRAB_WALK_RIGHT, [96, 256, 32, 32]);
	this.sprite.addKeyframe(CRAB_WALK_RIGHT, [64, 256, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_WALK_LEFT, [0, 32, 32, 32]);
	this.sprite.addKeyframe(CRAB_WALK_LEFT, [32, 32, 32, 32]);
	this.sprite.addKeyframe(CRAB_WALK_LEFT, [64, 32, 32, 32]);
	this.sprite.addKeyframe(CRAB_WALK_LEFT, [96, 32, 32, 32]);
	this.sprite.addKeyframe(CRAB_WALK_LEFT, [128, 32, 32, 32]);
	this.sprite.addKeyframe(CRAB_WALK_LEFT, [160, 32, 32, 32]);

	//FALL
	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_FALL_RIGHT, [224, 320, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_FALL_LEFT, [0, 96, 32, 32]);

	//HIT
	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [224, 384, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [192, 384, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [160, 384, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [128, 384, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [96, 384, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [64, 384, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [32, 384, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [0, 384, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [0, 160, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [32, 160, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [64, 160, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [96, 160, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [128, 160, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [160, 160, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [192, 160, 32, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [224, 160, 32, 32]);

	// Set initial animation
	this.sprite.setAnimation(CRAB_STAND_LEFT);
	this.size = 0;

	
	// Set tilemap for collisions
	this.map = map;
	
	// Set attributes for jump
	this.jumpAngle = 0;
	this.isfalling = 0;
	this.direction = LEFT;

	this.Dead = false;
	this.isDying = false;
	this.DyingTime = 980;
	this.goDown = false;
	
}


Crab.prototype.update = function(deltaTime)
{
	if(this.Dead)return;
	if(this.isDying){
		if(this.direction == LEFT){
			if(this.sprite.currentAnimation != CRAB_HIT_LEFT)this.sprite.setAnimation(CRAB_HIT_LEFT);
		}
		else{
			if(this.sprite.currentAnimation != CRAB_HIT_RIGHT)this.sprite.setAnimation(CRAB_HIT_RIGHT);
		}
		this.sprite.update(deltaTime);
		this.DyingTime -= deltaTime;
		if(this.DyingTime <= 490 && !this.goDown){
			this.sprite.y += 10;
			this.goDown = true;
		}
		if(this.DyingTime <= 0)this.Dead = true;
	}
	else{
		if(this.direction == LEFT){
			if(!this.isfalling){
				if(this.sprite.currentAnimation != CRAB_WALK_LEFT)this.sprite.setAnimation(CRAB_WALK_LEFT);
				this.sprite.x -= 2;
				if(this.map.collisionMoveLeft(this.sprite)){
					this.sprite.x += 2;
					this.direction = RIGHT;
				}
				
			}
			else {
				if(this.sprite.currentAnimation != CRAB_FALL_LEFT)this.sprite.setAnimation(CRAB_FALL_LEFT);
				this.sprite.x -= 1;
				if(this.map.collisionMoveLeft(this.sprite)){
					this.sprite.x += 1;
					this.direction = RIGHT;
				}
			}
		}
		else{
			if(!this.isfalling){
				if(this.sprite.currentAnimation != CRAB_WALK_RIGHT)this.sprite.setAnimation(CRAB_WALK_RIGHT);
				this.sprite.x += 2;
				if(this.map.collisionMoveRight(this.sprite)){
					this.sprite.x -= 2;
					this.direction = LEFT;
				}
				
			}
			else{
				if(this.sprite.currentAnimation != CRAB_FALL_RIGHT)this.sprite.setAnimation(CRAB_FALL_RIGHT);
				this.sprite.x += 1;
				if(this.map.collisionMoveRight(this.sprite)){
					this.sprite.x -= 1;
					this.direction = LEFT;
				}
			}
		}
		// Move PIRATE so that it is affected by gravity
		this.sprite.y += 6;
		if(this.map.collisionMoveDown(this.sprite))
		{	
			this.isfalling = false;
			if(this.direction == LEFT && this.sprite.currentAnimation != CRAB_WALK_LEFT) this.sprite.setAnimation(CRAB_WALK_LEFT);
			else if(this.direction == RIGHT && this.sprite.currentAnimation != CRAB_WALK_RIGHT) this.sprite.setAnimation(CRAB_WALK_RIGHT);
		}
		else
		{
			this.isfalling = true;
			if( this.direction == LEFT && this.sprite.currentAnimation != CRAB_FALL_LEFT)this.sprite.setAnimation(CRAB_FALL_LEFT);	
			else if(this.direction == RIGHT && this.sprite.currentAnimation != CRAB_FALL_RIGHT)this.sprite.setAnimation(CRAB_FALL_RIGHT);	
		}
		// Update sprites
		this.sprite.update(deltaTime);
	}
	
}

Crab.prototype.draw = function()
{
	this.sprite.draw();
}

Crab.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 12, this.sprite.y+15, this.sprite.x + this.sprite.width - 10, this.sprite.y + this.sprite.height);
	
	return box;
}

Crab.prototype.killed = function()
{
	this.isDying = true;
}

Crab.prototype.hitted = function()
{
/*
	if(this.alive) {
		this.alive = false;
		//this.killed(); TODO: repassar que fa el isDying
		num_anim = this.sprite.currentAnimation;
		if(num_anim == CRAB_STAND_LEFT || num_anim == CRAB_WALK_LEFT || num_anim == CRAB_HIT_LEFT || num_anim == CRAB_FALL_LEFT){
            this.sprite.setAnimation(SHELL_LEFT);
        }
        else {
            this.sprite.setAnimation(SHELL_RIGHT);
        }
		this.sprite.x = x;
		this.sprite.y = y;
	} 
	else if(this.moving){
		this.moving = false;
	} 
	else {
		this.killed();
	}
	*/
}

Crab.prototype.insertSprite = function(x,y, texture){

	

	

}



