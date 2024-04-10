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
	this.sprite = new Sprite(x, y, 128, 64, 7, carb);

	//STAND
	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [224, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [192, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [160, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [128, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [96, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [64, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [32, 224, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_LEFT, [0, 224, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [0, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [32, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [64, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [96, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [128, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [160, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [192, 0, 32, 32]);
	this.sprite.addKeyframe(CRAB_STAND_RIGHT, [224, 0, 32, 32]);
	//WALK

	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_WALK_LEFT, [0, 32, 64, 32]);
	this.sprite.addKeyframe(CRAB_WALK_LEFT, [64, 32, 64, 32]);
	this.sprite.addKeyframe(CRAB_WALK_LEFT, [128, 32, 64, 32]);
	this.sprite.addKeyframe(CRAB_WALK_LEFT, [192, 32, 64, 32]);
	this.sprite.addKeyframe(CRAB_WALK_LEFT, [256, 32, 64, 32]);
	this.sprite.addKeyframe(CRAB_WALK_LEFT, [320, 32, 64, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_WALK_RIGHT, [512, 192, 64, 32]); 
	this.sprite.addKeyframe(CRAB_WALK_RIGHT, [448, 192, 64, 32]);
	this.sprite.addKeyframe(CRAB_WALK_RIGHT, [384, 192, 64, 32]);
	this.sprite.addKeyframe(CRAB_WALK_RIGHT, [320, 192, 64, 32]);
	this.sprite.addKeyframe(CRAB_WALK_RIGHT, [256, 192, 64, 32]);
	this.sprite.addKeyframe(CRAB_WALK_RIGHT, [192, 192, 64, 32]);

	//FALL
	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_FALL_LEFT, [0, 96, 64, 32]);
	
	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_FALL_RIGHT, [512, 320, 64, 32]); 
	
	//HIT
	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [0, 128, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [64, 128, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [128, 128, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [192, 128, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [256, 128, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [320, 128, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [320, 128, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [384, 128, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [448, 128, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_LEFT, [448, 128, 64, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [512, 288, 64, 32]); 
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [448, 288, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [384, 288, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [320, 288, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [256, 288, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [192, 288, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [192, 288, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [128, 288, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [64, 288, 64, 32]);
	this.sprite.addKeyframe(CRAB_HIT_RIGHT, [64, 288, 64, 32]);


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
	this.DyingTime = 1400;
	this.goDown = false;
	this.displaced = false;
	this.points = 200;

	this.deadSound = AudioFX('Sounds/crab.mp3');
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
		if(this.DyingTime <= 1100 && !this.displaced){
			if(this.direction == LEFT){
				this.sprite.x += 30;
				if(this.map.collisionMoveRightCrab(this.sprite))this.sprite.x -= 80;
			}
			else{
				this.sprite.x -= 30;
				if(this.map.collisionMoveLeftCrab(this.sprite))this.sprite.x += 80;
			}
			this.displaced = true;
		}

		this.DyingTime -= deltaTime;
		if(this.DyingTime <= 490 && !this.goDown){
			this.sprite.y += 10;
			this.goDown = true;
		}
		if(this.DyingTime <= 0) {
			this.Dead = true;
			this.sprite.x = 0;
			this.sprite.y = 0;
		}
	}
	else{
		if(this.direction == LEFT && this.sprite.y < this.map.limitY){
			if(!this.isfalling){
				if(this.sprite.currentAnimation != CRAB_WALK_LEFT)this.sprite.setAnimation(CRAB_WALK_LEFT);
				this.sprite.x -= 2;
				if(this.map.collisionMoveLeftCrab(this.sprite)){
					this.sprite.x += 2;
					this.direction = RIGHT;
				}
				
			}
			else {
				if(this.sprite.currentAnimation != CRAB_FALL_LEFT)this.sprite.setAnimation(CRAB_FALL_LEFT);
				this.sprite.x -= 1;
				if(this.map.collisionMoveLeftCrab(this.sprite)){
					this.sprite.x += 1;
					this.direction = RIGHT;
				}
			}
		}
		else if(this.sprite.y < this.map.limitY){
			if(!this.isfalling){
				if(this.sprite.currentAnimation != CRAB_WALK_RIGHT)this.sprite.setAnimation(CRAB_WALK_RIGHT);
				this.sprite.x += 2;
				if(this.map.collisionMoveRightCrab(this.sprite)){
					this.sprite.x -= 2;
					this.direction = LEFT;
				}
				
			}
			else{
				if(this.sprite.currentAnimation != CRAB_FALL_RIGHT)this.sprite.setAnimation(CRAB_FALL_RIGHT);
				this.sprite.x += 1;
				if(this.map.collisionMoveRightCrab(this.sprite)){
					this.sprite.x -= 1;
					this.direction = LEFT;
				}
			}
		}
		// Move PIRATE so that it is affected by gravity
		this.sprite.y += 5;
		if(this.sprite.y < this.map.limitY && this.map.collisionMoveDownCrab(this.sprite))
		{	
			this.isfalling = false;
			if(this.direction == LEFT && this.sprite.currentAnimation != CRAB_WALK_LEFT) this.sprite.setAnimation(CRAB_WALK_LEFT);
			else if(this.direction == RIGHT && this.sprite.currentAnimation != CRAB_WALK_RIGHT) this.sprite.setAnimation(CRAB_WALK_RIGHT);
		}
		else
		{
			if(this.sprite.y >= this.map.killY){
				this.Dead = true;
				this.deadSound.play();
			}
			this.isfalling = true;
			if( this.direction == LEFT && this.sprite.currentAnimation != CRAB_FALL_LEFT)this.sprite.setAnimation(CRAB_FALL_LEFT);	
			else if(this.direction == RIGHT && this.sprite.currentAnimation != CRAB_FALL_RIGHT)this.sprite.setAnimation(CRAB_FALL_RIGHT);	
		}
		// Update sprites
	}
	this.sprite.update(deltaTime);

	
}

Crab.prototype.draw = function()
{
	this.sprite.draw();
}

Crab.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 1, this.sprite.y+25, this.sprite.x + this.sprite.width - 50, this.sprite.y + this.sprite.height);
	
	return box;
}

Crab.prototype.killed = function()
{
	this.deadSound.play();
	this.isDying = true;
}


