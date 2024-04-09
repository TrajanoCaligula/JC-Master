
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
			this.nextLevel = menu.whereTo-1;
			if(this.nextLevel != -1) this.isMenu = false;
		}												//TODO:updatemenu;
		else if(this.nextLevel == 2){				//End of last lvl
			credits.update(TIME_PER_FRAME);
			if(!credits.active) {
				loadLevels();
				nextLevel = 0;							//redirect to menu
			}
		} else{											//New lvl
			lvls[nextLevel].update(TIME_PER_FRAME);
			if(lvls[nextLevel].endLevel) {				//Check index!
				points += lvls[nextLevel].points;		//Check points not in loop
				nextLevel++;	
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
	lvls.push(new Scene(new Tilemap(tilesheet, [32, 32], [32, 32], [0, 32], level01),1));	//1 for the level 1 (is shown in the scene)
}

// Init and launch game loop
init();
frameUpdate(previousTimestamp);

