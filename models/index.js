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
    onDelete: 'CASCADE',
    sourceKey:'title'
});
Roles.belongsTo(Employees, {
    foreignKey: 'id',
    targetKey: 'id'
})

Employees.hasMany(Employees, {
    foreignKey: 'id',
    onDelete: "CASCADE",
    sourceKey:'manager',
    as:'employee-manager'

})
Employees.belongsTo(Employees, {
    foreignKey: 'manager',
    targetKey: 'id'
})


module.exports = { Roles, Employees, Departments };