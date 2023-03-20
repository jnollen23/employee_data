require('dotenv').config();
const inquirer = require("inquirer");

const sequelize = require('./config/config');
const questions = require('./questions');
const { Employees, Departments, Roles } = require("./models");

sequelize.sync({ force: false });

async function viewAllDepartments() {
    const depts = await Departments.findAll();
    /* console.log("Company Departments");
    console.log("| ID |     Department     |");
    console.log('---------------------------')
    depts.forEach(x => {
        console.log(`| ${x.id.toString().padEnd(2)} | ${x.name.padEnd(19, ' ')}|`);
    }) */
    const table = depts.map(x=>{
        return{
            ID: x.id,
            Department: x.name
        }
    })
    console.table(table);
    askFirstQuestion();
}

async function viewAllEmployees() {
    const depts = await Employees.findAll({
        include: [{
            model: Employees,
        }, {

            model: Roles,
            required: true,

        }]
    });/* 
    console.log("Company Employees");
    console.log("| ID |       First Name       |        Last Name       |        Title        |          Manager          |");
    console.log('----------------------------------------------------------------------------------------------------------')
    depts.forEach(x => {
        if (x.manager != null) {
            console.log(`| ${x.id.toString().padEnd(2, ' ')} | ${x.firstName.padEnd(23, ' ')}| ${x.lastName.padEnd(23, ' ')}| ${x.roles[0].title.padEnd(20, ' ')}| ${(x.employee.firstName + ' ' + x.employee.lastName).padEnd(26, " ")}|`);
        }
        else {

            console.log(`| ${x.id.toString().padEnd(2, ' ')} | ${x.firstName.padEnd(23, ' ')}| ${x.lastName.padEnd(23, ' ')}| ${x.roles[0].title.padEnd(20, ' ')}|                           |`);
        }
    }) */
    const table = depts.map(x=>{
        const manager = (x.manager === null)? "":`${x.employee.firstName} ${x.employee.lastName}`;
        return {
            ID: x.id,
            First_Name: x.firstName,
            Last_Name: x.lastName,
            Title: x.roles[0].title,
            Manager: manager,
        }
    });
    console.table(table);
    askFirstQuestion();
}

async function viewAllRoles() {
    const depts = await Roles.findAll({
        include: [{
            model: Departments,
            required: true,
        }]
    });
    /* console.log("Company Titles");
    console.log("| ID |        Title         |     Department     |     Salary     |");
    console.log('-------------------------------------------------------------------')
    depts.forEach(x => {
        console.log(`| ${x.id.toString().padEnd(2, ' ')} | ${x.title.padEnd(21, ' ')}| ${x.departments[0].name.padEnd(19, ' ')}| ${x.salary.toString().padEnd(15, ' ')}|`);
    }) */
    const table = depts.map(x=>{
        return {
            ID: x.id,
            Title: x.title,
            Department: x.departments[0].name,
            Salary: x.salary
        }
    });
    console.table(table);
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
        if (employee.manager === "None") {
            employee.manager = null;
        }
        else {
            const manager = await Employees.findOne({ where: { firstName: employee.manager.split(' ')[0], lastName: employee.manager.split(' ')[1] } });
            employee.manager = manager.id;
        }

        await Employees.create(employee);
        console.log("New employee was entered successfully");
    }
    askFirstQuestion();
}

async function updateEmployee() {
    const response = await inquirer.prompt(await questions(4));
    const employee = {
        firstName: response["updateEmployee-1"].split(' ')[0],
        lastName: response["updateEmployee-1"].split(' ')[1],
        title: response["updateEmployee-2"],
    }
    const title = await Roles.findOne({ where: { title: employee.title } });
    employee.title = title.id;

    await Employees.update(employee, { where: { firstName: employee.firstName, lastName: employee.lastName } });
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
    console.log(` 
    /$$$$$$                        /$$                 /$$              /$$                      
    /$$__  $$                      | $$                | $$             | $$                      
   | $$  \\ $$  /$$$$$$   /$$$$$$$ /$$$$$$    /$$$$$$  /$$$$$$  /$$$$$$$$| $$   /$$  /$$$$$$       
   | $$$$$$$$ /$$__  $$ /$$_____/ |_ $$_/   /$$__  $$|_  $$_/ |____ /$$/| $$  /$$/ |____  $$      
   | $$__  $$| $$  \\__/|  $$$$$$   | $$    | $$  \\ $$  | $$      /$$$$/ | $$$$$$/   /$$$$$$$      
   | $$  | $$| $$       \\____  $$  | $$ /$$| $$  | $$  | $$ /$$ /$$__/  | $$_  $$  /$$__  $$      
   | $$  | $$| $$       /$$$$$$$/  |  $$$$/|  $$$$$$/  |  $$$$//$$$$$$$$| $$ \\  $$|  $$$$$$$      
   |__/  |__/|__/      |_______/    \\___/   \\______/    \\___/ |________/|__/  \\__/ \\_______/                                                                                                        
                                                                       `)
    console.log("Welcome to the Employee Database for the Great Arstotzka");
    askFirstQuestion();
}

initiateConsole();