// variables needed
let startButton;
let levelName;
let carSpawnTime = Math.floor(Math.random() * 2500 + 1000)
const ctx = game.getContext('2d')
let carSize = Math.floor(Math.random() * 100 + 70)
let maxCarsOne = 6
let maxCarsTwo = 6
let maxCarsThree = 6
let maxCarsFour = 6

//query selectors
//assets
const game = document.getElementById('canvas')
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])


//bambi object
class Bambi {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
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
        if (this.direction.up) this.y -= 15
        if (this.y <= 0) {
            this.y = 0
        }
        if (this.direction.left) this.x -= 15
        if (this.x <= 0) {
            this.x = 0
        }
        // move down
        if (this.direction.down) this.y += 15
        if (this.y + this.height >= game.height) {
            this.y = game.height - this.height
        }
        // move right
        if (this.direction.right) this.x += 15
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
            right: false,
            left: true
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

let player = new Bambi(50, 50, '#ab650f',25, 25)
let carLaneOne = new CarObject(0, 0, '#7d7d78', carSize, 45)
//function that makes the game run, setInterval

const detectHit = (thing) => {
    // if the player's x + width or y + height hits the ogre's x+width or y+height, kill shrek
    if (
        player.x < thing.x + thing.width &&
        player.x + player.width > thing.x &&
        player.y < thing.y + thing.height &&
        player.y + player.height > thing.y
    ) {
        player.alive = false
    }
}

//car movement function
//car gets deleted when it reaches end
//new car comes out
//set interval changes randomly to random car spawn
//change level when bembi reaches the end by resetting bambi position and clearing car positions
// delete car when it reaches end
// make car appear in random y position when that car gets deleted, if checks based on rng and amount of lanes
// y position changes to an index in array 
// same amount of lanes for now
