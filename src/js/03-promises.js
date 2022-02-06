import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', handleSubmit);
let ifPressed = false;

function handleSubmit(evt) {
  evt.preventDefault()

  if (ifPressed) {
    return
  }
  ifPressed = true;

  const { elements: { delay, step, amount } } = evt.currentTarget;

  let timerId = null;
  let num = 1;
  const delayVal = Number(delay.value)
  const stepVal = Number(step.value);
  const amountVal = Number(amount.value);

  setTimeout(() => {
createPromise(num, delayVal)
  .then(({ position, delay }) => {
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    
  setInterval(() => {
      num += 1;
      if (num > amountVal) {
        clearInterval(timerId);
        ifPressed = false;
        return
      }
      createPromise(num, delayVal)
        .then(({ position, delay }) => {
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
        .catch(({ position, delay }) => {
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    }, stepVal)
  }, delayVal)

}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({
      position: position,
    delay: delay})
  } else {
   reject ({ position: position,
    delay: delay})
  }
})

  
}
