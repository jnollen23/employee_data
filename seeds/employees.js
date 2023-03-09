const { Employees } = require('../models/index.js');
const employees = [
    {
        id: 1,
        firstName: 'Blake',
        lastName: 'May',
        title: 13,
        manager: null
    },
    {
        id: 2,
        firstName: 'Abraham',
        lastName: 'Cullen',
        title: 14,
        manager: 1
    },
    {
        id: 3,
        firstName: 'Adalyn',
        lastName: 'Ellis',
        title: 15,
        manager: 1
    },
    {
        id: 4,
        firstName: 'James',
        lastName: 'Brown',
        title: 16,
        manager: 1
    },
    {
        id: 5,
        firstName: 'Miguel',
        lastName: 'Hope',
        title: 12,
        manager: 3
    },
    {
        id: 6,
        firstName: 'Mary',
        lastName: 'Young',
        title: 11,
        manager: 3
    },
    {
        id: 7,
        firstName: 'Caroline',
        lastName: 'Carter',
        title: 10,
        manager: 6
    },
    {
        id: 8,
        firstName: 'Lincoln',
        lastName: 'Ellis',
        title: 10,
        manager: 6
    },
    {
        id: 9,
        firstName: 'Ryder',
        lastName: 'Walker',
        title: 9,
        manager: 2
    },
    {
        id: 10,
        firstName: 'Diego',
        lastName: 'Noel',
        title: 8,
        manager: 9
    },
    {
        id: 11,
        firstName: 'Angela',
        lastName: 'Allen',
        title: 7,
        manager: 4
    },
    {
        id: 12,
        firstName: 'Melanie',
        lastName: 'Garcia',
        title: 6,
        manager: 11
    },
    {
        id: 13,
        firstName: 'Daniela',
        lastName: 'Marley',
        title: 6,
        manager: 11
    },
    {
        id: 14,
        firstName: 'Adalynn',
        lastName: 'Melenia',
        title: 5,
        manager: 11
    },
    {
        id: 15,
        firstName: 'Iris',
        lastName: 'Ramirez',
        title: 4,
        manager: 4
    },
    {
        id: 16,
        firstName: 'Sawyer',
        lastName: 'White',
        title: 3,
        manager: 11
    },
    {
        id: 17,
        firstName: 'Matteo',
        lastName: 'Noel',
        title: 3,
        manager: 11
    },
    {
        id: 18,
        firstName: 'Elizabeth',
        lastName: 'Lewis',
        title: 2,
        manager: 2
    },
    {
        id: 19,
        firstName: 'Greyson',
        lastName: 'Jenkins',
        title: 2,
        manager: 2
    },
    {
        id: 20,
        firstName: 'Mason',
        lastName: 'Perez',
        title: 1,
        manager: 17
    },
    {
        id: 21,
        firstName: 'Mateo',
        lastName: 'Thompson',
        title: 1,
        manager: 18
    },/* */
];

const createDepartments = async function () {
    // await Employees.create({
    //     id: 1,
    //     firstName: "Blake",
    //     lastName: 'May',
    //     title: 13,
    //     manager: null
    // })
    for (let i = 0; i < employees.length; i++) {
        await Employees.create(employees[i]);
    };
}

module.exports = createDepartments;
