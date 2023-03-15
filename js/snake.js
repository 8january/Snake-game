import { getInputDirection } from './input.js'

export const SNAKE_SPEED = 10

const SNAKE_BODY = [{
    x: 11, y: 11
}]

let newSegments = 0

export function update() {
    addSegments()

    const INPUT_DIRECTION = getInputDirection()

    for (let i = SNAKE_BODY.length - 2; i >= 0; i--) {
        SNAKE_BODY[i + 1] = {
            ...SNAKE_BODY[i]
        }
    }

    SNAKE_BODY[0].x += INPUT_DIRECTION.x
    SNAKE_BODY[0].y += INPUT_DIRECTION.y

}

export function draw(gameBoard) {
    SNAKE_BODY.forEach(segment => {
        const SNAKE_ELEMENT = document.createElement('div')
        SNAKE_ELEMENT.style.gridColumnStart = segment.x
        SNAKE_ELEMENT.style.gridRowStart = segment.y
        SNAKE_ELEMENT.classList.add('snake')

        gameBoard.appendChild(SNAKE_ELEMENT)
    });
}

export function expandSnake(amount) {
    newSegments += amount
}

export function addSegments() {
    for (let i = 0; i < newSegments; i++) {

        SNAKE_BODY.push({ ...SNAKE_BODY[SNAKE_BODY.length - 1] })
    }

    newSegments = 0
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return SNAKE_BODY.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return position.x === segment.x && position.y === segment.y
    })
}

export function getSnakeHead() {
    return SNAKE_BODY[0]
}

export function snakeIntersection() {
    return onSnake(getSnakeHead(), {
        ignoreHead: true
    })
}