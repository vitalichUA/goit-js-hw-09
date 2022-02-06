import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePicker = document.querySelector("#datetime-picker");
const dataStart = document.querySelector('[data-start]');

const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

dataStart.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(dateTimePicker, options)


dateTimePicker.addEventListener('input', () => {
    const inputDate = new Date(dateTimePicker.value);
  const time = inputDate - new Date();
  

    if (time < 0) {
      Notify.failure("Please choose a date in the future");
        dataStart.setAttribute('disabled', 'disabled');
        return
    }
    dataStart.removeAttribute('disabled')
});

let timerId = null;
let disabled = false;

dataStart.addEventListener('click', () => {
  dataStart.setAttribute('disabled', 'disabled')

  if (disabled) {
    return
  };
  disabled = true;

  const inputDate = new Date(dateTimePicker.value);

  const timerId = setInterval(() => {
    const pickerDate = inputDate - new Date()
    if (pickerDate <= 0) {
      clearInterval(timerId);
      disabled = false;
      Notify.success("Time is out!")
      return

    }

    const timeConvert = convertMs(pickerDate);

displayTime(timeConvert)

  }, 1000);

});



function displayTime({days, hours, minutes, seconds }) {
  timerDays.textContent = `${days}`;
  timerHours.textContent = `${hours}`;
  timerMinutes.textContent = `${minutes}`;
timerSeconds.textContent = `${seconds}`
};

function addLeadingZero(val) {
  return String(val).padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};