const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        delivery_fee: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: false,
        },
        content: {
          type: Sequelize.TEXT(3000),
          allowNull: false,
          unique: false,
        },
        mem_count: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        rest_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        lat: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        long: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Post',
        tableName: 'post',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Post.belongsToMany(db.User, { through: 'user_post' });
    db.Post.hasMany(db.Comment);
  }
};
