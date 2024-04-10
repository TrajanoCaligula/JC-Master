

function Credits() //TODO
{
	this.active = true;
	this.TimerActive = 2000;
	this.TimerCredits = 15000;
	this.deltaTime = 0;
	this.fontSize = 32;
	this.title = true;
	this.displacement = 0;
	this.baseY = 1000;
}


Credits.prototype.update = function(deltaTime)
{
	if(this.active){
		this.TimerActive -= deltaTime;
		if(keyboard[27]) this.active = false;
		if(this.TimerActive <= 0) {
			this.title = false;
			this.TimerCredits -= deltaTime;
			if(this.TimerCredits <= 0) this.active = false;
		}
	}
	this.displacement += 2;
}

Credits.prototype.draw = function draw()
{
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");	
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	if(this.title){
		var text = "THE PIRATE HUNTER";
		context.fillStyle = "white";
		context.font = (this.fontSize*3).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), 736/2);
	}
	else{
		var text = "Created by";
		context.fillStyle = "white";
		context.font = (this.fontSize*0.75).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY - this.displacement);

		var text = "Jaume Malgosa Broto";
		context.font = (this.fontSize).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY + 40 - this.displacement);
		var text = "Alvaro Rodríguez Rubio";
		context.font = (this.fontSize).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY + 80 - this.displacement);

		var text = "With the help of";
		context.font = (this.fontSize*0.75).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY + 170 - this.displacement);

		var text = "Antonio Chica Calaf";
		context.font = (this.fontSize).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY + 210 - this.displacement);

		var text = "In collaboration with";
		context.font = (this.fontSize*0.75).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY + 300 - this.displacement);

		var text = "Facultat d'Informatica de Barcelona";
		context.font = (this.fontSize*1.2).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY + 340 - this.displacement);

		var text = "a faculty of";
		context.font = (this.fontSize*0.75).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY + 430 - this.displacement);

		var text = "Universitat Politecnica de Catalunya";
		context.font = (this.fontSize*1.2).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY + 470 - this.displacement);

		var text = "Resources";
		context.font = (this.fontSize*1.7).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY + 580 - this.displacement);

		var text = "Sound";
		context.font = (this.fontSize*0.75).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY + 630 - this.displacement);

		var text = "Pixabay.com & ";
		context.font = (this.fontSize).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY + 670 - this.displacement);

		var text = "Textures";
		context.font = (this.fontSize*0.75).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY + 710 - this.displacement);

		var text = "Pixelfrog.org";
		context.font = (this.fontSize).toString() + "px Candara";
		var textSize = context.measureText(text);
		context.fillText(text, (896/2)-(textSize.width/2), this.baseY + 750 - this.displacement);
	}
	


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

Credits.prototype.restart = function(){
	this.active = true;
	this.TimerActive = 2000;
	this.TimerCredits = 15000;
	this.deltaTime = 0;
	this.fontSize = 32;
	this.title = true;
	this.displacement = 0;
	this.baseY = 1000;
}
 



