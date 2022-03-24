window.addEventListener('load', function () {
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

    const jumpCorgi = new Image;
    jumpCorgi.src = './assets/images/Pembroke_Jump.png';

    const donutImage = new Image;
    donutImage.src = './assets/images/Donut.png';

    const boneImage = new Image;
    boneImage.src = './assets/images/Bone.png';

    const gameStart = new Image;
    gameStart.src = './assets/images/StartButton.png';

    const endGame = new Image;
    endGame.src = './assets/images/gameOver.png';

    const darkCorgi = new Image;
    darkCorgi.src = './assets/images/DarkCorgi.png';

    const darkCorgiJump = new Image;
    darkCorgiJump.src = './assets/images/DarkCorgi_Jump.png';

    const coatImage = new Image;
    coatImage.src = './assets/images/redCoat.png';
    /* Images preload */

    /* Sounds preload */
    const backMusic = new Audio();
    backMusic.src = './assets/sounds/FMT_Game.mp3';
    backMusic.loop = true;

    const swipeSd = new Audio();
    swipeSd.src = './assets/sounds/jump!.mp3';

    const JumpSd = new Audio();
    JumpSd.src = './assets/sounds/jump.mp3';

    const scoreSd = new Audio();
    scoreSd.src = './assets/sounds/score.mp3';

    const bonusSd = new Audio();
    bonusSd.src = './assets/sounds/donut.mp3';

    const loseSd = new Audio();
    loseSd.src = './assets/sounds/lose.mp3';

    const flySound = new Audio();
    flySound.src = './assets/sounds/supermen.mp3';

    const muteBtn = document.querySelector('.mute');

    muteBtn.addEventListener('click', () => {
        if (backMusic.muted) {
            backMusic.muted = false;
            swipeSd.muted = false;
            JumpSd.muted = false;
            scoreSd.muted = false;
            bonusSd.muted = false;
            loseSd.muted = false;
            flySound.muted = false;
            muteBtn.innerText = 'mute';
        } else {
            backMusic.muted = true;
            backMusic.muted = true;
            swipeSd.muted = true;
            JumpSd.muted = true;
            scoreSd.muted = true;
            bonusSd.muted = true;
            loseSd.muted = true;
            flySound.muted = true;
            muteBtn.innerText = 'unmute';
        }
    });
    /* Sounds preload */

    /* Game stages */
    const state = {
        current: 0,
        getReady: 0,
        gameOn: 1,
        gameOver: 2
    };

    function stageSwitch() {
        switch (state.current) {
            case state.getReady:
                state.current = state.gameOn;
                break;
            case state.gameOn:

                backMusic.play();
                break;
            case state.gameOver:
                location.reload();
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
            };

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
            };

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
            };

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
    let groundSpeed = 6

    setInterval(function increaseSpeed() {
        if (state.current === 1) {
            groundSpeed += 2;
        }
    }, 20000);

    class Foreground {
        constructor() {
            this.position = {
                x: 0,
                y: 0
            };

            this.velocity = groundSpeed;

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
            this.position.x -= this.velocity;
        }
    }

    const fg = [new Foreground(), new Foreground()];

    class Clouds {
        constructor() {
            this.position = {
                x: 0,
                y: 0
            };

            this.velocity = (groundSpeed / 2);

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
            this.position.x -= this.velocity;
        }
    }

    const cld = [new Clouds(), new Clouds()];
    /* Field */

    /* Corgi */
    let gravity = 1.7;

    class Corgi {
        constructor() {
            this.position = {
                x: 100,
                y: 500
            };

            this.velocity = {
                x: 0,
                y: 0
            };

            this.width = 100;
            this.height = 100;

            this.image = corgiImage;
            this.image = jumpCorgi;

        }

        draw() {
            if (this.velocity.y === 0) {
                ctx.drawImage(corgiImage, this.position.x, this.position.y, this.width, this.height);
            } else ctx.drawImage(jumpCorgi, this.position.x, this.position.y, this.width, this.height);
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

    /* Movement */
    const keys = {
        jump: {
            pressed: false
        },
        swipe: {
            pressed: false
        },
        up: {
            pressed: false
        },
        down: {
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
                /*case 83:
                    if (keys.swipe.pressed) {
                        return;
                    }
                    if (!keys.swipe.pressed && corgi.velocity.y === 0) {
                        setTimeout(function () {
                            corgi.velocity.y += 1;
                            swipeSd.play();
                        }, 2000);
                        keys.swipe.pressed = true;
                    }else corgi.velocity.y = 0;
                    break;*/
                case 87:
                    if (keys.jump.pressed) {
                        return;
                    }
                    if (!keys.jump.pressed && corgi.velocity.y === 0) {
                        corgi.velocity.y = -30;
                        keys.jump.pressed = true;
                        JumpSd.play();
                    } else corgi.velocity.y += gravity;
                    break;
            }
        }
    });

    document.addEventListener('keyup', ({
        keyCode
    }) => {
        switch (keyCode) {
            case 83:
                keys.swipe.pressed = false;
                break;
            case 87:
                keys.jump.pressed = false;
                break;
        }
    });
    /* Movement */

    let speed = 10;

    setInterval(function increaseDifficulty() {
        if (state.current === 1) {
            speed += 2;
        }
    }, 15000);

    /* Sheeps */
    class Sheep {
        constructor() {
            this.position = {
                x: 1200,
                y: 500
            };
            this.velocity = speed;
            this.width = 110;
            this.height = 110;

            this.image = sheepImage;
        }

        draw() {
            ctx.drawImage(sheepImage, this.position.x, this.position.y, this.width, this.height);
        }

        update() {
            this.draw();
            this.position.x -= this.velocity;

        }
    }
    const sheeps = [];

    setInterval(function () {
        if (state.current === 1) {
            const randomValue = getRandomValue(0, 100);
            if (randomValue > 65) {
                sheeps.push(new Sheep())
            }
        }
    }, 900);

    function getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }
    /* Sheeps */

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
                    y: getRandomValue(200, 400)
                },
                this.velocity = {
                    x: -13,
                    y: 0
                },

                this.width = 80,
                this.height = 80,

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
        if (state.current === 1) {
            bones.push(new Bone());
        }
    }, 10000);


    setInterval(function () {
        bones.forEach(bone => {
            if (corgi.position.x + corgi.width - 35 >= bone.position.x && corgi.position.x - corgi.width + 35 <= bone.position.x + bone.width - 35 &&
                corgi.position.y + corgi.height - 35 >= bone.position.y && corgi.position.y - corgi.height + 35 <= bone.position.y + bone.height - 35) {
                console.log('bonus');
                bones.shift();
                bonusSd.play();
                score.bonus();
            }
        });
    }, 100);
    /* Bone */

    /* Donut */
    class Donut {
        constructor() {
            this.position = {
                    x: 1200,
                    y: getRandomValue(200, 400)
                },
                this.velocity = {
                    x: -16,
                    y: 0
                },

                this.width = 80,
                this.height = 80,

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
        if (state.current === 1) {
            donuts.push(new Donut())
        }
    }, 20000);



    setInterval(function () {
        donuts.forEach(donut => {
            if (corgi.position.x + corgi.width - 40 >= donut.position.x && corgi.position.x - corgi.width + 40 <= donut.position.x + donut.width - 40 &&
                corgi.position.y + corgi.height - 40 >= donut.position.y && corgi.position.y - corgi.height + 40 <= donut.position.y + donut.height - 40) {
                console.log('bonus');
                donuts.shift();
                bonusSd.play();
                score.high_bonus();
            }
        });
    }, 100);
    /* Donut */

    /* Fly Coat */
    class Coat {
        constructor() {
            this.position = {
                    x: 1200,
                    y: getRandomValue(200, 350)
                },
                this.velocity = {
                    x: -18,
                    y: 0
                },

                this.width = 70,
                this.height = 70,

                this.image = coatImage;
        }

        draw() {
            ctx.drawImage(coatImage, this.position.x, this.position.y, this.width, this.height);
        }

        update() {
            this.draw();
            this.position.x += this.velocity.x;
        }
    }
    const coats = [];

    setInterval(function () {
        if (state.current === 1) {
            coats.push(new Coat());
        }
    }, 35000);

    setInterval(function () {
        coats.forEach(coat => {
            if (corgi.position.x + corgi.width - 30 >= coat.position.x && corgi.position.x - corgi.width + 30 <= coat.position.x + coat.width - 30 &&
                corgi.position.y + corgi.height - 30 >= coat.position.y && corgi.position.y - corgi.height + 30 <= coat.position.y + coat.height - 30) {
                console.log('bonus');
                coats.shift();
                backMusic.pause();
                flySound.play();
                document.addEventListener('keydown', function (event) {
                    keyCode = event.keyCode;
                    switch (keyCode) {
                        case 40:
                            if (keys.down.pressed) {
                                return;
                            }
                            if (!keys.down.pressed) {
                                corgi.velocity.y += 6;
                                keys.down.pressed = true;
                                break;
                            };
                        case 38:
                            if (keys.up.pressed) {
                                return;
                            }
                            if (!keys.up.pressed) {
                                corgi.velocity.y -= 6;
                                keys.up.pressed = true;
                                break;
                            }
                    }
                });
                document.addEventListener('keyup', ({
                    keyCode
                }) => {
                    switch (keyCode) {
                        case 38:
                            keys.up.pressed = false;
                            break;
                        case 40:
                            keys.down.pressed = false;
                            break;
                    }
                });
                corgi.velocity.y = -1;
                gravity = 0;
                keys.jump.pressed = true;
                keys.swipe.pressed = true;
                setTimeout(function () {
                    gravity = 1.7;
                    corgi.velocity.y += gravity;
                    backMusic.play();
                }, 15000);
            }
        });
    }, 100);
    /* Fly Coat */

    /* Lose */
    setInterval(function () {
        sheeps.forEach(sheep => {
            if (state.current != state.gameOver && corgi.position.x + corgi.width - 45 > sheep.position.x && corgi.position.x - corgi.width + 45 < sheep.position.x + sheep.width - 45 &&
                corgi.position.y + corgi.height - 45 > sheep.position.y && corgi.position.y - corgi.height + 45 < sheep.position.y + sheep.height - 45) {
                console.log('lose');
                loseSd.play();
                state.current = state.gameOver;
                backMusic.pause();
                setTimeout(countLastResults, 2000);
            }
        });
    }, 100);
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
            record += "<tr><td>" + (i + 1) + " </td>";
            record += "<td>" + restoredLastGames[i] + "</td>";
        }
        record += "</table>";
        dvcontainer = document.querySelector(".result_block");
        dvcontainer.innerHTML = record;
        wrapper = document.querySelector(".wrapper");
        wrapper.classList.add('active');
    }
    /* Local Storage */

    /* Animation */
    function animate() {
        requestAnimationFrame(animate);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bg.update();
        if (state.current === 0) {
            getReady.update();
        }
        if (state.current === 1) {
            cld.forEach((cloud) => {
                cloud.update();
                if (cloud.position.x + cloud.width <= 0) {
                    cld.push(new Clouds);
                    cld.shift();
                }
            });
            fg.forEach((elem) => {
                elem.update();
                if (elem.position.x + elem.width <= 0) {
                    fg.push(new Foreground);
                    fg.shift();
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
            });
            donuts.forEach((donut) => {
                donut.update();
                if (donut.position.x + donut.width <= 0) {
                    donuts.shift();
                }
            });
            bones.forEach((bone) => {
                bone.update();
                if (bone.position.x + bone.width <= 0) {
                    bones.shift();
                }
            });
            coats.forEach((coat) => {
                coat.update();
                if (coat.position.x + coat.width <= 0) {
                    coats.shift();
                }
            });
            score.update();
        }
        if (state.current === 2) {
            gameEnd.update();
        }
    }

    /* Animation */


    animate();

});



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

/* 

class Background {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.image = backGround;
        this.parallax1 = foreGround;
        this.parallax1X = 0;
        this.parallax2 = clouds;
        this.parallax2X = 0;

        this.position = {
            x: 0,
            y: 0
        }
        this.width = 1200;
        this.height = 600;
    
    }
    draw(context) {
        ctx.drawImage(this.parallax2, this.parallax2X, this.y, this.width, this.height);
        ctx.drawImage(this.parallax2, this.parallax2X + this.width, this.y, this.width, this.height);

        ctx.drawImage(this.parallax1, this.parallax1X, this.y, this.width, this.height);
        ctx.drawImage(this.parallax1, this.parallax1X + this.width, this.y, this.width, this.height);

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);

    }
    update() {
        this.parallax1X -= 6;
        this.parallax2X -= 3;

        if (this.x < 0 - this.width) this.x = 0;
        if (this.parallax1X < 0 - this.width) this.parallax1X = 0;
        if (this.parallax2X < 0 - this.width) this.parallax2X = 0;
        
        this.draw(ctx);
    }
}

const bg = new Background();



 class InputHandler {
    constructor() {
      this.keys = [];
      window.addEventListener('keydown', (e) => {
        if ((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') && this.keys.indexOf(e.key) === -1) {
          this.keys.push(e.key);
        }
      });
      window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
      });
    }
  }


    //controls
      if (input.keys.indexOf('ArrowUp') > -1 && this.groundCheck()) {
        this.vy = -20;
      } else if (input.keys.indexOf('ArrowLeft') > -1) {
        this.speed = -5;
      } else if (input.keys.indexOf('ArrowRight') > -1) {
        this.speed = 5;
      } else {
        this.speed = 0;
      }

      //horizontal move
      this.x += this.speed;
      if (this.x < 0) this.x = 0;
      else if (this.x > canvas.width - this.width) this.x = canvas.width - this.width;

      //vertical move
      this.y += this.vy;
      if (!this.groundCheck()) {
        this.vy += this.gravity;
        this.frameX = 18;
      } else {
        this.vy = 0;
        // this.frameX = 0;
      }

      if (this.y > this.gameHeight - this.height) this.y = this.playerHeight;
    }

    groundCheck() {
      return this.y >= this.playerHeight;
    }
  }
*/