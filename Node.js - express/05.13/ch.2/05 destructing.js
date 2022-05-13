const example = { a: 123, b: { c: 135, d: 146 } };
/*
const a = example.a;
const d = example.b.d;
*/

const {
  a,
  b: { d },
} = example;

console.log(a);
console.log(d);

arr = [1, 2, 3, 4, 5];
/*
const x = arr[0]
const y = arr[1]
const z = arr[4]
*/

const [x, y, , , z] = arr;

console.log(x, y, z);
