// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector("input[value='fulfilled']");
const buttonSubmit = document.querySelector("button[type='submit'");
buttonSubmit.addEventListener("submit", ()=>{

    // const isSuccess = true;
    // const promise = new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         if (isSuccess) {
    //           resolve("Success! Value passed to resolve function");
    //         } else {
    //           reject("Error! Error passed to reject function");
    //         }
    //       }, 2000);
    // }).then(onResolve, onReject).catch().finally();

    // promise.resolve();
    // promise.reject();

    function shouldResolveFunction() {if(input.checked === true){return true} else if(document.querySelector("input[value='rejected']")){return false}};
    const shouldResolveRes = shouldResolveFunction();
    const delayPromise = document.querySelector("input[name='delay']").valueAsNumber;
    const promise = ({value, delayPromise, shouldResolveRes}) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                    if(shouldResolveRes) {
                        resolve(iziToast.success({
                            message: `✅ Fulfilled promise in ${delay}ms`,
                        }))
                    } else {
                        reject( iziToast.warning({
                            message: `❌ Rejected promise in ${delay}ms`,
                        }))
                    }
                }, delayPromise);
          });
    };
    // `✅ Fulfilled promise in ${delay}ms`
// `❌ Rejected promise in ${delay}ms`



    // const makePromise = options => {
    //     return new Promise((resolve, reject) => {
    //           // ...
    //     });
    //   };

    //   const makePromise = ({ value, delay, shouldResolve = true }) => {
    //     return new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //               if(shouldResolve) {
    //                   resolve(value)
    //               } else {
    //                   reject(value)
    //               }
    //           }, delay);
    //     });
    //   };
      
    //   Promise.all([p1, p2, p3])
    //   .then(values => console.log(values)) // [1, 2, 3]
    //   .catch(error => console.log(error));

    //   Promise.allSettled([p1, p2, p3])

    //   Promise.race([promise1, promise2, promise3, ...])

//     setTimeout(() => {
        
//     }, timeout);

//     if(buttonSubmit.checked === true){
// //прийнято
// console.log(`✅ Fulfilled promise in ${delay}ms`
// );
//     }
//     else if(buttonSubmit.checked === true){
// // delay (в інпуті кількість секунд)
// // Створений проміс треба опрацювати у відповідних для вдалого/невдалого виконання методах.
//         console.log(`❌ Rejected promise in ${delay}ms`);
//     }
});