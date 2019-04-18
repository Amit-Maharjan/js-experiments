var slider = document.getElementById('slider-image');

var leftMargin = 0;
var goLeft = -20;
var MAXWIDTH = -1800;
var IMGWIDTH = 600;
var imageNumber = 1;
var previousImageNumber = 0;
var currentImageNumber = 1;
/*
function delay(second) {
  for (var i = 0; i <= second; i++) {
    for (var j = 0; j <= second; j++) {}
  }
}*/
/*
function slide() {
  if (leftMargin === 0) goLeft = -1;
  else if(leftMargin === MAXWIDTH) goLeft = 1;

  leftMargin += goLeft;

  slider.style.marginLeft = leftMargin + 'px';

  if(leftMargin % 600 === 0){
  delay(100000);
  }

  window.requestAnimationFrame(slide);
}

slide();
*/

var buttons = document.getElementsByClassName('button');

function myfunc() {
  var slide = setInterval(function() {
    if (leftMargin === 0) goLeft = -20;
    else if (leftMargin === MAXWIDTH) goLeft = 20;

    leftMargin += goLeft;

    slider.style.marginLeft = leftMargin + 'px';

    if (goLeft === -20 || leftMargin === 0) {
      if (leftMargin % IMGWIDTH === 0) {
        //delay(100000);
        clearInterval(slide);

        previousImageNumber = currentImageNumber;
        currentImageNumber++;
        if(imageNumber === 0) currentImageNumber = 1;
        imageNumber++;

        setTimeout(myfunc, 2000);
      }
    } else {
      previousImageNumber = buttons.length;
      currentImageNumber = 1;
      imageNumber = 0;
    }
    //For Button Being Activated
    buttons[previousImageNumber-1].className = buttons[previousImageNumber-1].className.substr(0,6);
    buttons[currentImageNumber-1].className += ' active';
  }, 1);
}

myfunc();

//For Button Being Displayed
var container = document.getElementById('container');
var buttonContainer = document.createElement('div');

buttonContainer.setAttribute('class', 'button-container');
buttonContainer.style.position = 'relative';
buttonContainer.style.bottom = '50px';
buttonContainer.style.margin = 'auto';
buttonContainer.style.textAlign = 'center';
container.appendChild(buttonContainer);

function createButton(buttonContainer) {
  var button = document.createElement('button');

  button.setAttribute('class', 'button');
  button.style.height = '20px';
  button.style.width = '20px';
  button.style.borderRadius = '50%';
  button.style.margin = '5px';
  button.style.cursor = 'pointer';
  button.style.border = 'none';
  buttonContainer.appendChild(button);
}

var numberOfButton = document.getElementsByTagName('img');

for (var i = 0; i < numberOfButton.length; i++) {
  createButton(buttonContainer);
}

//For Arrow
function plusSlides(n) {
  if ((imageNumber > 1 && imageNumber < numberOfButton.length) || (imageNumber ===1 && n === 1)) {
    previousImageNumber = imageNumber;
    imageNumber += n;
    currentImageNumber = imageNumber;
    leftMargin = -(imageNumber - 1) * IMGWIDTH;
    slider.style.marginLeft = leftMargin + 'px';
    buttons[previousImageNumber-1].className = buttons[previousImageNumber-1].className.substr(0,6);
    buttons[currentImageNumber-1].className += ' active';
  }
}

//For Button Being Activated
//var buttons = document.getElementsByClassName('button');
//buttons[imageNumber].className += ' active';

//For Button Being Activated
for (var i = 1; i <= buttons.length; i++) {
  buttons[i - 1].setAttribute('onclick', 'currentSlide(' + i + ')');
}

function currentSlide(n) {
  previousImageNumber = imageNumber;
  imageNumber = n;
  currentImageNumber = imageNumber;
  leftMargin = -(imageNumber - 1) * IMGWIDTH;
  slider.style.marginLeft = leftMargin + 'px';
  buttons[previousImageNumber-1].className = buttons[previousImageNumber-1].className.substr(0,6);
  buttons[currentImageNumber-1].className += ' active';
}
