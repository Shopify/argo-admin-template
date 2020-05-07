import yargs from 'yargs';
import {ExtensionPoint} from '@shopify/argo';
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
    'Warning: Unknown extension point ${type}, using SubscriptionsManagement instead'
  );
  extensionPoint = ExtensionPoint.SubscriptionsManagement;
}

generateSrc(extensionPoint);
generateConfig(extensionPoint);
