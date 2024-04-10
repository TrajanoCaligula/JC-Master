
// Main class. Executes the game loop, redrawing the lvl1 as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;
const LEVEL1 = 0;
const LEVEL2 = 1;
const CONTROLS = 2;
const CREDITS = 3;
const MENU = 4;

var lvls = [];
var credits;
var instructions;
var menu;
var previousTimestamp;
var keyboard = [];
var interacted;
var points = 0;
var lifes = 4;
var coins = 0;
var recordPoints = 0;
var nextLevel = 1;
var isMenu = true; //	MENU, POSAR A TRUE
var reload = false;


// Control keyboard events

function keyDown(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = true;
}

function keyUp(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = false;
}

function click()
{
	interacted = true;
}

// Initialization

function init()
{
	loadLevels();
	for(var i=0; i<256; i++)
		keyboard.push(false);
	document.body.addEventListener('keydown', keyDown);
	document.body.addEventListener('keyup', keyUp);
	document.body.addEventListener('click', click);
	previousTimestamp = performance.now();
	interacted = false;
}

// Game loop: Update, draw, and request a new frame

function frameUpdate(timestamp)
{
	var bUpdated = false;
	var deltaTime = timestamp - previousTimestamp;
	
	while(deltaTime > TIME_PER_FRAME)
	{
		if(isMenu) {
			if(reload) refreshLevels();
			menu.update(TIME_PER_FRAME);
			menu.setRecordPoints(recordPoints);
			nextLevel = menu.whereTo;
			if(nextLevel != -1) {
				isMenu = false;
				lifes = 4;
				if(nextLevel != CREDITS && nextLevel != CONTROLS) lvls[nextLevel].player.lifes = lifes;
			}
			menu.nbCoins = coins;
			menu.lifes = lifes;
			menu.points = points;
		}												//TODO:updatemenu	
		else if(nextLevel == CREDITS){						//End of last lvl
			credits.update(TIME_PER_FRAME);
			if(!credits.active) {
				nextLevel = -1;
				isMenu = true;							//redirect to menu
				reload = true;
			}
		} 
		else if(nextLevel == CONTROLS){						//Eiinstruc
			instructions.update(TIME_PER_FRAME);
			if(!instructions.active) {
				nextLevel = -1;
				isMenu = true;							//redirect to menu
				reload = true;
			}
		}
		else if(lifes > 0){											
			console.log(nextLevel);
			lvls[nextLevel].update(TIME_PER_FRAME);
			if(lvls[nextLevel].endLevel) {
				lifes = lvls[nextLevel].player.lifes;
				if(nextLevel == LEVEL1){
					nextLevel = LEVEL2;
					points = lvls[0].points;
					coins = lvls[0].nbCoins;
					lifes = lvls[0].player.lifes;
					lvls[1].player.lifes = lifes;
					lvls[0].music.stop();
					lvls[0].soundsBackground.stop();
					
				}else {
					nextLevel = CREDITS;
					points += lvls[1].points;
					coins += lvls[1].nbCoins;
					if(points > recordPoints){
						recordPoints = points;
						menu.setRecordPoints(recordPoints);
					}
					lifes = lvls[LEVEL2].player.lifes;
				}
			}				
		} else{
			nextLevel = CREDITS;
			lvls[0].stopSounds();
			lvls[1].stopSounds();
		}
		previousTimestamp += TIME_PER_FRAME;
		deltaTime = timestamp - previousTimestamp;
		
		bUpdated = true;
	}
	if(bUpdated){
		if(isMenu) menu.draw();									//TODO:draw menu
		else if(nextLevel == CREDITS) credits.draw();
		else if(nextLevel == CONTROLS)instructions.draw();
		else lvls[nextLevel].draw();
	}
	window.requestAnimationFrame(frameUpdate)
}

function loadLevels(){
	menu = new Menu();
	credits = new Credits();
	instructions = new Instructions();
	var tilesheet = new Texture("Textures/Levels/Texture_Level.png");
	lvls.push(new Scene(new Tilemap(tilesheet, [32, 32], [32, 32], [0, 32], level01),level01,1));	//1 for the level 1 (is shown in the scene)
	lvls.push(new Scene(new Tilemap(tilesheet, [32, 32], [32, 32], [0, 32], level02), level02,2));	//2 for the level 2 (is shown in the scene)
}

function refreshLevels(){
	reload = false;
	menu = new Menu();
	credits.restart();
	instructions.restart();
	for(var i=0; i<lvls.length; i++) {
					lvls[i].restart();
					lvls[i].player.lifes = 4;
				}
}

// Init and launch game loop
init();
frameUpdate(previousTimestamp);

