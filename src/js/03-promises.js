import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmitHandler);

function onSubmitHandler(event) {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);
  let selectedAmount = Number(amount.value);

  for (let i = 1; i <= selectedAmount; i += 1) {
    createPromise(i, firstDelay)
      .then(promiseData => {
        Notify.success(
          `✅ Fulfilled promise ${promiseData.position} in ${promiseData.delay}ms`,
        );
      })
      .catch(promiseData => {
        Notify.failure(
          `❌ Rejected promise ${promiseData.position} in ${promiseData.delay}ms`,
        );
      });
    firstDelay += delayStep;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const data = {
    position,
    delay,
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(data);
      } else {
        reject(data);
      }
    }, delay);
  });
}
