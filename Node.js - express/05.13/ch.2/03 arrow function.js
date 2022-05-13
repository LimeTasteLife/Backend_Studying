function add1(x, y) {
  return x + y;
}

const add2 = (x, y) => {
  return x + y;
};

const add3 = (x, y) => x + y;
// 이것도 가능한데 헷갈림.

const add4 = (x, y) => x + y;

function not1(x) {
  return !x;
}

const not2 = (x) => !x;

const obj = (x, y) => ({ x, y });
// 객체 return시 소괄호 필수!
