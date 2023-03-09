require('dotenv').config();
const inquirer = require("inquirer");

const sequelize = require('./config/config');
const questions = require('./questions');

sequelize.sync({ force: false });





function InitiateConsole(){
    console.log("Welcome to the Employee Database for the Great Arstotzka");
}

InitiateConsole();