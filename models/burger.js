// Node dependencies
const express = require("express");
const mysql = require("mysql");

// Database and connection (enter personal password)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId + "\n");
  userPrompt();
});

// Prompt user for what action they would like to take
function userPrompt() {
  return inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "action",
      choices: [
        "View Roles",
        "View Employees",
        "View Departments",
        "Add Roles",
        "Add Employees",
        "Add Departments",
        "Update Employees Role",
      ],
    })
    .then(function (res) {
      switch (res.action) {
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Add Departments":
            addDepartments();
        break;
        case "Add Roles":
            addRoles();
        break;
        case "Add Employees":
            addEmployees();
        break;
        case "Update Employees Role":
            updateRole();
        break;
        default:
          console.log("Something went wrong! Please try again");
          userPrompt();
      }
    });
}

function viewDepartments() {
    connection.query(
      `SELECT *
       FROM departments`,
      function (err, res) {
        if (err) throw err;
        var departmentsTable = consoleTable.getTable(res);
        console.log(departmentsTable);
        userPrompt();
      }
    );
}

function viewRoles() {
  connection.query(
    `SELECT roles.id as role_id, title, salary, department_id, departments.name as department
     FROM roles 
     LEFT JOIN departments on roles.department_id = departments.id`,
    function (err, res) {
      if (err) throw err;
      var rolesTable = consoleTable.getTable(res);
      console.log(rolesTable);
      userPrompt();
    }
  );
}

function viewEmployees() {
  connection.query(
    `SELECT employees.id as employee_id, first_name, last_name, roles.salary, departments.name as department, manager_id
     FROM employees
     LEFT JOIN roles on employees.role_id = roles.id
     LEFT JOIN departments on roles.department_id = departments.id`,
    function (err, res) {
      if (err) throw err;
      var employeesTable = consoleTable.getTable(res);
      console.log(employeesTable);
      userPrompt();
    }
  );
}

function addDepartments() {
    inquirer.prompt({
        type:"input",
        name: "department_name",
        message: "What is the name of the new department?"
    }).then(function (data) {
        connection.query(
            `INSERT INTO departments (name)
             VALUES ("${data.department_name}")`,
            function (err) {
              if (err) throw err;
              console.log("New department added successfully")
              viewDepartments(); 
        });
    });
};

function addRoles() {
    inquirer.prompt([{
        type:"input",
        name: "title",
        message: "What is the title of the new role?"
    }, {
        type:"input",
        name: "salary",
        message: "What is the salary of the new role?"
    }, {
        type:"input",
        name: "department_id",
        message: "What is the department ID of the new role?"
    }]).then(function (data) {
        connection.query(
            `INSERT INTO roles (title, salary, department_id)
             VALUES ("${data.title}", "${data.salary}", "${data.department_id}")`,
            function (err) {
              console.log("New role added successfully")
              viewRoles(); 
        });
    });
};

function addEmployees() {
    inquirer.prompt([{
        type:"input",
        name: "first",
        message: "Employee First Name:"
    }, {
        type:"input",
        name: "last",
        message: "Employee Last Name:"
    }, {
        type:"input",
        name: "role_id",
        message: "Employee Role ID:"
    }, {
        type:"input",
        name: "manager_id",
        message: "Employee Manager ID:"
    }]).then(function (data) {
        connection.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id)
             VALUES ("${data.first}", "${data.last}", "${data.role_id}", "${data.manager_id}")`,
            function (err) {
              if (err) throw err;
              console.log("New employee added successfully")
              viewEmployees(); 
        });
    });
};

function updateRole() {
    inquirer.prompt([{
        type:"input",
        name: "employee_id",
        message: "Employee ID:"
    }, {
        type:"input",
        name: "role_id",
        message: "New Role ID:"
    }]).then(function (data) {
    connection.query(`UPDATE employees SET role_id = ${data.role_id} WHERE id = ${data.employee_id}`, 
        function(err) {
            if(err) throw err;
            viewEmployees();
        });
    });
};

