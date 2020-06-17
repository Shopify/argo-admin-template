import yargs from 'yargs';

import {generateSrc, Template} from './generate-src';
import {generateConfig} from './generate-config';
import {extensionTypes} from './constants';
import {cleanUp} from './clean-up';

const inquirer = require('inquirer');

const choiceMap: {[key: string]: string} = {
  'Vanilla JS': 'vanilla',
  'React': 'react',
  'Vanilla JS with Typescript': 'vanilla-typescript',
  'React with Typescript': 'react-typescript',
};

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
      name: 'template',
      message: 'Select template:',
      min: 1,
      max: 1,
      instructions: false,
      choices: Object.keys(choiceMap),
    },
  ]);

  const {template} = response;

  console.log('✅ You selected:', choiceMap[template]);

  try {
    generateSrc(extensionType, template as Template);
    generateConfig(extensionType);
    cleanUp();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();
