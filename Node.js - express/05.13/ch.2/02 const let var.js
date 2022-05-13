if (true) {
  const x = 3;
}
console.log(x); // 에러

function a() {
  var y = 3;
}
console.log(y); // 에러

const a = 3;
a = "5"; // 에러

const b = { name: "zerocho" };
b.name = "nerocho";

let c = 5;
c = 3;
