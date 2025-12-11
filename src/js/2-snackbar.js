// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const formSubmit = document.querySelector("form.form");

formSubmit.addEventListener("submit", (event) => {

    const inputFulfilled = document.querySelector("form.form").querySelector("input[value='fulfilled']");
    const inputRejected = document.querySelector("form.form").querySelector("input[value='rejected']");

    event.preventDefault();
    let delay = document.querySelector("form.form").delay.value;
    delay = parseInt(delay);
     
    const resolveFunctionInPromise = () => {
        iziToast
            .success({
        messageColor:"white",
        titleColor:"white",
        backgroundColor:"green",
        iconUrl: "../img/icomoon/PNG/done.png",
        message: `✅ Fulfilled promise in ${delay}ms`,
        timeout:3000,
        position:"topRight",
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
    })};
    
    const rejectFunctionInPromise = () => {
        iziToast
            .error({
        messageColor:"white",
        titleColor:"white",
        backgroundColor:"#EF4040",
        iconUrl: "../img/icomoon/PNG/error.png",
        message: `❌ Rejected promise in ${delay}ms`,
        timeout:3000,
        position:"topRight",
        icon: 'material-icons',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
    })  
    };

    const promisFunction = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                    if(inputFulfilled.checked) {
                        resolve(delay);
                    } else if(inputRejected.checked) {
                        reject(delay);
                    }
                    }, delay);
          }).then((delay) => {resolveFunctionInPromise()}).catch((delay) => {rejectFunctionInPromise()});
        }
        promisFunction();
});   



