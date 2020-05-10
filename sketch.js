

var bg;

var light1;
var light2;
var l_img;
var posl
var beat;

function setup(){
	createCanvas(1000, 800);
	bg = loadImage("assets/bg.png");

	init_thunder();
}

function draw(){
	image(bg, 0, 0);
	thunder();
}


function thunder(){
	let strike = (frameCount % beat == 0);//checks if (beat) frames have passed
	tint(255, map(frameCount%beat, 0, 30, 255, 0));//makes the lightning fade out

	if(strike){//if strike is true, change the values for the lightning for the next strike
		l_img = random()*2 < 1;
		pos = random()*800;
	}

	//draws the lightning
	if(l_img){
		image(light1, pos, -50);
	}
	else{
		image(light2, pos, -50);
	}

	tint(255, 255);//reset the opacity as to not mess with other draw functions
}

function init_thunder(){
	light1 = loadImage("assets/lightning1.png");
	light2 = loadImage("assets/lightning2.png");

	l_img = random()*2 < 1;
	pos = random()*800;
	beat = 30;
}
