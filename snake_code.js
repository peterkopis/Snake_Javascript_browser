let canvas= document.getElementById("canvas");
let cntx=canvas.getContext("2d");
let rows= 20;
let columns= 20;
let snake= [
    {x:15,y:3}
    
];
let food;
let cellwidth =canvas.width/columns;
let cellheight= canvas.height/rows; 
let direccion ;
let foodColected = false;
let TryGameOver = false;
let pause = false;
let previousDireccion;

document.addEventListener("keydown", keyDown);

setInterval(gameloop,500);
//setInterval(console.log(snake[0].x),1000);
placeFood();

draw();

function draw()
{
    cntx.fillStyle= "black";
    cntx.fillRect(0,0,canvas.width,canvas.height);
    cntx.fillStyle="white";
    snake.forEach(part=>addRect(part.x,part.y));
    
    /*addRect(40,20);
    addRect(40,40);
    addRect(40,60);
    addRect(40,80);*/
    cntx.fillStyle="yellow";
    addRect(food.x,food.y);
    requestAnimationFrame(draw);
    if(TryGameOver){
        cntx.fillStyle = "white";
        cntx.fillText("Game Over", (canvas.width / 2),
         (canvas.height / 2) );
    };
    
    if(pause)
    { 
       console.log('pause');
        cntx.fillStyle = "white";
        cntx.fillText("Pause", (canvas.width / 2), 
    (canvas.height / 2) );}
    
    
};
function addRect(w,h){
    cntx.fillRect(w*cellwidth,h*cellheight,
        cellwidth-1,cellheight-1);
};
function shiftsnake(){

    for(let i= snake.length-1; i>0;i--){
        let part = snake[i];
        let lastpart = snake[i-1];
        part.x = lastpart.x;
        part.y =lastpart.y;
    }
}
 
function gameloop()
{
    if(foodColected){
        snake = [
            {x: snake[0].x,
            y: snake[0].y},
            ...snake
        ];
        foodColected = false;
    };
    if(TryGameOver == false)
    {
    shiftsnake();
    };
    if(TryGameOver == false &&
        pause == false)
    {
    if(direccion=="LEFT") {snake[0].x--; 
        previousDireccion = "LEFT"};
    if(direccion=="UP") {snake[0].y--;
        previousDireccion = "UP"};
    if(direccion=="RIGHT") {snake[0].x++;
        previousDireccion = "RIGHT"};
    if(direccion=="DOWN") {snake[0].y++;
        previousDireccion = "DOWN"};
    if(snake[0].x == food.x 
        && snake[0].y ==food.y){
            foodColected = true;
            placeFood();

        };
    }
  gameOver();      

};

function keyDown(e){
    if(e.keyCode == 37){direccion="LEFT"};
    if(e.keyCode == 38){direccion="UP"}; 
    if(e.keyCode == 39){direccion="RIGHT"};
    if(e.keyCode == 40){direccion="DOWN"};
}
function placeFood(){
    let randomX= Math.floor(Math.random()*columns);
    let randomY= Math.floor(Math.random()*rows);
    food= {
        x:randomX,
        y:randomY
    };

};
function gameOver()
{ 
    let firstPart = snake[0];
    let othersPart = snake.slice(1);
    let duplicatedPart = othersPart.find(part => 
        part.x == firstPart.x &&
        part.y == firstPart.y
        );
    if(
        snake[0].x < 0 ||
        snake[0].x > columns-1||
        snake[0].y < 0 ||
        snake[0].y > rows-1  ||
        duplicatedPart
       )
       {
        TryGameOver = true;
        direccion = null;
        
       }
};
function newstart()
{
    placeFood();
    foodColected = false;
    TryGameOver = false;
     snake= [
        {x:15,y:3}
        
    ];
   
}
function pausedGame()
{
    if(pause ==true)
    {pause = false;
     direccion =previousDireccion; }
    else{
        direccion = null;
        pause = true;
    };
    
}

