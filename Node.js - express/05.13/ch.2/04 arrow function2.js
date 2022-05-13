var relationship1 = {
  name: "zero",
  friends: ["nero", "hero", "xero"],
  logFriends: function () {
    var that = this;
    this.friends.forEach(function (friend) {
      console.log(that.name, friend);
    });
  },
};
relationship1.logFriends();

const relationship2 = {
  name: "zero",
  friends: ["nero", "hero", "xero"],
  logFriends() {
    this.friends.forEach((friend) => {
      console.log(this.name, friend);
    });
  },
};

relationship2.logFriends();

/*
arrow function의 this는 부모와 내꺼가 같다.
함수는 부모의 this와 내 this는 다름.
 */
