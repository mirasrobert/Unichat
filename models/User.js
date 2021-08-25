'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // Change fields to return -- return all except password
    toJSON(){
      return {
        ...this.get(), password: undefined
      }
    } 

  }
  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: true, // won't allow null
          notEmpty: true, // don't allow empty strings
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true, // won't allow null
          notEmpty: true, // don't allow empty strings
          isEmail: true, // checks for email format (foo@bar.com)
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true, // won't allow null
          notEmpty: true, // don't allow empty strings
          min: 6, // only allow values >= 6
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true
    }
  );
  return User;
};
