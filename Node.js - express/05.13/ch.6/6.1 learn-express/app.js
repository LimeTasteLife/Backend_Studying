const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');

dotenv.config();
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
// app.use(morgan('combined'));
// 파일이 실제 경로에 존재하면 next를 주지 않음.
// 이게 cookieParser 같은 애들보다 뒤에 있으면 쓸데없는 걸 다 파싱하고 파일을 줌
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
    },
    name: 'connect.sid',
  })
);
app.use('/', (req, res, next) => {
  if (req.session.id) {
    express.static(path.join(__dirname, 'public'))(req, res, next);
  } else {
    next();
  }
});
// 로그인 한 사람한테만 주고 싶으면 이런 패턴 사용.
// 일종의 미들웨어 확장법
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('요청 경로', express.static('실제 경로'));

/*
try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
// 서버 시작전은 sync 써도 됨.
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', upload.single('image'), (req, res) => {
  res.sendFile(path.join(__dirname, 'multerpart.html'));
});
app.post(
  '/upload',
  upload.fields([{ name: 'image1' }, { name: 'image2' }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
  }
);
*/

app.use((req, res, next) => {
  console.log('모든 요청에 실행하고싶어요');
  next();
});

app.get('/', (req, res) => {
  /*
    const name = '주하영';
  req.cookies; // { my cookie: 'test' }
  res.cookie('name', encodeURIComponent(name), {
    expires: new Date(),
    httpOnly: true,
    path: '/',
  });
  res.clearCookie('name', encodeURIComponent(name), {
    httpOnly: true,
    path: '/',
  });
  */
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res, next) => {
  res.status(404).send('404지롱');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).send('에러발생');
});

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});
