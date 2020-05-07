import yargs from 'yargs';
import {generateSrc, Framework} from './generate-src';
import {generateConfig} from './generate-config';
import {extensionTypeToPoint} from './constants';

const {type, framework} = yargs.argv;
let extensionPoint = extensionTypeToPoint[type as string];
console.log('Create ', type, ' extension project')
if (!extensionPoint) {
  throw(
    `
Warning: Unknown extension point ${type}.
Please use a supported extension type and generate your project manually.
See README.md for instructions.
    `
  );
}

generateSrc(extensionPoint, framework as Framework);
generateConfig(extensionPoint);
