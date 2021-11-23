import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timerId = null;
let choosenTime = 0;
const daysContainer = document.querySelector('span[data-days]');
const hoursContainer = document.querySelector('span[data-hours]');
const minutesContainer = document.querySelector('span[data-minutes]');
const secondsContainer = document.querySelector('span[data-seconds]');
const myInput = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosenTime = selectedDates[0].getTime();

    if (choosenTime < Date.now()) {
      Notify.failure('Please choose a date in the future', {
        cssAnimationStyle: 'from-right',
      });
    } else {
      button.removeAttribute('disabled');
    }
  },
};
const fp = flatpickr(myInput, options);
const button = document.querySelector('button[data-start]');

button.setAttribute('disabled', 'disabled');
button.addEventListener('click', onButtonHandler);

function onButtonHandler() {
  button.setAttribute('disabled', 'disabled');
  myInput.setAttribute('disabled', 'disabled');

  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = choosenTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    daysContainer.textContent = `${days}`;
    hoursContainer.textContent = `${hours}`;
    minutesContainer.textContent = `${minutes}`;
    secondsContainer.textContent = `${seconds}`;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      daysContainer.textContent = '00';
      hoursContainer.textContent = '00';
      minutesContainer.textContent = '00';
      secondsContainer.textContent = '00';
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second),
  );

  return { days, hours, minutes, seconds };
}
