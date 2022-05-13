const { odd, even } = require("./var");

function checkOddorEven(num) {
  if (num % 2) {
    // 홀수면,
    return odd;
  }
  return even;
}

module.exports = checkOddorEven;
