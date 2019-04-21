let score = 0;

let canvas = document.getElementById('canvas');

const pixelForWindowsSizeFit = 25;

canvas.width = window.innerWidth - pixelForWindowsSizeFit;
canvas.height = window.innerHeight - pixelForWindowsSizeFit;

let ctx = canvas.getContext('2d');

//Images
let bird = new Image();
let background = new Image();
let footground = new Image();
let pipeup = new Image();
let pipedown = new Image();

bird.src = 'images/bird.png';
background.src = 'images/background.png';
footground.src = 'images/footground.PNG';
pipeup.src = 'images/pipeup.png';
pipedown.src = 'images/pipedown.png';

//Sound
let pressKey = new Audio();
let die = new Audio();
let scoreIncrement = new Audio();

pressKey.src = 'sound/sfx_wing.wav';
die.src = 'sound/sfx_die.wav';
scoreIncrement.src = 'sound/sfx_point.wav';

//Random Number Generator Between two points
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let num = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive

  if (num === 0) {
    getRandomInt(min, max);
  } else {
    return num;
  }
}

//const gapForPipeDown = pipeup.height + getRandomInt(100,200);
const birdX = 10;
let birdY = canvas.height / 2;
const gravity = 1;

let pipe = [];

pipe[0] = {
  pipeX: canvas.width,
  pipeY: 0,
  gapForPipeDown: pipeup.height + getRandomInt(100, 200),
};

//function drawImages()
let drawImages = setInterval(function() {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeup, pipe[i].pipeX, pipe[i].pipeY);
    ctx.drawImage(
      pipedown,
      pipe[i].pipeX,
      pipe[i].pipeY + pipe[i].gapForPipeDown
    );

    pipe[i].pipeX--;

    if (pipe[i].pipeX === 1000) {
      pipe.push({
        pipeX: canvas.width,
        pipeY: 0,
        gapForPipeDown: pipeup.height + getRandomInt(100, 200),
      });
    }

    //Game Over
    if (
      (birdX + bird.width >= pipe[i].pipeX &&
        birdX <= pipe[i].pipeX + pipeup.width &&
        (birdY <= pipe[i].pipeY + pipeup.height ||
          birdY + bird.height >= pipe[i].pipeY + pipe[i].gapForPipeDown)) ||
      birdY + bird.height >= canvas.height - footground.height
    ) {
      die.play();
      //location.reload();
      clearInterval(drawImages);

      ctx.font = '100px arial';
      ctx.fillText('score : ' + score, (canvas.width-400)/2, canvas.height/2);
    }

    if (pipe[i].pipeX === 5) {
      scoreIncrement.play();
      score++;
    }
  }

  ctx.drawImage(
    footground,
    0,
    canvas.height - footground.height,
    canvas.width,
    footground.height
  );
  ctx.drawImage(bird, birdX, birdY);

  birdY += gravity;

  //requestAnimationFrame(drawImages);

  ctx.font = '30px arial';
  ctx.fillText('score : ' + score, 10, canvas.height - 20);
}, 1);

// drawImages();

//Bird Moving Up
document.addEventListener('keydown', moveUp);

function moveUp() {
  birdY -= 20;
  pressKey.play();
}
