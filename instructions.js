

function Instructions() //TODO
{
	this.active = true;
	this.TimerActive = 2000;
	this.TimerCredits = 15000;
	this.deltaTime = 0;
	this.fontSize = 32;
	this.title = true;
	this.displacement = 0;
	this.baseY = 1000;
	this.background = new Image();
	this.background.src = "Textures/Levels/InstructionsBackground.png";
}


Instructions.prototype.update = function(deltaTime)
{
	if(this.active){
		if(keyboard[27]) this.active = false;
	}
}

Instructions.prototype.draw = function draw()
{
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");	
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "white";
	context.drawImage(this.background, 0, 32);
	
	var text = "CONTROLS";
	context.font = (this.fontSize*3).toString() + "px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, (896/2)-(textSize.width/2), 736/4);
	
	var text = "Use the arrows or 'WASD' and spacebar to control the pirate";
	context.font = (this.fontSize).toString() + "px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, (896/2)-(textSize.width/2), (736/4)+100);

	var text = "Use 'G' to transform into a invencible pirate!";
	context.font = (this.fontSize).toString() + "px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, (896/2)-(textSize.width/2), (736/4)+140);

	var text = "Use 'M' to become a huge pirate";
	context.font = (this.fontSize).toString() + "px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, (896/2)-(textSize.width/2), (736/4)+180);

	var text = "If 'U' is pushed, you will see the collision box of the entities";
	context.font = (this.fontSize).toString() + "px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, (896/2)-(textSize.width/2), (736/4)+240);

	var text = "You can skip sections of the levels by using '1' and '2'";
	context.font = (this.fontSize).toString() + "px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, (896/2)-(textSize.width/2), (736/4)+280);

	var text = "Enjoy your ARGHventure!!!";
	context.font = (this.fontSize*2).toString() + "px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, (896/2)-(textSize.width/2), (736/4)+400);


	//bandas
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 736-32, canvas.width, 32);
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 0, canvas.width, 32);

	var text = "Push ESC to skip...";
	context.fillStyle = "white";
	context.font = (this.fontSize*0.5).toString() + "px Candara";
	var textSize = context.measureText(text);
	context.fillText(text, (896/2)-(textSize.width/2), 736-16);

	context.save()
}

Instructions.prototype.restart = function(){
	this.active = true;
	this.TimerActive = 2000;
	this.TimerCredits = 15000;
	this.deltaTime = 0;
	this.fontSize = 32;
	this.title = true;
	this.displacement = 0;
	this.baseY = 1000;
}
 



