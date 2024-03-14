
const PIRATE_STAND_LEFT = 0;
const PIRATE_STAND_RIGHT = 1;
const PIRATE_WALK_LEFT = 2;
const PIRATE_WALK_RIGHT = 3;
const PIRATE_JUMP_LEFT = 4;
const PIRATE_JUMP_RIGHT = 5;
const PIRATE_FALL_LEFT = 6;
const PIRATE_FALL_RIGHT = 7;
const PIRATE_HIT_LEFT = 8;
const PIRATE_HIT_RIGHT = 9;


function Player(x, y, map)
{
	// Loading spritesheets
	var pirate = new Texture("Textures/Characters/Pirate.png");

	// Prepare PIRATE sprite & its animations
	this.sprite = new Sprite(x, y, 64, 64, 8, pirate);

	//STAND
	this.sprite.addAnimation();
	this.sprite.addKeyframe(PIRATE_STAND_LEFT, [160, 192, 32, 32]);
	this.sprite.addKeyframe(PIRATE_STAND_LEFT, [128, 192, 32, 32]);
	this.sprite.addKeyframe(PIRATE_STAND_LEFT, [96, 192, 32, 32]);
	this.sprite.addKeyframe(PIRATE_STAND_LEFT, [64, 192, 32, 32]);
	this.sprite.addKeyframe(PIRATE_STAND_LEFT, [32, 192, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(PIRATE_STAND_RIGHT, [0, 0, 32, 32]);
	this.sprite.addKeyframe(PIRATE_STAND_RIGHT, [32, 0, 32, 32]);
	this.sprite.addKeyframe(PIRATE_STAND_RIGHT, [64, 0, 32, 32]);
	this.sprite.addKeyframe(PIRATE_STAND_RIGHT, [96, 0, 32, 32]);
	this.sprite.addKeyframe(PIRATE_STAND_RIGHT, [128, 0, 32, 32]);


	//WALK
	this.sprite.addAnimation();
	this.sprite.addKeyframe(PIRATE_WALK_LEFT, [160, 224, 32, 32]);
	this.sprite.addKeyframe(PIRATE_WALK_LEFT, [128, 224, 32, 32]);
	this.sprite.addKeyframe(PIRATE_WALK_LEFT, [96, 224, 32, 32]);
	this.sprite.addKeyframe(PIRATE_WALK_LEFT, [64, 224, 32, 32]);
	this.sprite.addKeyframe(PIRATE_WALK_LEFT, [32, 224, 32, 32]);
	this.sprite.addKeyframe(PIRATE_WALK_LEFT, [0, 224, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(PIRATE_WALK_RIGHT, [0, 32, 32, 32]);
	this.sprite.addKeyframe(PIRATE_WALK_RIGHT, [32, 32, 32, 32]);
	this.sprite.addKeyframe(PIRATE_WALK_RIGHT, [64, 32, 32, 32]);
	this.sprite.addKeyframe(PIRATE_WALK_RIGHT, [96, 32, 32, 32]);
	this.sprite.addKeyframe(PIRATE_WALK_RIGHT, [128, 32, 32, 32]);
	this.sprite.addKeyframe(PIRATE_WALK_RIGHT, [160, 32, 32, 32]);

	//JUMP
	this.sprite.addAnimation();
	this.sprite.addKeyframe(PIRATE_JUMP_LEFT, [160, 256, 32, 32]);
	this.sprite.addKeyframe(PIRATE_JUMP_LEFT, [128, 256, 32, 32]);
	this.sprite.addKeyframe(PIRATE_JUMP_LEFT, [96, 256, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(PIRATE_JUMP_RIGHT, [0, 64, 32, 32]);
	this.sprite.addKeyframe(PIRATE_JUMP_RIGHT, [32, 64, 32, 32]);
	this.sprite.addKeyframe(PIRATE_JUMP_RIGHT, [64, 64, 32, 32]);

	//FALL
	this.sprite.addAnimation();
	this.sprite.addKeyframe(PIRATE_FALL_LEFT, [160, 288, 32, 32]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(PIRATE_FALL_RIGHT, [0, 96, 32, 32]);

	//HIT
	this.sprite.addAnimation();
	this.sprite.addKeyframe(PIRATE_HIT_LEFT, [0, 160, 32, 32]);
	this.sprite.addKeyframe(PIRATE_HIT_LEFT, [32, 160, 32, 32]);
	this.sprite.addKeyframe(PIRATE_HIT_LEFT, [64, 160, 32, 32]);
	this.sprite.addKeyframe(PIRATE_HIT_LEFT, [96, 160, 32, 32]);
	this.sprite.addKeyframe(PIRATE_HIT_LEFT, [128, 160, 32, 32]);
	
	this.sprite.addAnimation();
	this.sprite.addKeyframe(PIRATE_HIT_RIGHT, [160, 352, 32, 32]);
	this.sprite.addKeyframe(PIRATE_HIT_RIGHT, [128, 352, 32, 32]);
	this.sprite.addKeyframe(PIRATE_HIT_RIGHT, [96, 352, 32, 32]);
	this.sprite.addKeyframe(PIRATE_HIT_RIGHT, [64, 352, 32, 32]);
	this.sprite.addKeyframe(PIRATE_HIT_RIGHT, [32, 352, 32, 32]);

	// Set initial animation

	this.sprite.setAnimation(PIRATE_STAND_RIGHT);
	
	// Set tilemap for collisions
	this.map = map;
	
	// Set attributes for jump
	this.bJumping = false;
	this.left = false;
	this.jumpAngle = 0;

	this.Alive = true;
	this.Dead = false;
	this.size = 1;
	this.vulnerability = true;
}


Player.prototype.update = function(deltaTime)
{
	// Move PIRATE sprite left/right
	if(this.Dead)return;
	else if(!this.Alive){
		this.jumpAngle += 4;
		if(this.jumpAngle >= 180)
		{
			this.sprite.y = this.sprite.y + 5;
			if(this.sprite.y > 800)this.Dead = true;
		}
		else{
			this.sprite.y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180);
		}
	}
	else{ 
		if(keyboard[37]) // KEY_LEFT
		{
			if(this.sprite.currentAnimation != PIRATE_WALK_LEFT && !this.bJumping)
				this.sprite.setAnimation(PIRATE_WALK_LEFT);
			else if(this.sprite.currentAnimation == PIRATE_JUMP_RIGHT)
				this.sprite.setAnimation(PIRATE_JUMP_LEFT);
			else if(this.sprite.currentAnimation == PIRATE_FALL_RIGHT)
				this.sprite.setAnimation(PIRATE_FALL_LEFT);
			this.sprite.x -= 2;
			if(this.map.collisionMoveLeft(this.sprite))
				this.sprite.x += 2;
			if (this.sprite.x < -7) this.sprite.x += 2;
		}
		else if(keyboard[39]) // KEY_RIGHT
		{
			if(this.sprite.currentAnimation != PIRATE_WALK_RIGHT  && !this.bJumping)
				this.sprite.setAnimation(PIRATE_WALK_RIGHT);
			else if(this.sprite.currentAnimation == PIRATE_JUMP_LEFT)
				this.sprite.setAnimation(PIRATE_JUMP_RIGHT);
			else if(this.sprite.currentAnimation == PIRATE_FALL_LEFT)
				this.sprite.setAnimation(PIRATE_FALL_RIGHT);
			this.sprite.x += 2;
			if(this.map.collisionMoveRight(this.sprite))
				this.sprite.x -= 2;
		}
		else
		{
			if(this.sprite.currentAnimation == PIRATE_WALK_LEFT)
				this.sprite.setAnimation(PIRATE_STAND_LEFT);
			if(this.sprite.currentAnimation == PIRATE_WALK_RIGHT)
				this.sprite.setAnimation(PIRATE_STAND_RIGHT);
		}
		if(this.bJumping)
		{
			this.jumpAngle += 4;
			if(this.jumpAngle >= 180)
			{
				this.bJumping = false;
				this.sprite.y = this.startY;
				if(this.sprite.currentAnimation == PIRATE_FALL_LEFT)
					this.sprite.setAnimation(PIRATE_STAND_LEFT);
				else if(this.sprite.currentAnimation == PIRATE_FALL_RIGHT)
					this.sprite.setAnimation(PIRATE_STAND_RIGHT);
			}
			else
			{
				if((this.sprite.currentAnimation == PIRATE_STAND_LEFT || this.sprite.currentAnimation == PIRATE_WALK_LEFT ) && this.sprite.currentAnimation != PIRATE_JUMP_LEFT)
					this.sprite.setAnimation(PIRATE_JUMP_LEFT);
				else if((this.sprite.currentAnimation == PIRATE_STAND_RIGHT || this.sprite.currentAnimation == PIRATE_WALK_RIGHT ) && this.sprite.currentAnimation != PIRATE_JUMP_RIGHT)
					this.sprite.setAnimation(PIRATE_JUMP_RIGHT);

				this.sprite.y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180);
					
				if(this.jumpAngle > 90)
					if(this.sprite.currentAnimation == PIRATE_JUMP_LEFT)
						this.sprite.setAnimation(PIRATE_FALL_LEFT);
					else if(this.sprite.currentAnimation == PIRATE_JUMP_RIGHT)
						this.sprite.setAnimation(PIRATE_FALL_RIGHT);
					this.bJumping = !this.map.collisionMoveDown(this.sprite);
					if(!this.bJumping && this.sprite.currentAnimation == PIRATE_FALL_LEFT)
						this.sprite.setAnimation(PIRATE_STAND_LEFT);
					else if(!this.bJumping && this.sprite.currentAnimation == PIRATE_FALL_RIGHT)
						this.sprite.setAnimation(PIRATE_STAND_RIGHT);
			}
		}
		else
		{
			// Move PIRATE so that it is affected by gravity
			this.sprite.y += 3;
			if(this.map.collisionMoveDown(this.sprite))
			{	
				this.bJumping = false;
				if(!this.bJumping && (this.sprite.currentAnimation == PIRATE_FALL_LEFT || this.sprite.currentAnimation == PIRATE_JUMP_LEFT))
					this.sprite.setAnimation(PIRATE_STAND_LEFT);
				else if(!this.bJumping && (this.sprite.currentAnimation == PIRATE_FALL_RIGHT || this.sprite.currentAnimation == PIRATE_JUMP_RIGHT))
					this.sprite.setAnimation(PIRATE_STAND_RIGHT);
				//this.sprite.y -= 2;
				
				// Check arrow up key. If pressed, jump.
				if (keyboard[38] || keyboard[32])
				{
					this.bJumping = true;
					this.jumpAngle = 0;
					this.startY = this.sprite.y;
				}
			}
			else
			{
				if(this.sprite.currentAnimation == PIRATE_STAND_LEFT || this.sprite.currentAnimation == PIRATE_WALK_LEFT)
					this.sprite.setAnimation(PIRATE_FALL_LEFT);
				else if(this.sprite.currentAnimation == PIRATE_STAND_RIGHT || this.sprite.currentAnimation == PIRATE_WALK_RIGHT)
					this.sprite.setAnimation(PIRATE_FALL_RIGHT);
				if (this.sprite.y < 896) {

				}
			}
			
		}
	}

	//TODO
	if (keyboard[71]) { //G,star pirate

	}

	if (keyboard[77]) { //M, supermario

	}

	if (keyboard[49]) { //1, saltar nivell 1

	}

	if (keyboard[50]) { //2, saltar nivell 2

	}
	// Update sprites
	this.sprite.update(deltaTime);
}

Player.prototype.draw = function()
{
	this.sprite.draw();
}

Player.prototype.collisionBox = function()
{
    if(this.size == 1)	var box = new Box(this.sprite.x + 12, this.sprite.y+8, this.sprite.x + this.sprite.width - 12, this.sprite.y + this.sprite.height);
    //TODO: else in case we need to change the collision box depending on the size of the player
	
	return box;
}

Player.prototype.killerCollisionBox = function()
{
	if(this.size == 1)	var box = new Box(this.sprite.x + 8, this.sprite.y+ this.sprite.height+1, this.sprite.x + this.sprite.width - 8, this.sprite.y + this.sprite.height+2);
	//TODO: else in case we need to change the collision box depending on the size of the player
	return box;
}

Player.prototype.hitted = function() //TODO: Change this.size to 1 and change the set of animations to littlepirate and change the collision box
{
	num_anim = this.sprite.currentAnimation;
	if(this.vulnerability && this.size == 2){ //TODO:change the set of animations to littlepirate
        this.size = 1;
        this.jumpAngle = 0;
        this.startY = this.sprite.y;
        if(num_anim == PIRATE_STAND_LEFT || num_anim == PIRATE_WALK_LEFT || num_anim == PIRATE_JUMP_LEFT || num_anim == PIRATE_FALL_LEFT){
            this.sprite.setAnimation(PIRATE_HIT_LEFT);
        }
        else {
            this.sprite.setAnimation(PIRATE_HIT_RIGHT);
        }
	} else if(this.vulnerability){
	    if(num_anim == PIRATE_STAND_LEFT || num_anim == PIRATE_WALK_LEFT || num_anim == PIRATE_JUMP_LEFT || num_anim == PIRATE_FALL_LEFT)this.sprite.setAnimation(PIRATE_HIT_LEFT);
        else this.sprite.setAnimation(PIRATE_HIT_RIGHT);
        this.Alive = false;
        this.jumpAngle = 0;
        this.startY = this.sprite.y;
	}

}

Player.prototype.hitsFlag = function()
{
   num_anim = this.sprite.currentAnimation;
   if(num_anim == PIRATE_JUMP_LEFT || num_anim == PIRATE_FALL_LEFT) this.sprite.setAnimation(PIRATE_FALL_LEFT);
   else this.sprite.setAnimation(PIRATE_FALL_RIGHT);
   //TODO: Go down to the floor and points
}

Player.prototype.powerUpWheel = function() //TODO
{
    this.vulnerability = false;
}

Player.prototype.powerUpHat = function() //TODO
{
    this.size = 2;
}

Player.prototype.powerDownWheel = function() //TODO
{
    this.vulnerability = true;
}

Player.prototype.powerDownHat = function() //TODO
{
    this.size = 1;
}

Player.prototype.isAlive = function()
{
	return this.Alive;
}



