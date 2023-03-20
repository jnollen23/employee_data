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
    return await Employees.findAll({attributes:["firstName", "lastName"]});
};

getList.getEmployeesFromList = async function(){
    const employees = await getList.getEmployeesList();
    const values = employees.map(Createname);
    return values;
};

getList.getManagersFromList = async function(){
    const values = await getList.getEmployeesFromList();
    values[values.length] = "None"
    return values;
}

function Createname(entity){
    return `${entity.firstName} ${entity.lastName}`;
}

getList.getRolesList = async function(){
    return await Roles.findAll({attributes:['title']});
}

getList.getRolesFromList = async function(){
    const roles = await getList.getRolesList();
    const values = roles.map(x=>x.title);
    return values;
}
