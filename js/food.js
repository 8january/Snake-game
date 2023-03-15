import { onSnake, expandSnake } from "./snake.js"
import { randomGridPosition } from "./grid.js"

let food = getRandomFoodPosition()

const EXPANSION_RATE = 1

export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
    }
}

export function draw(gameBoard) {
    const FOOD_ELEMENT = document.createElement('div')
    FOOD_ELEMENT.style.gridColumnStart = food.x
    FOOD_ELEMENT.style.gridRowStart = food.y
    FOOD_ELEMENT.classList.add('food')

    gameBoard.appendChild(FOOD_ELEMENT)
}

function getRandomFoodPosition() {
    let newFoodPosition

    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }

    return newFoodPosition
}

