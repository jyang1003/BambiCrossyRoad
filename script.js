// variables needed
let startButton;
let levelName;
let carSpawnTime = Math.floor(Math.random() * 2500 + 1000)
let carSize = () => { let size = Math.floor(Math.random() * 120 + 70) }
let maxCarsOne = 6
let maxCarsTwo = 6
let maxCarsThree = 6
let maxCarsFour = 6
let playerLives = 3

const playerLifeText = document.querySelector('#btm-left')

//query selectors
//assets
const game = document.getElementById('canvas')
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
const ctx = game.getContext('2d')


//bambi object
class Bambi {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
        this.direction = {
            up: false,
            down: false,
            right: false,
            left: false
        }
    }
    //player movement 
    setDirection(key) {
        console.log('the key pressed', key)
        // pressing key moves the character in direction
        if (key.toLowerCase() == 'w') this.direction.up = true
        if (key.toLowerCase() == 'a') this.direction.left = true
        if (key.toLowerCase() == 's') this.direction.down = true
        if (key.toLowerCase() == 'd') this.direction.right = true
    }
    // we also need to consider keyup events and 'unset' that direction
    unsetDirection(key) {
        if (key.toLowerCase() == 'w') this.direction.up = false
        if (key.toLowerCase() == 'a') this.direction.left = false
        if (key.toLowerCase() == 's') this.direction.down = false
        if (key.toLowerCase() == 'd') this.direction.right = false
    }
    movePlayer() {
        if (this.direction.up) this.y -= 4
        if (this.y <= 0) {
            this.y = 0
        }
        if (this.direction.left) this.x -= 4
        if (this.x <= 0) {
            this.x = 0
        }
        // move down
        if (this.direction.down) this.y += 4
        if (this.y + this.height >= game.height) {
            this.y = game.height - this.height
        }
        // move right
        if (this.direction.right) this.x += 4
        if (this.x + this.width >= game.width) {
            this.x = game.width - this.width
        }
    }
    render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

//car object
class CarObject {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
        this.direction = {
            up: false,
            down: false,
            right: true,
            left: false
        }
    }
        render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    
}
//bambi mom object
class BambiMom {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = false
    }
    render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

let player = new Bambi(580, 410, '#ab650f', 25, 25)
let carLaneOne = new CarObject(0, 0, 'white', 150, 45)
let carLaneTwo = new CarObject(0, 50, 'white', 150, 45)
let carLaneThree = new CarObject(0, 100, 'white', 150, 45)
let carLaneFour = new CarObject(0, 150, 'white', 150, 45)
let carSpawn = () => {
    carLaneOne.render()
    carLaneTwo.render()
    carLaneThree.render()
    carLaneFour.render()
};
let carMovement = (e) => {
    carLaneOne.x += 5
    carLaneTwo.x += 5
    carLaneThree.x += 5
    carLaneFour.x += 5
}
let spawn = () => setInterval(carSpawn, carSpawnTime)
//function that makes the game run, setInterval
const gameLoop = () => {
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    player.render()
    player.movePlayer()
    carSpawn()
    //game only runs if player alive
    if (player.alive) {
        carMovement()
        detectHit(player)

        

    }
    else {
        if (player.lives > 0) {
            player.x = 390
            player.y = 50
            player.alive = true
            playerLives--
            playerLifeText.innerHTML = playerLives
        }
        else {
            stopGameLoop
        }
    }

}
const detectHit = (thing) => {
    // if the player's x + width or y + height hits the car, kill player
    if (
        player.x < thing.x + thing.width &&
        player.x + player.width > thing.x &&
        player.y < thing.y + thing.height &&
        player.y + player.height > thing.y
    ) {
        player.alive = false
    }
}
let stopGameLoop = () => clearInterval(gameLoop)
let gameInterval = setInterval(gameLoop, 30)

document.addEventListener('keydown', (e) => {
    player.setDirection(e.key)
})
document.addEventListener('keyup', (e) => {
    if (['w', 'a', 's', 'd'].includes(e.key)) {
        player.unsetDirection(e.key)
    }
})
//car gets deleted when it reaches end
//new car comes out
//set interval changes randomly to random car spawn
//change level when bembi reaches the end by resetting bambi position and clearing car positions
// delete car when it reaches end
// same amount of lanes for now
