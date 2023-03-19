require('dotenv').config();
const inquirer = require("inquirer");

const sequelize = require('./config/config');
const questions = require('./questions');
const { Employees, Departments, Roles } = require("./models");

sequelize.sync({ force: false });

async function viewAllDepartments() {
    const depts = await Departments.findAll();
    depts.forEach(x => {
        console.log(x.name);
    })
    askFirstQuestion();
}

async function viewAllEmployees() {
    const depts = await Employees.findAll();
    depts.forEach(x => {
        console.log(`${x.firstName} ${x.lastName}`);
    })
    askFirstQuestion();
}

async function viewAllRoles() {
    const depts = await Roles.findAll({
        include: [{
            model: Departments,
            required: true,
        }]
    });
    depts.forEach(x => {
        console.log(x.title, x.departments[0].name);
    })
    askFirstQuestion();
}

async function addDepartment() {
    const response = await inquirer.prompt(await questions(1));
    const val = response["addDepartment-1"];
    if (val.length === 0) {
        console.log("No department name was entered");
    }
    else {
        const matches = await Departments.findAll({
            where: {
                department: val
            }
        });
        if (matches.length > 0) console.log("Department already exists")
        else {
            Departments.create({ name: val });
        }
    }
    askFirstQuestion();
}

async function addRole() {
    const response = await inquirer.prompt(await questions(2));
    const role = {
        title: response["addRole-1"],
        department: response["addRole-2"],
        salary: response["addRole-3"],
    }

    if (role.title.length === 0) {
        console.log("No title was entered");
    }
    else if (role.department.length === 0) {
        console.log("No department name was selected");
    }
    else if (role.salary.length === 0) {
        console.log("No salary was entered");
    }
    else {
        const department = await Departments.findOne({ where: { name: role.department } });
        role.department = department.id;
        const matches = await Roles.findAll({
            where: {
                title: role.title,
                department: role.department
            }
        });

        if (matches.length > 0) console.log("Role already exists for that department");
        else {
            await Roles.create(role);
        }
    }

    askFirstQuestion();
}

async function addEmployee() {
    const response = await inquirer.prompt(await questions(3));
    const employee = {
        firstName: response["addEmployee-1"],
        lastName: response["addEmployee-2"],
        title: response["addEmployee-3"],
        manager: response["addEmployee-4"]
    }

    if (employee.firstName.length <= 0) {
        console.log("No first name was entered");
    }
    else if (employee.lastName.length <= 0) {
        console.log("No last anem was entered");
    }
    else if (employee.title.length <= 0) {
        console.log("No role was entered");
    }
    else {
        const title = await Roles.findOne({ where: { title: employee.title } });
        employee.title = title.id;
        if (employee.manager.length > 0) {
            const manager = await Employees.findOne({ where: { firstName: employee.manager.split(' ')[0], lastName: employee.manager.split(' ')[1] } });
            employee.manager = manager.id;
        }
        else employee.manager = null;

        await Employees.create(employee);
        console.log("New employee was entered successfully");
    }
    askFirstQuestion();
}

async function updateEmployee(){
    const response = await inquirer.prompt(await questions(4));
    const employee = {
        firstName: response["updateEmployee-1"].split(' ')[0],
        lastName: response["updateEmployee-1"].split(' ')[1],
        title: response["updateEmployee-2"],
    }
    const title = await Roles.findOne({where:{title: employee.title}});
    employee.title = title.id;

    await Employees.update(employee, {where:{firstName: employee.firstName, lastName:employee.lastName}});
    console.log("Successfully updated employee Role");

    askFirstQuestion();
}

async function askFirstQuestion() {
    const response = await inquirer.prompt(await questions(0))
    const responseSplit = response.initial.split(' ');
    const work = responseSplit[0].toLowerCase();
    const group = responseSplit[2].toLowerCase();

    if (work === "view") {
        if (group === "employees") {
            viewAllEmployees();
        }
        else if (group === "departments") {
            viewAllDepartments();
        }
        else if (group === "roles") {
            viewAllRoles();
        }
    }
    else if (work == "add") {
        if (group === "department") {
            addDepartment();
        }
        else if (group === "role") {
            addRole();
        }
        else if (group === "employee") {
            addEmployee();
        }
    }
    else if (work == "update") {
        updateEmployee();
    }

}

function initiateConsole() {
    console.log("Welcome to the Employee Database for the Great Arstotzka");
    askFirstQuestion();
}

initiateConsole();