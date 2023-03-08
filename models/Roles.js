const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/config');

class Roles extends Model { }

Roles.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
        },
        title:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        department:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'departments',
                key:'id'
            }
        },
        salary:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName:true,
        underscored:true,
        modelName:'roles'
    }
);

module.exports = Roles;