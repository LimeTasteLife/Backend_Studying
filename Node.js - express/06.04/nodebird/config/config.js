require('dotenv').config();

module.exports = {
  development: {
    username: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: 'nodebird',
    host: process.env.RDS_HOST,
    dialect: 'mysql',
    port: process.env.RDS_PORT,
  },
  test: {
    username: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'nodebird_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'nodebird',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
};
