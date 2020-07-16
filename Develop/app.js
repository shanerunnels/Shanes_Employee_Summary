const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
let employeesArray = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

function askForRole() {
  return inquirer.prompt([
    {
      type: "list",
      message: "What's your role within the company?",
      name: "role",
      choices: ["manager", "engineer", "intern"],
    },
  ]);
}

function engineerQuestions() {
  return inquirer.prompt([
    {
      type: "input",
      message: "Enter your first name:",
      name: "name",
    },
    {
      type: "input",
      message: "Enter your email address:",
      name: "email",
    },
    {
      type: "input",
      message: "Enter your id:",
      name: "id",
    },
    {
      type: "input",
      message: "Enter your Github username",
      name: "github",
    },
  ])
}

function internQuestions() {
  return inquirer.prompt([
    {
      type: "input",
      message: "Enter your first name:",
      name: "name",
    },
    {
      type: "input",
      message: "Enter your email address:",
      name: "email",
    },
    {
      type: "input",
      message: "Enter your id:",
      name: "id",
    },
    {
      type: "input",
      message: "What school did you attend?",
      name: "school",
    },
  ])
}

function managerQuestions() {
  return inquirer.prompt([
    {
      type: "input",
      message: "Enter your first name:",
      name: "name",
    },
    {
      type: "input",
      message: "Enter your email address:",
      name: "email",
    },
    {
      type: "input",
      message: "Enter your office number:",
      name: "officeNumber",
    },
    {
      type: "input",
      message: "Enter your id:",
      name: "id",
    },
  ]);
}

askForRole().then(function (results) {
  if (results.role === "manager") {
    managerQuestions().then(function (results) {
      employeesArray.push(
        new Manager(
          results.name,
          results.id,
          results.email,
          results.officeNumber
        )
      );
      renderArray = render(employeesArray);
      outputTeam(renderArray);
    });
  }
  if (results.role === "engineer") {
    engineerQuestions().then(function (results) {
      employeesArray.push(
        new Engineer(
          results.name,
          results.id,
          results.email,
          results.github
        )
      );
      renderArray = render(employeesArray);
      outputTeam(renderArray);
    });
  }
  if (results.role === "intern") {
    internQuestions().then(function (results) {
      employeesArray.push(
        new Intern(
          results.name,
          results.id,
          results.email,
          results.school
        )
      );
      renderArray = render(employeesArray);
      outputTeam(renderArray);
    });
  }
});



function outputTeam(renderArray) {
  if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
  }
  fs.writeFileSync(outputPath, renderArray, "utf-8");
}
