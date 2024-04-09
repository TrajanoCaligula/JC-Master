
const FLAGLAYER = 9;

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("Textures/Levels/Texture_Level.png");
	this.imPirateLife = new Image();
	this.imPirateLife.src = "Textures/Characters/PirateLife.png";
	this.imCoins = new Image();
	this.imCoins.src = "Textures/Levels/Coins.png";
	
	// Create tilemap
	this.map = new Tilemap(tilesheet, [32, 32], [32, 32], [0, 32], level01);
	
	// Create entities
	this.barrels = []
	this.barrelsActive = []
	this.createBarrels();

	this.barrelsInt = []
	this.barrelsIntActive = []
	this.createBarrelsInt();

	this.player = new Player(100, 0, this.map);

	this.enemies_sharks = [];
	this.sharksActive = [];
	this.createSharks();

	this.enemies_crabs = [];
	this.crabsActive = [];
	this.createCrabs();

	this.enemies_shells = [];
	this.shellsActive = [];

	this.wheels = [];
	this.wheelsActive = [];

	this.hats = [];
	this.hatsActive = [];

	this.coins = [];
	this.nbCoins = 0;

	this.createFlag();
 	this.isFinished = false;
	this.finishPointsAdded = false;
	this.flagHitted = false;
	this.endLevel = false;

	this.particleBarrels = [];
		
	// Store current time
	this.currentTime = 0;

	this.drawHitBoxesState = false; // FOR DEBUBBING
	this.displacement=0;
	this.displacementMargin = 224;

	this.isStarting = true;
	this.startingTime = 0;
	this.maxTimeStart = 3000;

	this.music = AudioFX('Sounds/music_level.mp3', { loop: true });
	this.powerUp = AudioFX('Sounds/powerUp.mp3');

	this.points = 0;
	this.displayPoints = [];
	this.cronoMax = 151000;
	this.cronoTime = this.cronoMax;

	this.playerHasToDraw = true;
}


Scene.prototype.update = function(deltaTime)
{
	if(this.player.lifes > 0){
		this.music.play();
		this.currentTime += deltaTime;
		
		if(this.isStarting){
			this.startingTime += deltaTime;
			this.cronoTime = this.cronoMax;
			if(this.player.sprite.y <= 576) this.player.sprite.y +=3;
			if(this.startingTime >= this.maxTimeStart) {
				this.isStarting = false;
			}
		}
		else{
			if(this.player.changingType != 0){
				this.player.changingStates(deltaTime,-1,-1);
			}
			else{
				if(keyboard[85])this.drawHitBoxesState = !this.drawHitBoxesState;//FOR DEBUBBING

				if(!this.isFinished) this.player.update(deltaTime);
				else{
					this.player.sprite.update(deltaTime);
					this.player.sprite.x += 2;
					if((this.player.sprite.x - this.flag.sprite.x) >= (3*32) && !this.finishPointsAdded){
						this.finishPointsAdded = true;
						this.points += Math.trunc((this.cronoTime/1000)*10);
						this.displayPoints.push(new PointsDisplay(this.player.sprite.x,this.player.sprite.y, Math.trunc((this.cronoTime/1000)*10)));
						this.endLevel = true;
						this.cronoTime = 0;
					}
				}
				//Displacement
				if((this.player.sprite.x-this.displacement)>this.displacementMargin && (this.flag.sprite.x-this.player.sprite.x) > 450){
					this.displacement = this.player.sprite.x-this.displacementMargin;
				}
				if(this.player.sprite.x-this.displacement< -7){
					this.player.sprite.x = this.displacement-7;
				}
				// Update entities
				if(this.player.isAlive()){
					if(keyboard[49]){// TP 1
						this.player.sprite.x = 3136;
						this.player.sprite.y = 576;
						this.displacement = this.player.sprite.x-this.displacementMargin;
					}
					else if(keyboard[50]){// TP 2
						this.player.sprite.x = 5980;
						this.player.sprite.y = 576;
						this.displacement = this.player.sprite.x-this.displacementMargin;
					}
					else if(keyboard[51]){// TP 3
						this.player.sprite.x = 6304;
						this.player.sprite.y = 288;
						this.displacement = this.player.sprite.x-this.displacementMargin;
					}
				// Check for collision between entities
					this.updateAllBarrels(deltaTime);
				
					this.updateAllObjects(deltaTime);
				
					this.updateAllEnemies(deltaTime);

					this.updateFlag(deltaTime);

					this.updateParticles(deltaTime);

					this.updatePoints(deltaTime);
				}
			}
		}
		if(this.cronoTime <= 3){
			this.cronoTime = 0;
			if(!this.player.isDying && !this.Dead) this.player.killOutOfTime();
		}
		else if (!this.flagHitted)this.cronoTime -= deltaTime;  //todo, programar que pasa quan acaba el temps
		if(this.player.Dead){
				if(this.player.lifes>0)this.restart();
				else{

				}
		}
	}
	
	
}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.save()

	context.translate(Math.floor(-this.displacement),0);
	context.fillStyle = "white";
	if(!this.isStarting) this.map.draw();

	// Draw text
	var text = "PIRATE";
	context.font = "32px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, this.displacement + 30, 75);
	
	var text = this.noramlizeNumbers(this.points);
	context.fillText(text, this.displacement + 30, 75+25);
	
	context.drawImage(this.imPirateLife, this.displacement + (896/4), 80,30,25);

	var text = " x " + (this.player.lifes-1).toString();
	if(this.player.lifes-1 <= 0) text = " x 0";
	context.font = "24px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, this.displacement + (896/4)+textSize.width, 100);

	context.drawImage(this.imCoins, this.displacement + 896-(896/4) - 65, 75, 32, 32);
	var text = " x " + (this.nbCoins).toString();
	context.font = "24px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, this.displacement + 896-(896/4)-textSize.width, 100);

	var text = "WORLD";
	var textSize = context.measureText(text);
	context.fillText(text, this.displacement +(896/2)-(textSize.width/2), 75);

	var text = "1 - 1";
	var textSize = context.measureText(text);
	context.fillText(text, this.displacement +(896/2)-(textSize.width/2), 75+25);

	var text = "TIME";
	var textSize = context.measureText(text);
	context.fillText(text, this.displacement +(896 - 30)-textSize.width, 75);

	var text = this.noramlizeTime(Math.floor(this.cronoTime / 1000));
	var textSize = context.measureText(text);
	context.fillText(text, this.displacement +(896 - 30)-textSize.width, 75+25);

	// Draw entities
	if(!this.isStarting){
		// Draw tilemap
		this.drawHitBoxes();
		this.flag.draw();
		for(var i = 0; i < this.barrels.length; i++){	
			if(this.barrelsActive[i]&& this.barrels[i].isShown)
				this.barrels[i].draw();
		}

		for(var i = 0; i < this.barrelsInt.length; i++){	
			if(this.barrelsIntActive[i])
				this.barrelsInt[i].draw();
		}

		for(var i = 0; i < this.enemies_sharks.length; i++){
			if(this.sharksActive[i] && !this.enemies_sharks[i].Dead)
				this.enemies_sharks[i].draw();
		}

		for(var i = 0; i < this.enemies_crabs.length; i++){
			if(this.crabsActive[i] && !this.enemies_crabs[i].Dead)
				this.enemies_crabs[i].draw();
		}

		for(var i = 0; i < this.enemies_shells.length; i++){
			if(this.shellsActive[i] && !this.enemies_shells[i].Dead)
				this.enemies_shells[i].draw();
		}
		for(var i = 0; i < this.wheels.length; i++){
			if(this.wheelsActive[i] && !this.wheels[i].Dead)
				this.wheels[i].draw();
		}
		for(var i = 0; i < this.hats.length; i++){
			if(this.hatsActive[i] && !this.hats[i].Dead)
				this.hats[i].draw();
		}
		for(var i = 0; i < this.coins.length; i++){
			if(this.coins[i].coinAlive)
				this.coins[i].draw();
		}
		for(var i = 0; i < this.particleBarrels.length; i++){
			if(this.particleBarrels[i].active)
				this.particleBarrels[i].draw();
		}
		for(var i = 0; i < this.displayPoints.length; i++){
			if(this.displayPoints[i].active)
				this.displayPoints[i].draw();
		}
	} else {
		var text = "1 - 1";
		context.font = "64px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, 896/2 - textSize.width/2, 736/2);
	}
	if(!this.player.Dead){
		if(this.player.hittedState){
			if(this.playerHasToDraw)this.player.draw();
			this.playerHasToDraw = !this.playerHasToDraw;
		}
		else this.player.draw();
	}
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 736-32, canvas.width, 32);
	context.restore();
}

Scene.prototype.noramlizeNumbers = function(x){
	var value = String(x);
	if(x < 10)  value = "0000" + value;
	else if(x < 100)  value = "000" + value;
	else if(x < 1000)  value = "00" + value;
	else if(x < 10000)  value = "0" + value;
	return value;
}

Scene.prototype.noramlizeTime = function(x){
	var value = String(x);
	if(x < 10)  value = "000" + value;
	else if(x < 100)  value = "00" + value;
	else if(x < 1000)  value = "0" + value;
	return value;
}

Scene.prototype.createBarrels = function()
{
	for(var j=0, pos=0; j<level01.height; j++)
		for(var i=0; i<level01.width; i++, pos++)
		{
			tileId = level01.layers[4].data[pos];
			if(tileId != 0){
				this.barrels.push(new Barrel(i*32+0, 32+32*j));
				this.barrelsActive.push(true);
			}
	}
}

Scene.prototype.createBarrelsInt = function()
{
	for(var j=0, pos=0; j<level01.height; j++)
		for(var i=0; i<level01.width; i++, pos++)
		{
			tileId = level01.layers[5].data[pos];
			if(tileId != 0){
				this.barrelsInt.push(new Intbarrel(i*32+0, 32+32*j));
				this.barrelsIntActive.push(true);
			}
		}
}

Scene.prototype.createSharks = function()
{
	for(var j=0, pos=0; j<level01.height; j++)
		for(var i=0; i<level01.width; i++, pos++)
		{
			tileId = level01.layers[6].data[pos];
			if(tileId != 0){
				this.enemies_sharks.push(new Shark(i*32+0, 32+32*j-32,this.map));
				this.sharksActive.push(true);
			}
		}
}

Scene.prototype.createCrabs = function()
{
	for(var j=0, pos=0; j<level01.height; j++)
		for(var i=0; i<level01.width; i++, pos++)
		{
			tileId = level01.layers[7].data[pos];
			if(tileId != 0){
				this.enemies_crabs.push(new Crab(i*32+0, 32+32*j-32,this.map));
				this.crabsActive.push(true);
			}
		}
}

Scene.prototype.createFlag = function()
{
	for(var j=0, pos=0; j<level01.height; j++)
		for(var i=0; i<level01.width; i++, pos++)
		{
			tileId = level01.layers[FLAGLAYER].data[pos];
			if(tileId != 0){
				this.flag =new Flag(i*32+0, 32+32*j-32,this.map);
			}
		}
}

Scene.prototype.isInsideScreen = function(obj){
	if(obj.sprite.x < 1000+this.displacement && obj.sprite.x > this.displacement-300)
		return true;
	else
		return false;
}

Scene.prototype.checkEntityCollisionEntities = function(first, second, j, isTheSame){
	for(var i = 0; i < second.length; i++)
		if(isTheSame && i == j);
		else if(second[i].collisionBox().intersect(first.collisionBox())) {
			if(first.direction == LEFT) first.direction = RIGHT;
			else first.direction = LEFT;
		}
}

Scene.prototype.checkEntityCollisionShell = function(first, shell){
	for(var i = 0; i < shell.length; i++)
		if(shell[i].collisionBox().intersect(first.collisionBox())){
			if(!shell[i].isMoving) {
				if(first.direction == LEFT) first.direction = RIGHT;
				else first.direction = LEFT;
			}
			else {
				this.displayPoints.push(new PointsDisplay(this.player.sprite.x,this.player.sprite.y,this.first.points));
				this.points += first.points;
				first.killed();
			}
		}
}

Scene.prototype.checkShellCollisionShell = function(first, second, j){
	for(var i = 0; i < second.length; i++)
		if(i != j && second[i].collisionBox().intersect(first.collisionBox())){
			if(second.isMoving && second.isMoving)
				if(first.isMoving){
					//if(first.direction != second.direction) {
						if(first.direction == LEFT) first.direction = RIGHT;
						else first.direction = LEFT;
					//}
				}
				else first.killed();
		}
}

Scene.prototype.drawHitBoxes = function(){
	if(this.drawHitBoxesState){
		this.quads = new Array();
		var box = this.player.collisionBox();
		this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "blue"));
		for(var i = 0; i < this.barrels.length; i++){
			if(this.barrelsActive[i] && this.barrels[i].isShown){
				box = this.barrels[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "purple"));
			}
		}
		for(var i = 0; i < this.barrelsInt.length; i++){
			if(this.barrelsIntActive[i]){
				box = this.barrelsInt[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "yellow"));
			}
		}
		for(var i = 0; i < this.enemies_sharks.length; i++){
			if(this.sharksActive[i] && !this.enemies_sharks[i].Dead){
				box = this.enemies_sharks[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "red"));
			}
		}
		for(var i = 0; i < this.enemies_crabs.length; i++){
			if(this.crabsActive[i] && !this.enemies_crabs[i].Dead){
				box = this.enemies_crabs[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "green"));
			}
		}
		for(var i = 0; i < this.enemies_shells.length; i++){
			if(this.shellsActive[i] && !this.enemies_shells[i].Dead){
				box = this.enemies_shells[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "pink"));
			}
		}
		for(var i = 0; i < this.wheels.length; i++){
			if(this.wheelsActive[i] && !this.wheels[i].Dead){
				box = this.wheels[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "brown"));
			}
		}
		for(var i = 0; i < this.hats.length; i++){
			if(this.hatsActive[i] && !this.hats[i].Dead){
				box = this.hats[i].collisionBox();
				this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "black"));
			}
		}
		box = this.flag.collisionBox();
		this.quads.push(new Quad(box.min_x, box.min_y,box.max_x - box.min_x , box.max_y-box.min_y, "cyan"));
		for(var i = 0; i < this.quads.length; i++){
			this.quads[i].draw();
		}
	}
}

Scene.prototype.updateAllBarrels = function(deltaTime){
	for(var i = 0; i < this.barrels.length; i++){
		this.barrelsActive[i] = this.isInsideScreen(this.barrels[i]);
		if(this.barrelsActive[i]){
			this.barrels[i].update(deltaTime);
			if(!this.player.hittedState && this.player.collisionBox().intersect(this.barrels[i].collisionBox())){
				typeCollision = this.player.collisionBox().whereCollide(this.barrels[i].collisionBox());
				if(typeCollision == 4 && this.player.jumpState == 1){
					if(this.player.size == 1) {	
						this.barrels[i].crash();
						this.particleBarrels.push(new ParticBarrelDest(this.barrels[i].sprite.x, this.barrels[i].sprite.y));
						this.barrelsActive[i] = false;
						this.barrels[i].isShown = false;
						pos=(this.barrels[i].sprite.x/32)+ level01.width*((this.barrels[i].sprite.y-32)/32);
						this.map.map.layers[4].data[pos]=0;
						this.player.resetJump();
					}
					else {
						this.barrels[i].move();
						//todo: interaccio que no trenca
					}
				}
			}
		}
		
	}
	for(var i = 0; i < this.barrelsInt.length; i++){
		this.barrelsIntActive[i] = this.isInsideScreen(this.barrelsInt[i]);
		if(this.barrelsIntActive[i]){
			this.barrelsInt[i].update(deltaTime);
			if(!this.player.hittedState && this.player.collisionBox().intersect(this.barrelsInt[i].collisionBox())){
				typeCollision = this.player.collisionBox().whereCollide(this.barrelsInt[i].collisionBox());
				if(typeCollision == 4 && this.player.jumpState == 1)
					if(!this.barrelsInt[i].beenActivated){
						if(this.player.size == 0){
							this.hats.push(new Hat(this.barrelsInt[i].sprite.x-16, this.barrelsInt[i].sprite.y-64,this.map));
							this.hatsActive.push(true);
						}
						else{
							if(Math.random() < 0.3){
								this.nbCoins +=1;
								this.coins.push(new Coin(this.barrelsInt[i].sprite.x, this.barrelsInt[i].sprite.y-16,this.map));
								this.displayPoints.push(new PointsDisplay(this.player.sprite.x,this.player.sprite.y,this.coins[0].points));
								this.points += this.coins[0].points;
							} else{
								this.wheels.push(new Wheel(this.barrelsInt[i].sprite.x, this.barrelsInt[i].sprite.y-32,this.map));
								this.wheelsActive.push(true);
							}
						}
						this.barrelsInt[i].impact();
					}
			}
		}
		
	}

}

Scene.prototype.updateAllObjects = function(deltaTime){
	for(var i = 0; i < this.coins.length; i++) if(this.coins[i].coinAlive) this.coins[i].update(deltaTime);

	for(var i = 0; i < this.hats.length; i++){
		this.hatsActive[i] = this.isInsideScreen(this.hats[i]);
		if(this.hatsActive[i] && !this.hats[i].Dead){
			this.hats[i].update(deltaTime);
			if(!this.player.hittedState && !this.hats[i].isDying && this.player.collisionBox().intersect(this.hats[i].collisionBox())){
				this.points += this.hats[i].points;
				this.displayPoints.push(new PointsDisplay(this.player.sprite.x,this.player.sprite.y,this.hats[i].points));
				this.hats[i].killed();
				this.powerUp.play();
				if(this.player.size == 0){
					this.player.changingStates(deltaTime,this.player.actualIndexSprite,this.player.actualIndexSprite+1);
					this.player.powerUpHat();
				}
			}
		}
	}

	for(var i = 0; i < this.wheels.length; i++){
		this.wheelsActive[i] = this.isInsideScreen(this.wheels[i]);
		if(this.wheelsActive[i] && !this.wheels[i].Dead){
			this.wheels[i].update(deltaTime);
			if(!this.player.hittedState && !this.wheels[i].isDying && this.player.collisionBox().intersect(this.wheels[i].collisionBox())){
				this.points += this.wheels[i].points;
				this.displayPoints.push(new PointsDisplay(this.player.sprite.x,this.player.sprite.y,this.wheels[i].points));
				this.wheels[i].killed();
				this.powerUp.play();
				if(this.player.vulnerability){
					this.player.changingStates(deltaTime,this.player.actualIndexSprite,this.player.actualIndexSprite+2);	
				}
				this.player.powerUpWheel();
			}
		}
	}

}

Scene.prototype.updateAllEnemies = function(deltaTime){
	
	for(var i = 0; i < this.enemies_sharks.length; i++){
		this.sharksActive[i] = this.isInsideScreen(this.enemies_sharks[i]);
		if(this.sharksActive[i] && !this.enemies_sharks[i].Dead){
			this.enemies_sharks[i].update(deltaTime);
			if(!this.player.hittedState && !this.enemies_sharks[i].isDying && this.player.collisionBox().intersect(this.enemies_sharks[i].collisionBox())){
				if(this.player.vulnerability){
					typeCollision = this.player.collisionBox().whereCollide(this.enemies_sharks[i].collisionBox());
					if(typeCollision == 1 || typeCollision == 2 || typeCollision == 4){
						this.player.hitted();
					}
					else{
						this.player.hitsEnemy();
						this.points += this.enemies_sharks[i].points;
						this.displayPoints.push(new PointsDisplay(this.player.sprite.x,this.player.sprite.y,this.enemies_sharks[i].points));
						this.enemies_sharks[i].killed();
					}
				}
				else{
					this.displayPoints.push(new PointsDisplay(this.player.sprite.x,this.player.sprite.y,this.enemies_sharks[i].points));
					this.points += this.enemies_sharks[i].points;
					this.enemies_sharks[i].killed();
				}
			}
			else if(!this.enemies_sharks[i].isDying){
				this.checkEntityCollisionEntities(this.enemies_sharks[i],this.enemies_sharks, i, true);
				this.checkEntityCollisionEntities(this.enemies_sharks[i],this.enemies_crabs, 0, false);
				this.checkEntityCollisionShell(this.enemies_sharks[i],this.enemies_shells);
			}
		}
	}

	for(var i = 0; i < this.enemies_crabs.length; i++){
		this.crabsActive[i] = this.isInsideScreen(this.enemies_crabs[i]);
		if(this.crabsActive[i] && !this.enemies_crabs[i].Dead){
			this.enemies_crabs[i].update(deltaTime);
			if(!this.player.hittedState && !this.enemies_crabs[i].isDying && this.player.collisionBox().intersect(this.enemies_crabs[i].collisionBox())){
				if(this.player.vulnerability){
					typeCollision = this.player.collisionBox().whereCollide(this.enemies_crabs[i].collisionBox());
					if(typeCollision == 1 || typeCollision == 2 || typeCollision == 4){
						this.player.hitted();
					}	
					else{		
						this.player.hitsEnemy();
						this.enemies_shells.push(new Shell(this.enemies_crabs[i].sprite.x+15, this.enemies_crabs[i].sprite.y,this.map));
						var size = this.enemies_shells.length;
						this.enemies_shells[size-1].isMoving = false;
						this.enemies_shells[size-1].direction = this.enemies_crabs[i].direction;
						this.shellsActive.push(true);
						this.enemies_crabs[i].killed();
						this.points += this.enemies_crabs[i].points;
						this.displayPoints.push(new PointsDisplay(this.player.sprite.x,this.player.sprite.y,this.enemies_crabs[i].points));
					}
				}
				else{
					this.displayPoints.push(new PointsDisplay(this.player.sprite.x,this.player.sprite.y,this.enemies_crabs[i].points));
					this.points += this.enemies_crabs[i].points;
					this.enemies_crabs[i].killed();
				}
			}
			else if(!this.enemies_crabs[i].isDying){
				this.checkEntityCollisionEntities(this.enemies_crabs[i],this.enemies_sharks, 0, false);
				this.checkEntityCollisionEntities(this.enemies_crabs[i],this.enemies_crabs, i, true);
				this.checkEntityCollisionShell(this.enemies_crabs[i],this.enemies_shells);
			}
		}
	}

	for(var i = 0; i < this.enemies_shells.length; i++){
		this.shellsActive[i] = this.isInsideScreen(this.enemies_shells[i]);
		if(this.shellsActive[i] && !this.enemies_shells[i].Dead){
			this.enemies_shells[i].update(deltaTime);
			if(!this.player.hittedState && !this.enemies_shells[i].isDying && this.player.collisionBox().intersect(this.enemies_shells[i].collisionBox())){
				if(this.player.vulnerability){
					typeCollision = this.player.collisionBox().whereCollide(this.enemies_shells[i].collisionBox());
					if(typeCollision == 1){
						if(this.enemies_shells[i].isMoving) this.player.hitted();
						else {
							this.enemies_shells[i].isMoving = true;
							this.enemies_shells[i].direction = RIGHT;
						}
					}
					else if(typeCollision == 2){ 
						if(this.enemies_shells[i].isMoving) this.player.hitted();
						else {
							this.enemies_shells[i].isMoving = true;
							this.enemies_shells[i].direction = LEFT;
						}
					}
					else if(typeCollision == 4){ 
						this.player.hitted();
					}
					else{ //golpe que para la shell
						if(this.enemies_shells[i].isMoving) {
							this.player.hitsEnemy();
							this.enemies_shells[i].isMoving = false;
							num_anim = this.enemies_shells[i].sprite.currentAnimation;
							if(num_anim == SHELL_MOVE_LEFT) this.enemies_shells[i].sprite.setAnimation(SHELL_STAND_LEFT);
							else this.enemies_shells[i].sprite.setAnimation(SHELL_STAND_RIGHT);
							this.enemies_shells[i].setCD();
						}
						else { //golpe y rebote con la shell parada
							if(this.enemies_shells[i].vulerabilityCD) {
								this.enemies_shells[i].killed();
								this.points += this.enemies_shells[i].points;
								this.displayPoints.push(new PointsDisplay(this.player.sprite.x,this.player.sprite.y,this.enemies_shells[i].points));
						}
							this.player.hitsEnemy();
						}
					}
				}
				else{
					if(this.enemies_shells[i].vulerabilityCD) {
						this.displayPoints.push(new PointsDisplay(this.player.sprite.x,this.player.sprite.y,this.enemies_shells[i].points));
						this.enemies_shells[i].killed();
						this.points += this.enemies_shells[i].points;
					}
				}
			}
			else if(!this.enemies_shells[i].isDying){
				this.checkShellCollisionShell(this.enemies_shells[i],this.enemies_shells, i);
			}
		}
	}
}

Scene.prototype.updateFlag = function(deltaTime){
	this.flag.update(deltaTime);
	var botFlag = 576;

	if(!this.isFinished && !this.player.hittedState && this.player.collisionBox().intersect(this.flag.collisionBox())){
		if(this.player.sprite.y >= botFlag){
			if(this.player.isFinished) {
				this.isFinished = true;
				this.player.sprite.setAnimation(PIRATE_WALK_RIGHT);
			}
			
		}
		else if(this.flag.sprite.y < this.player.sprite.y + 12) {
			if(!this.flagHitted) {
				this.flagHitted = true;
				this.points += Math.trunc(1/(this.player.sprite.y-this.flag.sprite.y) * 20000); //MAX escalar el valor?
				this.displayPoints.push(new PointsDisplay(this.player.sprite.x,this.player.sprite.y,Math.trunc(1/(this.player.sprite.y-this.flag.sprite.y) * 20000)));
			}
			this.flag.sprite.y += 5;
		}
		else if(this.flag.sprite.y >= this.player.sprite.y + 12){
			if(!this.flagHitted){
				this.flagHitted = true;
				this.points += 2000; //MAX POINTS
				this.displayPoints.push(new PointsDisplay(this.player.sprite.x,this.player.sprite.y,2000));
			}
			this.player.sprite.y += 5;
		} 
		else{
			this.player.sprite.y += 5;
			this.flag.sprite.y += 5;
		} 
		this.player.isEnding = true;
	}
}

Scene.prototype.updateParticles = function(deltaTime){
	for(var i = 0; i < this.particleBarrels.length; i++){
		if(!this.particleBarrels[i].active){
			this.particleBarrels.splice(i,1);
			i--;
		} 
		else this.particleBarrels[i].update(deltaTime);
	}
}

Scene.prototype.updatePoints = function(deltaTime){
	for(var i = 0; i < this.displayPoints.length; i++){
		if(!this.displayPoints[i].active){
			this.displayPoints.splice(i,1);
			i--;
		} 
		else{
		this.displayPoints[i].update(deltaTime);
		}
	}
}

Scene.prototype.restart = function(){
  // Resetting barrels
  this.map.map = JSON.parse(JSON.stringify(this.map.ogMap));
  this.barrels = [];
  this.barrelsActive = [];
  this.createBarrels();

  // Resetting internal barrels
  this.barrelsInt = [];
  this.barrelsIntActive = [];
  this.createBarrelsInt();

  // Resetting player position
  this.player.restart();

  // Resetting enemies
  this.enemies_sharks = [];
  this.sharksActive = [];
  this.createSharks();

  this.enemies_crabs = [];
  this.crabsActive = [];
  this.createCrabs();

  this.enemies_shells = [];
  this.shellsActive = [];

  // Resetting other entities
  this.wheels = [];
  this.wheelsActive = [];

  this.hats = [];
  this.hatsActive = [];

  this.coins = [];

  // Resetting flag and finish status
  this.createFlag();
  this.isFinished = false;
  this.finishPointsAdded = false;
  this.flagHitted = false;

  // Resetting particles
  this.particleBarrels = [];

  // Resetting time
  this.currentTime = 0;
  this.cronoTime = this.cronoMax;

  // Stop music
  this.music.stop();

  // Start music again
  this.music.play();

  // Resetting other flags and variables
  this.drawHitBoxesState = false;
  this.displacement = 0;
  this.isStarting = true;
  this.startingTime = 0;

  // Resetting audio
  this.powerUp = AudioFX('Sounds/powerUp.mp3');

  // Resetting points
  this.points = 0;

  // Allow player to be drawn again
  this.playerHasToDraw = true;
}
