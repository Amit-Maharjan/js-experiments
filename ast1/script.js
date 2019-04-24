var slider = document.getElementById('slider-image');

var leftMargin = 0;
var goLeft = -20;
var MAXWIDTH = -1800;
var IMGWIDTH = 600;
var imageNumber = 1;
var previousImageNumber = 0;
var currentImageNumber = 1;

var buttons = document.getElementsByClassName('button');

function slideImage() {
  var slide = setInterval(function() {
    if (leftMargin === 0) goLeft = -20;
    else if (leftMargin === MAXWIDTH) goLeft = 20;

    leftMargin += goLeft;

    slider.style.marginLeft = leftMargin + 'px';
    if (goLeft === -20 || leftMargin === 0) {
      if (leftMargin % IMGWIDTH === 0) {
        clearInterval(slide);

        previousImageNumber = currentImageNumber;
        currentImageNumber++;
        if (imageNumber === 0) currentImageNumber = 1;
        imageNumber++;

        setTimeout(slideImage, 2000);
      }
    } else {
      previousImageNumber = buttons.length;
      currentImageNumber = 1;
      imageNumber = 0;
    }
    //For Button Being Activated
    buttons[previousImageNumber - 1].className = buttons[
      previousImageNumber - 1
    ].className.substr(0, 6);
    buttons[currentImageNumber - 1].className += ' active';
  }, 1);
}

slideImage();

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
  if (
    (imageNumber > 1 && imageNumber < numberOfButton.length) ||
    (imageNumber === 1 && n === 1) ||
    (imageNumber === numberOfButton.length && n === -1)
  ) {
    previousImageNumber = imageNumber;
    imageNumber += n;
    currentImageNumber = imageNumber;

    var targetLeftMargin = -(imageNumber - 1) * IMGWIDTH;

    var goRight;
    if (n === 1) goRight = 20;
    else if (n === -1) goRight = -20;

    var nextPrevImage = setInterval(function() {
      leftMargin -= goRight;
      slider.style.marginLeft = leftMargin + 'px';

      if (leftMargin === targetLeftMargin) clearInterval(nextPrevImage);

      if (previousImageNumber === 1 && n === 1) goLeft = -20;
    }, 1);

    //slider.style.marginLeft = leftMargin + 'px';

    buttons[previousImageNumber - 1].className = buttons[
      previousImageNumber - 1
    ].className.substr(0, 6);
    buttons[currentImageNumber - 1].className += ' active';
  }
}

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
  buttons[previousImageNumber - 1].className = buttons[
    previousImageNumber - 1
  ].className.substr(0, 6);
  buttons[currentImageNumber - 1].className += ' active';
}
