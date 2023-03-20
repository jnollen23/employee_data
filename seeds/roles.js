const {Roles} = require('../models/index.js');
const roles = [
    {
        id:1,
        title:'Associate',
        department:1,
        salary:'70000',
    },
    {
        id:2,
        title:'Lawyer',
        department:1,
        salary:'140000',
    },
    {
        id:3,
        title:'Help Desk',
        department:2,
        salary:'40000',
    },
    {
        id:4,
        title:'Database Admin',
        department:2,
        salary:'80000',
    },
    {
        id:5,
        title:'Junior-Programmer',
        department:2,
        salary:'60000',
    },
    {
        id:6,
        title:'Programmer',
        department:2,
        salary:'80000',
    },
    {
        id:7,
        title:'Senior Programmer',
        department:2,
        salary:'120000',
    },
    {
        id:8,
        title:'Trainer',
        department:3,
        salary:'50000',
    },
    {
        id:9,
        title:'Manager',
        department:3,
        salary:'80000',
    },
    {
        id:10,
        title:'Accountant',
        department:4,
        salary:'100000',
    },
    {
        id:11,
        title:'Senior Accountant',
        department:4,
        salary:'125000',
    },
    {
        id:12,
        title:'Auditor',
        department:4,
        salary:'80000',
    },
    {
        id:13,
        title:'CEO',
        department:5,
        salary:'150000',
    },
    {
        id:14,
        title:'COO',
        department:5,
        salary:'130000',
    },
    {
        id:15,
        title:'CFO',
        department:5,
        salary:'120000',
    },
    {
        id:16,
        title:'CIO',
        department:5,
        salary:'140000',
    },
];

const createDepartments = async function(){
    await Roles.bulkCreate(roles);
}

module.exports = createDepartments;
