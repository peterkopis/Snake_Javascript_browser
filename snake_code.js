let canvas = document.getElementById("canvas");
let cntx = canvas.getContext("2d");
let rows = 20;
let columns = 20;
let snake = [
    { x: 15, y: 3 }
];
let food;
let cellwidth = canvas.width / columns;
let cellheight = canvas.height / rows;
let direccion;
let foodColected = false;
let tryGameOver = false;
let pause = false;
let previousDireccion;
let digestioningFood;



//listener for control the game 
document.addEventListener("keydown", keyDown);

placeFood();
//speed of game
setInterval(gameloop, 300);


//placeFood();

draw();


function draw() {
    

    
    //matchfield
    cntx.fillStyle = "black";
    cntx.fillRect(0, 0, canvas.width, canvas.height);

    
    // our snake
    cntx.fillStyle = "white";
    snake.forEach(part => addRect(part.x, part.y));

    //when snake has found the food, ih his body show the digestioning of food!!
    if(digestioningFood)
    {
        cntx.fillStyle = "red";
        addRect(digestioningFood.x, digestioningFood.y);
        
        
    };

    
    // our food
    cntx.fillStyle = "yellow";
    addRect(food.x, food.y);


    // if the game is over, write on matchfeld gameover
    if (tryGameOver) {
        cntx.fillStyle = "white";
        cntx.fillText("Game Over", (canvas.width / 2),
            (canvas.height / 2));
    };
    // if game is paused, write on matchfeld pause
    if (pause) {

        cntx.fillStyle = "white";
        cntx.fillText("Pause", (canvas.width / 2),
            (canvas.height / 2));
    };
   
    
   
    //requests that the browser call a specified function to update an animation before the next repaint
    requestAnimationFrame(draw);


};
// add new rectangle
function addRect(w, h) {
    cntx.fillRect(w * cellwidth, h * cellheight,
        cellwidth - 1, cellheight - 1);
};
// function for shifting the body of the snake
function shiftsnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        let part = snake[i];
        let lastpart = snake[i - 1];
        part.x = lastpart.x;
        part.y = lastpart.y;
    }
};

function gameloop() {
    
    
    // if is food colected, the snake grow
    if (foodColected) {
        
        
        snake = [{
                x: snake[0].x,
                y: snake[0].y
            },
            ...snake
        ];
        
        foodColected = false;
    };
   
    
    // shift the body of snake , only if game isn´t paused or over
    if (tryGameOver == false &&
        pause == false) 
        {
            shiftsnake();
        };
    // permite control the snake, only if game isn´t paused or over, in variable  previousDireccion remebrer the previous direccion, if is game paused
    if (tryGameOver == false &&
        pause == false) 
        {
        if (direccion == "LEFT") 
            {
                snake[0].x--;
                previousDireccion = "LEFT"
            };
        if (direccion == "UP") 
            {
                snake[0].y--;
                previousDireccion = "UP"
            };
        if (direccion == "RIGHT") 
            {
                snake[0].x++;
                previousDireccion = "RIGHT"
            };
        if (direccion == "DOWN") 
            {
                snake[0].y++;
                previousDireccion = "DOWN"
            };
        // try if has the snake food colected
        if (snake[0].x == food.x &&
            snake[0].y == food.y) 
            {
                //started the digestion proces of food
                digestioningFood = {x : snake[0].x, y : snake[0].y}
                foodColected = true;
            
                placeFood();

            };
    }
    gameOver();
    Trydigestion();
    

};

function keyDown(e) {
    if (e.keyCode == 37) { direccion = "LEFT" };
    if (e.keyCode == 38) { direccion = "UP" };
    if (e.keyCode == 39) { direccion = "RIGHT" };
    if (e.keyCode == 40) { direccion = "DOWN" };
};
// random place of food
function placeFood() {
    let randomX = Math.floor(Math.random() * columns);
    let randomY = Math.floor(Math.random() * rows);
    food = {
        x: randomX,
        y: randomY
    };

};

function gameOver() {
    let firstPart = snake[0];
    let othersPart = snake.slice(1);
    let duplicatedPart = othersPart.find(part =>
        part.x == firstPart.x &&
        part.y == firstPart.y
    );
    if (
        snake[0].x < 0 ||
        snake[0].x > columns - 1 ||
        snake[0].y < 0 ||
        snake[0].y > rows - 1 ||
        duplicatedPart
    ) {
        tryGameOver = true;
        direccion = null;
        pause = false;

    }
};

function newstart() {
    placeFood();
    foodColected = false;
    tryGameOver = false;
    pause = false;
    snake = [
        { x: 15, y: 3 }

    ];

}

function pausedGame() {
    if (pause == true) {
        pause = false;
        direccion = previousDireccion;
    } else {
        pause = true;
        direccion = null;
    };

}
function Trydigestion() {
    
    if(digestioningFood)
    {
        //try the process, if digestioning is already finish 
        let digesting = false;
         snake.forEach((part) =>{
            if(part.x == digestioningFood.x &&
            part.y == digestioningFood.y){
                digesting= true
            } }); 
                if(!digesting){
                digestioningFood = false
                }
            
        
      
    
}}