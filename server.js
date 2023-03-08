require('dotenv').config();
const inquirer = require("inquirer");

const sequelize = require('./config/config');
const questions = require('./questions');

sequelize.sync({ force: false });


function Test() {
    questions(0).then(x => {
        console.log(x)
    });
    questions(1).then(x => {
        console.log(x)
    });
    questions(2).then(x => {
        console.log(x)
    });
    questions(3).then(x => {
        console.log(x)
    });
    questions(4).then(x => {
        console.log(x)
    });
}

Test();