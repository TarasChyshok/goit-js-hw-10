import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('button[data-start]').disabled = true;
document.querySelectorAll('span.value').forEach(element => {
  element.textContent.toUpperCase();
});

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
const input = document.querySelector('#datetime-picker');
let selectedDatesVariable;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  mode: 'single',
  dateFormat: 'Y-m-dTH:i',
  onClose(selectedDates, dateStr, instance) {
    selectedDatesVariable = calendar.selectedDates;
    if (selectedDatesVariable[0] <= Date.now()) {
      document.querySelector('[data-start]').disabled = true;
      selectedDates = calendar.selectedDates[0];
      iziToast.error({
        title: 'Error',
        messageColor: 'white',
        titleColor: 'white',
        backgroundColor: '#EF4040',
        iconUrl: '../img/icomoon/PNG/error.png',
        message: 'Please choose a date in the future',
        timeout: 5000,
        position: 'topRight',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
      });
    } else {
      document.querySelector('button[data-start]').disabled = false;
    }
  },
};
const calendar = flatpickr(document.querySelector('#datetime-picker'), options);

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    } else {
      if (diff < 0) {
        return this.stop();
      }
      document.querySelector('[data-start]').disabled = true;
      document.querySelector('#datetime-picker').disabled = true;
      this.isActive = true;
      let initialTime = selectedDates;
      this.intervalId = setInterval(() => {
        let currentTime = Date.now();
        let diff = initialTime - currentTime;
        let result = convertMs(diff);
        document.querySelector('[data-days]').innerText = String(
          result.days
        ).padStart(2, '0'); //days
        document.querySelector('[data-hours]').innerText = String(
          result.hours
        ).padStart(2, '0'); //hours
        document.querySelector('[data-minutes]').innerText = String(
          result.minutes
        ).padStart(2, '0'); //minutes
        document.querySelector('[data-seconds]').innerText = String(
          result.seconds
        ).padStart(2, '0'); //seconds
      }, 1000);
    }
  },

  stop() {
    if (this.isActive === false) return;
    clearInterval(this.intervalId);
    document.querySelector('[data-days]').textContent = '00'; //days
    document.querySelector('[data-hours]').textContent = '00'; //hours
    document.querySelector('[data-minutes]').textContent = '00'; //minutes
    document.querySelector('[data-seconds]').textContent = '00'; //seconds
    document.querySelector('#datetime-picker').disabled = false;
    this.isActive = false;
  },
};

document.querySelector('[data-start]').addEventListener('click', () => {
  timer.start();
});
