const Roles = require('./Roles');
const Employees = require("./Employees");
const Departments = require('./Departments');

Roles.hasMany(Departments, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
    sourceKey: 'department'
});
Departments.belongsTo(Roles, {
    foreignKey: 'department',
    targetKey:"id"
});

Employees.hasMany(Roles, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});
Roles.belongsTo(Employees, {
    foreignKey: 'id',
    targetKey: 'id'
})

Employees.hasMany(Employees, {
    foreignKey: 'id',
    onDelete: "CASCADE"
})
Employees.belongsTo(Employees, {
    foreignKey: 'id',
    targetKey: 'id'
})


module.exports = { Roles, Employees, Departments };