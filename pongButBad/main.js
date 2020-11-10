const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d')

//canvas width="640" height="480"

const color = 'white' 

const ball = {
    x: 320,
    y: 240,
    radius: 10,
    xd: -5, 
    yd: 3,
    speed: 5,
}

const rightPlayer = {
    x: 600,
    y: 210,
    width: 20,
    height: 70,
    yd: 0,
    speed: 8,
}

const leftPlayer = {
    x: 20,
    y: 210,
    width: 20,
    height: 70,
    yd: 0,
    speed: 8,
}

let gameOverStarus = false;
let loser = false;

//main game loop
function update(){
    clear();

    drawball();
    drawPlayerRight();
    drawPlayerLeft(); 

    newPos();

    gameOver();

    requestAnimationFrame(update);
}

function clear(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

//draaw//
//ball
function drawball(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

//right player
function drawPlayerRight(){
    ctx.beginPath();
    ctx.rect(rightPlayer.x, rightPlayer.y, rightPlayer.width, rightPlayer.height);
    ctx.fillStyle = color;
    ctx.stroke();
    ctx.fill();
}

//left player
function drawPlayerLeft(){
    ctx.beginPath();
    ctx.rect(leftPlayer.x, leftPlayer.y, leftPlayer.width, leftPlayer.height);
    ctx.fillStyle = color;
    ctx.stroke();
    ctx.fill();
}


function newPos(){
    ball.x += ball.xd
    ball.y += ball.yd

    rightPlayer.y += rightPlayer.yd
    leftPlayer.y += leftPlayer.yd

    leftAiPlayer();

    rightPlayerWallColider();
    leftPlayerWallColider();

    ballWallColider();
    ballGoalColider();

    ballRightPlayerColider();
    ballLeftPlayerColider();
}


function rightPlayerWallColider(){

    //lower wall
    if (rightPlayer.y > canvas.height - rightPlayer.height){
        rightPlayer.y = canvas.height - rightPlayer.height
    }

    //upper wall
    if (rightPlayer.y < 0){
        rightPlayer.y = 0
    }
}

function leftPlayerWallColider(){
    //lower wall
    if (leftPlayer.y > canvas.height - leftPlayer.height){
        leftPlayer.y = canvas.height - leftPlayer.height
    }

    //upper wall
    if (leftPlayer.y < 0){
        leftPlayer.y = 0
    }
}

function ballWallColider(){
    if (ball.y + ball.radius > canvas.height){
        ball.yd = -ball.speed
    }

    if (ball.y - ball.radius < 0){
        ball.yd = ball.speed
    }
}

function ballGoalColider(){
    if (ball.x > canvas.width - ball.radius){
        gameOverStarus = true;
        loser = true;
    }

    if (ball.x < 0 + ball.radius){
        gameOverStarus = true;
    }
}

function ballRightPlayerColider(){
    if (ball.y > rightPlayer.y && 
        ball.y < rightPlayer.y + rightPlayer.height &&   
        ball.x + ball.radius > rightPlayer.x
        ){
        ball.xd = -ball.speed
    }
}

function ballLeftPlayerColider(){
    if (ball.y > leftPlayer.y &&
        ball.y < leftPlayer.y + leftPlayer.height &&
        ball.x - ball.radius < leftPlayer.x + leftPlayer.width
        ){
        ball.xd = ball.speed
    }
}

//game over
function gameOver(){
    if (gameOverStarus){
        ball.xd = 0;
        ball.yd = 0;
        ball.speed = 0;

        rightPlayer.yd = 0

        ctx.font = "40px Arial";
        ctx.fillText("game over",240, 250);

        if (loser){
            ctx.font = "30px Arial";
            ctx.fillText("you lose", 280, 280)
        }

        ctx.font = "25px Arial";
        ctx.fillText("press esc to try again", 220, 330)

    }
}

function reset(){
    gameOverStarus = false;

    ball.x = 320
    ball.y = 240
    ball.speed = 5

    ball.yd = ball.speed
    ball.xd = -ball.speed

    rightPlayer.x = 600
    rightPlayer.y =  210

    leftPlayer.x = 20;
    leftPlayer.y = 210;


}


//input
window.addEventListener('keydown', keyDown);
window.addEventListener("keyup", keyUp);

function keyUp(e){
    if(
        e.key === 'ArrowUp' || 
        e.key === 'Up' ||
        e.key === 'w' ||
        e.key === 'ArrowDown' || 
        e.key === 'Down' ||
        e.key === 's'
    ){
       rightPlayer.yd = 0; 
    }
}

function keyDown(e){
    if (e.key === 'ArrowUp' || e.key === 'Up'){
        rightPlayerMoveUP();
    }
    if (e.key === 'ArrowDown' || e.key === 'Down'){
        rightPlayerMoveDown();
    }

    if (e.key === 'Escape'){
        reset();
    }
}

function rightPlayerMoveUP(){
    rightPlayer.yd = -rightPlayer.speed
}

function rightPlayerMoveDown(){
    rightPlayer.yd = rightPlayer.speed
}

function leftAiPlayer(){
    let destination 

    if (Math.sign(ball.xd) == +1){
        destination = canvas.height / 2
    }
    else if (gameOverStarus){
    destination = canvas.height / 2
    }
    else {
        destination = ball.y
    }
    
   

    let center = leftPlayer.y + leftPlayer.height / 2
    let direction = destination - center
    leftPlayer.yd = Math.max(Math.min(direction, leftPlayer.speed), -leftPlayer.speed)


    // if (leftPlayer.y > ball.y){
    //     leftPlayer.yd = Math.max(ball.y - leftPlayer.y, -leftPlayer.speed)
    // }

    // else if (leftPlayer.y + leftPlayer.height < ball.y){
    //     leftPlayer.yd = leftPlayer.speed
    // }

    // else{
    //     leftPlayer.yd = 0 
    // }
}


update();