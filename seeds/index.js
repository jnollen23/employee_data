require('dotenv').config();
const sequelize = require("../config/config");
const createDepartments = require('./departments');
const createRoles = require('./roles');
const createEmployees = require('./employees');

const seedDatabase = async ()=>{
    await sequelize.sync({force:true});

    //Seed values go here
    //await <Model>.bulkCreate(<seed_variable>);

    await createDepartments();
    await createRoles();
    await createEmployees();
};

seedDatabase();