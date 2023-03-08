const Roles = require('./Roles');
const Employees = require("./Employees");
const Departments = require('./Departments');

Roles.hasMany(Departments,{
    foreignKey:'id',
    onDelete:'CASCADE'
});
Departments.belongsTo(Roles,{
    foreignKey:'id'
});

Employees.hasMany(Roles, {
    foreignKey:'id',
    onDelete:'CASCADE'
});
Roles.belongsTo(Employees, {
    foreignKey:'id'
})

Employees.hasMany(Employees,{
    foreignKey:'id',
    onDelete:"CASCADE"
})
Employees.belongsTo(Employees,{
    foreignKey:'id'
})


module.exports = {Roles, Employees, Departments};