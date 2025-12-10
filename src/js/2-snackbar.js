// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



const input = document.querySelector("input[value='fulfilled']");
console.log(input);
const buttonSubmit = document.querySelector("button[type='submit'");
console.log(buttonSubmit);


buttonSubmit.addEventListener("submit", function (event) {

    const delay = document.querySelector("form.form").delay.value;
    console.log(delay);

    const shouldResolveFunction = () => {if(input.checked === true){return true} else if(document.querySelector("input[value='rejected']")){return false} else {console.log("if isn't work")}};
     
    console.log(shouldResolveFunction);
    const delayPromise = document.querySelector("input[name='delay']").value;
    console.log(delayPromise);
    const promise = ((value, delayPromise, shouldResolveFunction) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                    if(shouldResolveRes === true) {
                        resolve(iziToast.success({
                            title:"Error",
                            messageColor:"white",
                            titleColor:"white",
                            backgroundColor:"#EF4040",
                            iconUrl: "../img/icomoon/PNG/error.png",
                            message: `✅ Fulfilled promise in ${delay}ms`,
                            class: 'izitoast',
                            timeout: 10000,
                            position:"topRight",
                            resetOnHover: true,
                            icon: 'material-icons',
                            transitionIn: 'flipInX',
                            transitionOut: 'flipOutX',
                            onOpening: function(){
                                console.log('callback abriu!');}
                    }))
                    } else if(shouldResolveFunction === false) {
                        reject( iziToast.warning({
                            message: `❌ Rejected promise in ${delay}ms`,
                        }))
                    } else {
                        console.log("promise's if isn't works");
                    }
                }, delayPromise);
          });
    });
    console.log(promise);
});