const STAND_LEFT = 1;
const STAND_RIGHT = 2;
const WALK_LEFT = 3;
const WALK_RIGHT = 4;
const JUMP_LEFT = 5;
const JUMP_RIGHT = 6;
const FALL_LEFT = 7;
const FALL_RIGHT = 8;
const HIT_LEFT = 9;
const HIT_RIGHT = 10;

const PIRATE_STAND_LEFT = 100;
const PIRATE_STAND_RIGHT = 200;
const PIRATE_WALK_LEFT = 300;
const PIRATE_WALK_RIGHT = 400;
const PIRATE_JUMP_LEFT = 500;
const PIRATE_JUMP_RIGHT = 600;
const PIRATE_FALL_LEFT = 700;
const PIRATE_FALL_RIGHT = 800;
const PIRATE_HIT_LEFT = 900;
const PIRATE_HIT_RIGHT = 1000;

const LITTLE_PIRATE_STAND_LEFT = 1;
const LITTLE_PIRATE_STAND_RIGHT = 2;
const LITTLE_PIRATE_WALK_LEFT = 3;
const LITTLE_PIRATE_WALK_RIGHT = 4;
const LITTLE_PIRATE_JUMP_LEFT = 5;
const LITTLE_PIRATE_JUMP_RIGHT = 6;
const LITTLE_PIRATE_FALL_LEFT = 7;
const LITTLE_PIRATE_FALL_RIGHT = 8;
const LITTLE_PIRATE_HIT_LEFT = 9;
const LITTLE_PIRATE_HIT_RIGHT = 10;


function Player(x, y, map)
{

	// Set initial animation
    // Loading spritesheets
    var pirate = new Texture("Textures / Characters / Pirate.png");

    // Prepare PIRATE sprite & its animations
    this.sprite = new Sprite(x, y, 32, 32, 8, pirate);

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
	this.sprite.setAnimation(PIRATE_STAND_RIGHT);
	
	// Set tilemap for collisions
	this.map = map;
	
	// Set attributes for jump
	this.bJumping = false;
	this.left = false;
	this.jumpAngle = 0;
	this.size = 1;

	this.Alive = true;
	this.Dead = false;
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
			if(this.sprite.y > 500)this.Dead = true;
		}
		else{
			this.sprite.y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180);
		}
	}
	else {
	    if(keyboard[48])
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
				if(keyboard[38])
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
			}
			
		}
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
	var box = new Box(this.sprite.x + 7, this.sprite.y+4, this.sprite.x + this.sprite.width - 7, this.sprite.y + this.sprite.height);
	
	return box;
}

Player.prototype.killerCollisionBox = function()
{
	var box = new Box(this.sprite.x + 8, this.sprite.y+ this.sprite.height+1, this.sprite.x + this.sprite.width - 8, this.sprite.y + this.sprite.height+2);
	
	return box;
}

Player.prototype.hitted = function()
{
    num_anim = this.sprite.currentAnimation;
    if (this.size == 1) {
        if (num_anim == 0 || num_anim == 2 || num_anim == 4 || num_anim == 6) this.sprite.setAnimation(PIRATE_HIT_LEFT);
        else this.sprite.setAnimation(PIRATE_HIT_RIGHT);
    } else {
        this.changeAnimations("Textures / Characters / LittlePirate.png");
        this.size = 1;
        //TODO: Change animation to the little pirate
    }
	this.Alive = false;
	this.jumpAngle = 0;
	this.startY = this.sprite.y;
}

Player.prototype.isAlive = function()
{
	return this.Alive;
}

Player.prototype.size = function () {
    return this.size;
}




