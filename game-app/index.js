/* Game init */
const game = document.getElementById('canvas');
const ctx = game.getContext('2d');
/* Game init */

/* Images preload */
const backGround = new Image;
backGround.src = 'assets/images/BG_Sky.png';

const foreGround = new Image;
foreGround.src = 'assets/images/Back.png'

const clouds = new Image;
clouds.src = 'assets/images/BG_Clouds.png'

const sheepImage = new Image;
sheepImage.src = './assets/images/Sheep!.png';

const corgiImage = new Image;
corgiImage.src = './assets/images/Pembroke.png';

const donutImage = new Image;
donutImage.src = './assets/images/Donut.png';

const boneImage = new Image;
boneImage.src = './assets/images/Bone.png';

const gameStart = new Image;
gameStart.src = './assets/images/StartButton.png';

const endGame = new Image;
endGame.src = './assets/images/gameOver.png';
/* Images preload */

/* Sounds preload */
const backMusic = new Audio();
backMusic.src = './assets/sounds/FMT_Game.mp3';
backMusic.loop = true;

const jumpSd = new Audio();
jumpSd.src = './assets/sounds/jump!.mp3';

const doubleJumpSd = new Audio();
doubleJumpSd.src = './assets/sounds/jump.mp3';

const scoreSd = new Audio();
scoreSd.src = './assets/sounds/score.mp3';

const bonusSd = new Audio();
bonusSd.src = './assets/sounds/donut.mp3';

const loseSd = new Audio();
loseSd.src = './assets/sounds/lose.mp3';

const flySound = new Audio();
flySound.src = './assets/sounds/supermen.mp3';
/* Sounds preload */

/* Game stages */
const state = {
    current: 0,
    getReady: 0,
    gameOn: 1,
    gameOver: 2
}

function stageSwitch() {
    switch (state.current) {
        case state.getReady:
            state.current = state.gameOn;
            break;
        case state.gameOn:
            backMusic.play();
            break;
        case state.gameOver:
            location.reload()
            state.current = state.getReady;
            break;
    }
}
/* Game stages */

/* Sky */
class Background {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.width = canvas.width;
        this.height = canvas.height;

        this.image = backGround;
    }

    draw() {
        ctx.drawImage(backGround, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
    }
}

const bg = new Background();
/* Sky */

/* Get Ready */
class GetReady {
    constructor() {
        this.position = {
            x: 300,
            y: game.height - 500
        }

        this.width = 550;
        this.height = 400;

        this.image = gameStart;
    }

    draw() {
        ctx.drawImage(gameStart, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
    }
}

const getReady = new GetReady;
/* Get Ready */

/* Game Over */
class GameOver {
    constructor() {
        this.position = {
            x: 350,
            y: game.height - 580
        }

        this.width = 512;
        this.height = 512;

        this.image = endGame;
    }

    draw() {
        ctx.drawImage(endGame, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
    }
}

const gameEnd = new GameOver;
/* Game Over */

/* Field */
class Foreground {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: -10,
            y: 0
        }

        this.width = canvas.width;
        this.height = canvas.height;

        this.image = foreGround;
    }

    draw() {
        ctx.drawImage(foreGround, this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(foreGround, this.position.x + this.width, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
    }
}

const fg = [new Foreground(), new Foreground(), new Foreground()];

class Clouds {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: -10,
            y: 0
        }

        this.width = canvas.width;
        this.height = canvas.height;

        this.image = clouds;
    }

    draw() {
        ctx.drawImage(clouds, this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(clouds, this.position.x + this.width, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
    }
}

const cld = [new Clouds(), new Clouds(), new Clouds()];
/* Field */

/* Corgi */
const gravity = 1.6;

class Corgi {
    constructor() {
        this.position = {
            x: 100,
            y: 500
        }
        this.velocity = {
            x: 0,
            y: 1
        }

        this.width = 100;
        this.height = 100;

        this.image = corgiImage;
        this.is_jump = false;
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
            y: 500
        }
        this.velocity = {
            x: -12,
            y: 0
        }

        this.width = 110;
        this.height = 110;

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

/* Score */
class Score {
    constructor() {
        this.position = {
            x: 50,
            y: game.height - 580
        }

        this.best = localStorage.getItem('best') || 0;
        this.value = 0;
    }

    count() {
        this.value += 1;
        this.best = Math.max(this.value, this.best);
        localStorage.setItem('best', score.best);
    }

    bonus() {
        this.value += 5;
        this.best = Math.max(this.value, this.best);
        localStorage.setItem('best', score.best);
    }

    high_bonus() {
        this.value += 10;
        this.best = Math.max(this.value, this.best);
        localStorage.setItem('best', score.best);
    }

    draw() {
        ctx.fillStyle = '#1e6743';
        ctx.strokeStyle = '#000';
        ctx.lineWIdth = 2;
        ctx.font = '20px Teko';
        ctx.fillText('Score: ' + this.value, this.position.x, this.position.y);
        ctx.fillText('Best: ' + this.best, 50, game.height - 560);
    }

    update() {
        this.draw();
    }
}
let score = new Score;
/* Score */

/* Bone */
class Bone {
    constructor() {
        this.position = {
            x: 1200,
            y: getRandomValue(100, 400)
        }
        this.velocity = {
            x: -13,
            y: 0
        }

        this.width = 80;
        this.height = 80;

        this.image = boneImage;
    }

    draw() {
        ctx.drawImage(boneImage, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
    }
}
const bones = [];
setInterval(function () {
    bones.push(new Bone())
}, 10000);

setInterval(function () {
    bones.forEach(bone => {
        if (corgi.position.x + corgi.width - 35 >= bone.position.x && corgi.position.x - corgi.width + 35 <= bone.position.x + bone.width - 35
            && corgi.position.y + corgi.height - 35 >= bone.position.y && corgi.position.y - corgi.height + 35 <= bone.position.y + bone.height - 35) {
            console.log('bonus');
            bones.shift();
            bonusSd.play();
            score.bonus();
        }
    })
}, 100)
/* Bone */

/* Donut */
class Donut {
    constructor() {
        this.position = {
            x: 1200,
            y: getRandomValue(100, 400)
        }
        this.velocity = {
            x: -16,
            y: 0
        }

        this.width = 80;
        this.height = 80;

        this.image = donutImage;
    }

    draw() {
        ctx.drawImage(donutImage, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
    }
}
const donuts = [];
setInterval(function () {
    donuts.push(new Donut())
}, 20000);

setInterval(function () {
    donuts.forEach(donut => {
        if (corgi.position.x + corgi.width - 40 >= donut.position.x && corgi.position.x - corgi.width + 40 <= donut.position.x + donut.width - 40
            && corgi.position.y + corgi.height - 40 >= donut.position.y && corgi.position.y - corgi.height + 40 <= donut.position.y + donut.height - 40) {
            console.log('bonus');
            donuts.shift();
            bonusSd.play();
            score.high_bonus();
        }
    });
}, 100)
/* Donut */

/* Animation */
function animate() {
    requestAnimationFrame(animate);
    bg.update();
    if (state.current === 0) {
        getReady.update();
    }
    if (state.current === 1) {
        fg.forEach((elem) => {
            elem.update();
            if (elem.position.x + elem.width <= 0) {
                fg.push(new Foreground);
                fg.shift();
            }
        });
        cld.forEach((cloud) => {
            cloud.update();
            if (cloud.position.x + cloud.width <= 0) {
                cld.push(new Clouds);
                cld.shift();
            }
        });
        corgi.update();
        sheeps.forEach((sheep) => {
            sheep.update();
            if (sheep.position.x + sheep.width <= 0) {
                score.count();
                scoreSd.play();
                sheeps.shift();
            }
        })
        donuts.forEach((donut) => {
            donut.update();
            if (donut.position.x + donut.width <= 0) {
                donuts.shift();
            }
        })
        bones.forEach((bone) => {
            bone.update();
            if (bone.position.x + bone.width <= 0) {
                bones.shift();
            }
        })
        score.update();
    }
    if (state.current === 2) {
        gameEnd.update();
    }
}
/* Animation */

/* Lose */
setInterval(function () {
    sheeps.forEach(sheep => {
        if (state.current != state.gameOver && corgi.position.x + corgi.width - 45 > sheep.position.x && corgi.position.x - corgi.width + 45 < sheep.position.x + sheep.width - 45
            && corgi.position.y + corgi.height - 45 > sheep.position.y && corgi.position.y - corgi.height + 45 < sheep.position.y + sheep.height - 45) {
            console.log('lose');
            loseSd.play();
            state.current = state.gameOver;
            backMusic.pause();
            setTimeout( countLastResults, 2000);
        }
    })
}, 100)
/* Lose */

/* Local Storage */
function countLastResults() {
    const lastGames = localStorage.getItem('lastGames') ? JSON.parse(localStorage.getItem('lastGames')) : [];
    console.log(lastGames);
    lastGames.push(score.value);
    if (lastGames.length > 10) {
        lastGames.shift();
    }

    localStorage.setItem('lastGames', JSON.stringify(lastGames));

    let restoredLastGames = JSON.parse(localStorage.getItem('lastGames'));

    console.log(restoredLastGames);

    let record = "<table align='center'>";
    record += "<tr><th>Your Score:" + score.value + "</th><th>Best Score:" + score.best + "</th></tr>";
    record += "<tr><th colspan='2'>Last Games</th></tr>";
    record += "<tr><th>Game №</th><th>Score</th></tr>";
    for (i = 0; i < restoredLastGames.length; i++) {
        var key = localStorage.key(i);
        var person = localStorage.getItem(key);
        record += "<tr><td>" + (i+1) + " </td>";
        record += "<td>" + restoredLastGames[i] + "</td>";
    }
    record += "</table>";
    dvcontainer = document.querySelector(".result_block");
    dvcontainer.innerHTML = record;
    wrapper = document.querySelector(".wrapper");
    wrapper.classList.add('active');
}
/* Local Storage */


/* Movement */
const keyS = {
    jump: {
        pressed: false
    },
    double_jump: {
        pressed: false
    }
}

document.addEventListener('keydown', function (event) {
    keyCode = event.keyCode;

    if (keyCode === 13) {
        stageSwitch();
    }
    if (state.current == state.gameOn) {

        switch (keyCode) {
            case 81:
                console.log('jump');
                if (keyS.jump.pressed) {
                    return;
                }
                if (!keyS.jump.pressed && corgi.velocity.y === 0) {
                    corgi.velocity.y -= 20;
                    keyS.jump.pressed = true;
                    jumpSd.play();
                } else corgi.velocity.y = 0;
                break;
            case 87:
                console.log('double_jump');
                if (keyS.double_jump.pressed) {
                    return;
                }
                if (!keyS.double_jump.pressed && corgi.velocity.y === 0) {
                    corgi.velocity.y -= 27;
                    keyS.double_jump.pressed = true;
                    doubleJumpSd.play();
                } else corgi.velocity.y = 0;
                break;
        }
    }

});

document.addEventListener('keyup', ({ keyCode }) => {
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

animate();



/*
clearSetInterval(your_interval_name)

sheeps.forEach((sheep) => {
    if (sheep.x + sheep.width <= 0) {
        score.count();
        scoreSd.play();
        sheeps.shift();
    }
})

renderImg() {

}

updateImgaPlase() {
    this.x = x 
    this.y = y
}

/* Stages 
function stagesBg() {
    requestAnimationFrame(animate);
    bg.update();
    if (state.current === state.getReady) {
        getReady.update();
    }
    if (state.current === state.gameOver) {
        gameEnd.update();
    }
}

Stages */

/*function stageCall() {
    if (state.current === state.getReady) {
        stagesBg();
        console.log(state.current);
    }
    if (state.current === state.gameOn) {
        console.log(state.current);
        animate();
        backMusic.play();
    }
    if (state.current === state.gameOver) {
        stagesBg();
        console.log(state.current);
    }
}*/


