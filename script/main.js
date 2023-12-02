const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
const ground = new Image()
ground.src = "img/ground.png"
const foodImg = new Image()
foodImg.src = "img/food.png"
let box = 32
let score = 0


let food = {
    x: Math.floor((Math.random() * 17 + 1)) *box,
    y: Math.floor((Math.random() * 15 + 3))*box
}

let snake = []
snake[0] = {
    x: 9 * box,
    y : 10* box
}

document.addEventListener("keydown", direction)

let direct;

function direction(e){
    if(e.keyCode == 37 && direct != "right"){
        direct = "left"
    }
    else if(e.keyCode == 38 && direct != "down"){
        direct = "up"
    }
    else if(e.keyCode == 39 && direct != "left"){
        direct = "right"
    }
    else if(e.keyCode == 40 && direct != "up"){
        direct = "down"
    }
}

function eatTail(head, arr){
    for(let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y){
            clearInterval(game)
            
        }
    }
}

function drawGame(){
    ctx.drawImage(ground, 0, 0)
    ctx.drawImage(foodImg, food.x , food.y)
    for(let i = 0;i<snake.length;i++){
        ctx.fillStyle = i == 0 ? "blue":"yellow"
        ctx.fillRect(snake[i].x,snake[i].y, box, box)
    }


    ctx.fillStyle = "red";
    ctx.font = "60px Arial"
    ctx.fillText(score, box* 2.5, box*2)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(snakeX == food.x && snakeY == food.y){
        score++
        food = {
            x: Math.floor((Math.random() * 17 + 1)) *box,
            y: Math.floor((Math.random() * 15 + 3))*box
        }
    }else{
        snake.pop()
    }

    if (snakeX < box || snakeX> box*17
        || snakeY<3*box || snakeY >box *17 ){
            clearInterval(game)
            alert("Game over,try again!")
            document.location.reload()
        }
    if(score == 15){
        alert("Wow,You win!!!!")
        document.location.reload()
    }

        
        


    if(direct == "left") snakeX -= box
    if(direct == "right") snakeX += box
    if(direct == "down") snakeY += box
    if(direct == "up") snakeY -= box

    let newH = {
        x:snakeX,
        y:snakeY
    }

    eatTail(newH, snake)

    snake.unshift(newH)
}


let game = setInterval(drawGame, 100)
