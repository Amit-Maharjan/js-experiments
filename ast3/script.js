function playGame() {
  let startGame = document.getElementById('play-game');
  startGame.style.display = 'none';

  let score = 0;

  let canvas = document.getElementById('canvas');

  canvas.style.display = 'block';

  const pixelForWindowsSizeFit = 25;

  canvas.width = 500; //window.innerWidth - pixelForWindowsSizeFit;
  canvas.height = window.innerHeight - pixelForWindowsSizeFit;

  let ctx = canvas.getContext('2d');

  //Images
  let bird = new Image();
  let background = new Image();
  let footground = new Image();
  let pipeup = new Image();
  let pipedown = new Image();
  let playAgain = new Image();

  bird.src = 'images/bird.png';
  background.src = 'images/background.png';
  footground.src = 'images/footground.PNG';
  pipeup.src = 'images/pipeup.png';
  pipedown.src = 'images/pipedown.png';
  playAgain.src = 'images/playAgain.png';

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
  const gravity = 2;

  let pipe = [];

  pipe[0] = {
    pipeX: canvas.width,
    pipeY: getRandomInt(-100, 0), //0,
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

      if (pipe[i].pipeX === 100) {
        pipe.push({
          pipeX: canvas.width,
          pipeY: 0,
          gapForPipeDown: pipeup.height + getRandomInt(100, 200),
        });
      }

      //Game Over
      if (
        (birdX + bird.width * 2 >= pipe[i].pipeX &&
          birdX <= pipe[i].pipeX + pipeup.width &&
          (birdY <= pipe[i].pipeY + pipeup.height ||
            birdY + bird.height * 2 >=
              pipe[i].pipeY + pipe[i].gapForPipeDown)) ||
        birdY + bird.height * 2 >= canvas.height - footground.height
      ) {
        die.play();

        clearInterval(drawImages);

        ctx.font = '100px arial';
        ctx.fillText(
          'score : ' + score,
          (canvas.width - 400) / 2,
          canvas.height / 2 + 50
        );

        ctx.fillStyle = 'grey';
        ctx.fillRect(canvas.width / 2 - 165, canvas.height / 2 + 80, 315, 80);

        ctx.fillStyle = 'red';
        ctx.font = '50px arial';
        ctx.fillText(
          'Play Again',
          canvas.width / 2 - 155,
          canvas.height / 2 - 13 + 150
        );

        ctx.drawImage(
          playAgain,
          canvas.width / 2 + 90,
          canvas.height / 2 + 95,
          50,
          50
        );

        flagForReload = 1;
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
    ctx.drawImage(bird, birdX, birdY, 34 * 2, 24 * 2);

    birdY += gravity;

    //requestAnimationFrame(drawImages);

    ctx.font = '30px arial';
    ctx.fillText('score : ' + score, 10, canvas.height - 20);
  }, 1);

  // drawImages();

  //Bird Moving Up
  document.addEventListener('keydown', moveUp);

  function moveUp(event) {
    if (event.keyCode === 38) {
      birdY -= 30;
      pressKey.play();
    }
  }
}

let flagForReload = 0;

function reload(event) {
  if (flagForReload === 1) {
    let x = event.clientX;
    let y = event.clientY;
    if (x >= 430 && x <= 745 && (y >= 450 && y <= 530)) {
      //location.reload();
      playGame();
    }
  }
}
