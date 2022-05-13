const promise1 = Promise.resolve("����1");
const promise2 = Promise.resolve("����2");
(async () => {
  for await (promise of [promise1, promise2]) {
    console.log(promise);
  }
})();
