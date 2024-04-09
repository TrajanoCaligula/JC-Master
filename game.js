
// Main class. Executes the game loop, redrawing the lvl1 as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;

var lvls = [];
var credits;
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
		bUpdated = true;
		if(isMenu) {
			menu.update(TIME_PER_FRAME);
			menu.setRecordPoints(recordPoints);
			nextLevel = menu.whereTo-1;
			menu.nbCoins = coins;
			menu.lifes = lifes;
			menu.points = points;
			if(nextLevel != -1) isMenu = false;
			lvls[0].player.lifes = lifes;
		}												//TODO:updatemenu;
		else if(nextLevel == 2){						//End of last lvl
			credits.update(TIME_PER_FRAME);
			if(!credits.active) {
				loadLevels();
				nextLevel = -1;
				isMenu = true;							//redirect to menu

				for(var i=0; i<lvls.length; i++) {
					lvls[i].restart();
					lvls[i].player.lifes = 4;
				}
			}
		} else{											//New lvl
			lvls[nextLevel].update(TIME_PER_FRAME);
			if(lvls[nextLevel].endLevel) {
				lifes = lvls[nextLevel].player.lifes;
				if(nextLevel == 0){
					nextLevel = 1;
					points = lvls[0].points;
					coins = lvls[0].nbCoins;
					lifes = lvls[0].player.lifes;
					lvls[1].player.lifes = lifes;

				}else {
					nextLevel = 2;
					points += lvls[1].points;
					coins += lvls[1].nbCoins;
					if(points > recordPoints){
						recordPoints = points;
						menu.setRecordPoints(recordPoints);
					}
					lifes = lvls[1].player.lifes;
				}
			}				
		}
		previousTimestamp += TIME_PER_FRAME;
		deltaTime = timestamp - previousTimestamp;
	}
	if(bUpdated){
		if(isMenu) menu.draw();									//TODO:draw menu
		else if(lvls.length == nextLevel) credits.draw();
		else lvls[nextLevel].draw();
	}
	window.requestAnimationFrame(frameUpdate)
}

function loadLevels(){
	menu = new Menu();
	credits = new Credits();
	var tilesheet = new Texture("Textures/Levels/Texture_Level.png");
	lvls.push(new Scene(new Tilemap(tilesheet, [32, 32], [32, 32], [0, 32], level01),level01,1));	//1 for the level 1 (is shown in the scene)
	lvls.push(new Scene(new Tilemap(tilesheet, [32, 32], [32, 32], [0, 32], level02), level02,2));	//2 for the level 2 (is shown in the scene)
}

// Init and launch game loop
init();
frameUpdate(previousTimestamp);

