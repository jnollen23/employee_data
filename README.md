# Employee Data Store

## Details
I wanted to make a program that would allow me to easily track my employees position in the company. I have a large company with many departments and many roles spread out amongst those departments. This program allows me to track all my departments, roles for each department, and employees that work in a given role for a department and their manager. I learned a lot about how to use sequelize for storing data in a mysql database. One of the tougher parts was getting tables joined properly on foriegn keys. The employees table linking back to itself was a challenge I did not expect.

## Installation
Clone/Download the github repository. Navigate to the folder in a terminal that can execute node.js code and has npm installed. Type npm start.

## Usage
You can use this application to create a company flow chart stored in a database. It allows users to enter departments, roles, and employees. Departments are stand alone tables with no real data but used by every other table. Roles are assigned a department and have a title and salary attached. Employees needs Roles to hold their title details. Employees also links back to that employee's manager if they have one.

## How to use
After following the installation just follow the onscreen questions.

## Demo
![Demo Video](DemoVideo.mp4)

## Credits
N/A

## License
MIT