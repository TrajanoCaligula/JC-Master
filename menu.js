const MAX_POSITION = 2;
const TIMER_CD = 200;

// Menu. Updates and draws a single scene of the game.

function Menu()
{
	this.background = new Image();
	this.background.src = "Textures/Levels/menu/menu.png";

	this.icons = [];
	this.icons.push(new Icon((896/2)-200,425));
	this.icons.push(new Icon((896/2)+135,425));

	this.pointsRecord = 0;

	this.TimerActive = 200;
	this.active = false;
	this.position = 1;

	this.lifes;
	this.nbCoins;
	this.points;

	this.whereTo = -1;
	this.iAm = 0;


	this.imPirateLife = new Image();
	this.imPirateLife.src = "Textures/Characters/PirateLife.png";
	this.imCoins = new Image();
	this.imCoins.src = "Textures/Levels/Coins.png";

	this.select = AudioFX('Sounds/select.mp3');
	this.choose = AudioFX('Sounds/choose.mp3');
	this.soundSea = AudioFX('Sounds/sea.mp3', { volume: 0.5, loop: true });
	this.enemy = new EnemyAvatar(300, 576);

}


Menu.prototype.update = function(deltaTime)
{
	this.enemy.update(deltaTime);
	if(interacted)this.soundSea.play();
	if(keyboard[38] || keyboard[87]){// UP
		this.checkPosition();
		this.select.stop();
		this.select.play();
		this.whereTo = -1;
	}
	else if(keyboard[40] || keyboard[83]){// DOWN
		this.checkPosition();
		this.select.stop();
		this.select.play();
		this.whereTo = -1;
	}
	else if(keyboard[27]){// ESC
		this.iAm = 0;
	}
	else if((keyboard[32] || keyboard[13]) && !this.active){ // SPACE/ENTER
		this.choose.stop();
		this.choose.play();
		this.soundSea.stop();
		this.TimerActive = TIMER_CD;
		this.active = true;
		if(this.iAm == 0){
			if(this.position == 1) { //selector de nivell
				this.iAm = 1;
			} else {	//credits
				this.iAm = 2;
				this.position = 1;
			}
		} else if(this.iAm == 1){
			if(this.position == 1) { //1-1
				this.whereTo = LEVEL1;
			} else {	//1-2
				this.whereTo = LEVEL2;
			}
		} else {
			if(this.position == 1) { //instruccions
				this.whereTo = CONTROLS;
			} else {	//1-2
				this.whereTo = CREDITS;
			}
		}
		for(var i = 0; i < this.icons.length; i++) this.icons[i].sprite.y = 425;
	}	

	if(this.active){
		this.TimerActive -= deltaTime;
		this.fontSize-=1;
		this.y-= 1;
		if(this.TimerActive <= 0) this.active = false;
	}

	for(var i = 0; i < this.icons.length; i++) this.icons[i].update(deltaTime);
}

Menu.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.save();

	context.drawImage(this.background, 0, 32);
	context.fillStyle = "white";

	// Draw text
	var text = "RECORD";
	context.font = "32px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, (896/2)-(textSize.width/2), 65);
	var text = this.normalizeNumbers(this.pointsRecord);
	var textSize = context.measureText(text);
	context.fillText(text, (896/2)-(textSize.width/2), 65+25);

	var text = "PIRATE";
	context.font = "32px Candara";
	var textSize = context.measureText(text);
	context.fillText(text,  30, 65);
	
	var text = this.normalizeNumbers(this.points);
	context.fillText(text,  30, 65+25);
	
	context.drawImage(this.imPirateLife,  (896/4), 65,30,25);

	var text = " x " + (this.lifes-1).toString();
	if(this.lifes-1 <= 0) text = " x 0";
	context.font = "24px Candara";
	var textSize = context.measureText(text);
	context.fillText(text,  (896/4)+textSize.width, 90);

	context.drawImage(this.imCoins,  896-(896/4) - 65, 65, 32, 32);
	var text = " x " + this.nbCoins;
	context.font = "24px Candara";
	var textSize = context.measureText(text);
	context.fillText(text,  896-(896/4)-30, 65+25);

	var text = "TIME";
	context.font = "32px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, (896 - 30)-textSize.width, 65);

	var text = "0000";
	context.font = "32px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, (896 - 30)-textSize.width, 65+25);

	context.fillStyle = "black";
	if(this.iAm == 0){
		var text = "Play";
		context.font = "64px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), 475);

		var text = "Options";
		context.font = "64px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), 575);
	}
	else if(this.iAm == 1){
		var text = "1 - 1";
		context.font = "64px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), 475);

		var text = "1 - 2";
		context.font = "64px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), 575);
	}
	else if(this.iAm == 2){
		var text = "Controls";
		context.font = "64px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), 475);

		var text = "Credits";
		context.font = "64px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), 575);
	}

	this.enemy.draw();

	for(var i = 0; i < this.icons.length; i++) this.icons[i].draw();

	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 0, canvas.width, 32);
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 736-32, canvas.width, 32);
	context.restore();
}

Menu.prototype.normalizeNumbers = function(x){
	var value = String(x);
	if(x < 10)  value = "0000" + value;
	else if(x < 100)  value = "000" + value;
	else if(x < 1000)  value = "00" + value;
	else if(x < 10000)  value = "0" + value;
	return value;
}

Menu.prototype.normalizeTime = function(x){
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

Menu.prototype.checkPosition = function(){
	if(!this.active){
		this.TimerActive = TIMER_CD;
		if(this.position == 0) {
			this.position = 1;
			for(var i = 0; i < this.icons.length; i++) this.icons[i].sprite.y = 425;
		}
		else {
			this.position = 0;
			for(var i = 0; i < this.icons.length; i++) this.icons[i].sprite.y = 525;
		}
	}
	this.active = true;
}


Menu.prototype.setRecordPoints = function(x){
	if(x > this.pointsRecord) this.pointsRecord = x;
}