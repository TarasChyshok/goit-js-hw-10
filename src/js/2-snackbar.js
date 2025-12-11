// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const formSubmit = document.querySelector("form.form");
console.log(formSubmit);

formSubmit.addEventListener("submit", (event) => {

    const inputFulfilled = document.querySelector("form.form").querySelector("input[value='fulfilled']");
    const inputRejected = document.querySelector("form.form").querySelector("input[value='rejected']");

    event.preventDefault();
    let delay = document.querySelector("form.form").delay.value;
    delay = parseInt(delay);
     
    const resolveFunctionInPromise = (delay) => {
        iziToast
            .success({
        messageColor:"white",
        titleColor:"white",
        backgroundColor:"#EF4040",
        iconUrl: "../img/icomoon/PNG/error.png",
        message: `✅ Fulfilled promise in ${delay}ms`,
        class: 'izitoast',
        timeout:3000,
        position:"topRight",
        resetOnHover: true,
        icon: 'material-icons',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        onOpening: function(){
        console.log(`✅ Fulfilled promise in ${delay}ms`);
        }
    })};
    
    const rejectFunctionInPromise = (delay) => {
        iziToast
            .error({
        messageColor:"white",
        titleColor:"white",
        backgroundColor:"#EF4040",
        iconUrl: "../img/icomoon/PNG/error.png",
        message: `✅ Fulfilled promise in ${delay}ms`,
        class: 'izitoast',
        timeout:3000,
        position:"topRight",
        resetOnHover: true,
        icon: 'material-icons',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        onOpening: function(){
            console.log(`❌ Rejected promise in ${delay}ms`);
        }
    })  
    };

    const promisFunction = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                    if(inputFulfilled.checked) {
                        resolve(delay);
                        console.log("fulfilled if");
                        console.log(resolve(delay));
                    } else if(inputRejected.checked) {
                        reject(delay);
                        console.log("rejected if");
                        console.log(reject(delay));
                    }
                    }, delay);
          }).then((delay) => {resolveFunctionInPromise}).catch((delay) => {rejectFunctionInPromise});
        }
        promisFunction();
});   



