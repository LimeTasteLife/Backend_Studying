import { odd, even } from "./var";

function checkOddorEven(num) {
  if (num % 2) {
    // 홀수면,
    return odd;
  }
  return even;
}

export default checkOddorEven;
