const numberOfBalls = 200;
const startAngle = 0;
const PI = Math.PI;
const endAngle = 2 * PI;
const radius = 10;
const xMin = 0 + radius;
const xMax = window.innerWidth - 25 - radius;
const yMin = 0 + radius;
const yMax = window.innerHeight - 25 - radius;
const velocity = 3;

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
  let num = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive

  if (num === 0) {
    getRandomInt(min, max);
  } else {
    return num;
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
  let dx = getRandomInt(-velocity, velocity);
  let dy = getRandomInt(-velocity, velocity);

  //This was the code for checking overlapping coordinates before drawing circles but it made broswer slow for circles < 500
  /*
  if (i !== 0) {
    for (let j = 0; j < circles.length; j++) {
      let xDistance = x - circles[j].x;
      let yDistance = y - circles[j].y;
      let distanceBetweenThem = Math.sqrt(
        xDistance * xDistance + yDistance * yDistance
      );

      if(distanceBetweenThem === radius * 2){
        let x = getRandomInt(xMin, xMax);
        let y = getRandomInt(yMin, yMax);

        j=-1;//For repeating the loop again and again until non-overlapping circles are generated
      }
    }
  }
  */

  circles[i] = new Circle(x, y, radius, color, dx, dy);
  circles[i].drawCircle();
}

//Animation
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
    //checkCollisione();
  }
  checkCollision();
}

animate();

//Functions For Rotation
function rotateVelocityX(dx, dy, angle) {
  return dx * Math.cos(angle) - dy * Math.sin(angle);
}

function rotateVelocityY(dx, dy, angle) {
  return dx * Math.sin(angle) + dy * Math.cos(angle);
}

//Collision Detection
function checkCollision() {
  for (let i = 0; i < circles.length; i++) {
    for (let j = 0; j < circles.length; j++) {
      if (i != j) {
        let distanceOfX = circles[i].x - circles[j].x;
        let distanceOfY = circles[i].y - circles[j].y;
        let distance = Math.sqrt(
          distanceOfX * distanceOfX + distanceOfY * distanceOfY
        );

        if (distance < circles[i].radius + circles[j].radius) {
          //This just reverses the velocities when collided, so a realistic approach was made below
          /*
          collision detected!
          circles[i].dx = -circles[i].dx;
          circles[i].dy = -circles[i].dy;
          circles[i].update();

          circles[j].dx = -circles[j].dx;
          circles[j].dy = -circles[j].dy;
          circles[j].update();
          */

          /*The Math.atan2() function in JavaScript is used to return the arctangent of the quotient of its arguments.
          The Math.atan2() method returns a numeric value between -Π and Π representing the angle theta of an (x, y) point
          and positive x axis. This is the counterclockwise angle, measured in radians, between the positive X axis, and the point (x, y).*/
          let angle = -Math.atan2(
            circles[i].y - circles[j].y,
            circles[i].x - circles[j].x
          );

          let m1 = 1; //Mass of circle 1
          let m2 = 1; //Mass of circle 2

          // Velocity before equation
          let u1X = rotateVelocityX(circles[i].dx, circles[i].dy, angle);
          let u1y = rotateVelocityY(circles[i].dx, circles[i].dy, angle);

          let u2X = rotateVelocityX(circles[j].dx, circles[j].dy, angle);
          let u2Y = rotateVelocityY(circles[j].dx, circles[j].dy, angle);

          // Velocity after 1d collision newtonian equation
          let v1X = (u1X * (m1 - m2)) / (m1 + m2) + (u2X * 2 * m2) / (m1 + m2);
          let v1Y = u1y;

          let v2X = (u2X * (m1 - m2)) / (m1 + m2) + (u1X * 2 * m2) / (m1 + m2);
          let v2Y = u2Y;

          // Final velocity after rotating axis back to original location
          let vFinal1X = rotateVelocityX(v1X, v1Y, -angle);
          let vFinal1Y = rotateVelocityY(v1X, v1Y, -angle);

          let vFinal2X = rotateVelocityX(v2X, v2Y, -angle);
          let vFinal2Y = rotateVelocityY(v2X, v2Y, -angle);

          // Swap circles velocities for realistic bounce effect
          circles[i].dx = vFinal1X;
          circles[i].dy = vFinal1Y;

          circles[j].dx = vFinal2X;
          circles[j].dy = vFinal2Y;

          circles[i].update();
          circles[j].update();
        }
      }
    }
  }
}
