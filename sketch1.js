console.log("sketch working");
var gameScreen=0;
var ball;
var pipes = [];

var flag=1;
var bg;
var tex1;
var play=1;
//var waitsecs;

var screamWidth=15;
var mic;
var vol;
var slider;
var slider2;


var score = 0;
var HighScore = 0;
var maxHealth = 100;
var health = 100;
var healthDecrease = 1;
var healthBarWidth = 60;

var freezeTimeStart = 50;
var freezeTime = freezeTimeStart;


function preload() {
	bg=loadImage("assets/scene4.png");
    bg1= loadImage("assets/intro.png");
    bg2= loadImage("assets/tut.jpg");
    setTimeout(donothing(), 50000);
	//tex1=loadImage("C:/Users/kunal/Desktop/p5/p5/Minor2/assets/A_Pilr-Cor1.jpg");
}


function setup() {
  createCanvas(1365, 660);
    
  ball = new ball();
  pipes.push(new Pipe());
  mic=new p5.AudioIn();
  mic.start();
  slider =createSlider(0,1,0.1,0.01);
  slider2=createSlider(0,1,0.06,0.01);
  

  
}



 function wait(){
  setTimeout(donothing(), 50000);
  }

  function donothing() {
  
  if(play==0)
  {
	  
	  ball.x=width/2;
	  ball.y=height/2;
      play=1;
  }
      	  
  }
function draw() { 
if(gameScreen == 0)
    {
        initScreen();
    }
    else if(gameScreen == 1)
        {
            tutorial();
        }
    else 
        {
            game();
        }
}

function keyPressed() {
  if (key == ' ') {
    gameScreen++;
    //console.log("SPACE");
  }
  if(key=='X'){
	 location.reload();
  }
}
function Pipe() {
  this.ph = random(height/2);
  this.x = width;
  this.w = 250;
  this.speed = 2;

  //this.highlight = false;

  this.hits = function(ball) {
    
  }

  this.show = function() {
	  noStroke();
    fill(155);
    //if (this.highlight) {
      //fill(255, 0, 0);
    //}
	
    rect(this.x, height-this.ph, this.w, this.ph);
  }

  this.update = function() {
    this.x -= this.speed;    
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } 
      else {
      return false;
    }
  }
}



function ball() {
  this.y = height/2;
  this.x = width/2;

  this.gravity = 0.8;
  this.lift = -10;
  this.velocity = 0;
  this.flag=0;
  this.survive=function() {
	for(var i=pipes.length-1;i>=0;i--)
	{
		
		if ( this.y+16 > height - pipes[i].ph) {
			if(this.x+16>pipes[i].x && this.x+16<pipes[i].x+5)
			{
				this.x=pipes[i].x-16;
                
                
			}
			else if (this.x+16 > pipes[i].x && (this.x+16 < pipes[i].x + pipes[i].w || this.x-16 < pipes[i].x+pipes[i].w)) {
				this.y=height-pipes[i].ph-22;
                scoreUpdate();
            
            }
			
			
		}		
		
		
	} 

}

  this.show = function() {
	  noStroke();
    fill(255,255,153);
	if(this.y+16==height || this.x-16<0){
	fill(255,0,0);
	play=0;}
    ellipse(this.x, this.y, 32, 32);
  }

  this.up = function(lift) {
	
    this.velocity += this.lift;
      flag=1;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y+16 > height) {
      this.y = height-16;
      this.velocity = 0;
        
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
        decreaseHealth();
    }

  }
  
}

function ResetGame(){
    score = 0;
    ball.velocity = 0;
    ball.y = height/2;
    play = 1;   
    health=100;
}

function ScoreBoard(){
    if(score > HighScore)
    {
      HighScore = score;   
    }
        textSize(40);
        fill(150,255,0);
        noStroke();
        text("Score: " + score + "\nHigh Score: " + HighScore, width/2, height/2);   
}
function scoreUpdate(){
    if(flag==1)
        {
            score=score+1;
        }
    flag=0;
}

function drawHealthBar(){
   noStroke();
    noFill();
    rectMode(CORNER);
    rect(ball.x -(healthBarWidth/2), ball.y -30, healthBarWidth, 5);
    if (health > 60) {
    fill(46, 204, 113);
  } else if (health > 30) {
    fill(230, 126, 34);
  } else {
    fill(231, 76, 60);
  }
  rectMode(CORNER);
    
    rect(ball.x-(healthBarWidth/2), ball.y - 30, healthBarWidth*(health/maxHealth), 5);
}

function decreaseHealth(){
    health -= healthDecrease;
    if(health<=0)
        {play=0;}
}


function initScreen() {
    
    vol=mic.getLevel();
    var threshold=slider2.value();
    background(bg1,[128]);
    textAlign(CENTER);
    fill(100,52,94);
    textSize(70);
    text("CLAP-NO TAP", width/2, height/2);
    rectMode(CORNER);
    if(vol>threshold)
    {
        screamWidth++;
    }
    rect(width/3, height/3, screamWidth, 20);
    textSize(50);
    text("Scream to play", width/2, height-100);
    if(screamWidth>450)
        {
            gameScreen=1;
            screamWidth=30;
        }
    //console.log("Scream"+screamWidth);
}
/*function mousePressed() {
  // if we are on the initial screen when clicked, start the game 
  if (gameScreen==0) { 
    startGame();
  }
  if (gameScreen==2) {
    restart();
  }
}*/

function tutorial(){
    
    background(bg2,[128]);
    textAlign(LEFT);
    fill(140,50,70);
    textSize(70);
    text("How To Play!!", 50, height/4);
    rectMode(CORNER);
    vol=mic.getLevel();
    var threshold=slider2.value();
    if(vol>threshold)
    {
        screamWidth++;
    }
    
    rect(width-860, height-100, screamWidth, 20);
    textSize(40);
    fill(255,255,0);
    text("1. Scream or Clap to jump the ball", 50, height-400);
    text("2. Touch the pipe to get a point", 50, height-350);
    text("3. The health gets low after every collision", 50, height-300);
    text("4. Adjust your voice level in a particular threshold", 50, height-250);
    fill(140,50,70);
  
    text("LOADING", 620, height-125 );
      strokeWeight(5);
    if(screamWidth>350)
        {
            gameScreen=2;
            screamWidth=15;
        }
    //console.log("Scream"+screamWidth);
}
function game(){
    	//texture(bg);
    

    
  background(bg,[128]);
    vol=mic.getLevel();
    var threshold=slider.value();
  var threshold2=slider2.value();
    drawHealthBar();
  //image(bg,0,0);
  
  
  
  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
	if(play)
	{
		pipes[i].update();
	}

    if (pipes[i].hits(ball)) {
      console.log("HIT pipe"+i);
    }
	

    if (pipes[i].offscreen()) {
      pipes.splice(i,1);
	  console.log("splice pipe"+i);
    }


  }
  ball.survive();
  if(play)
  {
	ball.update();
  }
  
  ball.show();

  if (frameCount % 200 == 0) {
    pipes.push(new Pipe());
  }
  
    
     if(vol>threshold && vol>threshold2)
       {
         ball.up();
       }
  fill(0,255,0);
  console.log(vol);
  var y=map(vol,0,1,height,0);
  noStroke();
  rect(width-50,y,50,height-y);
  //console.log(y);
  
  
  
  var ty=map(threshold,0,1,height,0);
  stroke(255,0,0);
  strokeWeight(4);
  line(width-50,ty,width,ty);
  var ty2=map(threshold2,0,1,height,0);
  stroke(255,255,0);
  strokeWeight(4);
  line(width-50,ty2,width,ty2);
  
  
  /*function wait(waitsecs){
  setTimeout(donothing(), 'waitsecs');
  }

  function donothing() {
  }
  if(play==0)
  {
	  wait(500);
	  ball.x=width/2;
	  ball.y=height/2;
	  
	  play=1;
  }*/
    
    if(!play){
        ScoreBoard();
        fill(50,60,200);
        noStroke();
        
        ellipse(300,300,freezeTime*7,freezeTime*7);
        if(vol>threshold2){
            freezeTime=freezeTime-1;
        }
            
        
        if(freezeTime <0){
            freezeTime = freezeTimeStart;
            //redraw();
            ResetGame();
            background(255);
        }
        
    
    }

}