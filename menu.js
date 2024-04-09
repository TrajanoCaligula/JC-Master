
const FLAGLAYER = 9;
const MAX_POSITION = 2;

// Menu. Updates and draws a single scene of the game.

function Menu()
{
	// Loading texture to use in a TileMap
	this.imCoins = new Image();
	this.imCoins.src = "Textures/Levels/Coins.png";
	var tilesheet = new Texture("Textures/Levels/Texture_Level.png");
	this.map = new Tilemap(tilesheet, [32, 32], [32, 32], [0, 32], level01);
	
	// Create tilemap
	this.levelId = levelID;
	this.icons = [];
	this.icons.push(new Icon(400, 400));
	this.icons.push(new Icon(600, 400));

	this.coins = [];
	this.nbCoins = 0;

	this.particleBarrels = [];
		
	// Store current time
	this.currentTime = 0;

	this.position = 0;

	this.isStarting = true;
	this.startingTime = 0;
	this.maxTimeStart = 3000;

	this.music = AudioFX('Sounds/music_level.mp3', { loop: true });
	this.powerUp = AudioFX('Sounds/powerUp.mp3');

	this.points = 0;
	this.pointsRecord = 0;
}


Menu.prototype.update = function(deltaTime)
{
	if(keyboard[38]){// UP
		this.checkPositionUp();
	}
	else if(keyboard[40]){// DOWN
		this.checkPositionDown();
	}
	else if(keyboard[32] || keyboard[13]){// SPACE/ENTER
		;
	}	
}

Menu.prototype.draw = function ()
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

	var text = "1 - " + this.levelId;
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
		var text = "1 - " + this.levelId;
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
	context.fillRect(0, 0, canvas.width, 32);
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 736-32, canvas.width, 32);
	context.restore();
}

Menu.prototype.noramlizeNumbers = function(x){
	var value = String(x);
	if(x < 10)  value = "0000" + value;
	else if(x < 100)  value = "000" + value;
	else if(x < 1000)  value = "00" + value;
	else if(x < 10000)  value = "0" + value;
	return value;
}

Menu.prototype.noramlizeTime = function(x){
	var value = String(x);
	if(x < 10)  value = "000" + value;
	else if(x < 100)  value = "00" + value;
	else if(x < 1000)  value = "0" + value;
	return value;
}

Menu.prototype.updateParticles = function(deltaTime){
	for(var i = 0; i < this.particleBarrels.length; i++){
		if(!this.particleBarrels[i].active){
			this.particleBarrels.splice(i,1);
			i--;
		} 
		else this.particleBarrels[i].update(deltaTime);
	}
}

Menu.prototype.checkPositionDown = function(){
	if(this.position-1 < 0) this.position = MAX_POSITION;
	else this.position++;
}

Menu.prototype.checkPositionUp = function(){
	if(this.position+1 == MAX_POSITION) this.position = 0;
	else this.position--;
}

Menu.prototype.setRecordPoints = function(x){
	if(x > this.pointsRecord) this.pointsRecord = x;
}