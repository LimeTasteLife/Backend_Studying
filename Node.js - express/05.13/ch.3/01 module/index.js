const { odd, even } = require("./var"); // 구조분해 할당은 이름이 같아야 함.
const checkNumber = require("./func"); // 변수명이기 때문에 exports와 이름이 달라도 됨.

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    // 홀수면
    return odd;
  }
  return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"));
