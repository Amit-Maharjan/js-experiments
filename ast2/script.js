const numberOfBalls = 200;
const startAngle = 0;
const PI = Math.PI;
const endAngle = 2 * PI;
const radius = 10;
const xMin = 0 + radius;
const xMax = window.innerWidth - 25 - radius;
const yMin = 0 + radius;
const yMax = window.innerHeight - 25 - radius;

let canvas = document.getElementById('canvas');

canvas.width = window.innerWidth - 25;
canvas.height = window.innerHeight - 25;

let ctx = canvas.getContext('2d');

//Class
function Circle(x, y, radius, color, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.dx = dx;
  this.dy = dy;

  this.drawCircle = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, startAngle, endAngle);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth - 25 || this.x - this.radius < 0)
      this.dx = -this.dx;
    if (this.y + this.radius > innerHeight - 25 || this.y - this.radius < 0)
      this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;

    this.drawCircle();
  };
}

//Random Number Generator Between two points
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var n = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive

  if (n === 0) {
    getRandomInt(min, max);
  } else {
    return n;
  }
}

//Object
let circles = [];

for (let i = 0; i < numberOfBalls; i++) {
  let x = getRandomInt(xMin, xMax);
  let y = getRandomInt(yMin, yMax);
  let rValue = getRandomInt(0, 255);
  let gValue = getRandomInt(0, 255);
  let bValue = getRandomInt(0, 255);
  let color = 'rgb(' + rValue + ',' + gValue + ',' + bValue + ')';
  let dx = getRandomInt(-3, 3); //-3 and 3 are just the random velocity
  let dy = getRandomInt(-3, 3);

  circles[i] = new Circle(x, y, radius, color, dx, dy);
  circles[i].drawCircle();
}

//Animation
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
    //collide();
  }
  collide();
}

animate();

//Collision Detection
function collide() {
  for (let i = 0; i < circles.length; i++) {
    for (let j = 0; j < circles.length; j++) {
      if (i != j) {
        let distanceOfX = circles[i].x - circles[j].x;
        let distanceOfY = circles[i].y - circles[j].y;
        let distance = Math.sqrt(
          distanceOfX * distanceOfX + distanceOfY * distanceOfY
        );

        if (distance < circles[i].radius + circles[j].radius) {
          // collision detected!
          circles[i].dx = -circles[i].dx;
          circles[i].dy = -circles[i].dy;
          circles[i].update();

          circles[j].dx = -circles[j].dx;
          circles[j].dy = -circles[j].dy;
          circles[j].update();
        }
      }
    }
  }
}
