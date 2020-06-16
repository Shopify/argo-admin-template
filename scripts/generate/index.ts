import yargs from 'yargs';
import find from 'lodash/find';

import {generateSrc, Framework} from './generate-src';
import {generateConfig} from './generate-config';
import {extensionTypes} from './constants';
import {cleanUp} from './clean-up';

const inquirer = require('inquirer');

(async () => {
  const {type} = yargs.argv;
  const extensionType = String(type);

  if (extensionTypes.indexOf(extensionType) === -1) {
    console.error(
      `
Warning: Unknown extension point ${type}.
Please use a supported extension type and generate your project manually.
See README.md for instructions.
      `
    );
    return;
  }

  console.log('Create ', type, ' extension project');

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

  console.log('✅ You selected:', framework);

  try {
    generateSrc(extensionType, framework as Framework);
    generateConfig(extensionType);
    cleanUp();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();
