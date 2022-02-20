import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
const startRef = formRef.querySelector('[type="submit"]');

formRef.addEventListener('submit', onSubmitClick);

function onSubmitClick(event) {
  event.preventDefault();
  const { delay, step, amount } = getTaskData(formRef);
  if (!(delay && step && amount)) {
    Notiflix.Notify.failure('form must be filled');
    return;
  }
  if (delay < 0 || step < 0 || amount < 0) {
    Notiflix.Notify.failure('fields must be positive');
    return;
  }
  startRef.disabled = true;
  const disableTimeOut = +delay + (amount - 1) * step;

  for (let position = 0; position < amount; position++) {
    const promisePosition = position + 1;
    const promiseDelay = +delay + position * step;
    createPromise(promisePosition, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  setTimeout(() => {
    startRef.disabled = false;
  }, disableTimeOut);
}

function getTaskData(formRef) {
  const delay = formRef.delay.value;
  const step = formRef.step.value;
  const amount = formRef.amount.value;

  return { delay, step, amount };
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
