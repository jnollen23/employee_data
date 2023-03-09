const {Model, DataTypes} = require("sequelize");
const sequelize = require('../config/config');

class Employees extends Model{}

Employees.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false
        },
        title:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'roles',
                key:"id"
            }
        },
        manager:{
            type:DataTypes.INTEGER,
            allowNull:true,
            references:{
                model:'employees',
                key:'id'
            }
        }
    },
    {
        sequelize,
        timestamps:false,
        freezeTableName:true,
        underscored:true,
        modelName:'employees'
    }
);

module.exports = Employees;