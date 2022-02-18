/* Game init */
const game = document.getElementById('canvas');
const ctx = game.getContext('2d');
/* Game init */

/* Images preload */
const backGround = new Image;
backGround.src = 'assets/images/bg.png';

const sheepImage = new Image;
sheepImage.src = './assets/images/sheep.png';

const corgiImage = new Image;
corgiImage.src = './assets/images/puppy.png';
/* Images preload */

/* Sound */
let backMusic = new Audio();
backMusic.src = './assets/sounds/mario_bg.mp3';
/*backMusic.play(); */

let jumpSd = new Audio();
jumpSd.src = './assets/sounds/jump!.mp3';

let doubleJumpSd = new Audio();
doubleJumpSd.src = './assets/sounds/jump.mp3';

let scoreSd = new Audio();
scoreSd.src = './assets/sounds/score.mp3';

let loseSd = new Audio();
loseSd.src = './assets/sounds/lose.mp3';
/* Sound */


/* Field */
class Background {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        /*this.velocity = {
            x: -3,
            y: 0
        }*/

        this.width = canvas.width;
        this.height = canvas.height;

        this.image = backGround;
    }

    draw() {
        ctx.drawImage(backGround, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        /*this.position.x += this.velocity.x;*/
    }
}

const bg = new Background();
/* Field */

/* Corgi */
const gravity = 1.1;

class Corgi {
    constructor() {
        this.position = {
            x: 50,
            y: 500
        }
        this.velocity = {
            x: 0,
            y: 1
        }

        this.width = 90;
        this.height = 90;

        this.image = corgiImage;
    }

    draw() {
        ctx.drawImage(corgiImage, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } else this.velocity.y = 0;
    }
}

const corgi = new Corgi();
/* Corgi */

/* Sheep */
class Sheep {
    constructor() {
        this.position = {
            x: 1200,
            y: 520
        }
        this.velocity = {
            x: -4.5,
            y: 0
        }

        this.width = 80;
        this.height = 80;

        this.image = sheepImage;
    }

    draw() {
        ctx.drawImage(sheepImage, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
    }
}
const sheeps = [];
setInterval(function () {
    const randomValue = getRandomValue(0, 100);
    if (randomValue > 65) {
        sheeps.push(new Sheep())
    }
}, 900);

function getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}
/* Sheep */

/* Movement */
const keyS = {
    jump: {
        pressed: false
    },
    double_jump: {
        pressed: false
    }
}

addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 81:
            console.log('jump');
            if (!keyS.jump.pressed && corgi.velocity.y === 0) {
                corgi.velocity.y -= 24;
                keyS.jump.pressed = true;
                jumpSd.play();
            } else corgi.velocity.y = 0;
            break;
        case 87:
            console.log('double_jump');
            if (!keyS.double_jump.pressed && corgi.velocity.y === 0) {
                corgi.velocity.y -= 30;
                keyS.double_jump.pressed = true;
                doubleJumpSd.play();
            } else corgi.velocity.y = 0;
            break;
    }
});

addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 81:
            corgi.velocity.y = 0;
            keyS.jump.pressed = false;
            break;
        case 87:
            corgi.velocity.y = 0;
            keyS.double_jump.pressed = false;
            break;
    }
});
/* Movement */

/* Lose */
setInterval(function () {
    sheeps.forEach(sheep => {
        if (corgi.position.x + corgi.width - 45 > sheep.position.x && corgi.position.x - corgi.width + 45 < sheep.position.x + sheep.width - 45
            && corgi.position.y + corgi.height - 45 > sheep.position.y && corgi.position.y - corgi.height + 45 < sheep.position.y + sheep.height - 45) {
            console.log('lose');
            loseSd.play();
            location.reload();
        }
    })
}, 100)
/* Lose */

/* Score */
class Score {
    constructor() {
        this.position = {
            x: 50,
            y: game.height - 580
        }

        this.value = 0;
    }

    count() {
        this.value += 1;
    }

    draw() {
        ctx.fillStyle = '#FFF';
        ctx.strokeStyle = '#000';
        ctx.lineWIdth = 2;
        ctx.font = '20px Teko';
        ctx.fillText('Score: ' + this.value, this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
}
let score = new Score;
/* Score */

/* Animation */
function animate() {
    requestAnimationFrame(animate);
    bg.update();
    corgi.update();
    sheeps.forEach((sheep) => {
        sheep.update();
        if (sheep.position.x + sheep.width <= 0) {
            score.count();
            scoreSd.play();
            sheeps.shift();
        }
    })
    score.update();
}
animate();
/* Animation */

/*
sheeps.forEach((sheep) => {
    if (sheep.x + sheep.width <= 0) {
        score.count();
        scoreSd.play();
        sheeps.shift();
    }
})

corgiImage.style.transform = 'rotate(-180deg)'; 

renderImg() {

}

updateImgaPlase() {
    this.x = x 
    this.y = y
}

const corgi = document.getElementById('corgi');
const sheep = document.getElementById('sheep');

function corgiJump() {
    console.log(corgi.classList);
        corgi.classList.add('jump');
    
    setTimeout( function () {
        corgi.classlist.remove('jump');
    }, 300);
}

document.addEventListener('keydown', function () {
    corgiJump();
}) 

if (sheep[i].x <= 0) {
            sheeps.
        }
*/

/*const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2
}

game.addEventListener('keydown', function (event) {
    switch (state.current) {
        case state.getReady:
            state.current = state.game;
            break;
        case state.game:
            corgi.lose();
            break;
        case state.over:
            state.current = state.getReady;
            break;
    }
})

clearSetInterval(your_interval_name)
*/
