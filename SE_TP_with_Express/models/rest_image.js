const Sequelize = require('sequelize');

module.exports = class Rest_image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        url: {
          type: Sequelize.STRING(1000),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'Rest_image',
        tableName: 'rest_image',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Rest_image.belongsTo(db.Restaurant);
  }
};
