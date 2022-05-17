const Sequelize = require('sequelize');

module.exports = class Restaurant extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        review_avg: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        begin: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        end: {
          type: Sequelize.TIME,
          allowNull: false,
        },
        min_order_amount: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        delivery_fee: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        delivery_time: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        phone: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        address: {
          type: Sequelize.STRING(150),
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
        modelName: 'Restaurant',
        tableName: 'restaurant',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Restaurant.hasMany(db.Menu);
    db.Restaurant.hasMany(db.Rest_image);
    db.Restaurant.belongsToMany(db.Category, { through: 'rest_cate' });
  }
};