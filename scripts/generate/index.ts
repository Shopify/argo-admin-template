import yargs from 'yargs';
import {generateSrc, Framework} from './generate-src';
import {generateConfig} from './generate-config';
import {extensionTypeToPoint} from './constants';
import {cleanUp} from './clean-up';

const inquirer = require('inquirer');

(async () => {
  const {type} = yargs.argv;
  let extensionPoint = extensionTypeToPoint[type as string];
  console.log('Create ', type, ' extension project');
  if (!extensionPoint) {
    console.error(
      `
Warning: Unknown extension point ${type}.
Please use a supported extension type and generate your project manually.
See README.md for instructions.
      `
    );
    return;
  }

  const response = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Select framework:',
      min: 1,
      max: 1,
      instructions: false,
      choices: ['vanilla', 'react', 'vanilla-typescript', 'react-typescript'],
    },
  ]);

  const {framework} = response;

  console.log('✅ You selected:', framework)

  generateSrc(extensionPoint, framework as Framework);
  generateConfig(extensionPoint);

  cleanUp();
})();
