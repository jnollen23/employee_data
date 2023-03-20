SELECT `employees`.`id`,
 `employees`.`first_name` AS `firstName`,
  `employees`.`last_name` AS `lastName`, 
  `employees`.`title`, `employees`.`manager`, 
  `employee`.`id` AS `employee.id`, 
  `employee`.`first_name` AS `employee.firstName`, 
  `employee`.`last_name` AS `employee.lastName`, 
  `employee`.`title` AS `employee.title`, 
  `employee`.`manager` AS `employee.manager`, 
  `roles`.`id` AS `roles.id`, 
  `roles`.`title` AS `roles.title`, 
  `roles`.`department` AS `roles.department`, 
  `roles`.`salary` AS `roles.salary` 
  FROM `employees` AS `employees` 
  INNER JOIN 
  `employees` AS `employee` ON `employees`.`manager` = `employee`.`id` 
  INNER JOIN 
  `roles` AS `roles` ON `employees`.`title` = `roles`.`id`;
Chief Operating Officer