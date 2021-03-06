var context;

//Game Board
var pacman = new Object();

var prize = new Object();
prize.img = new Image();
prize.img.src =  'images/prize.png';
prize.alive = true;
prize.deathTimer = new Date();

var lemon = new Object();
lemon.img = new Image();
lemon.img.src = 'images/lemon.png';
lemon.alive = true;
lemon.deathTimer = new Date();

var frenzy = new Object();
frenzy.on = false;
frenzy.timer = new Date();

var teleport = new Object();
teleport.on = false;
teleport.timer = new Date();
teleport.img = new Image();
teleport.img.src = 'images/wormHole.png';

var ghostRed = new Object();
ghostRed.rightImg = new Image();
ghostRed.leftImg = new Image();
ghostRed.rightImg.src = 'images/ghostRedRight.png';
ghostRed.leftImg.src = 'images/ghostRedLeft.png';
ghostRed.emptyCell = [0,0];
ghostRed.img = ghostRed.rightImg;
ghostRed.alive = true;
ghostRed.deathTimer = new Date();

var ghostBlue = new Object();
ghostBlue.rightImg = new Image();
ghostBlue.leftImg = new Image();
ghostBlue.rightImg.src = 'images/ghostBlueRight.png';
ghostBlue.leftImg.src = 'images/ghostBlueLeft.png';
ghostBlue.emptyCell = [19,9];
ghostBlue.img = ghostBlue.rightImg;
ghostBlue.alive = true;
ghostBlue.deathTimer = new Date();

var ghostOrange = new Object();
ghostOrange.rightImg = new Image();
ghostOrange.leftImg = new Image();
ghostOrange.rightImg.src = 'images/ghostOrangeRight.png'
ghostOrange.leftImg.src = 'images/ghostOrangeLeft.png'
ghostOrange.emptyCell = [19,0];
ghostOrange.img = ghostOrange.rightImg;
ghostOrange.alive = true;
ghostOrange.deathTimer = new Date();

var ghostPink = new Object();
ghostPink.rightImg = new Image();
ghostPink.leftImg = new Image();
ghostPink.rightImg.src = 'images/ghostPinkRight.png'
ghostPink.leftImg.src = 'images/ghostPinkLeft.png'
ghostPink.emptyCell = [0,9];
ghostPink.img = ghostPink.rightImg;
ghostPink.alive = true;
ghostPink.deathTimer = new Date();

mobTurn = false;

var ghosts = Array();
ghosts.push(ghostRed, ghostBlue, ghostOrange, ghostPink)

var boardMemory = {6:0, 7:0, 9:0, 8:0, 10:0, 11:0, 12:0};
var possibleMoves = Array();
var board;
var freeCells;
var lives;
var score;
var ballLeft;
var start_time;
var time_elapsed;
var time_remaining;
var interval;
var direction;
var startGameAudio = new Audio('sounds/startGame.wav');
var pacDeathAudio = new Audio('sounds/pacDeath.wav');
var pacMunchAudio = new Audio('sounds/pacMunch.wav');
var pacFruitAudio = new Audio('sounds/pacFruit.wav');
var frenzyAudio = new Audio('sounds/frenzy.mp3');
var eatGhostAudio = new Audio('sounds/eatGhost.wav');
var teleportAudio = new Audio('sounds/teleport.mp3');
var music = new Audio('sounds/Time.mp3');

//DOM Control
var currElement;
var timeStamp;

//Log In and Registration
var users = {};
var username;
var password;
var fullName;
var email;
var birthDate;

// var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//Configurations
var keyUp = 38;
var keyDown = 40;
var keyLeft = 37;
var keyRight = 39;
var color60Ball = 2;
var color30Ball = 1;
var color10Ball = 0;
var ballAmount = 60;
var gameTime = 300; 
var mobAmount = 2;


$(document).ready(function() {
	users["k"] = ["k", "K Mistirio", "K@kmail.kom", "1/1/90"];
	context = canvas.getContext("2d");
	currElement = $("#welcome");
	currElement.show();
});

async function InitiateGame() {
	board = new Array();
	freeCells = new Array();
	score = 0;
	pacman.color = "yellow";
	ballLeft = ballAmount;
	lives = 5;
	direction = 1;
	start_time = new Date();
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	time_remaining = Math.floor(gameTime - time_elapsed);
	for (var i = 0; i < 20; i++) {
		board[i] = new Array();
		for (var j = 0; j < 10; j++) {
			if (
				(i == 0 && j == 3) ||

				(i == 1 && j == 1) ||
				(i == 1 && j == 3) ||
				(i == 1 && (j >= 5 && j <= 8)) ||

				(i == 2 && j == 1) ||

				(i == 3 && (j >= 1 && j <= 4)) ||
				(i == 3 && j == 6) ||
				(i == 3 && j == 8) ||

				(i == 4 && j == 1) ||
				(i == 4 && j == 6) ||
				(i == 4 && j == 8) ||

				(i == 5 && j == 3) ||
				(i == 5 && j == 5) ||
				(i == 5 && j == 6) ||
				(i == 5 && j == 8) ||

				(i == 6 && j == 0) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 3) ||
				(i == 6 && j == 5) ||
				(i == 6 && j == 6) ||
				(i == 6 && j == 8) ||

				(i == 7 && j == 3) ||

				(i == 8 && (j >= 1 && j <= 3)) ||
				(i == 8 && j == 5) ||
				(i == 8 && (j >= 7 && j <= 9)) ||

				(i == 9 && j == 5) ||

				(i == 10 && (j >= 1 && j <= 3)) ||
				(i == 10 && (j >= 5 && j <= 8)) ||
				
				(i == 12 && j == 1) ||
				(i == 12 && j == 3) ||
				(i == 12 && j == 5) ||
				(i == 12 && j == 6) ||
				(i == 12 && j == 8) ||

				(i == 13 && j == 0) ||
				(i == 13 && j == 1) ||
				(i == 13 && j == 3) ||
				(i == 13 && j == 5) ||
				(i == 13 && j == 6) ||
				(i == 13 && j == 8) ||
				(i == 13 && j == 9) ||

				(i == 14 && j == 3) ||

				(i == 15 && j == 1) ||
				(i == 15 && j == 2) ||
				(i == 15 && j == 3) ||
				(i == 15 && j == 5) ||
				(i == 15 && j == 6) ||
				(i == 15 && j == 8) ||

				(i == 16 && j == 5) ||
				(i == 16 && j == 6) ||
				(i == 16 && j == 8) ||

				(i == 17 && j == 1) ||
				(i == 17 && j == 2) ||
				(i == 17 && j == 5) ||

				(i == 18 && j == 1) ||
				(i == 18 && j == 2) ||
				(i == 18 && j == 4) ||
				(i == 18 && j == 5) ||
				(i == 18 && j == 7) ||
				(i == 18 && j == 8) ||
				(i == 18 && j == 9)


			){
				board[i][j] = 5;
			} else {
				if (!((i == 0 && (j == 0 || j == 9)) || (i == 19 && (j == 0 || j == 9)))){
					freeCells.push([i,j])
				}
				board[i][j] = 0;
			}
		}
	}

	setPacman();
	setPrize();
	setLemon();
	for (let index = 0; index < mobAmount; index++) {
		setGhost(ghosts[index], index + 9);
	}
	//Set Balls
	while (freeCells.length > 0 && ballLeft > 0) {
		emptyCell = freeCells.splice(Math.floor(Math.random()*freeCells.length),1)[0];
		
		if(((ballAmount - ballLeft) * 1.0) / ballAmount < 0.6){
			board[emptyCell[0]][emptyCell[1]] = 2; //Common Ball
		}
		else if(((ballAmount - ballLeft) * 1.0) / ballAmount < 0.9){
			board[emptyCell[0]][emptyCell[1]] = 3; //Rare Ball
		}
		else{
			board[emptyCell[0]][emptyCell[1]] = 4; //Legendary Ball
		}
		ballLeft--;
	}

	ballLeft = ballAmount - ballLeft;
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	Draw();
	await waitForAudio(startGameAudio);
	if($("#game").is(":visible")){
		music.play();
		music.loop = true;
		start_time = new Date();
		teleport.timer = new Date();
		interval = setInterval(UpdatePosition, 250);
	}
}

//Utility
function countballs(){
	let count = 0;
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++) {
			if (board[i][j] >= 2 && board[i][j] <= 4){
				count ++;
			}
		}
	}
	return count;
}

function getFreeCells(){
	freeCells = new Array();
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++) {
			if (board[i][j] == 0){
				freeCells.push([i,j]);
			}
		}
	}
}

function clearFreeCells(){
	freeCells = new Array();
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++) {
			if (board[i][j] > 5 ){
				board[i][j] = boardMemory[board[i][j]];
				boardMemory[board[i][j]] = 0;
			}
		}
	}
}
			

async function restart(){
	clearFreeCells();
	getFreeCells();
	setPacman();
	setPrize();
	setLemon();
	for (let index = 0; index < mobAmount; index++) {
		setGhost(ghosts[index], index + 9);
	}
	Draw();
	await waitForAudio(startGameAudio);
	teleport.on = false;
	teleport.timer = new Date();
	interval = setInterval(UpdatePosition, 250);
}


function setPacman(){
	var emptyCell = freeCells.splice(Math.floor(Math.random()*freeCells.length),1)[0];
	board[emptyCell[0]][emptyCell[1]] = 1;
	pacman.i = emptyCell[0];
	pacman.j = emptyCell[1];
}

function setPrize(){
	emptyCell = freeCells.splice(Math.floor(Math.random()*freeCells.length),1)[0];
	board[emptyCell[0]][emptyCell[1]] = 6;
	boardMemory[6] = 0;
	prize.i = emptyCell[0];
	prize.j = emptyCell[1];
	prize.alive = true;
}

function setLemon(){
	emptyCell = freeCells.splice(Math.floor(Math.random()*freeCells.length),1)[0];
	board[emptyCell[0]][emptyCell[1]] = 7;
	boardMemory[7] = 0;
	lemon.i = emptyCell[0];
	lemon.j = emptyCell[1];
	lemon.alive = true;
}

function setGhost(mob, index){
	board[mob.emptyCell[0]][mob.emptyCell[1]] = index;
	boardMemory[index] = 0;
	mob.i = mob.emptyCell[0];
	mob.j = mob.emptyCell[1];
	mob.alive = true;
}


function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	timeLeft.value = time_remaining;
	ballNumber.value = ballLeft;
	livesLeft.value = lives;
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			switch(board[i][j]){
				//pacman
				case(1):{
					context.beginPath();
					context.arc(center.x, center.y, 30, (0.15 + 0.5*(direction - 1)) * Math.PI, (1.85 + 0.5*(direction - 1)) * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pacman.color; //color
					context.fill();
					context.beginPath();
					
					if(direction % 2 == 1){
						context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					}
					else{
						context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
					}

					context.fillStyle = "black"; //color
					context.fill();
				}
				break;
				//10 ball
				case(2):{
					context.beginPath();
					context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
					context.fillStyle = colors[color10Ball]; //color Common Ball
					context.fill();
				}
				break;
				//30 ball
				case(3):{
					context.beginPath();
					context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
					context.fillStyle = colors[color30Ball]; //color Rare Ball
					context.fill();
				}
				break;
				//60 ball
				case(4):{
					context.beginPath();
					context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
					context.fillStyle = colors[color60Ball]; //color Legendary Ball
					context.fill();
				}
				break;
				//wall
				case(5):{
					draWall(context, center.x - 30, center.y - 30, 60, 60, 15)
				}
				break;
				//prize
				case(6):{
					context.drawImage(prize.img, center.x - 30, center.y - 30, 60, 60);
				}
				break;
				//lemon
				case(7):{
					context.drawImage(lemon.img, center.x - 30, center.y - 30, 60, 60);
				}
				break;
				//teleport
				case(8):{
					context.drawImage(teleport.img, center.x - 30, center.y - 30, 60, 60);
				}
				break;
				//Red Ghost
				case(9):{
					context.drawImage(ghostRed.img, center.x - 30, center.y - 30, 60, 60);
				}
				break;
				//Blue Ghost
				case(10):{
					context.drawImage(ghostBlue.img, center.x - 30, center.y - 30, 60, 60);
				}
				break;
				//Orange Ghost
				case(11):{
					context.drawImage(ghostOrange.img, center.x - 30, center.y - 30, 60, 60);
				}
				break;
				//Pink Ghost
				case(12):{
					context.drawImage(ghostPink.img, center.x - 30, center.y - 30, 60, 60);
				}
				break;
			}
		}
	}
}

function draWall(ctx, x, y, width, height, radius) {
	ctx.beginPath();
	ctx.moveTo(x, y + radius);
	ctx.arcTo(x, y + height, x + radius, y + height, radius);
	ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
	ctx.arcTo(x + width, y, x + width - radius, y, radius);
	ctx.arcTo(x, y, x, y + radius, radius);
	context.fillStyle = "grey"; //color
	context.fill();
	ctx.stroke();
  }

function waitForAudio(audio){
	return new Promise(res=>{
		audio.play();
		audio.onended = res;
	})
}

async function UpdatePosition() {
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	time_remaining = Math.floor(gameTime - time_elapsed);
	ballLeft = Math.max(countballs(), ballLeft);
	board[pacman.i][pacman.j] = 0;
	handlePacMove();
	handlePacPosition(board[pacman.i][pacman.j]);

	//handle prize
	if(mobTurn == true){
		if(prize.alive){
			board[prize.i][prize.j] = boardMemory[6];
			handleFruitMove(prize);
			if (board[prize.i][prize.j] == 1){
				eatPrize();
			}
			else if(board[prize.i][prize.j] == 8){
				stopTeleport(prize, 6);
			}
			else{
				boardMemory[6] = board[prize.i][prize.j];
				board[prize.i][prize.j] = 6;
			}
		}
		else if((currentTime - prize.deathTimer) / 1000 >= 25){
			getFreeCells();
			setPrize();
		}
	}


	//handle lemon
	if(mobTurn == true){
		if(lemon.alive){
			board[lemon.i][lemon.j] = boardMemory[7];
			handleFruitMove(lemon);
			if (board[lemon.i][lemon.j] == 1){
				eatLemon();
			}
			else if(board[lemon.i][lemon.j] == 8){
				stopTeleport(lemon, 7);
			}
			else{
				boardMemory[7] = board[lemon.i][lemon.j];
				board[lemon.i][lemon.j] = 7;
			}
		}
		else if((currentTime - lemon.deathTimer) / 1000 >= 30){
			getFreeCells();
			setLemon();
		}
	}


	//handle ghosts
	for (let index = 0; index < mobAmount; index++) {
		var curr = ghosts[index];
		if (curr.alive){
			//if pacman reached ghost
			if(curr.i == pacman.i && curr.j == pacman.j){
				if(frenzy.on){
					eatGhostAudio.play();
					curr.alive = false;
					score += 10;
					handlePacPosition(boardMemory[9 + index]);
					curr.deathTimer = new Date();
				}
				else{
					board[curr.i][curr.j] = 9 + index;
					GameOver();
				}
			}
			//if ghost reached pacman
			else if(mobTurn == true){
				board[curr.i][curr.j] = boardMemory[9 + index];
				handleGhostMove(curr);
				if(curr.i == pacman.i && curr.j == pacman.j){
					if(frenzy.on){
						eatGhostAudio.play();
						curr.alive = false;
						score += 10;
						curr.deathTimer = new Date();
					}
					else{
						board[curr.i][curr.j] = 9 + index;
						GameOver();
					}
				}
				else if(board[curr.i][curr.j] == 8){
					stopTeleport(curr, 9 + index);
				}
				else{
					boardMemory[9 + index] = board[curr.i][curr.j] < 5 ? board[curr.i][curr.j] : 0;
					board[curr.i][curr.j] = 9 + index;
				}
			}
		}
		else if((currentTime - curr.deathTimer) / 1000 >= 8){
			setGhost(curr, 9 + index);
		}
	}
	mobTurn = !mobTurn;
	if(!teleport.on && (currentTime - teleport.timer) / 1000 >= 6){
		startTeleport();
	}
	else if(frenzy.on && (currentTime - frenzy.timer) / 1000 >= 11.5){
		stopFrenzy();
	}
	if (ballLeft == 0) {
		Draw();
		window.clearInterval(interval);
		$("#conclusiontitle").text("Winner!!!");
		conclude();
	}
	else if(time_remaining <= 0){
		Draw();
		if(score<100){
			$("#conclusiontitle").text("You can do better than " + score + " points");
		}
		else{
			$("#conclusiontitle").text("Winner!");
		}
		window.clearInterval(interval);
		conclude();
	}
	else {
		Draw();
	}
}

function handlePacMove(){
	var x = GetKeyPressed();
	switch(x){
		case(1):{
			direction = 4;
			if (pacman.j > 0 && board[pacman.i][pacman.j - 1] != 5) {
				pacman.j--;
			}
		}
		break;
		case(2):{
			direction = 2;
			if (pacman.j < 9 && board[pacman.i][pacman.j + 1] != 5) {
				pacman.j++;
			}
		}
		break;
		case(3):{
			direction = 3;
			if (pacman.i > 0 && board[pacman.i - 1][pacman.j] != 5) {
				pacman.i--;
			}
		}
		break;
		case(4):{
			direction = 1;
			if (pacman.i < 19 && board[pacman.i + 1][pacman.j] != 5) {
				pacman.i++;
			}
		}
		break;
	}
}

function GetKeyPressed() {
	//Up - default 38
	if (keysDown[keyUp]) {
		return 1;
	}
	//Down - default 40
	if (keysDown[keyDown]) {
		return 2;
	}
	//Left - default 37
	if (keysDown[keyLeft]) {
		return 3;
	}
	//Right - default 39
	if (keysDown[keyRight]) {
		return 4;
	}
}

function handlePacPosition(num){
	switch(num){
		case(2):{
			pacMunchAudio.play();
			score += 5;
			ballLeft--;
		}
		break;
		case(3):{
			pacMunchAudio.play();
			score += 15;
			ballLeft--;
		}
		break;
		case(4):{
			pacMunchAudio.play();
			score += 25;
			ballLeft--;
		}
		break;
		case(6):{
			eatPrize();
			handlePacPosition(boardMemory[6]);
			boardMemory[6] = 0;
		}
		break;
		case(7):{
			eatLemon();
			handlePacPosition(boardMemory[7]);
			boardMemory[7] = 0;
		}
		break;
		case(8):{
			stopTeleport(pacman, 1);
		}
		break;
	}
	board[pacman.i][pacman.j] = 1;
}

function getPossibleMoves(i, j){
	possibleMoves = Array();
	if (j > 0 && (board[i][j - 1] < 5 || board[i][j - 1] == 8)) {
		possibleMoves.push([0,-1]);
	}
	if (j < 9 && (board[i][j + 1] < 5 || board[i][j + 1] == 8)) {
		possibleMoves.push([0,1]);
	}
	if (i > 0 && (board[i - 1][j] < 5 || board[i - 1][j] == 8)) {
		possibleMoves.push([-1,0]);
	}
	if (i < 19 && (board[i + 1][j] < 5 || board[i + 1][j] == 8)) {
		possibleMoves.push([1,0]);
	}

}

function handleFruitMove(fruit){
	getPossibleMoves(fruit.i, fruit.j);
	if(possibleMoves.length > 0){
		x = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];
		if(x[1] == -1){
			fruit.j--;
		}
		else if(x[1] == 1){
			fruit.j++;
		}
		else if(x[0] == -1){
			fruit.i--;
		}
		else{
			fruit.i++;
		}
	}
}

function startFrenzy(){
	frenzy.on = true;
	pacman.color = "red";
	frenzy.timer = new Date();
	music.pause();
	frenzyAudio.play();

}

function stopFrenzy(){
	frenzy.on = false;
	pacman.color = "yellow";
	frenzyAudio.pause();
	music.play();
}

function eatPrize(){
	pacFruitAudio.load();
	pacFruitAudio.play();
	prize.alive = false;
	prize.deathTimer = new Date();
	score += 50;
}

function eatLemon(){
	pacFruitAudio.load();
	pacFruitAudio.play();
	lemon.alive = false;
	lemon.deathTimer = new Date();
	startFrenzy();
}

function startTeleport(){
	getFreeCells();
	emptyCell = freeCells.splice(Math.floor(Math.random()*freeCells.length),1)[0];
	teleport.i1 = emptyCell[0];
	teleport.j1 = emptyCell[1];
	emptyCell = freeCells.splice(Math.floor(Math.random()*freeCells.length),1)[0];
	teleport.i2 = emptyCell[0];
	teleport.j2 = emptyCell[1];
	board[teleport.i1][teleport.j1] = 8;
	board[teleport.i2][teleport.j2] = 8;
	teleport.on = true;
	teleport.timer = new Date();
}

function stopTeleport(mob, num){
	teleportAudio.play();
	teleport.on = false;
	if(teleport.i1 == mob.i && teleport.j1 == mob.j){
		board[teleport.i1][teleport.j1] = 0;
		board[teleport.i2][teleport.j2] = num;
		mob.i = teleport.i2;
		mob.j = teleport.j2;
	}
	else{
		board[teleport.i1][teleport.j1] = num;
		board[teleport.i2][teleport.j2] = 0;
		mob.i = teleport.i1;
		mob.j = teleport.j1;
	}
	teleport.timer = new Date();
}

function handleGhostMove(ghost){
	var a, b, disP, disV;
	getPossibleMoves(ghost.i, ghost.j);
	if(possibleMoves.length > 0){
		x = possibleMoves.reduce(function (p, v) {
			a = Math.abs(ghost.i + p[0] - pacman.i);
			b = Math.abs(ghost.j + p[1] - pacman.j);
			disP = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
			a = Math.abs(ghost.i + v[0] - pacman.i);
			b = Math.abs(ghost.j + v[1] - pacman.j);
			disV = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));

			return frenzy.on ? ( disP > disV ? p : v ) : ( disP < disV ? p : v );
		  });
		  moveMob(ghost, x);
	}
}

function moveMob(mob, x){
	if(x[1] == -1){
		mob.j--;
	}
	else if(x[1] == 1){
		mob.j++;
	}
	else if(x[0] == -1){
		mob.i--;
		mob.img = mob.leftImg;
	}
	else{
		mob.i++;
		mob.img = mob.rightImg;
	}
}

async function GameOver(){
	lives--;
	score -= 10;
	window.clearInterval(interval);
	await waitForAudio(pacDeathAudio);
	if(lives <= 0){
		Draw();
		$("#conclusiontitle").text("Loser!");
		conclude();
	}
	else{
		restart();
	}
}

function conclude(){
	$("#concludeScore").val(score);
	$("#concludeTime").val(time_elapsed);
	$("#concludeBallsLeft").val(ballLeft);
	frenzyAudio.load();
	music.pause();
	music.load();
	openConclude();
}

function showWelcome() {
	if (interval != null){
		window.clearInterval(interval);
		music.load();
		frenzyAudio.load();
	}
	currElement.hide();
	currElement = $("#welcome");
	currElement.show();
}

function showRegistration() {
	if (interval != null){
		window.clearInterval(interval);
		music.load();
		frenzyAudio.load();
	}
	currElement.hide();
	currElement = $("#register");
	currElement.show();
}

function register(){

	username = $("#regUsername").val();
	password = $("#regPassword").val();
	fullName = $("#regFullName").val();
	email = $("#regEmail").val();
	birthDate = $("#refBirthDate").val();
	if(username == '' || password == '' || fullName == '' || email == '' || birthDate == ''){
		return;
	}
	else if(username in users){
		return;
	}
	else if(password.length < 6 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)){
		return;
	}
	else if(/\d/.test(fullName)){
		return;
	}
	else if(!/^[\w-\.]+@[a-zA-Z\d]+/.test(email)){
		return;
	}
	else{
		users[username] = [password, fullName, email, birthDate];
		alert("User succesfully created");
		showLogIn();
	}
}

$(document).ready(function() {
	$( "#refBirthDate" ).datepicker({ dateFormat: 'dd-mm-yy' });
	$.validator.addMethod('validPassword', 
	function(value, element) {
        return this.optional(element) || (value.match(/[a-zA-Z]/) && value.match(/\d/));
    },
    'Password must contain at least one numeric and one alphabetic character.');

	$.validator.addMethod('validName', 
	function(value, element) {
        return this.optional(element) || (value.match(/[a-zA-Z]/) && !value.match(/\d/));
    },
    'Full name must contain only alphabetic character.');

	$("#registerForm").validate({
		errorClass: 'errors',
		rules : {
			regUsername: {
				required : true,
				minlength : 2
			},
			regPassword: {
				required : true,
				minlength : 6,	
				validPassword: true
			},
			regFullName : {
				required : true,
				validName: true
			},
			regEmail : {
				required : true,
				email : true
			},
			refBirthDate: {
				required : true,
			}
		},
		// massages : {
		// 	regUsername: {
		// 		required : "user name field cannot be empty",
		// 		minlength : "Your user name must be consist of at least 2 characters"
		// 	},
		// 	regPassword: {
		// 		required : "password field cannot be empty",
		// 		minlength : "Your password must be consist of at least 6 characters"
		// 	},
		// 	regFullName: {
		// 		required : "name field cannot be empty"
		// 	},
		// 	regEmail: {
		// 		required : "email field cannot be empty"
		// 	},
		// 	refBirthDate: {
		// 		required : "birth date field cannot be empty"
		// 	}
		// },
	});



});

function showLogIn() {
	if (interval != null){
		window.clearInterval(interval);
		music.load();
		frenzyAudio.load();
	}
	currElement.hide();
	currElement = $("#login");
	currElement.show();
	
}

function login(){
	window.clearInterval(interval);
	username = $("#logUsername").val();
	password = $("#logPassword").val();
	if(username == '' || password == ''){
		alert("Please enter all fields");
	}
	else if(users[username] == null || users[username][0] != password){
		alert("Invalid Username or Password");
	}
	else{
		fullName = users[username][1];
		email = users[username][2];
		birthDate = users[username][3];
		showConfig();
	}
}

function showConfig(){
	color60Ball = 0;
	color30Ball= 1;
	color10Ball = 2;
	$("#color60Ball").css("backgroundColor", colors[color60Ball]);
	$("#color30Ball").css("backgroundColor", colors[color30Ball]);
	$("#color10Ball").css("backgroundColor", colors[color10Ball]);

	$("#changeKeyUp").val(keyboardMap[keyUp]);
	$("#changeKeyDown").val(keyboardMap[keyDown]);
	$("#changeKeyLeft").val(keyboardMap[keyLeft]);
	$("#changeKeyRight").val(keyboardMap[keyRight]);

	currElement.hide();
	currElement = $("#config");
	currElement.show();
}

function enforceMinMax(element){
	if(element.value != ""){
		if(parseInt(element.value) < parseInt(element.min)){
			element.value = element.min;
		}
		if(parseInt(element.value) > parseInt(element.max)){
			element.value = element.max;
		}
	}
}

function changeKeyUp(){
	addEventListener(
		"keydown",
		function(e) {
		keyUp = e.keyCode;
		$("#changeKeyUp").val(keyboardMap[keyUp]);
		$("#InfoKeyUp").val(keyboardMap[keyUp]);
		},
		{once : true}
	);
}

function changeKeyDown(){
	addEventListener(
		"keydown",
		function(e) {
		keyDown = e.keyCode;
		$("#changeKeyDown").val(keyboardMap[keyDown]);
		$("#InfoKeyDown").val(keyboardMap[keyDown]);
		},
		{once : true}
	);
}

function changeKeyLeft(){
	addEventListener(
		"keydown",
		function(e) {
		keyLeft = e.keyCode;
		$("#changeKeyLeft").val(keyboardMap[keyLeft]); 
		$("#InfoKeyLeft").val(keyboardMap[keyLeft]);
		},
		{once : true}
	);
}

function changeKeyRight(){
	addEventListener(
		"keydown",
		function(e) {
		keyRight = e.keyCode;
		$("#changeKeyRight").val(keyboardMap[keyRight]);
		$("#InfoKeyRight").val(keyboardMap[keyRight]);
		},
		{once : true}
	);
}

function changeColor60(){
	if(color60Ball > 6){
		color60Ball = 0;
	}
	else{
		color60Ball ++;
	}
	updateColor60();
}

function updateColor60(){
	$("#color60Ball").css("backgroundColor", colors[color60Ball]);
	$("#Infocolor60Ball").css("backgroundColor", colors[color60Ball]);
	if(color60Ball == 7 || color60Ball == 4){
		$("#color60Ball").css("color", "white");
		$("#Infocolor60Ball").css("color", "white");
	}
	else{
		$("#color60Ball").css("color", "black");
		$("#Infocolor60Ball").css("color", "black");
	}
}

function changeColor30(){
	if(color30Ball > 6){
		color30Ball = 0;
	}
	else{
		color30Ball ++;
	}
	updateColor30();
}

function updateColor30(){
	$("#color30Ball").css("backgroundColor", colors[color30Ball]);
	$("#Infocolor30Ball").css("backgroundColor", colors[color30Ball]);
	if(color30Ball == 7 || color30Ball == 4){
		$("#color30Ball").css("color", "white");
		$("#Infocolor30Ball").css("color", "white");
	}
	else{
		$("#color30Ball").css("color", "black");
		$("#Infocolor30Ball").css("color", "black");
	}
}

function changeColor10(){
	if(color10Ball > 6){
		color10Ball = 0;
	}
	else{
		color10Ball ++;
	}
	updateColor10();
}

function updateColor10(){
	$("#color10Ball").css("backgroundColor", colors[color10Ball]);
	$("#Infocolor10Ball").css("backgroundColor", colors[color10Ball]);
	if(color10Ball == 7 || color10Ball == 4){
		$("#color10Ball").css("color", "white");
		$("#Infocolor10Ball").css("color", "white");
	}
	else{
		$("#color10Ball").css("color", "black");
		$("#Infocolor10Ball").css("color", "black");
	}
}

function RandomConfig(){
	$("#ballAmount").val(Math.floor(Math.random() * 41) + 50);
	$("#gameTime").val(Math.floor(Math.random() * 3541) + 60);
	$("#mobAmount").val(Math.floor(Math.random() * 4) + 1);
	color60Ball = Math.floor(Math.random() * 8) - 1;
	changeColor60();
	color30Ball = Math.floor(Math.random() * 8) - 1;
	changeColor30();
	color10Ball = Math.floor(Math.random() * 8) - 1;
	changeColor10();

}


function saveConfig(){
	ballAmount = $("#ballAmount").val();
	gameTime = $("#gameTime").val();
	mobAmount = $("#mobAmount").val();

	$("#InfoballAmount").val(ballAmount);
	$("#InfogameTime").val(gameTime);
	$("#InfomobAmount").val(mobAmount);
	updateColor60();
	updateColor30();
	updateColor10();
	showGame();
}


function backDoor(){
	username = 'k';
	password = 'k'
	fullName = users[username][1];
	email = users[username][2];
	birthDate = users[username][3];

	showGame();
}

function showGame(){
	currElement.hide()
	currElement = $("#game");
	currElement.show();

	$("#fullName").text(users[username][1]);

	InitiateGame();
}

function openAbout() {
	var modal = document.getElementById("About");
	var span = document.getElementsByClassName("close")[0];
	modal.style.display = "block";
	span.onclick = function() {
		modal.style.display = "none";
	  }
	  window.onclick = function(event) {
		if (event.target == modal) {
		  modal.style.display = "none";
		}
	  }
	  $(document).keydown(function(event) { 
		if (event.keyCode == 27) { 
			modal.style.display="none";
		}
	  });
}

function openConclude() {
	document.getElementById("conclude").showModal();
}

function closeConclude() {
	document.getElementById("conclude").close();
}

function tryAgain(){
	document.getElementById("conclude").close();
	showConfig();
}

var colors = [
	"white",
	"red",
	"yellow",
	"orange",
	"blue",
	"green",
	"brown",
	"black"	
]

var keyboardMap = [
	"", // [0]
	"", // [1]
	"", // [2]
	"CANCEL", // [3]
	"", // [4]
	"", // [5]
	"HELP", // [6]
	"", // [7]
	"BACK_SPACE", // [8]
	"TAB", // [9]
	"", // [10]
	"", // [11]
	"CLEAR", // [12]
	"ENTER", // [13]
	"ENTER_SPECIAL", // [14]
	"", // [15]
	"SHIFT", // [16]
	"CONTROL", // [17]
	"ALT", // [18]
	"PAUSE", // [19]
	"CAPS_LOCK", // [20]
	"KANA", // [21]
	"EISU", // [22]
	"JUNJA", // [23]
	"FINAL", // [24]
	"HANJA", // [25]
	"", // [26]
	"ESCAPE", // [27]
	"CONVERT", // [28]
	"NONCONVERT", // [29]
	"ACCEPT", // [30]
	"MODECHANGE", // [31]
	"SPACE", // [32]
	"PAGE_UP", // [33]
	"PAGE_DOWN", // [34]
	"END", // [35]
	"HOME", // [36]
	"LEFT", // [37]
	"UP", // [38]
	"RIGHT", // [39]
	"DOWN", // [40]
	"SELECT", // [41]
	"PRINT", // [42]
	"EXECUTE", // [43]
	"PRINTSCREEN", // [44]
	"INSERT", // [45]
	"DELETE", // [46]
	"", // [47]
	"0", // [48]
	"1", // [49]
	"2", // [50]
	"3", // [51]
	"4", // [52]
	"5", // [53]
	"6", // [54]
	"7", // [55]
	"8", // [56]
	"9", // [57]
	"COLON", // [58]
	"SEMICOLON", // [59]
	"LESS_THAN", // [60]
	"EQUALS", // [61]
	"GREATER_THAN", // [62]
	"QUESTION_MARK", // [63]
	"AT", // [64]
	"A", // [65]
	"B", // [66]
	"C", // [67]
	"D", // [68]
	"E", // [69]
	"F", // [70]
	"G", // [71]
	"H", // [72]
	"I", // [73]
	"J", // [74]
	"K", // [75]
	"L", // [76]
	"M", // [77]
	"N", // [78]
	"O", // [79]
	"P", // [80]
	"Q", // [81]
	"R", // [82]
	"S", // [83]
	"T", // [84]
	"U", // [85]
	"V", // [86]
	"W", // [87]
	"X", // [88]
	"Y", // [89]
	"Z", // [90]
	"OS_KEY", // [91] Windows Key (Windows) or Command Key (Mac)
	"", // [92]
	"CONTEXT_MENU", // [93]
	"", // [94]
	"SLEEP", // [95]
	"NUMPAD0", // [96]
	"NUMPAD1", // [97]
	"NUMPAD2", // [98]
	"NUMPAD3", // [99]
	"NUMPAD4", // [100]
	"NUMPAD5", // [101]
	"NUMPAD6", // [102]
	"NUMPAD7", // [103]
	"NUMPAD8", // [104]
	"NUMPAD9", // [105]
	"MULTIPLY", // [106]
	"ADD", // [107]
	"SEPARATOR", // [108]
	"SUBTRACT", // [109]
	"DECIMAL", // [110]
	"DIVIDE", // [111]
	"F1", // [112]
	"F2", // [113]
	"F3", // [114]
	"F4", // [115]
	"F5", // [116]
	"F6", // [117]
	"F7", // [118]
	"F8", // [119]
	"F9", // [120]
	"F10", // [121]
	"F11", // [122]
	"F12", // [123]
	"F13", // [124]
	"F14", // [125]
	"F15", // [126]
	"F16", // [127]
	"F17", // [128]
	"F18", // [129]
	"F19", // [130]
	"F20", // [131]
	"F21", // [132]
	"F22", // [133]
	"F23", // [134]
	"F24", // [135]
	"", // [136]
	"", // [137]
	"", // [138]
	"", // [139]
	"", // [140]
	"", // [141]
	"", // [142]
	"", // [143]
	"NUM_LOCK", // [144]
	"SCROLL_LOCK", // [145]
	"WIN_OEM_FJ_JISHO", // [146]
	"WIN_OEM_FJ_MASSHOU", // [147]
	"WIN_OEM_FJ_TOUROKU", // [148]
	"WIN_OEM_FJ_LOYA", // [149]
	"WIN_OEM_FJ_ROYA", // [150]
	"", // [151]
	"", // [152]
	"", // [153]
	"", // [154]
	"", // [155]
	"", // [156]
	"", // [157]
	"", // [158]
	"", // [159]
	"CIRCUMFLEX", // [160]
	"EXCLAMATION", // [161]
	"DOUBLE_QUOTE", // [162]
	"HASH", // [163]
	"DOLLAR", // [164]
	"PERCENT", // [165]
	"AMPERSAND", // [166]
	"UNDERSCORE", // [167]
	"OPEN_PAREN", // [168]
	"CLOSE_PAREN", // [169]
	"ASTERISK", // [170]
	"PLUS", // [171]
	"PIPE", // [172]
	"HYPHEN_MINUS", // [173]
	"OPEN_CURLY_BRACKET", // [174]
	"CLOSE_CURLY_BRACKET", // [175]
	"TILDE", // [176]
	"", // [177]
	"", // [178]
	"", // [179]
	"", // [180]
	"VOLUME_MUTE", // [181]
	"VOLUME_DOWN", // [182]
	"VOLUME_UP", // [183]
	"", // [184]
	"", // [185]
	"SEMICOLON", // [186]
	"EQUALS", // [187]
	"COMMA", // [188]
	"MINUS", // [189]
	"PERIOD", // [190]
	"SLASH", // [191]
	"BACK_QUOTE", // [192]
	"", // [193]
	"", // [194]
	"", // [195]
	"", // [196]
	"", // [197]
	"", // [198]
	"", // [199]
	"", // [200]
	"", // [201]
	"", // [202]
	"", // [203]
	"", // [204]
	"", // [205]
	"", // [206]
	"", // [207]
	"", // [208]
	"", // [209]
	"", // [210]
	"", // [211]
	"", // [212]
	"", // [213]
	"", // [214]
	"", // [215]
	"", // [216]
	"", // [217]
	"", // [218]
	"OPEN_BRACKET", // [219]
	"BACK_SLASH", // [220]
	"CLOSE_BRACKET", // [221]
	"QUOTE", // [222]
	"", // [223]
	"META", // [224]
	"ALTGR", // [225]
	"", // [226]
	"WIN_ICO_HELP", // [227]
	"WIN_ICO_00", // [228]
	"", // [229]
	"WIN_ICO_CLEAR", // [230]
	"", // [231]
	"", // [232]
	"WIN_OEM_RESET", // [233]
	"WIN_OEM_JUMP", // [234]
	"WIN_OEM_PA1", // [235]
	"WIN_OEM_PA2", // [236]
	"WIN_OEM_PA3", // [237]
	"WIN_OEM_WSCTRL", // [238]
	"WIN_OEM_CUSEL", // [239]
	"WIN_OEM_ATTN", // [240]
	"WIN_OEM_FINISH", // [241]
	"WIN_OEM_COPY", // [242]
	"WIN_OEM_AUTO", // [243]
	"WIN_OEM_ENLW", // [244]
	"WIN_OEM_BACKTAB", // [245]
	"ATTN", // [246]
	"CRSEL", // [247]
	"EXSEL", // [248]
	"EREOF", // [249]
	"PLAY", // [250]
	"ZOOM", // [251]
	"", // [252]
	"PA1", // [253]
	"WIN_OEM_CLEAR", // [254]
	"" // [255]
  ];