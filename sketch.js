//Create variables here
var dog1;
var dogFood,water;
var dogFoodImg,waterImg;
var up,down;
var ground;
var database;
var foodStock;
var foodS;
function preload()
{
	//load images here
  down = loadImage("images/dogImg1.png");
  up = loadImage("images/dogImg.png");
  dogFoodImg = loadImage("images/food.png");
  waterImg = loadImage("images/water.png");

}

function setup() {
	createCanvas(500, 500);

  dog1 = createSprite(250,250,10,10);
  dog1.addImage(down);
  dog1.scale = 0.20;

  dogFood = createSprite(200,300,10,10);
  dogFood.addImage(dogFoodImg);
  dogFood.scale = 0.20;
  dogFood.visible = false;

  water = createSprite(200,300,10,10);
  water.addImage(waterImg);
  water.scale = 0.18;
  water.visible = false;
  //ground = createSprite(250,400,500,15);

  database  = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);
  foodStock.set(20);
  
}


function draw() {  
  background("yellow");

  if(foodS !==0){
  if(keyWentDown("down")){
    writeStork(foodS);
    dog1.addImage(down);
  }
  if(keyWentUp("down")){
    writeStork(foodS);
    dog1.addImage(up);
  }
  if(keyWentUp("f")){
    writeStork(foodS);
    dog1.addImage(down);
    dogFood.visible = true;
    water.visible = false;
  }
  if(keyWentUp("w")){
    writeStork(foodS);
    dog1.addImage(down);
    dogFood.visible = false;
    water.visible = true;
  }
}
  
  if(foodS === 0){
    dog.addImage(up);
    foodS = 20;
    dogFood.visible = false;
    water.visible = false;
  }
  drawSprites();
  //add styles here
  textSize(19.2);
  fill("black");
  //stroke("black")
  text("Note: Press down arrow to play with the Jimi",60,100)
  text("press (F) for food and (W) for water to feed the little Jimi",11,130);
  text("Remaining Food Stock: "+foodS,150,350);
}
function readStock(data){
  foodS = data.val();
}
function writeStork(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref("/").update({
    Food: x
  })
}



