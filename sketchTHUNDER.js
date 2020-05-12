

var bg;

var drums;
var drum_amp;
var fade_timer;
var pstrike;

var light1;
var light2;
var l_img;
var posl
var beat;

function preload(){
	bg = loadImage("assets/bg.png");
	drums = loadSound("assets/drum.mp3");
}

function setup(){
	createCanvas(1000, 800);
	drum_amp = new p5.Amplitude();
	drum_amp.setInput(drums);
	fade_timer = 30;
	pstrike = false;

	init_thunder();
	drums.play();
}

function draw(){
	image(bg, 0, 0);
	thunder();
}


function thunder(){
	if(!drums.isPlaying()){
		drums.play();
	}

	let vol = drum_amp.getLevel();
	//let strike = (frameCount % beat == 0);//checks if (beat) frames have passed
	let strike = vol > 0.15;
	console.log(vol);

	if(strike && !pstrike){//if strike is true, change the values for the lightning for the next strike
		l_img = random()*2 < 1;
		pos = random()*800;
	}

	//draws the lightning
	if(strike && !pstrike){
		tint(255, 255);
		fade_timer = 0;
	}
	else{
		tint(255, map(fade_timer, 0, 30, 255, 0));//makes the lightning fade out
		fade_timer++;
	}
	if(l_img){
		image(light1, pos, -50);
	}
	else{
		image(light2, pos, -50);
	}

	tint(255, 255);//reset the opacity as to not mess with other draw functions
	pstrike = strike;
}

function init_thunder(){
	light1 = loadImage("assets/lightning1.png");
	light2 = loadImage("assets/lightning2.png");

	l_img = random()*2 < 1;
	pos = random()*800;
	beat = 30;
}
