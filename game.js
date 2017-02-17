var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;

var dx = -2;
var dy = 2;

var ballRadius = 10;

var paddleHeight = 75;
var paddleWidth = 10;
var paddleY = (canvas.height-paddleHeight)/2;

var aiYcoord = (canvas.height-paddleHeight)/2;

var rightPressed = false;
var leftPressed = false;

function drawPaddle(position, width, height, yCoord) {
  ctx.beginPath();
  if (position === "right"){
    ctx.rect(canvas.width-width, yCoord, width, height);
  }
  if (position === "left"){
    ctx.rect(0, yCoord, width, height);
  }
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle("right", paddleWidth, paddleHeight, paddleY);
  drawPaddle("left", paddleWidth, paddleHeight, aiYcoord);
  animateBall();
  if(rightPressed && paddleY < canvas.height-paddleHeight) {
    paddleY += 7;
  }
  else if(leftPressed && paddleY > 0) {
    paddleY -= 7;
  }

  if (canAIMove()){
    if (y < canvas.height-paddleHeight){
      aiYcoord = y;
    }
    else if (y < 0){
      aiYcoord = y;
    }
  }
}

function canAIMove(){
  if (Math.random() > 0.5){
    return true;
  }
  return false;
}

function aiSpeed(){

}

function animateBall(){
  if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    if(x + dx < ballRadius) {
        dx = -dx;
    }
    else if(x + dx > canvas.width-ballRadius) {
        if(y > paddleY && y < paddleY + paddleHeight) {
            dx = -dx;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
        }
    }

    x += dx;
    y += dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}

setInterval(draw, 10)
