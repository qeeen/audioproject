var drums;
var drum_amp;
var fade_timer;
var pstrike;
var light1;
var light2;
var l_img;
var posl
var beat;
var rain_sound;

var song;
var button;
var amp;
var light_amp;
var rain_amp;
let i = 0.3;
let j = 1;
let ray;
let light;
let mic;
let scale = 5000;
let smooth_factor = 0.25;
let smoothed = 0;

function preload(){
	bg = loadImage('assets/bg.png');
	song = loadSound("assets/bass_loop_slowed.mp3");
	light_sound = loadSound("assets/gaeyageumedited.mp3");
	drums = loadSound("assets/drum_final.mp3");
	rain_sound = loadSound("assets/rain_final.mp3");
}

function setup() {
	createCanvas(1000,800);

	amp = new p5.Amplitude();
	amp.setInput(song);
	song.play();
	song.setVolume(0.5);
	song.loop();

	light_amp = new p5.Amplitude();
	light_amp.setInput(light_sound);
	light_sound.play();
	light_sound.setVolume(0.8);
	light_sound.loop();

	rain_amp = new p5.Amplitude();
	rain_amp.setInput(rain_sound);
	rain_sound.play();
	rain_sound.setVolume(0.7);
	rain_sound.loop();

	init_thunder();
	drums.play();
	drums.setVolume(0.8);
	drums.loop();

	light = new Light();

}

function init_thunder(){
	drum_amp = new p5.Amplitude();
	drum_amp.setInput(drums);
	fade_timer = 30;
	pstrike = false;

	light1 = loadImage("assets/lightning1.png");
	light2 = loadImage("assets/lightning2.png");

	l_img = random()*2 < 1;
	pos = random()*800;
	beat = 30;
}

function draw(){
	background(bg);

	thunder();

	noStroke();
	if(song.isPlaying()){
		let vol = amp.getLevel();
		let diam1 = map(vol, 0, 0.3, 0, 80);
		let wid1 = map(vol, 0, 0.3, 0, 400);
		let diam2 = map(vol, 0, 0.3, 0, 60);
		let wid2 = map(vol, 0, 0.3, 0, 300);
		let diam3 = map(vol, 0, 0.3, 0, 30);
		let wid3 = map(vol, 0, 0.3, 0, 200);

		fill(78, 140, 203)
		ellipse(210,710, wid2, diam2);

		fill(128,170,219);
		ellipse(600, 730, wid1, diam1);

		fill(169,185,203);
		ellipse(400, 650, wid3, diam3);

	}
	else{
	}
	if(light_sound.isPlaying()){
		let vol = light_amp.getLevel();
		smoothed = smoothed * (1 - smooth_factor) + vol * smooth_factor;
		let scaled = smoothed * scale;

		light.show();
	}
}

class Ray {
	constructor(pos,angle) {
		this.pos = pos;
		this.dir = p5.Vector.fromAngle(angle);
	}  

	show() {
		let scaled = smoothed * scale;

		stroke(255,255,153,100);
		strokeWeight(0.2);

		push();
			translate(this.pos.x, this.pos.y);
			line(0,0,this.dir.x *(10 + scaled/2), this.dir.y*(10 + scaled/2));
		pop();
	}
}

class Light {
	constructor() {
		this.pos = createVector(920, 280);
		this.rays = [];
		for (let a=0; a<360; a+=0.4) {
			this.rays.push(new Ray(this.pos, radians(a)));
		}
	}

	show() {
		let scaled = smoothed * scale;
		fill(255,255,0,20);
		noStroke();
		ellipse(this.pos.x, this.pos.y,scaled/3);

		for (let ray of this.rays) {
			ray.show();
		}
	}
}

function thunder(){
	if(!drums.isPlaying()){
		drums.play();
	}

	let vol = drum_amp.getLevel();
	let strike = vol > 0.15;

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

function keyPressed() {
	if (keyCode === LEFT_ARROW) { //put sound using left arrow
		if(amp.getLevel() == 0){
			song.setVolume(0.5);
		}
		else{
			song.setVolume(0);
		}
	}
	if(keyCode === RIGHT_ARROW) {
		if(light_amp.getLevel() == 0){
			light_sound.setVolume(0.8);
		}
		else{
			light_sound.setVolume(0);
		}
	} 
	if(keyCode === UP_ARROW) {
		if(drum_amp.getLevel() == 0){
			drums.setVolume(0.8);
		}
		else{
			drums.setVolume(0);
		}
	} 
	if(keyCode === DOWN_ARROW) {
		if(rain_amp.getLevel() == 0){
			rain_sound.setVolume(0.7);
		}
		else{
			rain_sound.setVolume(0);
		}
	} 
	if (keyCode === 87){ //songvolume up using keyboard'W'
		i = i + 0.1;
	}
	else if (keyCode === 83){ //song volume down using keyboard'S'
		i = i - 0.1;
	}
	else if (keyCode === 68){ // song rate up using keyboard'D'
		j = j + 0.5;
	}
	else if (keyCode === 65){ // song rate down using keyboard'A'
		j = j - 0.5;
	}
}

/*
function keyReleased(){
	if (keyCode === LEFT_ARROW) {
		song.stop();
	}
	if(keyCode === RIGHT_ARROW){
		light_sound.stop();
	}
}
*/
