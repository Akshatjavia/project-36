var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feed,lastFed,fedTime;
var foodObj;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,450);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,100);
  dog.addImage(sadDog);
  dog.scale=0.20;

  //create feed the dog button here

  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(825,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background("brown");
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
 
  //write code to display text lastFed time here

    fill("yellow");
    stroke("black")
    strokeWeight("2.5")
  textSize(20);
  if(lastFed >= 12){
    text("Last Feed:" + lastFed %12 + "PM",150,40);
  }else if(lastFed==0){
    text("Last Feed: 12 AM",150,40);
  }else {
    text("Last Feed:"+lastFed+"AM",150,40);
  }
  drawSprites();

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  if(foodS >= 1){
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()

  })
}

//function to add food in stock
function addFoods(){
  if(foodS<30){
   foodS++;
  }
  database.ref('/').update({
    Food:foodS
  })
}
