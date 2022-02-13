const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};

let timerId = null;
const bodyRef = document.querySelector('body');

refs.startButton.addEventListener('click', onStartClick);
refs.stopButton.addEventListener('click', onStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function colorCarousel(ref) {
  ref.style.backgroundColor = getRandomHexColor();
}

function onStartClick() {
  timerId = setInterval(colorCarousel, 1000, bodyRef);
  refs.startButton.disabled = true;
  refs.stopButton.disabled = false;
}

function onStopClick() {
  clearInterval(timerId);
  refs.stopButton.disabled = true;
  refs.startButton.disabled = false;
}
