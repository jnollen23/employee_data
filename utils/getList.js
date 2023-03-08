const {Departments, Employees, Roles} = require('../models');

const getList = module.exports = {};

getList.getDepartmentsList = async function(){
    return await Departments.findAll({attributes:['name']});
};

getList.getDepartmentsFromList = async function(){
    const databaseResponse = await getList.getDepartmentsList();
    const values = databaseResponse.map(x=> x.name);
    return values;
};

getList.getEmployeesList = async function(){
    return await Employees.findAll({attributes:["name"]});
};

getList.getEmployeesFromList = async function(){
    const employees = await getList.getEmployeeList();
    const values = employees.map(x=>x.name);
    return values;
};

getList.getRolesList = async function(){
    return await Roles.findAll({attributes:['name']});
}

getList.getRolesFromList
