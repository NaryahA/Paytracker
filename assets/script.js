// Get a reference to the #add-employees-btn element 
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
 const employeesArray = JSON.parse(localStorage.getItem("EmployeeInfo"))||[];
 
  while (true) {

    const firstName = window.prompt("Enter First Name ");
    const lastName = window.prompt("Enter Last Name:");
    const salaryInput = window.prompt("Enter Salary:");
    const addEmployeesBtn = window.confirm("Do you want to add another employee?");

    if (addEmployeesBtn === false){ break;

}
    // Validate salary input
    let salary = parseFloat(salaryInput);
    if (isNaN(salary) || salary < 0) {
      salary = 0; // Default to $0 if input is invalid
    }

    const employee = {
      firstName: firstName,
      lastName: lastName,
      salary: salary
    };

    employeesArray.push(employee);
localStorage.setItem("EmployeeInfo",JSON.stringify(employeesArray))
  }

  return employeesArray; // Return the array of employee objects
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  if (employeesArray.length === 0) {
    console.log("No employees to calculate the average salary.");
    return;
  }

  const totalSalary = employeesArray.reduce((sum, employee) => sum + employee.salary, 0);
  const averageSalary = totalSalary / employeesArray.length;

  console.log(`Average Salary: ${averageSalary.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })}`);
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  if (employeesArray.length === 0) {
    console.log("No employees to select from.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[randomIndex];

  console.log(`Random Employee: ${randomEmployee.firstName} ${randomEmployee.lastName}`);
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
