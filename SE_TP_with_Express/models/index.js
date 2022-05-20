const Sequelize = require('sequelize');
const Category = require('./category');
const Comment = require('./comment');
const Menu = require('./menu');
const Post = require('./post');
const Report = require('./report');
const Rest_image = require('./rest_image');
const Restaurant = require('./restaurant');
const User = require('./user');
const Rest_cate = require('./rest_cate');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = User;
db.Post = Post;
db.Restaurant = Restaurant;
db.Report = Report;
db.Comment = Comment;
db.Menu = Menu;
db.Rest_image = Rest_image;
db.Category = Category;
db.Rest_cate = Rest_cate;

User.init(sequelize);
Post.init(sequelize);
Restaurant.init(sequelize);
Report.init(sequelize);
Comment.init(sequelize);
Menu.init(sequelize);
Rest_image.init(sequelize);
Category.init(sequelize);
Rest_cate.init(sequelize);

Category.associate(db);
Comment.associate(db);
Menu.associate(db);
Post.associate(db);
Report.associate(db);
Rest_cate.associate(db);
Rest_image.associate(db);
Restaurant.associate(db);
User.associate(db);

db.sequelize = sequelize;

module.exports = db;
