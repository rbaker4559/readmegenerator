/**
 GIVEN a command-line application that accepts user input
WHEN I am prompted for information about my application repository
THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
WHEN I enter my project title
THEN this is displayed as the title of the README
WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
WHEN I choose a license for my application from a list of options
THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
WHEN I enter my GitHub username
THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
WHEN I enter my email address
THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
WHEN I click on the links in the Table of Contents
THEN I am taken to the corresponding section of the README */

// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
        name: 'title',
        message: 'What is the title for your project?',
    },
    {
        name: 'decription',
        message: 'Please describe your project.',
    },
    {
        name: 'installation',
        message: 'Describe installation instructions.',
    },
    {
        name: 'usage',
        message: 'Please type usage information.',
    },
    {
        name: 'guidelines',
        message: 'What are your contributing guidelines?',
    },
    {
        name: 'tests',
        message: 'Please describe tests.',
    },
    {
        name: 'license',
        type: 'checkbox',
        message: 'What kind of license(s) do you want to include?',
        choices: ['MIT', 'GNU General Public', 'Apache', 'BSD', 'Creative Commons', 'Mozilla'],
    },
    {
        name: 'username',
        message: 'What is your Github Username?',
    },
    {
        name: 'email',
        message: 'What is your Email Address?',
    },
];

/**
 * why didn't the below syntax work?
 * hadn't built a then yet but node stopped at my first question
 * 
 * gatherUserInputs = inquirer.prompt(questions).then(console.log(answers));
 * 
 * what i know aleady:
 * 1. '.then' method doesn't immediately pick up the promise from my inquierer.prompt() function. Needed a callback to return responses appropriately
 * 
 * Also, can you explain self-contained inquirer module?
 */

const questionnaire = inquirer.prompt(questions).then((answers) => {
    const readMePath = `${answers.title}.md`;
    const readMeContent = `
        #${answers.title}\n \n
        ##Description \n\n
        ${answers.decription}\n\n

        ##Installation Guide\n\n
        ${answers.installation}\n\n

        ##Usage Guide\n\n
        ${answers.usage}\n\n

        ##Contribution Guidelines\n\n
        ${answers.guidelines}\n\n

        ##Tests\n\n
        ${answers.tests}\n\n

        ##License Requirements\n\n
        ${answers.license}\n\n
    `
    writeToFile(readMePath, readMeContent);
})

// TODO: Create a function to write README file
function writeToFile(fileName, content) {
    //Write File
    fs.writeFile(fileName, content, (err) => {
        if(err) {
            console.error('Error with write to file: ', err);
        } else {
            console.log('writeFile success!');
        };   
    });
};



// // TODO: Create a function to initialize app
function init() {
    questionnaire();
}

// // Function call to initialize app
init();
