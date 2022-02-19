import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const TIME_INTERVAL = 1000;
let timerId = null;
const startRef = document.querySelector('[data-start]');
const inputRef = document.querySelector("[id = 'datetime-picker']");
const timerRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
startRef.disabled = true;

console.log(timerRefs.days.textContent);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currTime = new Date().getTime();
    const selectedTime = selectedDates[0].getTime();
    if (selectedTime < currTime) {
      //   window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startRef.disabled = false;
  },
};

flatpickr(inputRef, options);
startRef.addEventListener('click', onButtonClick);

function onButtonClick() {
  timerId = setInterval(timerUpdate, TIME_INTERVAL);
  startRef.disabled = true;
}

function timerUpdate() {
  const currTime = new Date().getTime();
  const selectedTime = new Date(inputRef.value).getTime();
  const timeLeft = selectedTime - currTime;
  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  timerRefs.days.textContent = addLeadingZero(days);
  timerRefs.hours.textContent = addLeadingZero(hours);
  timerRefs.minutes.textContent = addLeadingZero(minutes);
  timerRefs.seconds.textContent = addLeadingZero(seconds);
  if (timeLeft < TIME_INTERVAL) {
    clearInterval(timerId);
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
