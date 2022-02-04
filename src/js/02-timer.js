import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class Timer {
  constructor({ targetDate }) {
    this.targetDate = targetDate;
    this.creatingFaceClock();
    this.timerStart();
  }

  getDataForTimer() {
    const time = this.targetDate - Date.now();
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return {
      time,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  creatingFaceClock() {
    const faceClock = document.querySelector('.timer');

    const refs = {
      daysSpan: faceClock.querySelector(`[data-days]`),
      hoursSpan: faceClock.querySelector(`[data-hours]`),
      minsSpan: faceClock.querySelector(`[data-minutes]`),
      secsSpan: faceClock.querySelector(`[data-seconds]`),
    };

    refs.daysSpan.textContent = String(this.getDataForTimer().days).padStart(
      2,
      '0'
    );

    refs.hoursSpan.textContent = String(this.getDataForTimer().hours).padStart(
      2,
      '0'
    );

    refs.minsSpan.textContent = String(this.getDataForTimer().minutes).padStart(
      2,
      '0'
    );

    refs.secsSpan.textContent = String(this.getDataForTimer().seconds).padStart(
      2,
      '0'
    );
  }

  timerStart() {
    const deadline = Date.parse(this.targetDate) <= Date.parse(new Date());
    this.startForTimer = setInterval(() => {
      if (deadline) {
        clearInterval(this.startForTimer);
        return;
      }

      this.creatingFaceClock();
    }, 1000);
  }
}
let initDate = null;
const currentDate = Date.now();
const dateTimePicker = document.querySelector('#datetime-picker');
const startTimerRef = dateTimePicker.nextElementSibling;
startTimerRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    initDate = selectedDates[0];
    if (initDate > currentDate) {
      startTimerRef.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};

const fpickr = flatpickr("#datetime-picker", options);

function startTimerHandler() {
  const selectedDate = new Date(fpickr.element.value);
  
  const timer = new Timer({ targetDate: new Date(selectedDate) });
}

startTimerRef.addEventListener('click', startTimerHandler);

