var context;

//Game Board
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var time_remaining;
var interval;
var direction;

//DOM Control
var currElement;

//Log In and Registration
var users = {};
var username;
var password;
var fullName;
var email;
var birthDate;
var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
	currElement = document.getElementById("welcome");
	currElement.style.display = "block";
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var food_remain = ballAmount;
	direction = 1;
	start_time = new Date();
	var freeCells = [];
	for (var i = 0; i < 20; i++) {
		board[i] = new Array();
		for (var j = 0; j < 10; j++) {
			if (
				(i == 1 && j == 1) ||
				(i == 1 && j == 2) ||
				(i == 1 && j == 3) ||
				(i == 1 && j == 4) ||
				(i == 1 && j == 6) ||
				(i == 1 && j == 7) ||
				(i == 1 && j == 8) ||
				(i == 3 && j == 1) ||
				(i == 3 && j == 2) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 3 && j == 6) ||
				(i == 3 && j == 7) ||
				(i == 3 && j == 8) ||
				(i == 5 && j == 1) ||
				(i == 5 && j == 2) ||
				(i == 5 && j == 3) ||
				(i == 5 && j == 4) ||
				(i == 5 && j == 5) ||
				(i == 5 && j == 6) ||
				(i == 5 && j == 7) ||
				(i == 5 && j == 9) ||
				(i == 6 && j == 2) ||
				(i == 7 && j == 2) ||
				(i == 8 && j == 2) ||
				(i == 7 && j == 4) ||
				(i == 8 && j == 4) ||
				(i == 9 && j == 4) ||
				(i == 7 && j == 6) ||
				(i == 8 && j == 6) ||
				(i == 8 && j == 7) ||
				(i == 8 && j == 8) ||
				(i == 7 && j == 8) ||

				(i == 11 && j == 1) ||
				(i == 11 && j == 2) ||
				(i == 11 && j == 3) ||
				(i == 11 && j == 4) ||
				(i == 11 && j == 6) ||
				(i == 11 && j == 7) ||
				(i == 11 && j == 8) ||

				(i == 13 && j == 1) ||
				(i == 13 && j == 2) ||
				(i == 13 && j == 4) ||
				(i == 13 && j == 5) ||
				(i == 13 && j == 6) ||
				(i == 13 && j == 7) ||
				(i == 13 && j == 8) ||

				(i == 15 && j == 1) ||
				(i == 15 && j == 2) ||
				(i == 15 && j == 3) ||
				(i == 15 && j == 4) ||
				(i == 15 && j == 5) ||
				(i == 15 && j == 6) ||
				(i == 15 && j == 7) ||
				(i == 15 && j == 9) ||

				(i == 16 && j == 2) ||
				(i == 17 && j == 2) ||
				(i == 18 && j == 2) ||

				(i == 17 && j == 4) ||
				(i == 18 && j == 4) ||
				(i == 19 && j == 4) ||
				(i == 17 && j == 6) ||
				(i == 18 && j == 6) ||
				(i == 18 && j == 7) ||
				(i == 18 && j == 8) ||
				(i == 17 && j == 8)


				
			) {
				board[i][j] = 5;
			} else {
				freeCells.push([i,j])
				board[i][j] = 0;
			}
		}
	}

	//Set Pacman
	var emptyCell = freeCells[Math.floor(Math.random()*freeCells.length)]; 
	freeCells.splice(freeCells.indexOf(emptyCell),1);
	board[emptyCell[0]][emptyCell[1]] = 1;
	shape.i = emptyCell[0];
	shape.j = emptyCell[1];

	//Set Balls
	while (freeCells.length > 0 && food_remain > 0) {
		emptyCell = freeCells[Math.floor(Math.random()*freeCells.length)];
		freeCells.splice(freeCells.indexOf(emptyCell),1);
		if(((ballAmount - food_remain) * 1.0) / ballAmount < 0.6){
			board[emptyCell[0]][emptyCell[1]] = 2; //Common Ball
		}
		else if(((ballAmount - food_remain) * 1.0) / ballAmount < 0.9){
			board[emptyCell[0]][emptyCell[1]] = 3; //Rare Ball
		}
		else{
			board[emptyCell[0]][emptyCell[1]] = 4; //Legendary Ball
		}
		food_remain--;
	}

	ballAmount = ballAmount - food_remain;
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
	interval = setInterval(UpdatePosition, 250);
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

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	timeLeft.value = time_remaining;
	ballNumber.value = ballAmount;
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
					context.fillStyle = pac_color; //color
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
					context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
					context.fillStyle = colors[color10Ball]; //color Common Ball
					context.fill();
				}
				break;
				//30 ball
				case(3):{
					context.beginPath();
					context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
					context.fillStyle = colors[color30Ball]; //color Rare Ball
					context.fill();
				}
				break;
				//60 ball
				case(4):{
					context.beginPath();
					context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
					context.fillStyle = colors[color60Ball]; //color Legendary Ball
					context.fill();
				}
				break;
				//wall
				case(5):{
					context.beginPath();
					context.rect(center.x - 30, center.y - 30, 60, 60);
					context.fillStyle = "grey"; //color
					context.fill();
				}
				break;
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	switch(x){
		case(1):{
			direction = 4;
			if (shape.j > 0 && board[shape.i][shape.j - 1] != 5) {
				shape.j--;
			}
		}
		break;
		case(2):{
			direction = 2;
			if (shape.j < 9 && board[shape.i][shape.j + 1] != 5) {
				shape.j++;
			}
		}
		break;
		case(3):{
			direction = 3;
			if (shape.i > 0 && board[shape.i - 1][shape.j] != 5) {
				shape.i--;
			}
		}
		break;
		case(4):{
			direction = 1;
			if (shape.i < 19 && board[shape.i + 1][shape.j] != 5) {
				shape.i++;
			}
		}
		break;
	}
	if (board[shape.i][shape.j] == 2) {
		score += 5;
		ballAmount--;
	}
	else if (board[shape.i][shape.j] == 3) {
		score += 15;
		ballAmount--;
	}
	else if (board[shape.i][shape.j] == 4){
		score += 25;
		ballAmount--;
	}
	board[shape.i][shape.j] = 1;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	time_remaining = Math.floor(gameTime - time_elapsed);
	if (ballAmount == 0) {
		window.clearInterval(interval);
		window.alert("Game Completed");
	}
	else if(time_remaining <= 0){
		window.clearInterval(interval);
		window.alert("Game Over");
	}
	else {
		Draw();
	}


}

function showWelcome() {
	currElement.style.display = "none";
	currElement = document.getElementById("welcome");
	currElement.style.display = "block";
}

function showRegistration() {
	currElement.style.display = "none";
	currElement = document.getElementById("register");
	currElement.style.display = "block";
}

function register(){
	username = document.getElementById("regUsername").value;
	password = document.getElementById("regPassword").value;
	fullName = document.getElementById("regFullName").value;
	email = document.getElementById("regEmail").value;
	birthDate = document.getElementById("refBirthDate").value;

	if(username == '' || password == '' || fullName == '' || email == '' || birthDate == ''){
		alert("Please enter all fields");
	}
	else if(users[username] != null){
		alert("Username already exists");
	}
	else if(password.length < 6 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)){
		alert("Password must be 6 characterslong and contain both numbers and letters");
	}
	else if(/\d/.test(fullName)){
		alert("Name cannot contain numbers");
	}
	else if(!emailRegex.test(email)){
		alert("Invalid email address");
	}
	else{
		users[username] = [password, fullName, email, birthDate];
		alert("User succesfully created");
		showLogIn();
	}
}

$(document).ready(function() {
						  
	$(function() {
		$( "#refBirthDate" ).datepicker();
	});
})

function showLogIn() {
	currElement.style.display = "none";
	currElement = document.getElementById("login");
	currElement.style.display = "block";
}

function login(){
	username = document.getElementById("logUsername").value;
	password = document.getElementById("logPassword").value;
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
	document.getElementById("color60Ball").style.backgroundColor = colors[color60Ball];
	document.getElementById("color30Ball").style.backgroundColor = colors[color30Ball];
	document.getElementById("color10Ball").style.backgroundColor = colors[color10Ball];


	document.getElementById("changeKeyUp").value = keyboardMap[keyUp];
	document.getElementById("changeKeyDown").value = keyboardMap[keyDown];
	document.getElementById("changeKeyLeft").value = keyboardMap[keyLeft];
	document.getElementById("changeKeyRight").value = keyboardMap[keyRight];

	currElement.style.display = "none";
	currElement = document.getElementById("config");
	currElement.style.display = "block";


}

function changeKeyUp(){
	addEventListener(
		"keydown",
		function(e) {
		keyUp = e.keyCode;
		document.getElementById("changeKeyUp").value = keyboardMap[keyUp];
		document.getElementById("InfoKeyUp").value = keyboardMap[keyUp];
		},
		{once : true}
	);
}

function changeKeyDown(){
	addEventListener(
		"keydown",
		function(e) {
		keyDown = e.keyCode;
		document.getElementById("changeKeyDown").value = keyboardMap[keyDown];
		document.getElementById("InfoKeyDown").value = keyboardMap[keyDown];
		},
		{once : true}
	);
}

function changeKeyLeft(){
	addEventListener(
		"keydown",
		function(e) {
		keyLeft = e.keyCode;
		document.getElementById("changeKeyLeft").value = keyboardMap[keyLeft];
		document.getElementById("InfoKeyLeft").value = keyboardMap[keyLeft];
		},
		{once : true}
	);
}

function changeKeyRight(){
	addEventListener(
		"keydown",
		function(e) {
		keyRight = e.keyCode;
		document.getElementById("changeKeyRight").value = keyboardMap[keyRight];
		document.getElementById("InfoKeyRight").value = keyboardMap[keyRight];
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
	document.getElementById("color60Ball").style.backgroundColor = colors[color60Ball];
	document.getElementById("Infocolor60Ball").style.backgroundColor = colors[color60Ball];
	if(color60Ball == 7 || color60Ball == 4){
		document.getElementById("color60Ball").style.color = "white";
		document.getElementById("Infocolor60Ball").style.color = "white";
	}
	else{
		document.getElementById("color60Ball").style.color = "black";
		document.getElementById("Infocolor60Ball").style.color = "black";
	}

}

function changeColor30(){
	if(color30Ball > 6){
		color30Ball = 0;
	}
	else{
		color30Ball ++;
	}
	document.getElementById("color30Ball").style.backgroundColor = colors[color30Ball];
	document.getElementById("Infocolor30Ball").style.backgroundColor = colors[color30Ball];
	if(color30Ball == 7 || color30Ball == 4){
		document.getElementById("color30Ball").style.color = "white";
		document.getElementById("Infocolor30Ball").style.color = "white";
	}
	else{
		document.getElementById("color30Ball").style.color = "black";
		document.getElementById("Infocolor30Ball").style.color = "white";
	}
}

function changeColor10(){
	if(color10Ball > 6){
		color10Ball = 0;
	}
	else{
		color10Ball ++;
	}
	document.getElementById("color10Ball").style.backgroundColor = colors[color10Ball];
	document.getElementById("Infocolor10Ball").style.backgroundColor = colors[color10Ball];
	if(color10Ball == 7 || color10Ball == 4){
		document.getElementById("Infocolor10Ball").style.color = "white";
		document.getElementById("Infocolor10Ball").style.color = "white";
	}
	else{
		document.getElementById("color10Ball").style.color = "black";
		document.getElementById("Infocolor10Ball").style.color = "black";
	}
}

function RandomConfig(){
	document.getElementById("ballAmount").value = Math.floor(Math.random() * 41) + 50;
	document.getElementById("gameTime").value = Math.floor(Math.random() * 3541) + 60;
	document.getElementById("mobAmount").value = Math.floor(Math.random() * 4) + 1;
	color60Ball = Math.floor(Math.random() * 8) - 1;
	changeColor60();
	color30Ball = Math.floor(Math.random() * 8) - 1;
	changeColor30();
	color10Ball = Math.floor(Math.random() * 8) - 1;
	changeColor10();

}


function saveConfig(){
	ballAmount = document.getElementById("ballAmount").value;
	gameTime = document.getElementById("gameTime").value;
	mobAmount = document.getElementById("mobAmount").value;

	document.getElementById("InfoballAmount").value = ballAmount;
	document.getElementById("InfogameTime").value = gameTime;
	document.getElementById("InfomobAmount").value = mobAmount;

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
	currElement.style.display = "none";
	currElement = document.getElementById("game");
	currElement.style.display = "block";

	document.getElementById("fullName").textContent = users[username][1];

	Start();
}



function openAbout() {
	document.getElementById("About").showModal();
}

function closeAbout() {
	document.getElementById("About").close();
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