var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zom, zomImg, zomGroup;
var bullet, bulletImg, bulletGroup, nBull = 50;
var explosion;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");

  bgImg = loadImage("assets/bg.jpeg");

  zomImg = loadImage("assets/zombie.png");

  bulletImg = loadImage("assets/bullet1.png");

  explosion = loadSound("assets/explosion.mp3");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
  bg.addImage(bgImg);
  bg.scale = 1.1;
  

//creating the player sprite
player = createSprite(displayWidth-1500, displayHeight-300, 50, 50);
 player.addImage(shooterImg);
   player.scale = 0.3;
   player.debug = true;
   player.setCollider("rectangle",0,0,300,300);

   zomGroup = new Group();

   bulletGroup = new Group();


}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30;
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30;
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(player.x + 50, player.y - 25, 20, 20);
  bullet.addImage("bullet", bulletImg);
  bullet.velocityX = 20;
  bullet.scale = 0.08;
  nBull -= 1;
  bulletGroup.add(bullet);
  explosion.play();

  player.addImage(shooter_shooting);
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg);
}

addZombies();

drawSprites();

push();
textSize(30);
fill("red");
strokeWeight(4);
stroke("navy");
text("No of bullets: - " + nBull, windowWidth - 550, windowHeight - 900);
pop();

}

function addZombies() {
  if(frameCount%100 === 0) {
    zom = createSprite(windowWidth + 30, random(windowHeight - 200, windowHeight - 850), 20, 20);
    zom.addImage("zombie", zomImg);
    zom.scale = 0.2;
    zom.velocityX = -5;
    zom.lifetime = 500;

    zomGroup.add(zom);
  }
}


