const getList = require('./utils/getList');

const questions = async function (index) {
    const questions = [
        [
            {
                name: "initial",
                message: "What would you like to do?",
                type: "list",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update employee role",
                ]
            }
        ],
        [
            {
                name: "addDepartment-1",
                message: "Department Name",
            }
        ],
        [
            {
                name: "addRole-1",
                message: "What is the Title",
            },
            {
                name: "addRole-2",
                message: "What is the Department",
                type: 'list',
                choices: await getList.getDepartmentsFromList()
            },
            {
                name: "addRole-3",
                message: "What is the Salary",
            },
        ],
        [
            {
                name: "addEmployee-1",
                message: "What is their First Name",
            },
            {
                name: "addEmployee-2",
                message: "What is their Last Name",
            },
            {
                name: "addEmployee-3",
                message: "What is their Role",
                type: 'list',
                choices: await getList.getRolesFromList(),
            },
            {
                name: "addEmployee-4",
                message: "Who is their Manager",
            },
        ],
        [
            {
                name: "updateEmployee-1",
                message: "Select the employee to update",
                type: 'list',
                choices: await getList.getEmployeesFromList()
            },
            {
                name: "updateEmployee-2",
                message: "What is their new Role",
                type: 'list',
                choices: await getList.getRolesFromList()
            },
        ],
    ];
    return questions[index];
}

module.exports = questions;