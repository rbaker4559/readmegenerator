
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
        choices: ['MIT', 'GNU General Public', 'Apache', 'BSD'],
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

function questionnaire() {
    
    inquirer.prompt(questions).then((answers) => {
    const readMePath = `${answers.title}.md`;
    let licenseIcons = [];
    let mitIcon = "<img src='https://www.svgrepo.com/show/444064/legal-license-mit.svg' alt='icon' width='100px' height='100px' margin='25px'>";
    let gnuIcon = "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/License_icon-gpl-3.svg/2048px-License_icon-gpl-3.svg.png' alt='icon' width='100px' height='100px' margin='25px'>";
    let apacheIcon = "<img src='https://static-00.iconduck.com/assets.00/apache-icon-1024x2048-c1uxmyjc.png' alt='icon' width='100px' height='100px' margin='25px'>";
    let bsdIcon = "<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/License_icon-bsd.svg/2048px-License_icon-bsd.svg.png' alt='icon' width='100px' height='100px' margin='25px'>";
    
    for (let i = 0; i < answers.license.length; i++){
        if(answers.license[i] === 'MIT'){
            licenseIcons.push(mitIcon);
        } else if(answers.license[i] === 'GNU General Public'){
            licenseIcons.push(gnuIcon);
        } else if(answers.license[i] === 'Apache'){
            licenseIcons.push(apacheIcon);
        } else if (answers.license[i] === 'BSD'){
            licenseIcons.push(bsdIcon);
        };
    };
    const readMeContent = `
# ${answers.title}\n \n
## Description \n\n
${answers.decription}\n\n

## Table of Contents \n\n
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation\n\n
${answers.installation}\n\n

## Usage\n\n
${answers.usage}\n\n

## Contribution\n\n
${answers.guidelines}\n\n

## Tests\n\n
${answers.tests}\n\n

## License\n\n
${licenseIcons.join(' ')}\n\n

## Questions\n\n
For any questions, please feel free to use the below contact info. We'll respond as quickly as possible.\n\n
Github Username: [${answers.username}](https://github.com/${answers.username})\n
Github Email: [Email](mailto:${answers.email})
    `
    writeToFile(readMePath, readMeContent);
})
};

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
