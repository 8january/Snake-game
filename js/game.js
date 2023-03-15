import { update as updateSnake, draw as drawSnake, SNAKE_SPEED , getSnakeHead, snakeIntersection} from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

const GAME_BOARD = document.getElementById('game-board')

let lastRenderTime = 0
let gameOver = false

requestAnimationFrame(main)

function main(currentTime) {

    if(gameOver){
        if(confirm('You lose!')){
            location.reload()
        }

        return
    }

    requestAnimationFrame(main)
    const SECONDS_SINCE_LAST_RENDER = (currentTime - lastRenderTime) / 1000

    if (SECONDS_SINCE_LAST_RENDER < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    update()
    draw()
}

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    GAME_BOARD.innerHTML = ""
    drawSnake(GAME_BOARD)
    drawFood(GAME_BOARD)
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}