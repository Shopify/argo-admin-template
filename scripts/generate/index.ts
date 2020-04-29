import yargs from 'yargs';
import {ExtensionPoint} from '@shopify/app-extensions-renderer';
import {generateSrc} from './generate-src';
import {generateConfig} from './generate-config';
import {extensionTypeToPoint} from './constants';

const {type} = yargs.command<{type: string}>(
  'type',
  'Extension type identifier'
).argv;

let extensionPoint = extensionTypeToPoint[type];
if (!extensionPoint) {
  console.warn(
    'Warning: Unknown extension point ${type}, using AppLink instead'
  );
  extensionPoint = ExtensionPoint.AppLink;
}

generateSrc(extensionPoint);
generateConfig(extensionPoint);
