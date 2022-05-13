const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
  console.log('모든 요청에 실행하고싶어요');
  next();
});

app.get('/category/:name', (req, res) => {
  res.send('hello wildcard');
});

app.get('/category/Javascript', (req, res) => {
  res.send('hello Javascript');
});
// 이건 실행이 안됨. 위에 wildcard가 먼저.
// 보통 router는 res가 끝이기 때문에 그 이상을 하면 오류가 남.
// 얘를 :name 위로 올리면 해결

app.get('/about', (req, res) => {
  res.send('hello express');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (req, res) => {
  res.send('hello everyone');
});
// 이게 맨 위에 있으면 이것만 실행됨.

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});
