function oneMore() {
  console.log("one more");
}
function run() {
  console.log("run run");
  setTimeout(() => {
    console.log("wow");
  }, 0);
  new Promise((resolve) => {
    resolve("hi");
  }).then(console.log);
  oneMore();
}

setTimeout(run, 5000);

/*
실행결과는
run run
one more
hi
wow
-----
hi는 promise라서 setTimeout을 새치기함.
*/
