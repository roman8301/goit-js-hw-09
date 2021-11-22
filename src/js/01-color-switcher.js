const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.stopBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timerId = setInterval(
    () => (refs.body.style.backgroundColor = getRandomHexColor()),
    1000,
  );
  refs.startBtn.setAttribute('disabled', true);
  refs.stopBtn.removeAttribute('disabled');
}

function onStopBtnClick() {
  clearInterval(timerId);
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);
}
