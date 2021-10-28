// variables needed
let startButton = document.querySelector('#status');
let levelName;
let randomSpeed = () => { return Math.floor(Math.random() * 3 + 5) }
let gameState = 0
let carSpawnTime = () => {
    let newNum = Math.floor(Math.random() * 2500 + 1000)
    return newNum
}
let carLane = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
]
let spawnOne;
let spawnTwo;
let spawnThree;
let spawnFour;
let spawnFive;
let spawnSix;
let spawnSeven;
let xPosition = [
    [-213, -321, -150, -190, -241, -198, -231],
    [-213, 1200, -150, 1100, -241, 1421, -176]
];
// let yPosition = [0, 50, 100, 150, 200, 250, 300];
let playerLives = 3
let lifeCounter = document.querySelector('#lifeCounter')
const playerLifeText = document.querySelector('#btm-left')

//query selectors
//assets
const game = document.getElementById('canvas')
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
const ctx = game.getContext('2d')

//images
//const objImg = new Image()
//objImg.src = ('pathway')



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
        if (this.direction.left) this.x -= 6
        if (this.x <= 0) {
            this.x = 0
        }
        // move down
        if (this.direction.down) this.y += 4
        if (this.y + this.height >= game.height) {
            this.y = game.height - this.height
        }
        // move right
        if (this.direction.right) this.x += 6
        if (this.x + this.width >= game.width) {
            this.x = game.width - this.width
        }
    }
    //this.render
    render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        //ctx.draw 
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
const detectHit = (thing) => {
    // if the player's x + width or y + height hits the car, kill player
    if (
        thing.x < player.x + player.width &&
        thing.x + thing.width > player.x &&
        thing.y < player.y + player.height &&
        thing.y + thing.height > player.y
    ) {
        // debugger
        player.alive = false
        playerLives--
        lifeCounter.innerText = playerLives
        player.x = 580
        player.y = 410
        player.alive = true
    }
}

let player = new Bambi(580, 410, '#ab650f', 25, 25)
let carSpawn = (xPosition, yPosition, laneArray) => {
    let newCar = new CarObject(xPosition, yPosition, 'white', 150, 45)
    newCar.render()
    laneArray.push(newCar)
    detectHit(newCar)
}
const level = (levelNumber) => {
    console.log(levelNumber)
    // every other lane switches direction for level 2
    //switch movement from += to -= for other direction 
    if (levelNumber < 3) {
        console.log('enter first if')
        spawnOne = setInterval(() => carSpawn(xPosition[levelNumber - 1][0], 0, carLane[0]), carSpawnTime())
        spawnTwo = setInterval(() => carSpawn(xPosition[levelNumber - 1][1], 50, carLane[1]), carSpawnTime())
        spawnThree = setInterval(() => carSpawn(xPosition[levelNumber - 1][2], 100, carLane[2]), carSpawnTime())
        spawnFour = setInterval(() => carSpawn(xPosition[levelNumber - 1][3], 150, carLane[3]), carSpawnTime())
        spawnFive = setInterval(() => carSpawn(xPosition[levelNumber - 1][4], 200, carLane[4]), carSpawnTime())
        spawnSix = setInterval(() => carSpawn(xPosition[levelNumber - 1][5], 250, carLane[5]), carSpawnTime())
        spawnSeven = setInterval(() => carSpawn(xPosition[levelNumber - 1][6], 300, carLane[6]), carSpawnTime())
    }
}

// console.log('level function run')

// }



let carMovement = (direction) => {
    carLane[0].forEach(car => {
        car.x += randomSpeed()
        car.render()
        detectHit(car)
    })
    carLane[1].forEach(car => {
        if (gameState === 1) {
            car.x += randomSpeed()
        }
        else {
            car.direction.right = false
            car.direction.left = true
            car.x -= randomSpeed()
        } car.render()
        detectHit(car)

    })
    carLane[2].forEach(car => {
        car.x += randomSpeed()
        car.render()
        detectHit(car)

    })
    carLane[3].forEach(car => {
        if (gameState === 1) {
            car.x += randomSpeed()
        }
        else {
            car.direction.right = false
            car.direction.left = true
            car.x -= randomSpeed()
        } car.render()
        detectHit(car)

    })
    carLane[4].forEach(car => {
        car.x += randomSpeed()
        car.render()
        detectHit(car)
    })
    carLane[5].forEach(car => {
        if (gameState === 1) {
            car.x += randomSpeed()
        }
        else {
            car.direction.right = false
            car.direction.left = true
            car.x -= randomSpeed()
        } car.render()
        detectHit(car)

    })
    carLane[6].forEach(car => {
        car.x += randomSpeed()
        car.render()
        detectHit(car)
    })
}

// level(gameState)

//function that makes the game run, setInterval
const gameLoop = () => {
    // window.requestAnimationFrame(gameLoop);
    // clear the canvas
    ctx.clearRect(0, 0, game.width, game.height)
    player.render()
    player.movePlayer()

    //game only runs if player alive
    if (player.alive && playerLives > 0 &&
        gameState < 3) {
        carMovement()
        if (player.y <= 0) {
            player.y = 410
            player.x = 580
            ctx.clearRect(0, 0, game.width, game.height)
            gameState++
            console.log(gameState)
            carLane = [
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ]
            clearInterval(spawnOne)
            clearInterval(spawnTwo)
            clearInterval(spawnThree)
            clearInterval(spawnFour)
            clearInterval(spawnFive)
            clearInterval(spawnSix)
            clearInterval(spawnSeven)
            level(gameState)
        }
    }
    else {
        //stop
        stopGameLoop()

    }
}

let stopGameLoop = () => {
    clearInterval(gameLoop)
    clearInterval(level)
}
let gameInterval = setInterval(gameLoop, 30)

document.addEventListener('keydown', (e) => {
    player.setDirection(e.key)
})
document.addEventListener('keyup', (e) => {
    if (['w', 'a', 's', 'd'].includes(e.key)) {
        player.unsetDirection(e.key)
    }
})