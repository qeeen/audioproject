

var bg;

var light1;
var light2;
var l_img;
var posl
var beat;

function setup(){
	createCanvas(1000, 800);
	bg = loadImage("assets/bg.png");
	light1 = loadImage("assets/lightning1.png");
	light2 = loadImage("assets/lightning2.png");

	l_img = random()*2 < 1;
	pos = random()*800;
	beat = 30;
}

function draw(){
	tint(255, 255);
	image(bg, 0, 0);
	thunder();
}


function thunder(){
	let strike = (frameCount % beat == 0);

	tint(255, map(frameCount%beat, 0, 30, 255, 0));
	if(strike){
		l_img = random()*2 < 1;
		pos = random()*800;
	}

	if(l_img){
		image(light1, pos, -50);
	}
	else{
		image(light2, pos, -50);
	}
}
