const {Departments} = require('../models/index.js');
const departments = [
    {
        id:1,
        name:'Legal'
    },
    {
        id:2,
        name:'IT'
    },
    {
        id:3,
        name:'HR'
    },
    {
        id:4,
        name:'Finance'
    },
    {
        id:5,
        name:'Business'
    },
];

const createDepartments = async function(){
    await Departments.bulkCreate(departments);
}

module.exports = createDepartments;
