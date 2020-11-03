const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


//parameters
const player = {
    x: 300,
    y: 300,
    size: 20,
    xd: 0,
    yd: 0,
    speed: 10,
}

const enemy1 = {
    x: 100,
    y: 300,
    size: 30,
    xd: 0,
    yd: 0, 
    speed: 3,
}

const enemy2 = {
    x: 500,
    y: 300,
    size: 30,
    xd: 2,
    yd: 3, 
    speed: 3,
}

const coin = {
    size: 10,
    x: getRandomNumber(0, 600),
    y: getRandomNumber(0, 600)
}

let score = 0

let gameOverStatus = false


//gives randome numner 
function getRandomNumber(min, max){
    return Math.ceil(Math.random() * (max - min) + min);
}


//main loop
function update(){
    clear();

    gameOver();

    drawCoin();
    drawPlayer();
    drawEnemy1();
    drawEnemy2();
    drawScore();

    newPos();

    requestAnimationFrame(update);
}

function clear(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
}

//draw//

//drawplayer
function drawPlayer(){
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fillStyle = 'purple';
    ctx.fill();
}

//drawEnemys
function drawEnemy1(){
    ctx.beginPath();
    ctx.arc(enemy1.x, enemy1.y, enemy1.size, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
}
function drawEnemy2(){
    ctx.beginPath();
    ctx.arc(enemy2.x, enemy2.y, enemy2.size, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
}

//draw coin
function drawCoin(){
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
    ctx.fillStyle = 'orange'
    ctx.fill()
}

//draw score
function drawScore(){
    ctx.font = "30px Arial"
    ctx.fillStyle = "purple"
    ctx.fillText(score, 20, 40);
}

//game over
function gameOver(){
    if(gameOverStatus){
        player.xd = 0
        player.yd = 0
    
        enemy1.xd = 0
        enemy1.yd = 0
        enemy1.speed = 0
    
        enemy2.xd = 0
        enemy2.yd = 0

        ctx.globalAlpha = 1;
        ctx.fillStyle = "black"

        ctx.font = "80px Arial"
        ctx.fillStyle = "black"
        ctx.fillText('game over', 120, 300);

        ctx.font = "20px Arial"
        ctx.fillStyle = "black"
        ctx.fillText('press esc to retry', 220, 350)

        ctx.globalAlpha = 0.2
    }
}




//movment input
window.addEventListener('keydown', keyDown);
window.addEventListener("keyup", keyUp);

function keyUp(e){
    if (
        e.key === 'ArrowRight' ||
        e.key === 'right' ||
        e.key === 'd' ||
        e.key === 'ArrowLeft' ||
        e.key === 'Left' ||
        e.key === 'a'
    ){
        player.xd = 0;
    }

    if(
        e.key === 'ArrowUp' || 
        e.key === 'Up' ||
        e.key === 'w' ||
        e.key === 'ArrowDown' || 
        e.key === 'Down' ||
        e.key === 's'
    ){
       player.yd = 0; 
    }
}

function keyDown(e){
    if (e.key === 'ArrowRight' || e.key === 'right' || e.key === 'd'){
        moveRight();
    }
    if (e.key === 'ArrowLeft' || e.key === 'Left' || e.key === 'a'){
        moveLeft();
    }
    if (e.key === 'ArrowUp' || e.key === 'Up' || e.key === 'w'){
        moveUp();
    }
    if (e.key === 'ArrowDown' || e.key === 'Down' || e.key === 's'){
        moveDown();
    }

    //reset
    if (e.key === 'Escape'){
        gameOverStatus = false;
        score = 0

        player.x = 300;
        player.y = 300;

        enemy1.x = 100;
        enemy1.y = 300;
        enemy1.speed = 3

        enemy2.x = 500;
        enemy2.y = 300;
        enemy2.xd = 2;
        enemy2.yd = 3;
        enemy2.speed = 3

        coin.x = getRandomNumber(0, 600);
        coin.y = getRandomNumber(0, 600);

        ctx.globalAlpha = 1;
    }
}

//movment and colision calculation
function newPos(){
    player.x += player.xd;
    player.y += player.yd;

    enemy2.x += enemy2.xd;
    enemy2.y += enemy2.yd;

    enemyFollow();

    playerDetectWall();

    enemy1DetectWall();

    enemy2DetectWall();

    if(detectCoin(player.x, player.y, player.size, coin.x, coin.y, coin.size)){
        coin.y = getRandomNumber(0, 600) 
        coin.x = getRandomNumber(0, 600) 
        score ++
        enemy1.speed += 0.1
        enemy2.speed += 0.1
    }

    if(detectPlayerEnemyColision(enemy1.x, enemy1.y, enemy1.size, enemy2.x, enemy2.y, enemy2.size, player.x, player.y, player.size)){
        gameOverStatus = true
    }
}


//player movement 
function moveUp(){
    player.yd = -player.speed
}

function moveDown(){
    player.yd = player.speed
}

function moveLeft(){
    player.xd = -player.speed
}

function moveRight(){
    player.xd = player.speed
}


//enemy movment
function enemyFollow(){
    let dx = player.x - enemy1.x;
    let dy = player.y - enemy1.y;

    let mag = Math.sqrt((dx * dx) + (dy * dy))

    dx /= mag;
    dy /= mag;
    
    enemy1.x += dx * enemy1.speed;
    enemy1.y += dy * enemy1.speed;
}


//colider detection//

//detect wall
function playerDetectWall(){

    //upper wall
    if (player.y < player.size){
        player.y = player.size
    }

    //lower wall
    if (player.y + player.size > canvas.height){
        player.y = canvas.height - player.size
    }

    //right wall
    if (player.x + player.size > canvas.width){ 
        player.x = canvas.width - player.size
    }

    //left wall
    if (player.x  < player.size){ 
        player.x = player.size
    }
}

function enemy1DetectWall(){

    //upper wall
    if(enemy1.y < enemy1.size){
        enemy1.yd = enemy1.speed
    }

    //lower wall
    if(enemy1.y + enemy1.size > canvas.height){
        enemy1.yd = enemy1.speed * -1
    }

    //right wall
    if(enemy1.x + enemy1.size > canvas.height){
        enemy1.xd = enemy1.speed * -1 -1
    }

    //left wall 
    if(enemy1.x < enemy1.size){
        enemy1.xd = enemy1.speed -1
    }
}

function enemy2DetectWall(){

    //upper wall
    if(enemy2.y < enemy2.size){
        enemy2.yd = enemy2.speed
    }

    //lower wall
    if(enemy2.y + enemy2.size > canvas.height){
        enemy2.yd = enemy2.speed * -1
    }

    //right wall
    if(enemy2.x + enemy2.size > canvas.height){
        enemy2.xd = enemy2.speed * -1 -1
    }

    //left wall 
    if(enemy2.x < enemy2.size){
        enemy2.xd = enemy2.speed -1
    }
}

//detect coin
function detectCoin(x1, y1, radius1, x2, y2, radius2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (radius1 + radius2);
}

//player enemy colision detection
function detectPlayerEnemyColision(x1, y1, radius1, x2, y2, radius2, x3, y3, radius3) {

    //detection between player and enemy 1
    const dx1 = x1 - x3;
    const dy1 = y1 - y3;
    const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

    //detection between player and enemy 2
    const dx2 = x2 - x3;
    const dy2 = y2 - y3;
    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

    if(distance1 < (radius1 + radius3) || distance2 < radius2 + radius3){
        return true
    }
}

update();