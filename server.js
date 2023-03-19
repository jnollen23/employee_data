require('dotenv').config();
const inquirer = require("inquirer");

const sequelize = require('./config/config');
const questions = require('./questions');
const { Employees, Departments, Roles } = require("./models");

sequelize.sync({ force: false });

async function ViewAllDepartments() {
    const depts = await Departments.findAll();
    depts.forEach(x => {
        console.log(x.name);
    })
    AskFirstQuestion();
}

async function ViewAllEmployees() {
    const depts = await Employees.findAll();
    depts.forEach(x => {
        console.log(`${x.firstName} ${x.lastName}` );
    })
    AskFirstQuestion();
}

async function ViewAllRoles() {
    const depts = await Roles.findAll({
        include: [{
            model: Departments,
            required: true,
        }]
    });
    depts.forEach(x => {
        console.log(x.title, x.departments[0].name);
    })
    AskFirstQuestion();
}

async function AddDepartment(){
    const response = await inquirer.prompt(await questions(1));
    const val = response["addDepartment-1"];
    const matches = await Departments.findAll({
        where:{
            department: val
        }
    });
    if(matches.length > 0) console.log("Department already exists")
    else{
        Departments.create({name:val});
    }

    AskFirstQuestion();
}

async function AskFirstQuestion() {
    const response = await inquirer.prompt(await questions(0))
    const responseSplit = response.initial.split(' ');
    const work = responseSplit[0].toLowerCase();
    const group = responseSplit[2].toLowerCase();

    if (work === "view") {
        if (group === "employees") {
            await ViewAllEmployees();
        }
        else if (group === "departments") {
            await ViewAllDepartments();
        }
        else if (group === "roles") {
            await ViewAllRoles();
        }
    }
    else if (work == "add") {
        if(group === "department"){
            await AddDepartment();
        }
        else if(group === "role"){

        }
        else if(group === "employee"){

        }
    }
    else if (work == "update") {

    }

}

function InitiateConsole() {
    console.log("Welcome to the Employee Database for the Great Arstotzka");
    AskFirstQuestion();
}

InitiateConsole();