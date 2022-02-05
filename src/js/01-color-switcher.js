function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtnRef.addEventListener('click', startBtnClickHandler);
stopBtnRef.addEventListener('click', stopBtnClickHandler);
stopBtnRef.disabled = true;

function startBtnClickHandler() {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    startBtnRef.setAttribute('disabled', 'true');
    stopBtnRef.removeAttribute('disabled');
  }, 1000);
}

function stopBtnClickHandler() {
  clearInterval(timerId);
  startBtnRef.removeAttribute('disabled');
  stopBtnRef.disabled = true;
}
