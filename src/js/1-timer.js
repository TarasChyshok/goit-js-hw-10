import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


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

  const iziToastConfig = {
    message: "Please choose a date in the future",
  }

  const input = document.querySelector("#datetime-picker");
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    mode: "single",
    dateFormat: "Y-m-dTH:i",
  onOpen: [
      function(selectedDates, dateStr, instance){
  
      },
      function(selectedDates, dateStr, instance){
  
      }
  ],
  onClose: function(selectedDates, dateStr, instance){
    
  },

  onReady: function(selectedDates, dateStr, instance){
    // flatpickr.calendarContainer.classList.add("calendar");
    // flatpickr.currentYear.classList.add("currentYear");
  },
  onValueUpdate: function(selectedDates, dateStr, instance){
    
  },
  onChange: function(selectedDates, dateStr, instance){
    if(selectedDates[0]<Date.now){
      iziToast.show(iziToastConfig);
      flatpickr(document.querySelector("#datetime-picker").close());
    }
  }
  };

  const calendar = flatpickr(document.querySelector("#datetime-picker"), options);
  let selectedDates = calendar.selectedDates;

const timer = {
  intervalId: null,
  isActive:false,
  start() {
    if(this.isActive){return}
    document.querySelector("[data-start]").disabled = true;
    this.isActive = true;
    let initialTime = selectedDates[1];
    let currentTime = Date.now();
    this.intervalId = setInterval(() => {
      const diff = initialTime - currentTime;
      let result = convertMs(diff);
      document.querySelector("[data-days]").textContent = result.days; //days
      document.querySelector("[data-hours]").textContent = result.hours; //hours
      document.querySelector("[data-minutes]").textContent = result.minutes; //minutes
      document.querySelector("[data-seconds]").textContent = result.seconds; //seconds
      if(diff < 0){this.stop(); }
      currentTime += 1000;
      console.log(initialTime);
      console.log(currentTime);
      console.log(diff);
      console.log(result);
    }, 1000)
  },

  stop(){if(!this.isActive) return;
    clearInterval(this.intervalId);
    document.querySelector("[data-days]").textContent = "00"; //days
      document.querySelector("[data-hours]").textContent = "00"; //hours
      document.querySelector("[data-minutes]").textContent = "00"; //minutes
      document.querySelector("[data-seconds]").textContent = "00"; //seconds
  }
}

document.querySelector("[data-start]").addEventListener("click", () => {
  timer.start();
});