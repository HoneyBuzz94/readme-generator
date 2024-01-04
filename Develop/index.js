// Packages
const inquirer = require('inquirer');
const fs = require('fs');

// Global variables
const questions = [
    'What is the title of your project?',
    'Enter a description for your project',
    'What is the URL for your project?',
    'What collaborators helped with this project?',
    'What resources did you use for this project?',
    'What type of license would you like to use?',
    'What would you like the name of your file to be?'
];
let licenseContent;

inquirer
  .prompt([
    {
      type: 'input',
      message: questions[0],
      name: 'title',
    },
    {
      type: 'input',
      message: questions[1],
      name: 'description',
    },
    {
      type: 'input',
      message: questions[2],
      name: 'url',
    },
    {
        type: 'input',
        message: questions[3],
        name: 'collaborators',
    },
    {
        type: 'input',
        message: questions[4],
        name: 'resources',
    },
    {
        type: 'list',
        message: questions[5],
        choices: ['Apache','MIT','CC0'],
        name: 'license',
    },
    {
        type: 'input',
        message: questions[6],
        name: 'fileName',
    }
  ])
  .then((data) => {
    writeLicense(data);
    writeToFile(data);
  });

// Write license
function writeLicense(data){
    if(data.license == 'Apache'){
        licenseContent = 'Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at\n\nhttp://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.'
    }else if(data.license == 'MIT'){
        licenseContent = 'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'
    }else if(data.license = 'CC0'){
        licenseContent = 'No Copyright\n\nThe person who associated a work with this deed has dedicated the work to the public domain by waiving all of his or her rights to the work worldwide under copyright law, including all related and neighboring rights, to the extent allowed by law.\n\nYou can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission. See Other Information below.\n\nOther Information\n\nIn no way are the patent or trademark rights of any person affected by CC0, nor are the rights that other persons may have in the work or in how the work is used, such as publicity or privacy rights.\n\nUnless expressly stated otherwise, the person who associated a work with this deed makes no warranties about the work, and disclaims liability for all uses of the work, to the fullest extent permitted by applicable law.\n\nWhen using or citing the work, you should not imply endorsement by the author or the affirmer.'
    }
}

// Write data to README file
function writeToFile(data) {
    fs.writeFile(
        `${data.fileName}.md`,
        `# ${data.title}\n\n## Description\n\n${data.description}\n\n## Usage\n\nThis project is live and can be accessed by going to: ${data.url}\n\n## Credits\n\nCollaborators:\n\n* ${data.collaborators}\n\nResources:\n\n* ${data.resources}\n\n## License\n\n${licenseContent}`,
        (err) => err ? console.log(err) : console.log('Success!')
    )
}