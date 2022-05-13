// legacy code
/*
var Human = function (type) {
  this.type = type || "human";
};
// ������ �Լ�.

Human.isHuman = function (human) {
  return human instanceof Human;
};
// static method, ������ �޼ҵ�.

Human.prototype.breathe = function () {
  alert("h-a-a-a-m");
};
// instance method, prototype method.

var Zero = function (type, firstName, lastName) {
  Human.apply(this, arguments);
  this.firstName = firstName;
  this.lastName = lastName;
};
Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero; // ����ϴ� �κ�
Zero.prototype.sayName = function() {
    alert(this.firstName + ' ' + this.lastName);
};
var oldZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(oldZero); // true
*/

class Human {
  constructor(type = "human") {
    this.type = type;
  }

  static isHuman(human) {
    return human instanceof Human;
  }

  breathe() {
    alert("h-a-a-a-m");
  }
}

class Zero extends Human {
  constructor(type, firstName, lastName) {
    super(type);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayName() {
    super.breathe();
    alert(`${this.firstName} ${this.lastName}`);
  }
}

const newZero = new Zero("human", "Zero", "Cho");
console.log(Human.isHuman(newZero)); // true
