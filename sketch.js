var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ninja, ninja_running;
var jungle, invisibleJungle, jungleImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2;

var score=0;

var gameOver, restart;


function preload(){
  ninja_running =   loadAnimation("ninjarun1.jpg","ninjarun2.jpg","ninja run4.jpg","ninja run5.jpg","ninja run6.jpg");
 
  
  groundImage = loadImage("jungle2.png");
  

  
  obstacle1 = loadImage("stone.png");
  obstacle2 = loadImage("hurdle.png");

  
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  ninja = createSprite(50,180,20,50);
  
  ninja.addAnimation("running", ninja_running);
  
  //ninja.scale = 0.5;
  
 jungle= createSprite(600,180,400,20);
  jungle.addImage("ground",jungleImage);
  jungle.x = jungle.width /2;
  jungle.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameoverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleJungle = createSprite(200,190,400,10);
  invisibleJungle.visible = false;
  
 // cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    //change the trex animation
    trex.changeAnimation("running", trex_running);
    
    if(keyDown("space") && trex.y >= 159) {
      ninja.velocityY = -12;
    }
  
    ninja.velocityY = ninja.velocityY + 0.8
  
    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
    ninja.collide(invisibleJungle);
    
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(ninja)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    jungle.velocityX = 0;
    ninja.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    //change the trex animation

    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}


  


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  score = 0;
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

