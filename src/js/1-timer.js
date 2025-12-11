import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelectorAll("span.value").forEach((element)=>{
  element.textContent.toUpperCase();
})

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

  const input = document.querySelector("#datetime-picker");
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    mode: "single",
    dateFormat: "Y-m-dTH:i",
  onClose: function(selectedDates, dateStr, instance){
    calendar.close();
    document.querySelector("[data-start]").disabled = false;
    if(calendar.selectedDates[0]<Date.now()){
      document.querySelector("[data-start]").disabled = true;
      iziToast.error({
        title:"Error",
        messageColor:"white",
        titleColor:"white",
        backgroundColor:"#EF4040",
        iconUrl: "../img/icomoon/PNG/error.png",
        message: "Illegal operation",
        timeout: 5000,
        position:"topRight",
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
      });
    }
  },
  };

  const calendar = flatpickr(document.querySelector("#datetime-picker"), options);

const timer = {
  intervalId: null,
  isActive:false,
  start() {
    if(this.isActive){return} else {
    document.querySelector("[data-start]").disabled = true;
    this.isActive = true;
    let selectedDates = calendar.selectedDates;
    let initialTime = selectedDates[0];
    this.intervalId = setInterval(() => {
      let currentTime = Date.now();
      let diff = initialTime - currentTime;
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
    }, 1000)}
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