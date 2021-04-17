var ball, ballImg;
var bg;
var database;
var pos;


function preload(){
    ballImg = loadAnimation("hotairballoon1.png", "hotairballoon2.png", "hotairballoon3.png");
    bg = loadImage("cityImage.png");
}


function setup(){
    database = firebase.database();
    createCanvas(windowWidth,windowHeight);

    ball = createSprite(250,250,10,10);
    ball.addAnimation("ball", ballImg);
    ball.shapeColor = "red";

    var ballref = database.ref("ball/position");
    ballref.on("value",readPosition,showError);
}


function draw(){
    background(bg);
    if(pos){
    
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
        ball.scale = ball.scale + 0.01;
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
        ball.scale = ball.scale - 0.01;
    }
    }
    drawSprites();
}

function changePosition(a, b){
    database.ref("ball/position").update({
    x: pos.x + a,
    y: pos.y + b
    });
    
}

function readPosition(data){
pos = data.val();
console.log(pos);
ball.x = pos.x;
ball.y = pos.y;
}
function showError(){
console.log("unable to read the values from the database");
}




