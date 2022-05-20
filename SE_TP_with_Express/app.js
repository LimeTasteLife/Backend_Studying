const express = require('express');
const path = require('path');
const morgan = require('morgan');

const { sequelize } = require('./models');
const indexRouter = require('./routes');
const testInitialRouter = require('./routes/testInitial');

const app = express();
app.set('port', process.env.PORT || 3000);
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Success to connect DB');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//json file parser
app.use('/testInitial', testInitialRouter);

app.use((req, res, next) => {
  const error = new Error(
    `${req.method} ${req.url} \n no response for routers`
  );
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  // res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), ' waiting..');
});
