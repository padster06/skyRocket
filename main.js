var display;
var loop;
var lastUpdate;
var border;
var rocket;
var gui;
var boxArray=[];
var asteroid;
var lives;
var oldLives;
var playing = false;
var speed;

var speedStatus;
var tick;
var time;
var playTime;
var score;
var restartButton;
var playButton;
var playScreen;
var beginScreen;
var restartScreen;
var howToScreen;
var howToButton;
var backButton;
var highScore = 0;
var levelCount;
var oldLevel;
var imgLogo;
var barHeight;
var pickup;
var xp = 0;
var getToY=0;
var sound;
var crash;
var fail;
var levelUp;

function init(){
	//Setup require objects
	canvas=document.getElementById('myCanvas');
	display=canvas.getContext('2d');
	canvas.addEventListener('mousedown', click, false);
	canvas.addEventListener('mouseup', release, false);
	begin();
	restartButton = document.getElementById('restart');
	restartButton.addEventListener('click', function(){changeScene('restart')});
	restartScreen = document.getElementById('restartScreen');
	restartScreen.style.display="none";
	playScreen=document.getElementById('playScreen');
	playScreen.style.display='none';
	playButton = document.getElementById('play');
	playButton.addEventListener('click', function(){changeScene('play')});
	beginScreen = document.getElementById('beginScreen');
	beginScreen.style.display="initial";
	howToButton = document.getElementById('howBut');
	howToButton.addEventListener('click', function(){changeScene('how');})
	howToScreen = document.getElementById('howTo');
	howToScreen.style.display = 'none';
	backButton = document.getElementById('back');
	backButton.addEventListener('click', function(){changeScene('begin');});
	sound = new Audio('audio/pickup.mp3');
	fail = new Audio('audio/fail.mp3');
	crash = new Audio('audio/crash.mp3');
	levelUp = new Audio('audio/levelUp.mp3');
}

function begin(){
	//Launch

	lastUpdate=Date.now();

	border = new Background(canvas);
	boxArray.push(new Star(border));
	rocket = new Rocket(border.centreX(), border.centreY());
	getToY=rocket.y;
	asteroid = new Asteroid(border);
	loop=setInterval(mainLoop,0);
	pickup = new Pickup();
	for (var i = 0; i < 200; i++) {
		boxArray[i] = new Star(border);
	}
	lives = new Lives(border);
	gui = new Gui();

	imgLogo = new Image();
	imgLogo.src = 'gfx/logo.png';

	speedStatus = 'n';
	time=Date.now();
	tick=0;
	playTime=0;
	score = 0
	speed = 1;
}

function imunity() {
	lives.imune = false;
}

function mainLoop(){
	//Get time since last refresh
	tick=(Date.now()-time);
	time=Date.now();
	
	if(playing == true) {
		playTime+=tick;
		
		
		score+=tick;
		
		oldLevel = levelCount;

		display.beginPath();
		
		barHeight = levelCount;

		//Clear the display
		display.fillStyle = '#fff';
		display.fillRect(0, 0, canvas.width, canvas.height);
	   	display.fillStyle = '#080226';
	   	display.fillRect(border.x, border.y, border.width, border.height);
		//make many stars 
		
		for (var i = 0; i < 200; i++) {
			boxArray[i].show();
			boxArray[i].move(tick,speed);

		}

		//Lets remember if we have a collision
		var wasCollision=false;
		
		//Did we collide with the border
		if(rocket.getX2() > border.getX2() || rocket.getX1() < border.getX1()){
			//Yes - Should we take a life
			if(lives.imune==false){
				//We should as they are not immune
				lives.takeLife(playing);
				//Lets now make them immune
				lives.imune = true;
				crash.play();
			}
			//If they are immune or not, we will register a collision
			wasCollision=true;
		}

		if(rocket.doesCollideWith(asteroid) == true) {
			if (lives.imune==false) {
				lives.takeLife(playing);
				lives.imune=true
				crash.play();
			}
			wasCollision = true;
		}
		if(pickup.doesCollideWith(rocket) == true) {
			if (lives.imune==false) {
				xp++;
				sound.play();
				lives.imune=true;
				console.log(xp);
			}
			wasCollision = true;
		}
		if(rocket.y<getToY){
			rocket.y++;
		}
		//Are they currently immune but they didn't collide with anything
		if(lives.imune==true && wasCollision==false){
			//Yes - so let stop making them immune as they are away from danger
			lives.imune=false;

		}
	
		if (highScore < score) {
			highScore = score;
		}
		levelCount = Math.floor(xp / 10);
		display.beginPath();
		rocket.draw(display);
		display.drawImage(asteroid.imgAsteroid, asteroid.x,asteroid.y);
		//Draw to the display
		display.stroke();
		rocket.move();
		display.fillStyle = '#e60000';
		display.font="60px arial";
		display.fillText('score = ' + Math.floor(score/1000), border.width + 40, 123);
		display.fillText('high score = ' + Math.floor(highScore/1000), border.width + 40, 193);
		display.fillText('you are level ' + (Math.floor(levelCount)+1) + '!', border.width + 40, 273);
		display.drawImage(imgLogo, border.width - 20, 400);
		asteroid.move(border,speed);
		lives.draw(display);
		pickup.draw(display);
		pickup.move(speed);
		display.closePath();
		
		display.beginPath();
		display.rect(border.width + 40, 323, 500, 50);
		display.fillRect(border.width + 40, 323, (xp * 50)-(500*levelCount), 50);
		display.stroke()
		display.closePath();

		pickup.showStar();
		if(levelCount > oldLevel) {
			speed+=.5;
			getToY+=20;
			levelUp.play();
		}

		if (lives.lives < 1) {
			playing = false;
			restartScreen.style.display="inherit";
			playScreen.style.display="none";
			fail.play();
			//gui.beginScreen(display, canvas);

		}
	}
}

function takeImune() {
	lives.imune = false;
}

document.onkeydown = checkKey;

function checkKey(e) {

   e = e || window.event;
	switch(e.keyCode){
		case 37:
			rocket.direction = 'left'
			break;
		case 39:
			rocket.direction = 'right'
			break;
	}

}

function changeScene(scene) {
	switch(scene) {
		case 'play': 
			playing = true; 
			beginScreen.style.display='none';
			playScreen.style.display='initial';
		break;
		case 'restart':
			playing = true;
			restartScreen.style.display='none';
			playScreen.style.display='initial'; 
			time=Date.now(); tick=0; 
			playTime=0; 
			score = 0;
			lives.lives = 3;
			speed=1;
			rocket.centre();
			getToY=rocket.y;
		break;
		case 'how': 
			playing=false
			howToScreen.style.display='initial';
			beginScreen.style.display='none';
		break;
		case 'begin':
		playing = false;
		beginScreen.style.display='initial';
		howToScreen.style.display='none';
		break;
	}

} 

function click(event) {
	var nik = false;
	var rick = false;
     if (event.pageX < canvas.width/2) {
    	 rocket.direction = 'left'
    	 nik = true;
 	}
     if (event.pageX > canvas.width/2) {
		rocket.direction = 'right'
		rick = true;
 	}
 	if (rick == true && nik == true) {
 		alert();
 	}
 	event.preventDefault();
}     

function release(event) {
	
	
}